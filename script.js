const motionDependenciesReady = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
const webglDependenciesReady = typeof THREE !== 'undefined';

if (motionDependenciesReady) {
  document.documentElement.dataset.motionBooted = 'true';
  gsap.registerPlugin(ScrollTrigger);
} else {
  document.documentElement.classList.remove('js');
  console.warn('Crescendo Labs: motion libraries did not load, showing the page without reveal animations.');
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

if (!window.location.hash) window.scrollTo(0, 0);

window.addEventListener('pageshow', () => {
  if (!window.location.hash) window.scrollTo(0, 0);
});

class SignalField {
  constructor(canvas) {
    this.canvas = canvas;
    this.hero = document.getElementById('hero');
    this.pointer = new THREE.Vector2(10, 10);
    this.pointerTarget = new THREE.Vector2(10, 10);
    this.pointerActive = false;
    this.orb = document.querySelector('.cursor-orb');
    this.time = 0;
    this.mix = reducedMotion ? 1 : 0;
    this.rings = 70;
    this.pointsPerRing = 42;
    this.pipelineLength = 45;
    this.count = this.rings * this.pointsPerRing;
    this.tmp = new THREE.Vector3();
    this.base = new Float32Array(this.count * 3);
    this.chaos = new Float32Array(this.count * 3);
    this.positions = new Float32Array(this.count * 3);
    this.sizes = new Float32Array(this.count);
    this.baseSizes = new Float32Array(this.count);
    this.colors = new Float32Array(this.count * 3);
    this.ringT = new Float32Array(this.count);
    this.baseRotation = new THREE.Euler(0.25, -0.8, 0.24);
    this.targetRotation = new THREE.Euler(0.25, -0.8, 0.24);
    this.cameraTarget = new THREE.Vector2(0, 0);
    this.build();
    this.setup();
    this.bind();
    this.resize();
  }

  setup() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 240);
    this.camera.position.set(0, 0, 55);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    this.group = new THREE.Group();
    this.group.rotation.copy(this.baseRotation);
    this.group.position.set(window.innerWidth < 800 ? 4.8 : 3.8, window.innerWidth < 800 ? -1.4 : -0.2, 0);
    this.scene.add(this.group);

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    this.geometry.setAttribute('aSize', new THREE.BufferAttribute(this.sizes, 1));
    this.geometry.setAttribute('aColor', new THREE.BufferAttribute(this.colors, 3));

    this.material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: true,
      blending: THREE.NormalBlending,
      uniforms: {
        uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
      },
      vertexShader: `
        attribute float aSize;
        attribute vec3 aColor;
        varying vec3 vColor;
        void main() {
          vColor = aColor;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (430.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          vec2 uv = gl_PointCoord - vec2(0.5);
          float d = dot(uv, uv);
          if (d > 0.25) discard;
          float edge = smoothstep(0.25, 0.09, d);
          gl_FragColor = vec4(vColor, edge * 0.86);
        }
      `,
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.group.add(this.points);
  }

  build() {
    const gray = new THREE.Color(0xb8b7ad);
    const blue = new THREE.Color(0x375fc8);

    for (let ring = 0; ring < this.rings; ring += 1) {
      const t = ring / this.rings;
      const z = -this.pipelineLength * t;
      const radius = 18 * (1 - t) + 2;
      const twist = t * Math.PI * 5;

      for (let j = 0; j < this.pointsPerRing; j += 1) {
        const i = ring * this.pointsPerRing + j;
        const a = (j / this.pointsPerRing) * Math.PI * 2 + twist;
        const x = Math.cos(a) * radius;
        const y = Math.sin(a) * radius;
        const k = i * 3;
        this.base[k] = x;
        this.base[k + 1] = y;
        this.base[k + 2] = z;
        this.chaos[k] = x + (Math.random() - 0.5) * 70;
        this.chaos[k + 1] = y + (Math.random() - 0.5) * 45;
        this.chaos[k + 2] = z + (Math.random() - 0.5) * 55;
        this.positions[k] = this.chaos[k];
        this.positions[k + 1] = this.chaos[k + 1];
        this.positions[k + 2] = this.chaos[k + 2];

        const accent = i % 397 === 0;
        const c = accent ? blue : gray;
        const tone = accent ? 0.74 : 0.78 - t * 0.36;
        this.colors[k] = c.r * tone;
        this.colors[k + 1] = c.g * tone;
        this.colors[k + 2] = c.b * tone;
        this.baseSizes[i] = accent ? 0.92 : 0.48 + (1 - t) * 0.36;
        this.sizes[i] = this.baseSizes[i];
        this.ringT[i] = t;
      }
    }
  }

  bind() {
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (event) => {
      const rect = this.canvas.getBoundingClientRect();
      const width = rect.width || window.innerWidth;
      const height = rect.height || window.innerHeight;
      const localX = event.clientX - rect.left;
      const localY = event.clientY - rect.top;
      const insideCanvas = localX >= 0 && localX <= width && localY >= 0 && localY <= height;

      this.pointerTarget.x = (localX / width) * 2 - 1;
      this.pointerTarget.y = -(localY / height) * 2 + 1;
      this.targetRotation.y = this.baseRotation.y + this.pointerTarget.x * 0.45;
      this.targetRotation.x = this.baseRotation.x + this.pointerTarget.y * 0.3;
      this.cameraTarget.x = this.pointerTarget.x * 6;
      this.cameraTarget.y = -this.pointerTarget.y * 3;
      this.pointerActive = insideCanvas && this.isHeroVisible();
      if (this.orb) {
        this.orb.style.left = `${event.clientX}px`;
        this.orb.style.top = `${event.clientY}px`;
        this.orb.classList.toggle('is-active', this.pointerActive);
      }
    }, { passive: true });
    window.addEventListener('mouseleave', () => {
      this.pointerActive = false;
      this.pointer.set(10, 10);
      if (this.orb) this.orb.classList.remove('is-active');
    });
    window.addEventListener('scroll', () => {
      const active = this.isHeroVisible();
      this.pointerActive = this.pointerActive && active;
      if (this.orb && !active) this.orb.classList.remove('is-active');
    }, { passive: true });
  }

  isHeroVisible() {
    if (!this.hero) return window.scrollY < window.innerHeight;
    const rect = this.hero.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < window.innerHeight;
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const width = rect.width || window.innerWidth;
    const height = rect.height || window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.position.z = width < 800 ? 61 : 55;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.group.position.set(width < 800 ? 5.4 : 3.8, width < 800 ? -1.6 : -0.2, 0);
    const s = width < 800 ? 0.66 : 0.92;
    this.group.scale.setScalar(s);
  }

  setShape() {
    this.mix = 0;
  }

  easeInOutCubic(x) {
    return x < 0.5
      ? 4 * x * x * x
      : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }

  draw(now = 0) {
    this.time += reducedMotion ? 0.001 : 0.006;
    this.mix = reducedMotion ? 1 : Math.min(1, this.mix + 0.004);
    const ease = this.easeInOutCubic(this.mix);
    const pos = this.geometry.attributes.position.array;
    const sizes = this.geometry.attributes.aSize.array;

    this.pointer.lerp(this.pointerTarget, 0.09);
    this.group.rotation.x += (this.targetRotation.x - this.group.rotation.x) * 0.04;
    this.group.rotation.y += (this.targetRotation.y - this.group.rotation.y) * 0.04;
    this.group.rotation.z += 0.001;
    this.camera.position.x += (this.cameraTarget.x - this.camera.position.x) * 0.03;
    this.camera.position.y += (this.cameraTarget.y - this.camera.position.y) * 0.03;
    this.camera.lookAt(0, 0, -this.pipelineLength * 0.5);

    this.group.updateMatrixWorld();

    for (let i = 0; i < this.count; i += 1) {
      const k = i * 3;
      const orbit = (1 - ease) * 22;
      const a = now * 0.004 + i * 0.08;
      const b = now * 0.003 + i * 0.13;
      const curveX = this.chaos[k] + Math.cos(a) * orbit;
      const curveY = this.chaos[k + 1] + Math.sin(b) * orbit;
      const curveZ = this.chaos[k + 2] + Math.sin(a + b) * orbit;
      let x = curveX + (this.base[k] - curveX) * ease;
      let y = curveY + (this.base[k + 1] - curveY) * ease;
      let z = curveZ + (this.base[k + 2] - curveZ) * ease;

      if (ease > 0.96) {
        z += Math.sin(this.time * 0.9 + this.ringT[i] * 18 + i * 0.07) * 0.045;
      }
      let hoverForce = 0;

      if (this.pointerActive && ease > 0.85) {
        this.tmp.set(x, y, z).applyMatrix4(this.group.matrixWorld).project(this.camera);
        const dx = this.tmp.x - this.pointer.x;
        const dy = this.tmp.y - this.pointer.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        const force = Math.max(0, 1 - d / 0.2);
        hoverForce = force;
        if (force > 0) {
          const safeD = Math.max(d, 0.001);
          const sphere = force * force;
          const radial = sphere * 1.05;
          const tangent = sphere * 0.52;
          x += (dx / safeD) * radial * 0.36;
          y += (dy / safeD) * radial + (-dx / safeD) * tangent;
          z += (dx / safeD) * radial * 0.78 + (dy / safeD) * tangent * 0.42;
        }
      }

      pos[k] = x;
      pos[k + 1] = y;
      pos[k + 2] = z;
      sizes[i] = this.baseSizes[i] * (1 + hoverForce * 1.35);
    }

    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.aSize.needsUpdate = true;
    this.renderer.render(this.scene, this.camera);
  }

  start() {
    const frame = (now) => {
      this.draw(now);
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }
}

class FallbackSignalField {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: true });
    this.time = 0;
    this.points = [];
    this.count = 260;
    this.resize();
    this.build();
    window.addEventListener('resize', () => {
      this.resize();
      this.build();
    });
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    this.width = rect.width || window.innerWidth;
    this.height = rect.height || window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.floor(this.width * this.dpr);
    this.canvas.height = Math.floor(this.height * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  build() {
    const centerX = this.width * 0.61;
    const centerY = this.height * 0.48;
    const maxRadius = Math.min(this.width, this.height) * 0.34;
    this.points = Array.from({ length: this.count }, (_, index) => {
      const t = index / this.count;
      const angle = t * Math.PI * 10;
      const radius = maxRadius * (1 - t * 0.84);
      return {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        z: t,
        phase: Math.random() * Math.PI * 2,
        size: 1.1 + (1 - t) * 1.8,
        accent: index % 43 === 0,
      };
    });
  }

  draw() {
    this.time += reducedMotion ? 0.004 : 0.012;
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.globalCompositeOperation = 'source-over';

    for (const point of this.points) {
      const drift = Math.sin(this.time + point.phase) * 9 * (1 - point.z);
      const x = point.x + Math.cos(point.phase + this.time * 0.65) * drift;
      const y = point.y + Math.sin(point.phase + this.time * 0.45) * drift;
      const alpha = point.accent ? 0.8 : 0.24 + (1 - point.z) * 0.32;

      this.ctx.beginPath();
      this.ctx.fillStyle = point.accent
        ? `rgba(54, 91, 196, ${alpha})`
        : `rgba(214, 213, 204, ${alpha})`;
      this.ctx.arc(x, y, point.size, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  start() {
    const frame = () => {
      this.draw();
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }
}

const canvas = document.getElementById('field-canvas');
let field = null;

if (canvas && webglDependenciesReady) {
  try {
    field = new SignalField(canvas);
    field.start();
  } catch (error) {
    console.warn('Crescendo Labs: WebGL field failed, using canvas renderer.', error);
    field = new FallbackSignalField(canvas);
    field.start();
  }
} else if (canvas) {
  field = new FallbackSignalField(canvas);
  field.start();
}

if (motionDependenciesReady && typeof Lenis !== 'undefined' && !reducedMotion) {
  const lenis = new Lenis({
    duration: 0.72,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
    wheelMultiplier: 0.85,
  });
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

if (motionDependenciesReady) {
gsap.fromTo('#nav',
  { opacity: 0, y: -12 },
  { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: 'power2.out' });

const navTl = gsap.timeline({
  scrollTrigger: {
    trigger: '#services',
    start: 'top bottom',
    end: 'top center',
    scrub: 1,
    invalidateOnRefresh: true,
  },
});

navTl
  .fromTo('#services',
    { clipPath: 'inset(0 100% 0 0 round 26px 26px 0 0)' },
    { clipPath: 'inset(0 0% 0 0 round 26px 26px 0 0)', duration: 1, ease: 'none' },
    0)
  .fromTo('#nav',
    { top: 24 },
    { top: 16, duration: 0.34, ease: 'none' },
    0.5)
  .fromTo('.nav-shell',
    {
      '--nav-max': '2200px',
      '--nav-pad-y': '0px',
      '--nav-pad-x': '0px',
      '--nav-bg-alpha': 0,
      '--nav-line-alpha': 0,
    },
    {
      '--nav-max': '560px',
      '--nav-pad-y': '8px',
      '--nav-pad-x': '12px',
      '--nav-bg-alpha': 0.86,
      '--nav-line-alpha': 0.055,
      duration: 0.34,
      ease: 'none',
    },
    0.5)
  .fromTo('.brand',
    { width: 112 },
    { width: 30, duration: 0.34, ease: 'none' },
    0.5)
  .fromTo('.brand-full',
    { opacity: 1, y: 0 },
    { opacity: 0, y: -24, duration: 0.34, ease: 'none' },
    0.5)
  .fromTo('.brand-mark',
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.34, ease: 'none' },
    0.5);

const heroSplitLines = gsap.utils.toArray('.hero-title span');

if (heroSplitLines.length) {
  gsap.fromTo(heroSplitLines,
    { opacity: 0, y: 10, filter: 'blur(1px)' },
    {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      delay: 0.55,
      stagger: 0.12,
      ease: 'power2.out',
    });
}

gsap.utils.toArray('.reveal-clip').forEach((el) => {
  const heroDelay = el.closest('#hero') ? (el.classList.contains('hero-right') ? 1.6 : 0.9) : 0;
  const isHero = Boolean(el.closest('#hero'));
  gsap.fromTo(el,
    { opacity: 0, y: 22, clipPath: 'inset(0 0 100% 0)' },
    {
      opacity: 1,
      y: 0,
      clipPath: 'inset(0 0 0% 0)',
      duration: 1.15,
      delay: heroDelay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 86%',
        once: isHero,
        toggleActions: isHero ? 'play none none none' : 'play none none reverse',
      },
    });
});

gsap.utils.toArray('.reveal').forEach((el) => {
  const heroDelay = el.closest('#hero') ? (el.classList.contains('hero-cta') ? 1.05 : 1.45) : 0;
  const isHero = Boolean(el.closest('#hero'));
  gsap.fromTo(el,
    { opacity: 0, y: 18 },
    {
      opacity: 1,
      y: 0,
      duration: 0.9,
      delay: heroDelay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: isHero,
        toggleActions: isHero ? 'play none none none' : 'play none none reverse',
      },
    });
});

gsap.utils.toArray('.reveal-group').forEach((group) => {
  gsap.fromTo(group.querySelectorAll('.reveal-child'),
    { opacity: 0, y: 26 },
    {
      opacity: 1,
      y: 0,
      duration: 0.68,
      ease: 'power2.out',
      stagger: 0.09,
      scrollTrigger: {
        trigger: group,
        start: 'top 84%',
        toggleActions: 'play none none reverse',
      },
    });
});

document.querySelectorAll('.tilt-card').forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    gsap.to(card, {
      rotateX: -(y / rect.height) * 7,
      rotateY: (x / rect.width) * 7,
      y: -8,
      duration: 0.35,
      ease: 'power3.out',
    });
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.45)',
    });
  });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  });
});

ScrollTrigger.refresh();
}
