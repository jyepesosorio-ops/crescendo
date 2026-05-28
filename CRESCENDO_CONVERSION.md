# Crescendo Labs — Conversion & Backend Specification
> Defines what happens after every click. Build this before Phase 1 ships.
> This document is the missing link between the frontend (Master Spec) and real business outcomes.

---

## 0. Conversion Philosophy

We are selling a complex, custom, high-trust service to skeptical B2B buyers.
The page does not close the sale. The discovery call closes the sale.
The page has one job: **get the right person into a 45-minute call.**

Three rules that follow from this:
1. Never ask for information on the page that you'll ask again on the call.
2. Never add a step between "I'm interested" and "I've booked."
3. Make the booking feel like a preview of working with us — organized, fast, professional.

---

## 1. Audience Tiers & Their CTAs

```
TIER 1  Insurance buyers (primary)
        Complex sale · High trust required · US-based · B2B
        CTA: Book a discovery call → Cal.com
        Journey: Page → Cal.com → Confirmation email → Call → Follow-up → Proposal

TIER 2  SMB / Founder (secondary)
        Moderate trust · Mixed geography · B2B/B2C
        CTA: Book a discovery call → same Cal.com (same call, lower ACV discussion)
        Or: Email directly → hola@crescendolabs.co

TIER 3  Colombian landing page buyers (fast lane)
        Low trust barrier · Local · Fast cycle · $200–300
        CTA: WhatsApp → direct message flow
        Journey: WhatsApp → voice note or text → PayPal/Nequi → Build → Deliver
```

---

## 2. Primary CTA — Cal.com Discovery Call

### Why Cal.com, not a form

| | Cal.com | Contact form |
|---|---|---|
| Speed to booking | Immediate | 24–72h delay |
| Friction | Low (pick slot, done) | Medium (fill fields, wait) |
| Signal sent to buyer | "They're organized" | "They'll get back to me" |
| Signal sent to you | Committed buyer | Might ghost |
| Positions your brand | Systems-first | Passive |

### Setup instructions

**Account:** Cal.com free tier is sufficient. Create account at cal.com with hola@crescendolabs.co.

**Event type:** "Discovery Call — Crescendo Labs"
- Duration: 45 minutes
- Buffer after: 15 minutes
- Minimum notice: 24 hours (no same-day booking)
- Availability: configure per your actual availability

**Pre-booking questions (inside Cal.com, not on the page):**
```
1. Your name (required)
2. Company name (required)
3. Your role / title (required)
4. In one sentence, what's the manual process costing you most right now? (required)
5. How did you find us? (optional)
```

Keep it to 5 questions maximum. The goal is intake, not a form wall.

**Confirmation email (automatic, set inside Cal.com):**
```
Subject: Discovery call confirmed — Crescendo Labs

[Name],

Your 45-minute discovery call is confirmed for [date] at [time].

We'll spend the session mapping your current processes, identifying
where automation creates the most leverage, and leaving you with
a written diagnosis — regardless of whether we work together.

If anything changes, reschedule here: [Cal.com link]

See you then.
— Crescendo Labs team
hola@crescendolabs.co
```

**24h reminder (automatic, enable inside Cal.com):**
Simple one-liner. No changes needed from Cal.com default.

**Post-call:** manually send a written diagnosis within 24 hours.
This is your differentiator. Every discovery call produces a short document
(1 page max) that maps their specific process, identifies 2–3 automation
opportunities, and estimates time/cost savings. Even if they don't hire you.
That document is what gets forwarded to their boss. That's how you get
referrals.

### Cal.com URL structure

```
Primary booking link: https://cal.com/crescendolabs/discovery
Use this URL everywhere: nav CTA, hero CTA, CTA section, footer.
It must be a real, working URL before the page ships.
```

### HTML implementation

```html
<!-- Primary CTA button — used everywhere -->
<a class="corner-button" 
   href="https://cal.com/crescendolabs/discovery"
   target="_blank" 
   rel="noopener"
   data-cta="discovery-call"
   aria-label="Book a 45-minute discovery call with Crescendo Labs">
  Book a discovery call
</a>

<!-- data-cta attribute used for analytics tracking -->
```

---

## 3. Secondary CTA — Direct Email

For visitors who saw the primary CTA and didn't click. Lower commitment.
Appears only in the CTA section and footer. Not in the nav or hero.

```html
<a href="mailto:hola@crescendolabs.co?subject=Discovery%20inquiry&body=Hi%20Crescendo%20Labs%2C%0A%0AI%27m%20interested%20in%20learning%20more%20about%20your%20services."
   class="contact-email-link"
   data-cta="email-direct">
  Or reach us at hola@crescendolabs.co
</a>
```

The pre-filled subject and body reduce friction. Visitor sees the compose window
already partially written — easier to send than starting blank.

**Response SLA:** reply within 4 business hours during US Eastern business hours.
Late replies on B2B inquiries kill deals. Set a phone notification for this inbox.

---

## 4. Tertiary CTA — WhatsApp (Landing Page tier only)

Not on the main page. Relevant only when you build individual service pages
or when a landing page client comes through referral.

```
WhatsApp number: +57 [your number]
Pre-filled message: "Hola, me interesa una landing page para mi negocio."
Link format: https://wa.me/57XXXXXXXXXX?text=Hola%2C%20me%20interesa%20una%20landing%20page
```

---

## 5. CTA Placement Map (page-level)

```
Position    Element              CTA                    Audience
──────────────────────────────────────────────────────────────────
Nav         "Book a call"        Cal.com link           All
Hero        corner-button        Cal.com link           All
Services    "Map your process →" Anchor to #contact     All
Case studies Text link           Anchor to #contact     Insurance
CTA section corner-button.large  Cal.com link           All
CTA section Email fallback       mailto:                All
Footer      "Book a systems audit" Cal.com link         All
```

Six exposures to the primary CTA. One secondary. Zero forms.

---

## 6. What "After the Click" Looks Like

### Insurance buyer path

```
1. Lands on page via LinkedIn / referral / search
2. Reads hero → proof bar → demos → case studies
   (This takes 3–5 minutes for a serious buyer)
3. Clicks "Book a discovery call" (nav or CTA section)
4. Cal.com opens in new tab
5. Picks available 45-min slot
6. Fills 5 intake questions
7. Gets instant confirmation email
8. Gets reminder 24h before
9. CALL HAPPENS
10. You send written diagnosis within 24h
11. Follow-up call or proposal within 72h
12. Engagement starts
```

### SMB / referral path

```
1. Referred by existing client or finds page
2. Reads hero → services → skips to contact
3. Clicks "Book a discovery call" or emails directly
4. If Cal.com → same as above
5. If email → you respond within 4h, offer 2 time slots manually
6. Call happens → scoped proposal within 48h
```

### Landing page fast path

```
1. Referred by someone who knows you
2. Doesn't need to read the whole page
3. Goes direct to WhatsApp or email
4. Text exchange → quick brief → invoice → build → deliver
   Total cycle: 3–7 days
```

---

## 7. What to Measure

Set these up in Phase 4 before launch. Use Plausible (privacy-first, GDPR-compliant,
$9/mo) or Google Analytics 4 (free).

### Events to track

```javascript
// Add to script.js — fire on every CTA click
document.querySelectorAll('[data-cta]').forEach(el => {
  el.addEventListener('click', () => {
    const ctaType = el.dataset.cta;
    const section = el.closest('section')?.id || 'unknown';
    
    // Plausible
    if (typeof plausible !== 'undefined') {
      plausible('CTA Click', { props: { type: ctaType, section: section } });
    }
    
    // GA4
    if (typeof gtag !== 'undefined') {
      gtag('event', 'cta_click', { cta_type: ctaType, section: section });
    }
  });
});
```

### Metrics that matter (review weekly)

```
ACQUISITION
  Sessions per week
  Source breakdown (direct / referral / search / social)
  
ENGAGEMENT  
  Average scroll depth (what % reach the case studies?)
  Time on page (< 60s = bouncing, 3min+ = engaged)
  
CONVERSION
  CTA clicks per session (goal: > 8%)
  Cal.com bookings per week (goal: 3+ within 60 days)
  Email inquiries per week
  
QUALITY
  Discovery calls that convert to proposals
  Proposals that convert to engagements
  Average deal value
```

### The one number that matters most

**Discovery calls booked per week.** Everything else is leading indicator noise
until you're getting at least 3 qualified calls per week. Don't optimize anything
else until you hit that number.

---

## 8. Cal.com Technical Integration

### Embed option (optional for Phase 3+)

Instead of opening Cal.com in a new tab, you can embed the calendar inline
using Cal.com's embed script. This keeps the visitor on your domain.

```html
<!-- In <head> -->
<script type="text/javascript">
  (function (C, A, L) {
    let p = function (a, ar) { a.q.push(ar); };
    let d = C.document;
    C.Cal = C.Cal || function () {
      let cal = C.Cal;
      let ar = arguments;
      if (!cal.loaded) {
        cal.ns = {}; cal.q = cal.q || [];
        d.head.appendChild(d.createElement("script")).src = A;
        cal.loaded = true;
      }
      if (ar[0] === L) {
        const api = function () { p(api, arguments); };
        const namespace = ar[1];
        api.q = api.q || [];
        if (typeof namespace === "string") {
          cal.ns[namespace] = cal.ns[namespace] || api;
          p(cal.ns[namespace], ar);
          p(cal, ["initNamespace", namespace]);
        } else p(cal, ar);
        return;
      }
      p(cal, ar);
    };
  })(window, "https://app.cal.com/embed/embed.js", "init");
  Cal("init", "discovery", {origin: "https://cal.com"});
</script>

<!-- On your CTA button, replace href with: -->
<button data-cal-link="crescendolabs/discovery"
        data-cal-namespace="discovery"
        data-cal-config='{"layout":"month_view"}'
        class="corner-button"
        data-cta="discovery-call">
  Book a discovery call
</button>
```

**Recommendation for now:** use the simple `href` link (external tab). Embed in Phase 4
after you've confirmed the basic flow works. Don't add complexity before first booking.

---

## 9. Backend Checklist (before Phase 1 ships)

```
□ Cal.com account created at hola@crescendolabs.co
□ Event type "Discovery Call" created, 45 minutes
□ Availability set correctly (your actual available hours)
□ Buffer after event: 15 min
□ Minimum notice: 24 hours
□ 5 intake questions added
□ Confirmation email customized (see section 2)
□ 24h reminder enabled
□ Booking URL confirmed: cal.com/crescendolabs/discovery
□ URL placed in all 6 CTA positions in HTML
□ Mailto link pre-filled with subject and body
□ Test booking made end-to-end (book as a fake client, confirm all emails arrive)
□ Inbox notification set for hola@crescendolabs.co (phone alert, not just desktop)
□ Response protocol agreed: who answers inquiries, within what timeframe
```

---

## 10. What Not to Build (now or ever)

```
✗ Custom booking form on your site — Cal.com handles this better
✗ CRM integration in Phase 1 — unnecessary complexity, manage in a sheet until 10+/month
✗ Chatbot / live chat widget — wrong signal for your brand positioning
✗ Multi-step lead qualification form — kills conversion rate
✗ "Free consultation" framing — devalues the call, attracts tire-kickers
    Use "discovery call" — same thing, more professional
✗ Automated WhatsApp responses for insurance leads — too casual, wrong tier
✗ Calendly instead of Cal.com — Cal.com is better product, open source option exists,
    and free tier is more generous
```

---

*Conversion Spec v1 · May 2026*
*Pair with CRESCENDO_MASTER_SPEC.md and CRESCENDO_ROADMAP.md*
*Review after first 30 days of live traffic and adjust based on real data*
