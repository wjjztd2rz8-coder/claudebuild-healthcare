"use client";

import { useState } from "react";
import type { BillAnalysis, LineItem } from "@/lib/types";
import {
  CONFIDENCE_LABEL,
  FLAG_META,
  formatUSD,
} from "@/components/example/flagMeta";

export default function LineItemTable({
  analysis,
}: {
  analysis: BillAnalysis;
}) {
  const flaggedIds = analysis.lineItems
    .filter((li) => li.flags.length > 0)
    .map((li) => li.id);
  const [open, setOpen] = useState<string[]>(flaggedIds.slice(0, 1));

  const allOpen = flaggedIds.every((id) => open.includes(id));
  const toggle = (id: string) =>
    setOpen((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  return (
    <section aria-labelledby="lines-heading" className="mt-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2
            id="lines-heading"
            className="text-xl font-semibold tracking-tight text-ink"
          >
            Line by line
          </h2>
          <p className="mt-1 text-sm text-muted">
            Tap a flagged line to see what&apos;s wrong with it.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(allOpen ? [] : flaggedIds)}
          className="rounded-full border border-card-border bg-white px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {allOpen ? "Collapse all" : "Expand all flagged"}
        </button>
      </div>

      <div className="mt-4 overflow-hidden rounded-3xl border border-card-border bg-white shadow-[0_1px_3px_rgba(28,25,23,0.04)]">
        <div className="hidden items-center gap-4 border-b border-card-border bg-background px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted/70 sm:flex">
          <span className="w-16 shrink-0">Code</span>
          <span className="flex-1">Description</span>
          <span className="w-24 shrink-0 text-right">Billed</span>
          <span className="w-9 shrink-0" aria-hidden="true" />
        </div>

        <ul className="divide-y divide-card-border">
          {analysis.lineItems.map((item) => (
            <Row
              key={item.id}
              item={item}
              expanded={open.includes(item.id)}
              onToggle={() => toggle(item.id)}
            />
          ))}
        </ul>

        <div className="flex items-center justify-between gap-4 border-t border-card-border bg-background px-5 py-3.5">
          <span className="text-sm font-semibold text-ink">Total billed</span>
          <span className="text-base font-semibold tabular-nums text-ink">
            {formatUSD(analysis.billTotal, true)}
          </span>
        </div>
      </div>

      {analysis.additionalAssistanceNote && (
        <div className="mt-4 rounded-3xl border border-emerald-200/70 bg-emerald-50/60 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-savings">
              <svg
                viewBox="0 0 20 20"
                className="h-4 w-4"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M10 2.5c-.5 0-.9.4-.9.9v.8A4.3 4.3 0 0 0 5.6 8.4c0 3 4.4 3.1 4.4 4.7 0 .7-.6 1.2-1.5 1.2-.8 0-1.4-.4-1.7-1a.9.9 0 0 0-1.6.8 3.6 3.6 0 0 0 2.9 1.9v.8a.9.9 0 0 0 1.8 0v-.8c1.7-.3 2.9-1.4 2.9-3 0-3-4.4-3.1-4.4-4.6 0-.7.6-1.2 1.5-1.2.8 0 1.3.4 1.6.9a.9.9 0 1 0 1.6-.8 3.5 3.5 0 0 0-2.2-1.7v-.8c0-.5-.4-.9-.9-.9Z" />
              </svg>
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-[15px] font-semibold text-ink">
                  You may also qualify for financial assistance
                </h3>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${FLAG_META.financial_assistance.badge}`}
                >
                  {FLAG_META.financial_assistance.label}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {analysis.additionalAssistanceNote}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Row({
  item,
  expanded,
  onToggle,
}: {
  item: LineItem;
  expanded: boolean;
  onToggle: () => void;
}) {
  const flagged = item.flags.length > 0;
  const savings = item.flags.reduce((s, f) => s + f.estimatedSavings, 0);
  const panelId = `line-panel-${item.id}`;

  const body = (
    <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      <span className="order-2 text-xs font-medium tabular-nums text-muted sm:order-none sm:w-16 sm:shrink-0">
        {item.code ?? "—"}
      </span>
      <span className="order-1 flex-1 sm:order-none">
        <span className="block text-[15px] font-medium leading-snug text-ink">
          {item.description}
        </span>
        <span className="mt-1.5 flex flex-wrap items-center gap-1.5">
          {flagged ? (
            item.flags.map((flag) => (
              <span
                key={flag.kind + flag.title}
                className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${FLAG_META[flag.kind].badge}`}
              >
                {FLAG_META[flag.kind].label}
              </span>
            ))
          ) : (
            <span className="inline-flex items-center gap-1 text-xs text-muted/70">
              <svg
                viewBox="0 0 12 12"
                className="h-3 w-3 text-savings/70"
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
              Looks fine
            </span>
          )}
        </span>
      </span>
      <span className="order-3 flex items-center justify-between gap-3 sm:order-none sm:w-24 sm:shrink-0 sm:justify-end">
        <span className="text-[15px] font-semibold tabular-nums text-ink">
          {formatUSD(item.billed, true)}
        </span>
      </span>
    </div>
  );

  if (!flagged) {
    return (
      <li className="px-5 py-4">
        <div className="flex items-start gap-4">
          {body}
          <span className="hidden w-9 shrink-0 sm:block" aria-hidden="true" />
        </div>
      </li>
    );
  }

  return (
    <li className={expanded ? "bg-background/60" : undefined}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={panelId}
        className="flex w-full items-start gap-4 px-5 py-4 text-left transition-colors hover:bg-background focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
      >
        {body}
        <span
          aria-hidden="true"
          className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-card-border bg-white text-muted sm:mt-0 sm:h-8 sm:w-8"
        >
          <svg
            viewBox="0 0 16 16"
            className={`h-3.5 w-3.5 transition-transform duration-300 motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`}
            fill="none"
          >
            <path
              d="M4 6.5 8 10.5 12 6.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {expanded && (
        <div id={panelId} className="px-5 pb-5 sm:pl-[5.25rem]">
          {item.flags.map((flag) => {
            const meta = FLAG_META[flag.kind];
            return (
              <div
                key={flag.kind + flag.title}
                className={`rounded-2xl border p-4 ${meta.surface}`}
              >
                <p className="text-sm font-semibold text-ink">{flag.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {flag.explanation}
                </p>
                <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <Fact label="Billed" value={formatUSD(item.billed)} />
                  <Fact
                    label="Fair price"
                    value={
                      item.fairPrice != null
                        ? `~${formatUSD(item.fairPrice)}`
                        : "Should be $0"
                    }
                  />
                  <Fact
                    label="Est. savings"
                    value={formatUSD(flag.estimatedSavings)}
                    accent
                  />
                  <Fact
                    label="Confidence"
                    value={CONFIDENCE_LABEL[flag.confidence]}
                  />
                </dl>
              </div>
            );
          })}
          {item.flags.length > 1 && (
            <p className="mt-3 text-xs text-muted">
              Combined estimated savings on this line: {formatUSD(savings)}
            </p>
          )}
        </div>
      )}
    </li>
  );
}

function Fact({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-xl bg-white/70 px-3 py-2">
      <dt className="text-[10.5px] uppercase tracking-wider text-muted/70">
        {label}
      </dt>
      <dd
        className={[
          "mt-0.5 text-sm font-semibold",
          accent ? "text-savings" : "text-ink",
        ].join(" ")}
      >
        {value}
      </dd>
    </div>
  );
}
