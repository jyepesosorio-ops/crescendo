# Crescendo Labs — Website Build Roadmap

> One phase at a time. Each phase has a clear definition of done before the next begins.
> Pass only the relevant phase section to Claude Code per session.

---

## Overview

```
Phase 1  CORE PAGE          COMPLETE ✓
Phase 2  PORTFOLIO          ← current phase (pre-work in progress)
Phase 3  CASE STUDY PAGES   Week 4
Phase 4  POLISH & LAUNCH    Week 5
Phase 5  POST-LAUNCH        Ongoing
```

---

## Phase 1 — Core Landing Page
**Status: COMPLETE ✓ — Cal.com live and tested. Phase 2 in progress.**

### What was built
- Nav (morphing pill, Cal.com CTA, "Our Work" link)
- Hero (WebGL signal field + cursor orb, split headline)
- Proof bar (4 stats)
- Product demos (Agent Tracker + Forecasting Model, tabbed)
- Services (contrast panel, tilt cards, mini-mockup marks)
- Case studies (anchor banner + 5 cards + funnel viz)
- Process (3 steps)
- CTA (sub copy + Colombia context + email fallback)
- Footer
- Cal.com configured and end-to-end tested ✓

### Pending flags (fix in same Codex session as Phase 2)
- Hero: restore "FROM MANUAL FRICTION / TO OPERATING SYSTEMS" all caps
- Section order: Services BEFORE Demos
- Demo section: rename to "See it in action." / eyebrow "IN PRODUCTION"
- Hero sub copy and proof strip text updates
- Juan Martínez appts showing 0 (fix to 9)

---

## Phase 2 — Portfolio Section
**Start after Phase 1 is fully shipped.**

### Purpose
The portfolio section shows the range of work beyond insurance data — landing pages, web apps, and B2C products. It answers the question: "Have you built [X] before?" It also proves you build things people actually use, not just internal tools.

### Goals for this section
- Show 6–8 distinct projects across the three service categories
- Let visitors self-select: "I need something like that"
- Give each project enough detail to feel credible (1 screenshot equivalent + 3 facts)
- Function as social proof for the secondary audience (founders, SMBs)

### Audience
Primary: insurance buyers who've already read case studies and want to see if you build web products too.
Secondary: small business owners looking for landing pages or web apps.

### Design direction

```
Position in page: After Case Studies, before Process
Section tone: light (--fog bg) — contrast against the dark case studies above
Layout: masonry-ish card grid, not a uniform grid
         Large cards for featured projects, small for supporting
```

### Service tier hierarchy (corrected)

```
TIER 1 — Data Engineering & Analysis (core business, highest ACV)
  Scraping bots, ETL pipelines, GHL, forecasting models, dashboards
  → This is what Crescendo is. Primary positioning for insurance buyers.

TIER 2 — Web Applications (secondary, supports Tier 1 clients)
  Insurance dashboards, performance trackers, portals, B2B/B2C platforms
  → Proves full-stack capability beyond data pipelines.

TIER 3 — Landing Pages (door opener, lowest ACV, fastest to sell)
  $200–300, days to deliver, often leads into Tier 1/2 relationships
  → Shows range. Accessible entry point for smaller clients.
```

### Card tiers in portfolio section

**Featured cards (2 cards, large) — one per dominant service tier**
Full card: project name + category tag + one-sentence description + 3 data points + coded UI mockup

```
Card 1 (Tier 1 — Data Engineering):
  Insurance Tracker   → Agent performance dashboard
                        React · Node · Supabase
                        Facts: "Real-time login/logout tracking" /
                               "Per-agent appointment and call stats" /
                               "Used daily by 13+ agents"
                        Mockup: 3×2 agent tile grid, navy bg, status dots

Card 2 (Tier 2 — Web Application):
  Nuba Tours          → B2B/B2C tourism platform
                        React · Node · Supabase · Resend
                        Facts: "Multi-role auth (admin/agency/operator)" /
                               "National + international payments" /
                               "Real-time reservation management"
                        Mockup: sidebar nav + calendar + booking panel
```

**Standard cards (4 cards, medium) — supporting evidence**

```
ArtHaus      → ECOMMERCE · "Custom ecommerce with portfolio integration"
Ojo Sideral  → LANDING PAGE · "Minimal, motion-forward personal site"
Sluggers     → LANDING PAGE · "Fast, credible web presence in days"
Health Portal → INSURANCE · REPORTING · "Automated member reports,
                10+ hours saved, twice weekly" (internal — no public link)
```

### HTML structure

```html
<section id="portfolio" class="panel portfolio contrast-panel panel-rise">
  <div class="portfolio-header">
    <p class="eyebrow reveal">Our work</p>
    <h2 class="section-title reveal-clip">Built things you can see.</h2>
    <p class="portfolio-sub reveal">
      Across insurance infrastructure, consumer platforms,
      and market-entry web presence.
    </p>
  </div>

  <div class="portfolio-filter reveal">
    <button class="filter-btn active" data-filter="all">All</button>
    <button class="filter-btn" data-filter="data">Data systems</button>
    <button class="filter-btn" data-filter="apps">Web apps</button>
    <button class="filter-btn" data-filter="pages">Landing pages</button>
  </div>

  <div class="portfolio-grid reveal-group">
    <!-- Tier 1: Featured -->
    <article class="port-card port-featured tilt-card reveal-child" data-cat="apps">
      <div class="port-mockup">
        <!-- Coded UI mockup — dark theme, Nuba Tours UI -->
      </div>
      <div class="port-info">
        <span class="port-tag">WEB APPLICATION</span>
        <h3>Nuba Tours</h3>
        <p>B2B/B2C tourism platform with multi-role auth, reservation
           management, and national + international payments.</p>
        <ul class="port-facts">
          <li>Multi-role: admin · agency · operator</li>
          <li>National + international payments</li>
          <li>Real-time reservation system</li>
        </ul>
        <div class="port-stack">REACT · NODE.JS · SUPABASE · RESEND</div>
      </div>
    </article>

    <article class="port-card port-featured tilt-card reveal-child" data-cat="data">
      <div class="port-mockup">
        <!-- Coded UI mockup — agent performance tracker -->
      </div>
      <div class="port-info">
        <span class="port-tag">INSURANCE · DATA SYSTEM</span>
        <h3>Agent Performance Tracker</h3>
        <p>Real-time dashboard tracking login/logout, breaks,
           appointments, and agent-level statistics.</p>
        <ul class="port-facts">
          <li>Live agent status tracking</li>
          <li>Per-agent appointment and call stats</li>
          <li>Used daily across 13+ agents</li>
        </ul>
        <div class="port-stack">REACT · NODE.JS · SUPABASE</div>
      </div>
    </article>

    <!-- Tier 2: Standard -->
    <article class="port-card tilt-card reveal-child" data-cat="apps">
      <span class="port-tag">ECOMMERCE</span>
      <h3>ArtHaus</h3>
      <p>Custom ecommerce with portfolio integration for a visual artist.</p>
      <div class="port-stack">REACT · SUPABASE</div>
    </article>

    <article class="port-card tilt-card reveal-child" data-cat="pages">
      <span class="port-tag">LANDING PAGE</span>
      <h3>Ojo Sideral</h3>
      <p>Minimal, motion-forward portfolio for a Colombian animator.</p>
      <a class="port-link" href="[url]" target="_blank" rel="noopener">
        View live <span aria-hidden="true">→</span>
      </a>
    </article>

    <article class="port-card tilt-card reveal-child" data-cat="pages">
      <span class="port-tag">LANDING PAGE</span>
      <h3>Sluggers</h3>
      <p>Fast, credible brand web presence. Days, not weeks.</p>
      <a class="port-link" href="[url]" target="_blank" rel="noopener">
        View live <span aria-hidden="true">→</span>
      </a>
    </article>

    <article class="port-card tilt-card reveal-child" data-cat="data">
      <span class="port-tag">INSURANCE · REPORTING</span>
      <h3>Health Portal Reports</h3>
      <p>Automated member reports from health insurance portals.
         10+ hours of manual work replaced, twice weekly.</p>
      <div class="port-stack">PYTHON · XLSX · JSON</div>
    </article>
  </div>
</section>
```

### CSS

```css
.portfolio {
  background: var(--fog-soft);
  color: var(--black);
  border-radius: 26px 26px 0 0;
  overflow: hidden;
}

.portfolio-header {
  max-width: 640px;
  margin-bottom: clamp(36px, 5vh, 56px);
}

.portfolio-sub {
  color: rgba(8,8,8,0.6);
  font-size: var(--step-1);
  line-height: 1.55;
  margin-top: 18px;
  border-top: 1px solid rgba(8,8,8,0.12);
  padding-top: 20px;
}

.portfolio-filter {
  display: flex;
  gap: 0;
  margin-bottom: clamp(28px, 4vh, 44px);
  border-bottom: 1px solid rgba(8,8,8,0.12);
}

.filter-btn {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(8,8,8,0.4);
  background: none;
  border: none;
  padding: 10px 0;
  margin-right: 28px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.filter-btn.active {
  color: var(--black);
  border-bottom-color: var(--blue-solid);
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: clamp(12px, 2vw, 20px);
}

/* Featured cards span 1.5 columns equivalent */
.port-featured {
  grid-column: span 1;  /* adjust to span 2 on wide layouts if desired */
  display: grid;
  grid-template-rows: 1fr auto;
  gap: 0;
}

.port-card {
  position: relative;
  background: rgba(255,255,255,0.5);
  border: 1px solid rgba(8,8,8,0.09);
  border-radius: 16px;
  overflow: hidden;
  padding: clamp(20px, 3vw, 32px);
  transition:
    background 0.4s var(--ease-system),
    box-shadow 0.4s var(--ease-system),
    transform 0.4s var(--ease-system);
}

.port-card:hover {
  background: rgba(255,255,255,0.82);
  box-shadow: 0 20px 60px rgba(8,8,8,0.1);
}

.port-mockup {
  background: rgba(8,8,8,0.88);
  border-radius: 10px;
  min-height: 180px;
  margin: -clamp(20px,3vw,32px) -clamp(20px,3vw,32px) clamp(16px,2.5vw,24px);
  overflow: hidden;
  /* Inside: mini coded UI matching demo section style */
}

.port-tag {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: rgba(8,8,8,0.4);
  display: block;
  margin-bottom: 10px;
}

.port-card h3 {
  font-size: clamp(var(--step-2), 2.8vw, var(--step-3));
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.015em;
  margin-bottom: 10px;
  color: var(--black);
}

.port-card p {
  font-size: var(--step-0);
  line-height: 1.5;
  color: rgba(8,8,8,0.6);
  max-width: 360px;
}

.port-facts {
  list-style: none;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.port-facts li {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(8,8,8,0.5);
  padding-left: 14px;
  position: relative;
}

.port-facts li::before {
  content: '·';
  position: absolute;
  left: 0;
  color: var(--blue-solid);
}

.port-stack {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: rgba(8,8,8,0.35);
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid rgba(8,8,8,0.08);
}

.port-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 14px;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--blue-solid);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
}

.port-link:hover { border-bottom-color: var(--blue-solid); }

/* Hidden when filter active */
.port-card[data-cat].hidden {
  display: none;
}

/* Mobile */
@media (max-width: 980px) {
  .portfolio-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 640px) {
  .portfolio-grid {
    grid-template-columns: 1fr;
  }
  .portfolio-filter {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    white-space: nowrap;
  }
}
```

### Portfolio filter JS

```javascript
// Add to script.js after existing ScrollTrigger setup
const filterBtns = document.querySelectorAll('.filter-btn');
const portCards  = document.querySelectorAll('.port-card[data-cat]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    portCards.forEach(card => {
      const show = filter === 'all' || card.dataset.cat === filter;
      gsap.to(card, {
        opacity: show ? 1 : 0.2,
        scale:  show ? 1 : 0.96,
        duration: 0.35,
        ease: 'power2.out',
        onComplete: () => card.classList.toggle('hidden', !show)
      });
    });
  });
});
```

### Coded mockups inside portfolio cards

For the two featured cards, build the mockup as a mini HTML/CSS UI inside `.port-mockup`. Use the same conventions as the demo section: `--navy` bg, DM Mono labels, `--blue-solid` accents. Keep them compact — they communicate type of work, not full detail.

**Nuba Tours mockup:**
3-column layout (sidebar nav + main calendar + side panel), white text labels on dark.

**Agent Tracker mockup:**
6 small agent tiles in a 3×2 grid, green/amber status dots, tiny stat numbers.

### Phase 2 Definition of Done
- Portfolio section exists between Case Studies and Process
- 6 project cards visible (2 featured, 4 standard)
- Filter buttons work (all/data/apps/pages)
- Cards use tilt effect
- Coded mockups inside featured card headers
- Mobile: single column at ≤640px, filter scrollable
- All public project links tested

---

## Phase 3 — Individual Case Study Pages
**Start after Phase 2 is fully tested.**

### What
5 dedicated pages linked from the case study cards on the landing page. Each page expands one case study with:
- Full problem/solution/result narrative
- Visual of the system (screenshot or coded mockup)
- Specific metrics and timeline
- Tech stack used
- Client context (anonymized if needed)

### Structure per page
```
/cases/sherpa-bot
/cases/ghl-pipeline
/cases/health-reports
/cases/forecasting-model
/cases/lead-tracker
```

### Page template
```
- Nav (same)
- Case study header: tag + title + 3-stat bar
- Problem: what was broken
- Solution: what we built
- System diagram: coded visual of the architecture
- Results: specific numbers
- Tech stack pills
- CTA: "Your process might have the same friction"
- Next case study link
- Footer (same)
```

### Phase 3 Definition of Done
- 5 pages exist at defined URLs
- Each links from the landing page case study card
- "Next case study" links chain all 5
- Mobile-responsive
- Analytics events fire on CTA click

---

## Phase 4 — Polish & Launch
**Start after Phase 3.**

### Tasks
- [ ] Real Cal.com URL confirmed and tested end-to-end
- [ ] Plausible or GA4 analytics installed
- [ ] OG image (social preview) — 1200×630px coded mockup
- [ ] Favicon (Crescendo mark SVG)
- [ ] Meta description finalized
- [ ] Lighthouse audit: target 90+ performance, 100 accessibility
- [ ] Cross-browser test: Chrome, Firefox, Safari, iOS Safari
- [ ] Submit to Google Search Console
- [ ] Optional: submit to Lapa.ninja or Bestfolios for design community visibility

### Phase 4 Definition of Done
- All checklist items above complete
- First real booking received via the page

---

## Phase 5 — Post-Launch Iteration
**Ongoing after launch.**

### 30-day review
- How many sessions?
- What's the bounce rate at the hero?
- Which section do visitors scroll to before leaving?
- How many discovery calls booked?

### Common fixes based on analytics
| Signal | Fix |
|---|---|
| High bounce rate at hero | Test alternative headline |
| Drop-off at services | Compress service card copy |
| Low CTA clicks | Add one more CTA after case studies |
| Low mobile conversion | Simplify mobile layout |

### Planned additions
- Blog / Insights section (when you have 3+ articles ready)
- About / Team section (when you have headshots)
- Spanish version (toggle) for LATAM leads
- WhatsApp CTA for Colombian clients

---

## Claude Code Session Protocol

### Per session
1. Open fresh Claude Code session
2. Attach files: `CRESCENDO_MASTER_SPEC.md` + current `index.html` + `styles.css` + `script.js`
3. Paste this prompt, replacing [PHASE]:

> "Read CRESCENDO_MASTER_SPEC.md fully. Then read the attached index.html, styles.css, and script.js. Preserve everything marked as EXISTS in the spec. Build only the tasks listed under [PHASE] in the roadmap. Output updated index.html, styles.css, and script.js. Make zero design decisions — they are all in the spec."

### After each session
- Screenshot all new sections
- Return here with screenshots for review
- Receive correction list → update spec → start next session

### Do not
- Run two phases in the same Claude Code session
- Add things not in the spec without confirming first
- Correct Claude Code conversationally mid-session — update the spec instead

---

*Roadmap v1 · May 2026*
*Each phase ships before the next begins.*
