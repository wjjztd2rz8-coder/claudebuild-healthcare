import Button from "@/components/Button";
import Container from "@/components/Container";

const flaggedRows = [
  { label: "ER facility fee", amount: "$1,240", badge: "Overcharge" },
  { label: "IV administration", amount: "$310", badge: "Duplicate" },
  { label: "Attending physician", amount: "$705", badge: "Out-of-network" },
] as const;

const badgeStyles: Record<string, string> = {
  Overcharge: "bg-amber-50 text-flag ring-1 ring-inset ring-amber-200",
  Duplicate: "bg-rose-50 text-error ring-1 ring-inset ring-rose-200",
  "Out-of-network": "bg-teal-50 text-primary ring-1 ring-inset ring-teal-200",
};

function ResultsCardPreview() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div
        aria-hidden="true"
        className="absolute -top-8 -right-6 h-40 w-40 rounded-full bg-primary/10 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-10 -left-8 h-48 w-48 rounded-full bg-savings/10 blur-2xl"
      />
      <div className="relative rounded-2xl border border-card-border bg-white p-6 shadow-2xl shadow-stone-900/10 lg:rotate-[-1deg] lg:hover:rotate-0 lg:transition-transform lg:duration-300">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wide text-muted">
            Your bill review
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2.5 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-teal-200">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor" aria-hidden="true">
              <circle cx="4" cy="4" r="4" />
            </svg>
            Complete
          </span>
        </div>

        <div className="mt-4">
          <p className="text-sm text-muted">Estimated savings</p>
          <p className="mt-1 text-3xl font-semibold tracking-tight text-savings">
            $1,900 &ndash; $2,255
          </p>
        </div>

        <div className="mt-5 space-y-2 border-t border-card-border pt-5">
          {flaggedRows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-3 rounded-xl border border-card-border bg-background/60 px-3 py-2.5"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">{row.label}</p>
                <p className="text-xs text-muted">{row.amount} billed</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2 py-1 text-[11px] font-medium ${badgeStyles[row.badge]}`}
              >
                {row.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden py-16 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.04,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/2 h-[36rem] w-[36rem] -translate-y-1/2 translate-x-1/4 rounded-full bg-primary/10 blur-3xl"
      />

      <Container className="relative grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
        <div>
          <span className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary ring-1 ring-inset ring-teal-200">
            Free bill check
          </span>
          <h1 className="mt-5 text-5xl font-semibold leading-[1.05] tracking-tight text-ink lg:text-6xl">
            Your medical bill is probably wrong. We help you fix it.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            Upload your bill. We find billing errors, overcharges, and
            assistance you qualify for. You pay only a share of what you
            save, and nothing if we save you nothing.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="/example" size="lg">
              Try the example
            </Button>
            <Button href="#how-it-works" variant="secondary" size="lg">
              How it works
            </Button>
          </div>

          <p className="mt-5 text-sm text-muted">
            No account needed for the demo.
          </p>
        </div>

        <ResultsCardPreview />
      </Container>
    </section>
  );
}
