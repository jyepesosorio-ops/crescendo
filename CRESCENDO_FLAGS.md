# Crescendo Labs — Flags
> Agreed modifications not yet implemented.
> Clear each flag when Codex completes it. Add flags here whenever a decision is made in chat.
> Format: - [ ] description · *agreed: YYYY-MM-DD* · priority: HIGH/MED/LOW

---

## HERO — Restore original state (Phase 1 regressed this)

- [ ] **Restore hero headline to "FROM MANUAL FRICTION / TO OPERATING SYSTEMS"** — Phase 1 Codex changed it. Revert text content of `.hero-left` and `.hero-right` spans. CSS: `text-transform: uppercase`, font-size `clamp(52px, 7.5vw, 92px)` · *agreed: 2026-05-20* · priority: HIGH

- [ ] **Update hero sub copy** — replace with: "Data systems, automation, and web apps for insurance teams running on manual processes. Based in Medellín — working across Medicare, Medicaid, and private providers." · *agreed: 2026-05-20* · priority: HIGH

- [ ] **Update hero proof strip** — three spans: "Medicare · Medicaid" / "5+ Live Systems" / "Medellín, Colombia" · *agreed: 2026-05-20* · priority: HIGH

- [ ] **Add Codex constraint header to all future prompts** — every Codex prompt must begin with: "CONSTRAINT 1: Modify only files and sections explicitly named. CONSTRAINT 2: State line number before each change. CONSTRAINT 3: If a change requires touching an unnamed section, stop and report instead of proceeding." · *agreed: 2026-05-20* · priority: HIGH (process)

---

## STRUCTURE — Section order and narrative

- [ ] **Swap Services and Demos sections** — move Services BEFORE Demos. Correct narrative: Hero → Proof bar → Services → Demos → Case Studies → Process → CTA · *agreed: 2026-05-20* · priority: HIGH

- [ ] **Rename demo section eyebrow** — change to "IN PRODUCTION" · *agreed: 2026-05-20* · priority: MED

---

## CONTENT — Sections that need real data

- [ ] **Demo section — replace generic copy with real project context** — Agent Tracker and Forecasting Model cards need accurate descriptions matching actual tools built · *agreed: 2026-05-20* · priority: HIGH

- [ ] **Demo section — Juan Martínez appts showing 0** — should show 9 per spec · *agreed: 2026-05-20* · priority: LOW

- [x] **Nav CTA URL** — updated to cal.com/crescendolabs/discovery, Contact link removed, Proof renamed to "Our Work" · *completed: 2026-05-20*

---

## DESIGN — Visual improvements deferred to design pass

- [ ] **Demo section aesthetics** — needs visual alignment with hero's precision. Specific fixes after structure is locked · *agreed: 2026-05-20* · priority: MED (design pass)

- [ ] **Services section** — visual polish only, no structural changes · *agreed: 2026-05-20* · priority: LOW (design pass)

- [ ] **Process section** — too much empty space left, steps cramped right. Layout rebalance needed · *agreed: 2026-05-20* · priority: LOW (design pass)

- [ ] **CTA button styling** — needs more visual weight. Design pass · *agreed: 2026-05-20* · priority: MED (design pass)

---

## FUNCTIONALITY

- [ ] **Add data-cta attributes** to all CTA buttons for analytics tracking (see CRESCENDO_CONVERSION.md section 7) · *agreed: 2026-05-20* · priority: MED (pre-launch)

- [ ] **Customize confirmation email** — add Crescendo Labs copy in Cal.com → Settings → Email notifications · *agreed: 2026-05-20* · priority: MED

---

## SPEC CORRECTIONS

- [ ] **Cursor orb: DO NOT DELETE** — spec previously said remove. Decision reversed. Update CRESCENDO_MASTER_SPEC.md section 1 · *agreed: 2026-05-20* · priority: HIGH (spec correction)

- [ ] **FallbackSignalField: KEEP** — spec said remove. Keep it. Update CRESCENDO_MASTER_SPEC.md · *agreed: 2026-05-20* · priority: MED (spec correction)

---

## PHASE 2 — Portfolio (next build session)

- [ ] **Build portfolio section** per CRESCENDO_ROADMAP.md Phase 2 spec — after Case Studies, before Process. 2 featured cards + 4 standard + filter buttons · *agreed: prior session* · priority: HIGH (next phase)

---

## COMPLETED

- [x] Phase 1 core sections built (hero, proof bar, demos, services, case studies, process, CTA, footer) · *2026-05-20*
- [x] Mobile QA at 375px — 0 horizontal overflow · *2026-05-20*
- [x] Demo tabs switching verified · *2026-05-20*
- [x] Hero headline copy decision FINAL: "From manual friction / to operating systems" · *2026-05-20*
- [x] Proof bar — 4 stats · *2026-05-20*
- [x] Case study anchor banner with animated bars · *2026-05-20*
- [x] Service card marks replaced with mini mockups · *2026-05-20*
- [x] Cal.com account created (crescendo.schedule@gmail.com) · *2026-05-20*
- [x] Event "Discovery Call — Crescendo Labs" created, 45 min · *2026-05-20*
- [x] Booking URL confirmed: cal.com/crescendolabs/discovery · *2026-05-20*
- [x] Google Calendar connected · *2026-05-20*
- [x] After-event buffer: 15 min · *2026-05-20*
- [x] Minimum notice: 24 hours · *2026-05-20*
- [x] Availability: Mon–Fri 7am–7pm Colombia, Saturday removed · *2026-05-20*
- [x] 4 intake questions added · *2026-05-20*
- [x] Phone notifications enabled · *2026-05-20*
- [x] End-to-end booking flow tested and confirmed · *2026-05-20*
- [x] Hero CTA (index.html:49) updated to cal.com/crescendolabs/discovery · *2026-05-20*
- [x] Contact section CTA (index.html:446) updated · *2026-05-20*
- [x] Footer link (index.html:458) updated · *2026-05-20*

---

## HOW TO USE THIS FILE

**When a decision is made in chat:** add a flag immediately.
**When Codex implements a flag:** move it to COMPLETED with date.
**Priority:** HIGH = blocks launch · MED = important not blocking · LOW = design pass
**Before each Codex session:** include only relevant flags — no scope creep.

---

## SECTION NAMING & NARRATIVE — agreed 2026-05-20

- [ ] **Rename demo section title** — change from "What we actually build." to "See it in action." and eyebrow from "LIVE SYSTEMS" to "IN PRODUCTION" — eliminates redundancy with Services section title "What we build" · *agreed: 2026-05-20* · priority: HIGH

- [ ] **Service tier hierarchy** — update all documentation and Services section copy to reflect correct tier order: Tier 1 = Data Engineering (core), Tier 2 = Web Applications, Tier 3 = Landing Pages. Data engineering must have dominant visual weight in the Services section. · *agreed: 2026-05-20* · priority: HIGH

---

## PHASE 2 PRE-WORK — before sending Codex the portfolio prompt

- [ ] **Build Nuba Tours mini-UI mockup in Claude Design** — dark bg, DM Mono labels, 3 columns (sidebar nav + reservation calendar + booking panel), 200px tall, same visual language as demo section navy cards · *agreed: 2026-05-20* · priority: HIGH (blocks Phase 2)

- [ ] **Build Agent Tracker mini-UI mockup in Claude Design** — 3×2 grid of agent tiles, green/amber status dots, compact stat numbers, same navy card style · *agreed: 2026-05-20* · priority: HIGH (blocks Phase 2)

- [ ] **Add confirmed mockup specs to Phase 2 Codex prompt** — after Claude Design approval, extract CSS patterns and add to prompt before sending to Codex · *agreed: 2026-05-20* · priority: HIGH (blocks Phase 2)
