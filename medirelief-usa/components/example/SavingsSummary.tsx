"use client";

import type { BillAnalysis, FlagKind } from "@/lib/types";
import {
  FLAG_META,
  FLAG_ORDER,
  formatServiceDate,
  formatUSD,
} from "@/components/example/flagMeta";

export default function SavingsSummary({
  analysis,
}: {
  analysis: BillAnalysis;
}) {
  const counts = FLAG_ORDER.reduce<Record<FlagKind, number>>(
    (acc, kind) => {
      acc[kind] = analysis.lineItems.filter((li) =>
        li.flags.some((f) => f.kind === kind),
      ).length;
      return acc;
    },
    {
      billing_error: 0,
      above_benchmark: 0,
      financial_assistance: 0,
      insurance: 0,
    },
  );
  if (analysis.additionalAssistanceNote) counts.financial_assistance += 1;

  const flaggedCount = analysis.lineItems.filter(
    (li) => li.flags.length > 0,
  ).length;
  const pctHigh = Math.round(
    (analysis.estimatedSavingsHigh / analysis.billTotal) * 100,
  );
  const pctLow = Math.round(
    (analysis.estimatedSavingsLow / analysis.billTotal) * 100,
  );

  return (
    <section aria-labelledby="savings-heading">
      <style>{`
        @keyframes mr-rise {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes mr-bar {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .mr-rise { animation: mr-rise .7s cubic-bezier(.22,.9,.3,1) both; }
        .mr-bar  { transform-origin: left; animation: mr-bar 1.1s cubic-bezier(.22,.9,.3,1) .35s both; }
        @media (prefers-reduced-motion: reduce) {
          .mr-rise, .mr-bar { animation: none !important; transform: none !important; opacity: 1 !important; }
        }
      `}</style>

      <div className="overflow-hidden rounded-3xl border border-card-border bg-white shadow-[0_1px_3px_rgba(28,25,23,0.04)]">
        <div className="relative bg-gradient-to-b from-emerald-50/70 to-white px-6 py-10 text-center sm:px-10 sm:py-12">
          <p
            className="mr-rise text-xs font-semibold uppercase tracking-[0.14em] text-savings"
            style={{ animationDelay: "0.05s" }}
          >
            Good news
          </p>
          <h1
            id="savings-heading"
            className="mr-rise mt-4 text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
            style={{ animationDelay: "0.18s" }}
          >
            You could save{" "}
            <span className="whitespace-nowrap text-savings">
              {formatUSD(analysis.estimatedSavingsLow)}
            </span>
            <span className="text-muted/50"> – </span>
            <span className="whitespace-nowrap text-savings">
              {formatUSD(analysis.estimatedSavingsHigh)}
            </span>
          </h1>
          <p
            className="mr-rise mt-4 text-[15px] text-muted"
            style={{ animationDelay: "0.3s" }}
          >
            That&apos;s roughly{" "}
            <strong className="font-semibold text-ink">
              {pctLow}–{pctHigh}%
            </strong>{" "}
            of your {formatUSD(analysis.billTotal)} bill.
          </p>

          <div
            className="mr-rise mx-auto mt-8 max-w-md"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-black/[0.06]">
              <div
                className="mr-bar h-full rounded-full bg-savings"
                style={{ width: `${pctHigh}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-[11px] text-muted">
              <span>Potentially removable</span>
              <span>{formatUSD(analysis.billTotal)} billed</span>
            </div>
          </div>

          <p
            className="mr-rise mx-auto mt-7 max-w-lg text-xs leading-relaxed text-muted/80"
            style={{ animationDelay: "0.5s" }}
          >
            Illustrative example. Numbers are placeholders, not real benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-px border-t border-card-border bg-card-border sm:grid-cols-4">
          <Stat label="Bill total" value={formatUSD(analysis.billTotal)} />
          <Stat
            label="Lines flagged"
            value={`${flaggedCount} of ${analysis.lineItems.length}`}
          />
          <Stat label="Provider" value={analysis.provider} small />
          <Stat
            label="Date of service"
            value={formatServiceDate(analysis.serviceDate)}
            small
          />
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-card-border bg-background px-4 py-4 sm:grid-cols-4 sm:px-6">
          {FLAG_ORDER.map((kind) => {
            const meta = FLAG_META[kind];
            const count = counts[kind];
            return (
              <div
                key={kind}
                className={[
                  "rounded-2xl border bg-white px-3 py-3",
                  count > 0 ? "border-card-border" : "border-card-border/60",
                ].join(" ")}
              >
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={[
                      "h-1.5 w-1.5 rounded-full",
                      count > 0 ? meta.dot : "bg-muted/25",
                    ].join(" ")}
                  />
                  <span
                    className={[
                      "text-lg font-semibold leading-none tabular-nums",
                      count > 0 ? "text-ink" : "text-muted/40",
                    ].join(" ")}
                  >
                    {count}
                  </span>
                </div>
                <p
                  className={[
                    "mt-1.5 text-xs font-medium",
                    count > 0 ? "text-ink" : "text-muted/60",
                  ].join(" ")}
                >
                  {meta.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  small = false,
}: {
  label: string;
  value: string;
  small?: boolean;
}) {
  return (
    <div className="bg-white px-4 py-4 sm:px-5">
      <p className="text-[11px] uppercase tracking-wider text-muted/70">
        {label}
      </p>
      <p
        className={[
          "mt-1 font-semibold text-ink",
          small ? "text-[13px] leading-snug" : "text-base tabular-nums",
        ].join(" ")}
      >
        {value}
      </p>
    </div>
  );
}
