# Crescendo Labs — Master Design Specification
> Single source of truth. All previous versions (V1–V5) and the V5 delta are superseded by this document.
> Pass to Claude Code with: "Read this document fully before writing a single line. Preserve what's already built per Section 1. Build only what's marked MISSING. Make zero design decisions — they are all here."

---

## 0. Design Brief

```
PROJECT          Crescendo Labs — landing page + portfolio
GOAL             Convert insurance operations directors into booked discovery calls
SUCCESS METRIC   3+ qualified calls per week within 60 days of launch
PRIMARY AUDIENCE US health/life insurance ops directors, agency owners, COOs
                 running teams on manual processes
SECONDARY        Founders and SMBs needing landing pages or web apps
HESITATION       "Another agency that overpromises and underdelivers"
COUNTER          Named systems, specific outcomes, specific clients. Proof beats promise.
TONE             Precise · Grounded · Proven
ANTI-TONE        Cute, editorial, decorative, agency-speak, vague
REFERENCES       Linear (precision), Vercel (grid + corner marks),
                 WorldQuant Foundry (corner accents, split-text links, clip-path reveals)
BUILD CONTEXT    Plain HTML + CSS + Vanilla JS, Three.js (hero only), Lenis,
                 GSAP + ScrollTrigger. Three files: index.html, styles.css, script.js.
                 Deploy: Netlify.
```

---

## 1. What Already Exists — Do Not Rebuild

These are confirmed in the live codebase. Preserve them exactly.

| Element | Where | Status |
|---|---|---|
| Type scale 16px × 1.25 ratio | `--step-0` through `--step-7` in styles.css | ✓ KEEP |
| CSS custom easing `--ease-system` | `cubic-bezier(0.19,1,0.22,1)` | ✓ KEEP |
| Corner button (CSS gradient L-shapes) | `.corner-button::before` using linear-gradient | ✓ KEEP |
| Nav morphing pill via CSS vars + scroll scrub | `navTl` GSAP timeline, `--nav-max`, `--nav-pad-*` | ✓ KEEP |
| Services contrast-panel clip-path reveal | `clipPath: 'inset(0 100% 0 0 round 26px)'` scrub | ✓ KEEP |
| Reveal animations | `.reveal`, `.reveal-clip`, `.reveal-group` / `.reveal-child` | ✓ KEEP |
| Three.js WebGL signal field + 2D fallback | `SignalField`, `FallbackSignalField` classes | ✓ KEEP |
| Tilt cards (3D mouse rotation) | `.tilt-card` handlers in script.js | ✓ KEEP |
| Hero proof grid (3-cell band) | `.hero-proof` | ✓ KEEP PATTERN |
| Lenis smooth scroll at 0.72 duration | script.js line 380 | ✓ KEEP |
| Spacing via `clamp()` | `--pad: clamp(24px,4vw,64px)` | ✓ KEEP |
| Motion-reduce guard | `reducedMotion` const, all animations gated | ✓ KEEP |

**Remove from existing build:**
- `.cursor-orb` — HTML element, CSS class, and orb-related lines in `SignalField.bind()`
- `FallbackSignalField` class — replace with `canvas.remove()` on WebGL error

---

## 2. Tech Stack (Complete)

```html
<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">

<!-- Animation -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" defer></script>

<!-- WebGL hero -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.0/three.min.js" defer></script>

<!-- Smooth scroll -->
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js" defer></script>
```

---

## 3. Color System — Final (blue accent, not green)

**60 / 30 / 10 rule applied:**

```
60%  FOUNDATION   --black (#070707) and --black-soft (#10100e)
30%  SECONDARY    --fog variants (light sections), --navy (demo cards only)
10%  ACCENT       --blue (rgba(54,91,196,0.78)) — CTAs, eyebrows, active states
```

```css
:root {
  /* FOUNDATION (60%) — already in your codebase, keep */
  --black:      #070707;
  --black-soft: #10100e;
  --black-card: rgba(18,18,18,0.92);

  /* SECONDARY (30%) */
  --fog:        #cecec6;   /* light section bg */
  --fog-deep:   #b8b9b1;   /* card surface on light */
  --fog-soft:   #e1e1da;   /* lightest card surface */
  --navy:       #0c1929;   /* demo cards ONLY */
  --navy-2:     #112238;
  --navy-3:     #1a3350;

  /* ACCENT (10%) */
  --blue:       rgba(54, 91, 196, 0.78);   /* primary accent */
  --blue-solid: #365bc4;                    /* solid blue for bg use */
  --blue-dim:   rgba(54, 91, 196, 0.12);   /* tinted surfaces */

  /* SEMANTIC — financial/status use only */
  --status-g:   #22c55e;
  --status-a:   #f59e0b;
  --status-r:   #ef4444;

  /* TEXT */
  --white:      rgba(214, 213, 204, 0.84);
  --silver:     rgba(142, 145, 136, 0.7);
  --fog-ink:    rgba(8, 8, 8, 0.64);
  --line:       rgba(214, 213, 204, 0.09);

  /* EXISTING PRESERVED */
  --system-teal: #78979a;
  --ink-muted:   rgba(8, 8, 8, 0.5);
  --ease-system: cubic-bezier(0.19, 1, 0.22, 1);
  --mono:        'DM Mono', ui-monospace, monospace;
  --sans:        'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --pad:         clamp(24px, 4vw, 64px);
}
```

**Hard rules:**
```
--blue      → CTAs, eyebrows (one per section), active states, step numbers
--navy      → Demo card backgrounds ONLY. Nowhere else on the page.
--status-*  → Inside demo UI and CS4 (forecasting) only
--fog       → All light sections. Never use pure white (#fff).
--black     → All dark sections. Never pure black (#000).
```

---

## 4. Type System (keep your existing scale exactly)

Your `--step-0` through `--step-7` is already correct. Map to semantic names for the spec:

```css
/* Keep your existing scale — just reference these names below */
--step-0: 16px;    /* body */
--step-1: 20px;    /* h6, sub-headlines */
--step-2: 25px;    /* h5, card titles */
--step-3: 31.25px; /* h4 */
--step-4: 39.06px; /* h3, section sub-titles */
--step-5: 48.83px; /* h2 on mobile */
--step-6: 61.04px; /* h2 desktop */
--step-7: 76.29px; /* h1 hero */
```

**Rules — unchanged from your codebase:**
```
Inter 800  → h1, h2, large numbers
Inter 700  → h3, card titles
Inter 600  → sub-headlines, buttons
Inter 400  → body, nav links
Inter 300  → long descriptive body
DM Mono    → always uppercase, always letter-spacing 0.08em+, 10–12px only
```

**The one type change from your build:** reduce hero h1 to `--step-6` (61px) rather than `--step-7` (76px). At 76px the headline dominates but the canvas dominates too — at 61px they share space more comfortably. Mobile keeps `clamp(30px,9vw,48px)` as-is.

---

## 5. Layout System (keep your existing clamp approach)

Your `--pad: clamp(24px,4vw,64px)` is the right system. Add these two tokens for section rhythm:

```css
--section-y-lg:  clamp(112px, 15vh, 170px);   /* already in .panel */
--section-y-sm:  clamp(64px, 8vh, 96px);       /* compact sections */
--section-y-cta: clamp(120px, 18vh, 200px);    /* CTA section only */
```

Grid: 12-column, max-width 1280px where needed. Use your existing pattern (`minmax()` grid-template-columns) — don't introduce a fixed grid framework.

---

## 6. Page Architecture

```
01  NAV              fixed · dark · morphing pill (EXISTS)
02  HERO             dark · WebGL · proof headline (EXISTS — modify headline)
03  PROOF BAR        dark · 4 stats extracted from hero-proof (MISSING)
04  PRODUCT DEMOS    navy cards · tabbed · agent tracker + forecasting (MISSING)
05  SERVICES         light contrast-panel · 3 cards · tilt (EXISTS — swap marks)
06  CASE STUDIES     dark · anchor banner + 5 cards (MISSING)
07  PROCESS          dark · 3 steps (EXISTS)
08  CTA              dark · centered · expanded (EXISTS — expand)
09  FOOTER           dark · minimal (EXISTS)
```

---

## 7. Section Specifications

---

### 7.1 Nav — EXISTS, keep

One change: add split-text hover to nav links (steal from WorldQuant Foundry):

```html
<a href="#services" class="nav-link">
  <span class="split-text">
    <span class="split-default">Services</span>
    <span class="split-hover" aria-hidden="true">Services</span>
  </span>
</a>
```

```css
.split-text {
  display: inline-block;
  overflow: hidden;
  height: 1.2em;
  vertical-align: top;
}
.split-default, .split-hover {
  display: block;
  transition: transform 0.38s var(--ease-system);
}
.split-hover {
  position: absolute;
  transform: translateY(105%);
}
.nav-link:hover .split-default { transform: translateY(-105%); }
.nav-link:hover .split-hover   { transform: translateY(0); }
```

---

### 7.2 Hero — EXISTS, one change: headline text

**Keep everything.** The WebGL field, the left/right split, `.reveal-clip`, the footer band, the `.corner-button`, all animations.

**Only change the copy:**

```
CURRENT:  "From manual friction" / "to operating systems"
REPLACE:  "We turned 3 months of" / "work into one week."
```

Sub text (below headline, `.hero-footer` center column):
```
CURRENT:  "Automation / CRM workflows / data pipelines / dashboards / web apps
           for insurance operations."
REPLACE:  "Data systems, automation, and web apps for insurance teams
           running on manual processes. Based in Medellín — working
           across Medicare, Medicaid, and private providers."
```

Hero proof grid (3 cells):
```
CURRENT:  "Inputs cleaned" / "Workflows routed" / "Decisions visible"
REPLACE:  "Medicare · Medicaid" / "5+ live systems" / "Medellín, Colombia"
```

---

### 7.3 Proof Bar — MISSING

Extract the `.hero-proof` grid pattern into a standalone section immediately after hero.

```html
<section id="proof-bar" class="proof-bar">
  <article class="stat">
    <span>SHERPA EXTRACTION</span>
    <strong>3mo → 1wk</strong>
  </article>
  <article class="stat">
    <span>PER AUTOMATION CYCLE</span>
    <strong>10h saved</strong>
  </article>
  <article class="stat">
    <span>DAILY LEAD ROUTING</span>
    <strong>13 agents</strong>
  </article>
  <article class="stat">
    <span>HEALTH PORTAL REPORTS</span>
    <strong>2× / week</strong>
  </article>
</section>
```

```css
.proof-bar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--line);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}
/* Reuse existing .stat styles exactly */
```

Animation: `.reveal-group` + `.reveal-child` with stagger 0.08s.

---

### 7.4 Product Demos — MISSING

This is the section that converts insurance buyers. Priority 1.

```html
<section id="demos" class="panel demos">
  <div class="demos-header">
    <p class="eyebrow reveal">Live systems</p>
    <h2 class="section-title reveal-clip">What we actually build.</h2>
    <p class="demos-sub reveal">Simplified previews of production systems
    running today for US insurance agencies.</p>
  </div>

  <div class="demo-tabs reveal">
    <button class="demo-tab active" data-demo="agent">Agent Tracker</button>
    <button class="demo-tab" data-demo="forecast">Forecasting Model</button>
  </div>

  <div class="demo-panel tilt-card" data-panel="agent"> ... </div>
  <div class="demo-panel tilt-card" data-panel="forecast" style="display:none"> ... </div>
</section>
```

```css
.demos {
  background: var(--black);
}
.demo-tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--line);
  margin: clamp(32px, 4vw, 48px) 0 0;
}
.demo-tab {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--silver);
  padding: 10px 0;
  margin-right: 28px;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease;
}
.demo-tab.active {
  color: var(--white);
  border-bottom-color: var(--blue-solid);
}
.demo-panel {
  background: var(--navy);
  border: 1px solid var(--navy-3);
  border-radius: 10px;
  overflow: hidden;
  margin-top: 20px;
}
.demo-chrome {
  background: var(--navy-2);
  border-bottom: 1px solid var(--navy-3);
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}
.demo-chrome-label {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--silver);
}
.demo-chrome-dots {
  display: flex;
  gap: 6px;
}
.demo-chrome-dots i {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(18,18,18,0.9);
  display: block;
}
.demo-summary {
  background: var(--navy);
  border-bottom: 1px solid var(--navy-3);
  padding: 12px 20px;
  display: flex;
  gap: 28px;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}
```

**Demo 1 — Agent Tracker**

Summary bar: `● ACTIVE 4/6` (--status-g) · `● BREAK 1` (--status-a) · `● OFFLINE 1` (--silver) · `AVG APPTS 7.2` (--silver)

Agent card grid: 3 columns, 6 cards. Each card: `--navy-2` bg, `1px --navy-3` border, `border-left: 2px solid [status color]`, `border-radius: 8px`, `padding: 16px`.

Realistic agent data:
```
JM · Juan Martínez   · ACTIVE  · Appts: 9  · Calls: 24 · 8:02 AM
LP · Luisa Peña      · ACTIVE  · Appts: 11 · Calls: 31 · 7:45 AM
SA · Sofia Arango    · ACTIVE  · Appts: 7  · Calls: 18 · 8:15 AM
CR · Carlos Ruiz     · BREAK   · Appts: 5  · Calls: 11 · 7:58 AM
DM · Diego Mora      · ACTIVE  · Appts: 6  · Calls: 16 · 8:30 AM
VT · Valentina Torres· OFFLINE · Appts: 0  · Calls: 0  · —
```

Bottom bar: DM Mono 10px --silver · `LAST UPDATED · 11:24:07 AM · AUTO-REFRESH 60s`

**Demo 2 — Forecasting Model**

Summary bar: `ACTIVE 47` (--white) · `AT RISK 30d 12` (--status-r) · `PROJ 30d $28,400` (--status-g) · `AVG RISK 2.8/5` (--status-a)

Policy table: 8 rows, columns: POLICY ID · AGENT · SOLD DATE · 30d RISK · 60d RISK · 90d RISK · CASHFLOW

Risk badges: LOW (`--blue-dim` bg, `--blue-solid` text) · MED (`rgba(245,158,11,0.12)` bg, `--status-a` text) · HIGH (`rgba(239,68,68,0.12)` bg, `--status-r` text)

```
POL-4821 · J. Martínez · Apr 12 · LOW  · LOW  · MED  · $1,240
POL-4822 · S. Arango   · Apr 14 · MED  · HIGH · HIGH · $880
POL-4819 · C. Ruiz     · Apr 08 · LOW  · LOW  · LOW  · $1,650
POL-4830 · L. Peña     · Apr 18 · HIGH · HIGH · HIGH · $320
POL-4815 · D. Mora     · Apr 02 · LOW  · MED  · MED  · $1,100
POL-4833 · V. Torres   · Apr 20 · MED  · MED  · HIGH · $740
POL-4841 · J. Martínez · Apr 24 · LOW  · LOW  · LOW  · $1,820
POL-4844 · S. Arango   · Apr 28 · HIGH · HIGH · HIGH · $290
```

Cashflow strip below table: 3 columns · `30 DAY $28,400` (--status-g) · `60 DAY $19,840` (--status-a) · `90 DAY $11,200` (--status-r)

**Demo tab switching JS:**
```javascript
document.querySelectorAll('.demo-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.demo-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.demo-panel').forEach(p => {
      gsap.to(p, { opacity: 0, duration: 0.15, onComplete: () => p.style.display = 'none' });
    });
    tab.classList.add('active');
    const panel = document.querySelector(`[data-panel="${tab.dataset.demo}"]`);
    panel.style.display = 'block';
    gsap.fromTo(panel, { opacity: 0 }, { opacity: 1, duration: 0.25 });
  });
});
```

---

### 7.5 Services — EXISTS, swap card marks only

Keep the expand-on-hover flex-grow pattern. Keep tilt. Keep `.service-action` reveal.

**Replace the three `.service-mark` contents:**

Card 1 (Data Systems) — mini table mockup:
```html
<div class="service-mark">
  <div class="mark-table">
    <div class="mark-row"><span>POL-4821</span><i class="badge low">LOW</i></div>
    <div class="mark-row"><span>POL-4830</span><i class="badge high">HIGH</i></div>
    <div class="mark-row"><span>POL-4819</span><i class="badge low">LOW</i></div>
  </div>
</div>
```

Card 2 (Web Apps) — mini app mockup:
```html
<div class="service-mark">
  <div class="mark-app">
    <div class="mark-sidebar"><i></i><i></i><i></i></div>
    <div class="mark-main">
      <div class="mark-card"></div>
      <div class="mark-card"></div>
    </div>
  </div>
</div>
```

Card 3 (Landing Pages) — 3 stacked bands:
```html
<div class="service-mark">
  <div class="mark-page">
    <div class="mark-band nav-band"></div>
    <div class="mark-band hero-band"></div>
    <div class="mark-band body-band"></div>
  </div>
</div>
```

```css
/* All mark containers inherit position and transform from existing .service-mark */
.mark-table { display: flex; flex-direction: column; gap: 8px; }
.mark-row { display: flex; justify-content: space-between; align-items: center;
            font-family: var(--mono); font-size: 10px; }
.badge { padding: 2px 6px; border-radius: 3px; font-size: 9px;
         font-family: var(--mono); letter-spacing: 0.06em; }
.badge.low  { background: var(--blue-dim); color: var(--blue-solid); }
.badge.high { background: rgba(239,68,68,0.12); color: var(--status-r); }
.mark-app { display: flex; gap: 8px; height: 100%; }
.mark-sidebar { width: 28px; display: flex; flex-direction: column;
                gap: 6px; padding-top: 8px; }
.mark-sidebar i { height: 6px; border-radius: 3px; background: currentColor; opacity: 0.3; }
.mark-main { flex: 1; display: flex; flex-direction: column; gap: 8px; }
.mark-card { flex: 1; border-radius: 6px; background: currentColor; opacity: 0.12; }
.mark-page { display: flex; flex-direction: column; gap: 6px; }
.mark-band { border-radius: 4px; background: currentColor; opacity: 0.15; }
.nav-band  { height: 12px; opacity: 0.3; }
.hero-band { height: 52px; opacity: 0.18; border-left: 2px solid var(--blue-solid); }
.body-band { height: 36px; }
```

---

### 7.6 Case Studies — MISSING

```html
<section id="case-studies" class="panel case-studies">
  <div class="section-intro">
    <p class="eyebrow reveal">Proof of work</p>
    <h2 class="section-title reveal-clip">Live systems.\nReal results.</h2>
    <p class="cs-sub reveal">Production systems running today for real clients.</p>
  </div>

  <!-- Anchor banner -->
  <div class="cs-anchor reveal">
    <div class="cs-anchor-left">
      <strong class="cs-big-stat">3mo → 1wk</strong>
      <p>Manual Sherpa extraction took 5–10 agents months of work.
         Our bot does the same in 7 days — and runs it daily.</p>
    </div>
    <div class="cs-anchor-right">
      <div class="bar-row">
        <span class="bar-label">BEFORE</span>
        <div class="bar-track">
          <div class="bar-fill before-bar" data-bar-width="90"></div>
        </div>
        <span class="bar-value">~90 days</span>
      </div>
      <div class="bar-row">
        <span class="bar-label after">AFTER</span>
        <div class="bar-track">
          <div class="bar-fill after-bar" data-bar-width="8"></div>
        </div>
        <span class="bar-value after">7 days</span>
      </div>
    </div>
  </div>

  <!-- Card grid -->
  <div class="cs-grid reveal-group">
    <!-- CS1, CS2, CS3, CS4 -->
  </div>

  <!-- CS5 full width -->
  <div class="cs-full reveal">
    ...
  </div>

  <p class="cs-portfolio-note">
    OTHER WORK — Nuba Tours · ArtHaus · Ojo Sideral · Sluggers
  </p>
</section>
```

```css
.case-studies { background: var(--black-soft); }

.cs-anchor {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(32px, 5vw, 64px);
  align-items: center;
  background: rgba(18,18,18,0.92);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: clamp(28px, 4vw, 48px);
  margin: clamp(40px, 5vh, 64px) 0 2px;
}
.cs-big-stat {
  display: block;
  font-size: clamp(32px, 4vw, 54px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.025em;
  color: var(--blue-solid);
  margin-bottom: 14px;
}
.bar-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.bar-label { width: 48px; color: var(--silver); }
.bar-label.after { color: var(--blue-solid); }
.bar-track { flex: 1; height: 6px; background: rgba(214,213,204,0.08); border-radius: 4px; overflow: hidden; }
.bar-fill { height: 100%; border-radius: 4px; width: 0; transition: none; }
.before-bar { background: rgba(214,213,204,0.2); }
.after-bar  { background: var(--blue-solid); }
.bar-value { min-width: 52px; color: var(--silver); text-align: right; font-size: 10px; }
.bar-value.after { color: var(--blue-solid); }

.cs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2px;
  margin-top: 2px;
}
.cs-card {
  background: rgba(18,18,18,0.92);
  border: 1px solid var(--line);
  border-top: 2px solid var(--blue-solid);
  border-radius: 10px;
  padding: clamp(22px, 3vw, 32px);
}
.cs-card.financial { border-top-color: var(--status-a); }
.cs-metric {
  font-size: clamp(24px, 2.8vw, 38px);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.02em;
  color: var(--blue-solid);
  margin: 12px 0 8px;
}
.cs-card.financial .cs-metric { color: var(--status-a); }
.cs-full {
  margin-top: 2px;
  background: rgba(18,18,18,0.92);
  border: 1px solid var(--line);
  border-top: 2px solid var(--blue-solid);
  border-radius: 10px;
  padding: clamp(22px, 3vw, 32px);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(24px, 4vw, 48px);
  align-items: start;
}
.cs-portfolio-note {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--silver);
  margin-top: clamp(24px, 3vh, 40px);
}
```

**Five case study card copy:**

```
CS1  tag: DATA EXTRACTION · AUTOMATION
     metric: 3mo → 1wk
     title: Sherpa Scraping Bot
     body: Replaced months of manual portal work by a 5–10 person team.
           Bot runs daily cycles that were previously impossible.
     tags: PYTHON · SCRAPING · AUTOMATION

CS2  tag: CRM · LEAD MANAGEMENT
     metric: 13 agents · daily
     title: GHL CRM Pipeline
     body: Daily pipeline pulls, transforms, and assigns leads by round-robin
           to 13 agents. Zero manual routing — every day.
     tags: GHL · RAILWAY · ETL

CS3  tag: WEB SCRAPING · HEALTH INSURANCE
     metric: 10h × 2/week
     title: Health Provider Reports
     body: Portal bots generate 3 member reports twice weekly.
           XLSX + JSON pushed live to a business dashboard.
     tags: SCRAPING · JSON · MEDICARE

CS4  tag: FORECASTING · LIFE INSURANCE
     metric: 30 · 60 · 90 days        [color: --status-a]
     title: Chargeback Forecasting Model
     body: Maps cashflow exposure and chargeback risk per policy.
           Foundation for future ML risk scoring.
     tags: PYTHON · FORECASTING · ML-READY

CS5 (full width)
     tag: SALES OPS · ATTRIBUTION
     metric: Source → close · full visibility
     title: Lead-to-Sale Tracker
     body: Maps every lead from source through pipeline to close.
           Agent attribution, source performance, conversion rates.
     tags: TRACKING · ATTRIBUTION · SALES OPS
     right column: CSS funnel visualization (4 bars: LEADS 100%, 
                   CONTACTED 68%, QUALIFIED 34%, CLOSED 18%)
```

**Bar animations (add to script.js):**
```javascript
gsap.utils.toArray('[data-bar-width]').forEach(bar => {
  gsap.fromTo(bar, { width: '0%' }, {
    width: bar.dataset.barWidth + '%',
    duration: 1.0, ease: 'power2.out',
    scrollTrigger: {
      trigger: bar, start: 'top 85%',
      toggleActions: 'play none none none'
    }
  });
});
```

---

### 7.7 Process — EXISTS, keep

One change: step numbers use `--blue` not any other color. They already do. No change needed.

---

### 7.8 CTA — EXISTS, expand

Current: a single centered `contact-inner` div with headline + button.

**Add these three elements:**

```html
<div class="contact-inner reveal">
  <p class="eyebrow">Ready</p>
  <h2 class="section-title">Let's see what your<br>data could be doing.</h2>

  <!-- ADD sub-paragraph -->
  <p class="contact-sub">
    45-minute discovery call. We walk through your current processes,
    identify where automation creates leverage, and give you a written
    diagnosis — free, no commitment.
  </p>

  <!-- ADD Colombia context -->
  <p class="contact-context">
    Three-person team based in Medellín. Working inside Medicare,
    Medicaid, and private insurance workflows since 2023.
  </p>

  <a class="corner-button large" href="https://cal.com/crescendolabs" target="_blank" rel="noopener">
    Book a discovery call
  </a>

  <!-- ADD email fallback -->
  <p class="contact-email">
    Or reach us at
    <a href="mailto:hola@crescendolabs.co">hola@crescendolabs.co</a>
  </p>
</div>
```

```css
.contact-sub {
  max-width: 540px;
  margin: 24px auto 0;
  color: var(--silver);
  font-size: var(--step-0);
  line-height: 1.65;
}
.contact-context {
  max-width: 440px;
  margin: 14px auto 0;
  color: var(--silver);
  font-size: 13px;
  font-style: italic;
  line-height: 1.55;
  opacity: 0.7;
}
.contact-email {
  margin-top: 18px;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--silver);
}
.contact-email a {
  color: var(--white);
  border-bottom: 1px solid var(--line);
  transition: border-color 0.2s ease;
}
.contact-email a:hover { border-color: var(--blue-solid); }
```

---

### 7.9 Footer — EXISTS, one addition

Add "Book a systems audit" as an explicit `corner-button` in the footer, not just a plain link.

```
Left:   CRESCENDO LABS  ·  MEDELLÍN, COLOMBIA  ·  HOLA@CRESCENDOLABS.CO
Right:  [corner-button] Book a systems audit
```

---

## 8. Corner Accent System

Your existing `.corner-button::before` pattern is the right idea. **Extend it to cards.**

```css
/* Card corner marks — add to .cs-card, .demo-panel, .cs-anchor */
.has-corners {
  position: relative;
}
.has-corners::before,
.has-corners::after {
  content: '';
  position: absolute;
  width: 9px;
  height: 9px;
  border-color: var(--line);
  border-style: solid;
  opacity: 0.5;
  pointer-events: none;
  transition: opacity 0.2s ease;
}
.has-corners::before {
  top: -1px; left: -1px;
  border-width: 1px 0 0 1px;
}
.has-corners::after {
  bottom: -1px; right: -1px;
  border-width: 0 1px 1px 0;
}
/* For all 4 corners, add two more via child spans: */
.corner-tl, .corner-tr, .corner-bl, .corner-br {
  position: absolute;
  width: 9px; height: 9px;
  border-color: var(--line);
  border-style: solid;
  opacity: 0.4;
  pointer-events: none;
}
.corner-tl { top:-1px; left:-1px;  border-width: 1px 0 0 1px; }
.corner-tr { top:-1px; right:-1px; border-width: 1px 1px 0 0; }
.corner-bl { bottom:-1px; left:-1px;  border-width: 0 0 1px 1px; }
.corner-br { bottom:-1px; right:-1px; border-width: 0 1px 1px 0; }
.has-corners:hover .corner-tl,
.has-corners:hover .corner-tr,
.has-corners:hover .corner-bl,
.has-corners:hover .corner-br { opacity: 1; }
```

---

## 9. Animation System (complete)

Keep all existing animations in script.js. Add:

```javascript
// Bar width animate (for case studies anchor)
gsap.utils.toArray('[data-bar-width]').forEach(bar => {
  gsap.fromTo(bar, { width: '0%' }, {
    width: bar.dataset.barWidth + '%',
    duration: 1.0, ease: 'power2.out',
    scrollTrigger: { trigger: bar, start: 'top 85%', toggleActions: 'play none none none' }
  });
});

// Demo tab switching
document.querySelectorAll('.demo-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.demo-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.demo-panel').forEach(p => {
      gsap.to(p, { opacity: 0, duration: 0.15, onComplete: () => p.style.display = 'none' });
    });
    tab.classList.add('active');
    const panel = document.querySelector(`[data-panel="${tab.dataset.demo}"]`);
    panel.style.display = 'block';
    gsap.fromTo(panel, { opacity: 0 }, { opacity: 1, duration: 0.25 });
  });
});
```

**Rules — unchanged:**
```
✓ opacity + translateY only
✓ all scroll animations fire once (toggleActions: 'play none none none')
✓ hero fires on load, not ScrollTrigger
✓ max duration 1.15s per element
✓ ease: power2.out / power3.out (hero h1)
✓ prefers-reduced-motion respected
✗ no loops, pulses, parallax, color transitions
✗ no hover transitions > 0.4s
```

---

## 10. Conversion Architecture

```
PRIMARY GOAL     Book a discovery call via Cal.com
SUCCESS METRIC   3+ qualified calls/week within 60 days
SECONDARY        Email to hola@crescendolabs.co
```

**CTA placement map (6 exposures):**
```
01  Nav bar           → "Book a call" (always visible)
02  Hero              → .corner-button "Contact us"
03  Services section  → .text-cta "Map your process"
04  Case studies end  → brief in-section text link
05  CTA section       → .corner-button.large "Book a discovery call"
06  Footer            → .corner-button "Book a systems audit"
```

**Post-click:**
- Cal.com → 45-min discovery call
- mailto: → direct email, immediate response
- "See our work" → anchor scroll to #demos

---

## 11. Copy Reference (all page text)

```
NAV:
  Brand: CRESCENDO LABS
  Links: Services · Proof · Process · Contact
  CTA: Book a call

HERO:
  h1 left:  "We turned 3 months of"
  h1 right: "work into one week."
  Sub: "Data systems, automation, and web apps for insurance teams
        running on manual processes. Based in Medellín — working
        across Medicare, Medicaid, and private providers."
  CTA: Contact us
  Proof grid: "Medicare · Medicaid" / "5+ live systems" / "Medellín, Colombia"

PROOF BAR:
  S1: "3mo → 1wk"    / SHERPA EXTRACTION
  S2: "10h saved"    / PER AUTOMATION CYCLE
  S3: "13 agents"    / DAILY LEAD ROUTING
  S4: "2× / week"    / HEALTH PORTAL REPORTS

DEMOS:
  Eyebrow: Live systems
  Title: What we actually build.
  Sub: Simplified previews of production systems running today
       for US insurance agencies.
  Tab 1: Agent Tracker
  Tab 2: Forecasting Model

SERVICES:
  Eyebrow: What we build
  Title: Simple systems for messy operations.
  Sub: We turn scattered insurance workflows into measurable operating
       infrastructure: data enters cleanly, decisions move faster,
       teams see what is happening before it becomes a problem.

  01 / Core infrastructure — Data Systems
  Scraping bots, ETL pipelines, GHL workflows, forecasting, and dashboards.
  CTA: Build the pipeline

  02 / Workflow surfaces — Web Apps
  Performance trackers, portals, reservations, ecommerce, and internal tools.
  CTA: Design the tool

  03 / Market entry — Landing Pages
  Clean coded pages for teams that need a fast, credible web presence.
  FROM $200 · DAYS NOT WEEKS
  CTA: Launch faster

CASE STUDIES:
  Eyebrow: Proof of work
  Title: Live systems. Real results.
  Sub: Production systems running today for real clients.
  Anchor: 3mo → 1wk
  Anchor body: Manual Sherpa extraction took 5–10 agents months of work.
               Our bot does the same in 7 days — and runs it daily.
  [CS1–CS5 copy in section 7.6]
  Portfolio note: OTHER WORK — Nuba Tours · ArtHaus · Ojo Sideral · Sluggers

PROCESS:
  Eyebrow: Process
  Title: Find the friction. Build the system.
  01 · Map / Manual work, data sources, ownership, and risk.
  02 · Build / Focused automation with a fixed outcome.
  03 · Operate / Deploy, document, train, and improve.

CTA:
  Eyebrow: Ready
  Title: Let's see what your data could be doing.
  Sub: 45-minute discovery call. We walk through your current processes,
       identify where automation creates leverage, and give you a written
       diagnosis — free, no commitment.
  Context: Three-person team based in Medellín. Working inside Medicare,
           Medicaid, and private insurance workflows since 2023.
  Button: Book a discovery call
  Email: Or reach us at hola@crescendolabs.co

FOOTER:
  CRESCENDO LABS  ·  MEDELLÍN, COLOMBIA  ·  HOLA@CRESCENDOLABS.CO
  CTA: Book a systems audit
```

---

## 12. Mobile Rules

```
≤980px:
  nav links: gap 18px, font-size 10px
  hero title: max-width 70vw
  hero title: single column (both left-aligned, stacked)
  hero footer: 1-column grid
  stat-row: 1 column
  service-grid: flex-direction column
  proof-intro: left-aligned

≤640px:
  nav links: display none
  panel: padding-top 110px / padding-bottom 110px
  hero title: clamp(30px,9vw,48px)
  hero cta: flex-direction column, align-items flex-start
  demo panel: horizontal scroll with overflow-x auto
  cs-grid: 1 column
  cs-full: 1 column (funnel hides)
  contact-sub: font-size 15px
  footer: flex-direction column
```

---

## 13. Pre-Ship Checklist

```
TYPOGRAPHY
□ Only Inter and DM Mono used
□ DM Mono always uppercase, letter-spacing ≥ 0.07em
□ Hero h1 is largest text on page
□ Body never below 14px

COLOR
□ No #fff or #000 — only defined variables
□ --blue-solid appears as CTA bg + key metrics only
□ --navy appears only inside .demo-panel
□ --status-a appears only in CS4 and forecasting demo
□ Contrast check: white on --blue-solid ≥ 4.5:1

ANIMATION
□ All scroll animations fire once
□ Hero fires on load
□ Bar charts animate from 0 on scroll
□ Demo tabs switch with fade
□ prefers-reduced-motion collapses all to instant

CONVERSION
□ "Book a call" appears 6 times across page
□ Cal.com link tested, real URL
□ mailto: opens correctly
□ Anchor #demos scroll works
□ Mobile CTAs min-height 44px

CONTENT
□ All copy matches section 11
□ Case study numbers are real
□ Colombian names used in demo data
□ No Lorem Ipsum anywhere

PERFORMANCE
□ Page weight < 300kb (excl. Three.js)
□ Three.js canvas: max pixelRatio 2, powerPreference high-performance
□ Fonts: font-display swap
□ No console errors

MOBILE
□ 375px: no horizontal scroll
□ Demo panels: horizontal scroll works on touch
□ All buttons min-height 44px tappable
□ Hero title readable at 30px
```

---

*Master Specification · May 2026*
*Supersedes: V1, V2, V3, V4, V5, V5-delta*
*Three words: Precise · Grounded · Proven*
