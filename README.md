# MediRelief IL

**Snap a photo of your hospital bill → find out which Illinois financial
assistance program you qualify for → get a pre-filled application → submit it.
All in seconds.**

Illinois has real laws that can waive or heavily discount hospital bills for
qualifying patients — but the process is buried in hospital fine print.
MediRelief IL reads a bill, maps household size and income against the actual
statutory sliding scale in the **Hospital Uninsured Patient Discount Act
(210 ILCS 89)**, and hands the patient a pre-filled, submission-ready packet
in their language.

> **Demo / MVP.** This is a hackathon prototype. It produces estimates from
> public Illinois law and prepares paperwork; it does not submit anything for
> you or provide legal advice. Final eligibility is decided by the hospital.

---

## Live demo

The app is a static single-page site and runs entirely in the browser — no
server, no data leaves the device. It is published with **GitHub Pages**
(see [Deploying](#deploying-to-github-pages) below).

Once Pages is enabled:
`https://frankies2727.github.io/claudebuild-healthcare/`

---

## What it does (the 4-screen loop)

1. **Scan bill** — take a photo, upload a file, or click **Try it with a
   sample bill**. A one-click sample (`Lakeshore Community Hospital`,
   `$12,740` balance) makes it demo-ready with no setup.
2. **Review** — the extracted hospital, balance, dates, and patient info are
   shown in editable fields, plus two quick inputs: household size and yearly
   income.
3. **Your relief** — the discount tier is revealed as a big percentage, with
   the **full statutory math shown transparently** (poverty level → % of FPL →
   tier → discount → what you'd pay), the 20%-of-income annual collection cap,
   and callouts for **presumptive eligibility** and **Medicaid screening**.
4. **Apply** — a pre-filled application summary you can **print / save as PDF**,
   an auto-estimated **deadline** from the statement date, and a plain-language
   **checklist** of exactly what to gather and where to send it.

A language toggle (English · Español · Polski · Tagalog) is visible at all
times and translates the whole flow, including the checklist.

## Why the numbers are trustworthy

The eligibility logic is **not an LLM** — it is a small, auditable,
deterministic function ([`assets/js/eligibility.js`](assets/js/eligibility.js))
that encodes:

- The **2024 HHS Federal Poverty Guidelines** (contiguous states).
- The Act's **sliding-scale discount tiers** for uninsured patients under
  600% FPL: 100% ≤200%, 90% to 300%, 80% to 400%, 75% to 500%, 70% to 600%.
- The statutory **20% of annual gross income** cap on what a hospital may
  collect in any 12-month period.
- A **Medicaid screening** recommendation (adults up to 138% FPL), because
  hospitals must screen for public coverage first.

Every figure is traceable to a public source, so the result is
"this actually works," not guesswork.

---

## Running locally

No build step, no dependencies. Just serve the folder over HTTP:

```bash
# Python
python3 -m http.server 8000
# then open http://localhost:8000

# …or Node
npx serve .
```

Opening `index.html` directly via `file://` mostly works too, but a local
server is closer to how GitHub Pages serves it.

## Project structure

```
index.html                 # App shell + all 4 screens
assets/
  css/styles.css           # Dark, mobile-first, accessible theme
  js/
    eligibility.js         # Deterministic 210 ILCS 89 engine (the core logic)
    i18n.js                # Bundled translations (EN / ES / PL / TL)
    app.js                 # Flow controller, state, rendering
  img/
    sample-bill.svg        # Demo bill used by "Try it with a sample bill"
    favicon.svg
.github/workflows/
  deploy-pages.yml         # GitHub Pages deployment
docs/PLAN.md               # Original hackathon MVP plan
```

---

## Deploying to GitHub Pages

This repo ships a workflow ([`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml))
that publishes the site with GitHub Actions. To turn the demo on:

1. In the repo, go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Push to (or merge into) `main` — the workflow builds and deploys
   automatically. You can also run it manually from the **Actions** tab
   (**Deploy to GitHub Pages → Run workflow**).

The workflow also triggers on the `claude/wonderful-heisenberg-1eojao`
development branch, so you can preview the demo before merging (set that branch
as the Pages source or the default branch if you want to deploy from it
directly).

There's no build to run — the workflow uploads the repository root as-is.

---

## Accessibility & design

- True near-black background (`#0d0f12`), single health-teal accent
  (`#2dd4bf`) for CTAs and progress.
- Large touch targets, high contrast, visible focus rings, a skip link, ARIA
  labels, and `prefers-reduced-motion` support.
- Plain-language copy at roughly a 6th-grade reading level.
- The big discount percentage is the emotional payoff, with a subtle reveal.

## Roadmap (cut from the MVP, on purpose)

- Claude vision OCR to auto-extract fields from any bill format (the review
  screen is already built to be populated by it).
- Direct hospital submission APIs and per-hospital form mapping.
- Full multi-language OCR, SMS deadline reminders, and appeal-letter drafting.

## License

MIT — see [`LICENSE`](LICENSE).
