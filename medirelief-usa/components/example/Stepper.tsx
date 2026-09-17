"use client";

export type StepId = "upload" | "analyzing" | "results";

const STEPS: { id: StepId; label: string }[] = [
  { id: "upload", label: "Upload" },
  { id: "analyzing", label: "Analyze" },
  { id: "results", label: "Results" },
];

export default function Stepper({ current }: { current: StepId }) {
  const activeIndex = STEPS.findIndex((s) => s.id === current);

  return (
    <nav aria-label="Progress" className="flex justify-center">
      <ol className="flex items-center gap-2 rounded-full border border-card-border bg-white/80 px-3 py-2 shadow-[0_1px_2px_rgba(28,25,23,0.04)] backdrop-blur sm:gap-3 sm:px-4">
        {STEPS.map((step, i) => {
          const done = i < activeIndex;
          const active = i === activeIndex;
          return (
            <li key={step.id} className="flex items-center gap-2 sm:gap-3">
              <span
                className="flex items-center gap-2"
                aria-current={active ? "step" : undefined}
              >
                <span
                  className={[
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold transition-colors",
                    done
                      ? "bg-primary text-white"
                      : active
                        ? "bg-primary/10 text-primary ring-1 ring-primary/30"
                        : "bg-black/[0.04] text-muted/70",
                  ].join(" ")}
                >
                  {done ? (
                    <svg
                      viewBox="0 0 12 12"
                      className="h-3 w-3"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2.5 6.4 4.8 8.7 9.5 3.6"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </span>
                <span
                  className={[
                    "text-xs font-medium tracking-wide sm:text-sm",
                    active
                      ? "text-ink"
                      : done
                        ? "text-primary"
                        : "text-muted/70",
                  ].join(" ")}
                >
                  {step.label}
                </span>
              </span>
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className={[
                    "h-px w-4 sm:w-8",
                    i < activeIndex ? "bg-primary/40" : "bg-card-border",
                  ].join(" ")}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
