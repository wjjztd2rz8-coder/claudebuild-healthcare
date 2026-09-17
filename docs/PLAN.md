# MediRelief IL — Hackathon MVP Plan

**Snap a photo of your hospital bill → find out which Illinois financial assistance program you qualify for → get a pre-filled application → submit it. All in seconds.**

## The Problem

Illinois has real programs that can waive or heavily discount hospital bills for qualifying patients, but the process is buried in hospital fine print — hard to find, hard to understand, and even harder to navigate for people facing language or accessibility barriers.

## The Idea

Scan your medical bill. The app identifies the relevant Illinois assistance program, pre-fills the paperwork, and directs you to the correct hospital submission process — automatically.

## The Pitch (30-second version)

"MediRelief IL" — snap a photo of your hospital bill, and in seconds we tell you which Illinois financial assistance program you likely qualify for, pre-fill the actual application, and hand you a submission-ready packet — in your language.

---

## Grounding Facts (real Illinois law — use these in the demo)

- **Hospital Uninsured Patient Discount Act** (210 ILCS 89): uninsured patients under **600% FPL** get a sliding-scale discount:
  - 100% discount at or below 2x poverty line
  - 90% for 2.01–3x
  - 80% for 3.01–4x
  - 75% for 4.01–5x
  - 70% at 6x
- Hospitals must screen patients for Medicaid/other public coverage first.
- Hospitals can collect no more than **20% of family annual gross income** in any 12-month period from an eligible patient.
- Application deadlines vary by hospital (commonly cited windows range from ~60 to 240 days from the first bill) — the app should auto-detect the deadline from the bill's statement date and hospital.
- **Presumptive eligibility**: some patients qualify automatically based on criteria hospitals must publish, without filing a full application — a strong "aha" feature to highlight in the demo.

This means the core logic isn't guesswork — it's mapping a real statutory sliding scale to household size/income. That's a legitimately strong "this actually works" hook for judges.

---

## MVP Scope (cut hard — build only this today)

### Core loop, 4 screens
1. **Upload/scan bill** (camera or file)
2. **Extracted summary** — hospital name, balance, dates, patient info (editable)
3. **Eligibility result** — e.g. "You likely qualify for a 90% discount under IL's Hospital Uninsured Patient Discount Act," with the FPL math shown transparently
4. **Pre-filled application + next steps** — downloadable/fillable PDF + a plain-language checklist of exactly what to mail/upload and to whom

### Cut for later (mention proudly as roadmap)
- OCR accuracy across all hospital bill formats
- Live hospital API submission
- Full multi-language OCR
- SMS reminders
- Appeal-letter generation

---

## Suggested Architecture (fast to build)

- **Frontend:** single-page React/HTML app, dark mode, mobile-first (most users will use a phone camera)
- **Bill parsing:** send bill image to Claude via API with vision — extract hospital name, balance, patient/household info fields present, statement date
- **Eligibility engine:** simple deterministic JS function encoding the FPL sliding scale and the Act's discount tiers (not an LLM — auditable and correct). Ask user for household size + estimated income via 2 quick inputs/sliders.
- **Program matching:** hardcode 2–3 target hospitals/systems for MVP, with links to their actual financial assistance application PDFs; use Claude to pre-fill form fields (or produce a clean summary page mimicking the form) from extracted + user-entered data
- **Language accessibility:** Claude API translation of instructions/checklist into Spanish, Polish, Tagalog, etc. — cheap to add, high demo impact
- **Accessibility:** large touch targets, high-contrast dark theme, screen-reader labels, plain-language copy (~6th grade reading level)

---

## Dark Mode Design Notes

- True near-black background (`#0d0f12`), not pure black — easier on eyes, still feels intentional
- One accent color doing double duty: trust/health teal (`#2dd4bf`) for CTAs and progress states
- Big number/percentage callout ("90% OFF") as the emotional payoff moment — subtle reveal animation
- Legible typography at large sizes — assume older or vision-impaired users
- Bilingual toggle visible at all times, not buried in settings

---

## Demo Script (2–3 min)

1. Open with the human problem: a real bill, buried fine print, someone who doesn't know this law exists
2. Snap photo live on stage → extraction happens in seconds
3. Enter household size/income → reveal the discount % with the actual statutory math shown ("this isn't a guess — it's Illinois law")
4. Show pre-filled application ready to submit
5. Toggle language to Spanish to show the accessibility payoff
6. Close on impact: how many uninsured IL patients this could reach, plus roadmap (direct hospital submission API, appeals help)

---

## Timeline (8–10 hour hackathon)

| Time | Task |
|---|---|
| Hr 0–1 | Lock scope, split roles, grab a real sample bill image/PDF to test with |
| Hr 1–3 | Build extraction pipeline (Claude vision call) + hardcode FPL/discount logic |
| Hr 3–5 | Build the 4-screen UI in dark mode, wire up state |
| Hr 5–6 | Pre-fill PDF/summary output + translation toggle |
| Hr 6–7 | Polish transitions, error states (blurry photo, missing fields), test on phone |
| Hr 7–8 | Rehearse demo, prep slide with the "why this matters" stat and roadmap |
