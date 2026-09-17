# MediRelief USA

A prototype for MediRelief USA: a landing page and an interactive example page
that walks a customer through uploading a medical bill and seeing mocked
savings results. There is no real backend yet; the bill analysis is a
hardcoded sample.

## What's here

- `app/page.tsx` — landing page (hero, study stats, how it works, FAQ).
- `app/example/page.tsx` — example page: upload → analyzing → results flow.
  Deep links for demos: `/example?demo=results` and `/example?demo=analyzing`.
- `components/` — shared UI (`Nav`, `Footer`, `Button`, `Container`) plus
  page-specific components under `landing/` and `example/`.
- `lib/types.ts` — the shared data contract (`BillAnalysis`, `LineItem`,
  `Flag`, `NextStep`).
- `lib/analyzeBill.ts` — the backend swap point (see below).
- `public/sample-bill.pdf` / `.png` — a realistic sample ER bill that matches
  the mocked results, for demos.

## Running locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Deploying (GitHub Pages)

The app builds as a static export. `.github/workflows/deploy-pages.yml`
builds and publishes it on every push to `main`. One-time setup: in the repo,
go to **Settings → Pages** and set **Source** to **GitHub Actions**. The site
is then served at `https://frankies2727.github.io/claudebuild-healthcare/`.

## Backend swap point

The bill analysis is mocked in `lib/analyzeBill.ts`, a single typed function
`analyzeBill(file | 'sample'): Promise<BillAnalysis>` that returns
`lib/sampleAnalysis.ts` after a short staged delay. Replace its body with a
real API call and the UI needs no changes.
