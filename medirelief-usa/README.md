# MediRelief USA

A prototype for MediRelief USA: a landing page and an interactive example page
that walks a customer through uploading a medical bill and seeing mocked
savings results. There is no real backend — the bill analysis is currently a
hardcoded mock.

## What's here

- `app/page.tsx` — landing page (hero, study stats, how it works, FAQ).
- `app/example/page.tsx` — example page: upload → analyzing → results flow.
- `components/` — shared UI (`Nav`, `Footer`, `Button`, `Container`) plus
  page-specific components.
- `lib/types.ts` — the shared data contract (`BillAnalysis`, `LineItem`,
  `Flag`, `NextStep`).

## Running locally

```bash
cd medirelief-usa
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Backend swap point

The bill analysis is mocked. Once real bill parsing/pricing exists, implement
it behind `lib/analyzeBill.ts` (to be added) — a single typed function like
`analyzeBill(file | 'sample'): Promise<BillAnalysis>` — so the UI never needs
to change, only the implementation behind that function.
