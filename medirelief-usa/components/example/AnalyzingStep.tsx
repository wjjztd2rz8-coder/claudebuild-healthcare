"use client";

import { ANALYSIS_STAGES } from "@/lib/analyzeBill";

export default function AnalyzingStep({
  message,
  fileName,
}: {
  message: string;
  fileName: string;
}) {
  const index = Math.max(
    0,
    ANALYSIS_STAGES.findIndex((s) => s === message),
  );
  const percent = Math.round(((index + 1) / (ANALYSIS_STAGES.length + 0.35)) * 100);

  return (
    <div className="mx-auto max-w-xl">
      <style>{`
        @keyframes mr-pulse-ring {
          0%   { transform: scale(0.85); opacity: 0.55; }
          70%  { transform: scale(1.6);  opacity: 0; }
          100% { transform: scale(1.6);  opacity: 0; }
        }
        @keyframes mr-fade-in {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: none; }
        }
        .mr-ring { animation: mr-pulse-ring 2.2s ease-out infinite; }
        .mr-stage { animation: mr-fade-in .45s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .mr-ring, .mr-stage { animation: none !important; }
        }
      `}</style>

      <div className="rounded-3xl border border-card-border bg-white px-6 py-12 text-center shadow-[0_1px_3px_rgba(28,25,23,0.04)] sm:px-10">
        <div className="relative mx-auto flex h-16 w-16 items-center justify-center">
          <span
            aria-hidden="true"
            className="mr-ring absolute inset-0 rounded-full bg-primary/20"
          />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <svg
              viewBox="0 0 24 24"
              className="h-7 w-7"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="11"
                cy="11"
                r="6.5"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M16 16l4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>

        <h1 className="mt-7 text-2xl font-semibold tracking-tight text-ink">
          Analyzing your bill
        </h1>
        <p className="mt-2 truncate text-xs text-muted">{fileName}</p>

        <div
          className="mx-auto mt-8 h-1.5 w-full max-w-sm overflow-hidden rounded-full bg-black/[0.06]"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          aria-label="Analysis progress"
        >
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-700 ease-out motion-reduce:transition-none"
            style={{ width: `${percent}%` }}
          />
        </div>

        <p
          key={message}
          aria-live="polite"
          className="mr-stage mt-5 text-[15px] font-medium text-ink"
        >
          {message}
          <span aria-hidden="true" className="text-muted">
            …
          </span>
        </p>

        <ul className="mx-auto mt-8 flex max-w-sm flex-col gap-2.5 text-left">
          {ANALYSIS_STAGES.map((stage, i) => {
            const done = i < index;
            const active = i === index;
            return (
              <li
                key={stage}
                className={[
                  "flex items-center gap-2.5 text-sm transition-colors duration-500",
                  done
                    ? "text-muted"
                    : active
                      ? "text-ink"
                      : "text-muted/45",
                ].join(" ")}
              >
                <span
                  aria-hidden="true"
                  className={[
                    "flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-colors duration-500",
                    done
                      ? "bg-primary text-white"
                      : active
                        ? "bg-primary/15 ring-1 ring-primary/40"
                        : "bg-black/[0.05]",
                  ].join(" ")}
                >
                  {done && (
                    <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none">
                      <path
                        d="M2.5 6.4 4.8 8.7 9.5 3.6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                {stage}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
