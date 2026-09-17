"use client";

import { useState } from "react";
import Button from "@/components/Button";
import type { BillAnalysis, NextStep } from "@/lib/types";
import { formatUSD } from "@/components/example/flagMeta";

export default function NextSteps({ analysis }: { analysis: BillAnalysis }) {
  const fee = Math.round(
    (analysis.estimatedSavingsHigh * analysis.handoff.feePercent) / 100,
  );
  const keeps = analysis.estimatedSavingsHigh - fee;

  return (
    <section aria-labelledby="next-heading" className="mt-12">
      <h2
        id="next-heading"
        className="text-xl font-semibold tracking-tight text-ink"
      >
        What to do next
      </h2>
      <p className="mt-1 text-sm text-muted">
        Two ways forward. Both start with the same facts.
      </p>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.35fr_1fr] lg:items-start">
        <div className="rounded-3xl border border-card-border bg-white p-5 shadow-[0_1px_3px_rgba(28,25,23,0.04)] sm:p-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <svg
                viewBox="0 0 20 20"
                className="h-4 w-4"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M7.4 2.5A1.4 1.4 0 0 0 6 3.9v12.2a1.4 1.4 0 0 0 1.4 1.4h5.2a1.4 1.4 0 0 0 1.4-1.4V3.9a1.4 1.4 0 0 0-1.4-1.4H7.4Zm.9 2.3h3.4a.7.7 0 0 1 0 1.4H8.3a.7.7 0 0 1 0-1.4Zm0 2.8h3.4a.7.7 0 0 1 0 1.4H8.3a.7.7 0 0 1 0-1.4Zm0 2.8h2a.7.7 0 0 1 0 1.4h-2a.7.7 0 0 1 0-1.4Z" />
              </svg>
            </span>
            <div>
              <h3 className="text-[17px] font-semibold text-ink">
                Do it yourself
              </h3>
              <p className="text-xs text-muted">
                Free. Most of this is one phone call and one letter.
              </p>
            </div>
          </div>

          <ol className="mt-5 flex flex-col gap-3">
            {analysis.diySteps.map((step, i) => (
              <StepCard key={step.id} step={step} index={i + 1} />
            ))}
          </ol>
        </div>

        <HandoffCard
          feePercent={analysis.handoff.feePercent}
          blurb={analysis.handoff.blurb}
          fee={fee}
          keeps={keeps}
          savingsHigh={analysis.estimatedSavingsHigh}
        />
      </div>
    </section>
  );
}

function StepCard({ step, index }: { step: NextStep; index: number }) {
  const [showTemplate, setShowTemplate] = useState(false);
  const [checked, setChecked] = useState(false);
  const [copied, setCopied] = useState(false);
  const panelId = `template-${step.id}`;

  const copy = async () => {
    if (!step.template) return;
    try {
      await navigator.clipboard.writeText(step.template);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <li
      className={[
        "rounded-2xl border p-4 transition-colors",
        checked
          ? "border-emerald-200/70 bg-emerald-50/40"
          : "border-card-border bg-background",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <input
          id={`check-${step.id}`}
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-card-border accent-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        />
        <div className="min-w-0 flex-1">
          <label
            htmlFor={`check-${step.id}`}
            className={[
              "cursor-pointer text-[15px] font-medium leading-snug",
              checked ? "text-muted line-through decoration-muted/40" : "text-ink",
            ].join(" ")}
          >
            <span className="mr-1.5 text-xs font-semibold tabular-nums text-primary">
              {index}.
            </span>
            {step.title}
          </label>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            {step.detail}
          </p>

          {step.template && (
            <>
              <button
                type="button"
                onClick={() => setShowTemplate((v) => !v)}
                aria-expanded={showTemplate}
                aria-controls={panelId}
                className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-card-border bg-white px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:border-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <svg
                  viewBox="0 0 16 16"
                  className={`h-3 w-3 transition-transform duration-300 motion-reduce:transition-none ${showTemplate ? "rotate-180" : ""}`}
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 6.5 8 10.5 12 6.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {showTemplate ? "Hide template" : "Show template"}
              </button>

              {showTemplate && (
                <div id={panelId} className="mt-3">
                  <pre className="max-h-72 overflow-auto whitespace-pre-wrap rounded-xl border border-card-border bg-white p-3.5 font-sans text-[13px] leading-relaxed text-muted">
                    {step.template}
                  </pre>
                  <button
                    type="button"
                    onClick={copy}
                    className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {copied ? (
                      <svg
                        viewBox="0 0 16 16"
                        className="h-3.5 w-3.5"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M3.5 8.5 6.5 11.5 12.5 4.5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 16 16"
                        className="h-3.5 w-3.5"
                        fill="none"
                        aria-hidden="true"
                      >
                        <rect
                          x="5.5"
                          y="5.5"
                          width="8"
                          height="8"
                          rx="1.6"
                          stroke="currentColor"
                          strokeWidth="1.4"
                        />
                        <path
                          d="M10.5 3.2A1.7 1.7 0 0 0 8.8 2.5H4.2A1.7 1.7 0 0 0 2.5 4.2v4.6c0 .7.4 1.3 1 1.6"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                    <span aria-live="polite">
                      {copied ? "Copied" : "Copy text"}
                    </span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </li>
  );
}

function HandoffCard({
  feePercent,
  blurb,
  fee,
  keeps,
  savingsHigh,
}: {
  feePercent: number;
  blurb: string;
  fee: number;
  keeps: number;
  savingsHigh: number;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError("Please add your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return setError("Please add a valid email address.");
    setError(null);
    setSent(true);
  };

  return (
    <div className="rounded-3xl border border-primary/25 bg-white p-5 shadow-[0_1px_3px_rgba(28,25,23,0.04)] sm:p-6 lg:sticky lg:top-6">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-white">
          <svg
            viewBox="0 0 20 20"
            className="h-4 w-4"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M10 2.2 3.5 4.9v4.6c0 3.9 2.6 7.5 6.5 9.3 3.9-1.8 6.5-5.4 6.5-9.3V4.9L10 2.2Zm3.4 6.5-4 4.4a.95.95 0 0 1-1.4.05L6 11.2a.95.95 0 1 1 1.35-1.35l1.3 1.3 3.35-3.7a.95.95 0 1 1 1.4 1.25Z" />
          </svg>
        </span>
        <div>
          <h3 className="text-[17px] font-semibold text-ink">
            Let MediRelief handle it
          </h3>
          <p className="text-xs text-muted">Contingency — no savings, no fee.</p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted">{blurb}</p>

      <div className="mt-5 rounded-2xl border border-card-border bg-background p-4">
        <p className="text-[11px] uppercase tracking-wider text-muted/70">
          If we save the full {formatUSD(savingsHigh)}
        </p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-semibold tabular-nums text-savings">
            {formatUSD(keeps)}
          </span>
          <span className="text-xs text-muted">you keep</span>
        </div>
        <p className="mt-1.5 text-xs text-muted">
          Our fee is {feePercent}% of what we actually save you — about{" "}
          {formatUSD(fee)} here. If nothing comes off your bill, you pay{" "}
          <strong className="font-semibold text-ink">$0</strong>.
        </p>
      </div>

      {sent ? (
        <div className="mt-5 rounded-2xl border border-emerald-200/70 bg-emerald-50/60 p-4 text-center">
          <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-savings">
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
              <path
                d="M3.5 8.5 6.5 11.5 12.5 4.5"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <p className="mt-3 text-[15px] font-semibold text-ink">
            Thanks, {name.trim().split(" ")[0]}.
          </p>
          <p className="mt-1.5 text-sm text-muted">
            In the real product we&apos;d email you within one business day.
            This is a prototype — nothing was submitted or stored.
          </p>
          <button
            type="button"
            onClick={() => {
              setSent(false);
              setName("");
              setEmail("");
            }}
            className="mt-3 rounded-full text-xs font-medium text-primary underline decoration-primary/30 underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Reset form
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-5 flex flex-col gap-3" noValidate>
          <div>
            <label
              htmlFor="handoff-name"
              className="block text-xs font-medium text-muted"
            >
              Your name
            </label>
            <input
              id="handoff-name"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jordan Ellis"
              className="mt-1.5 w-full rounded-xl border border-card-border bg-white px-3 py-2.5 text-sm text-ink placeholder:text-muted/40 focus:border-primary/50 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            />
          </div>
          <div>
            <label
              htmlFor="handoff-email"
              className="block text-xs font-medium text-muted"
            >
              Email
            </label>
            <input
              id="handoff-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1.5 w-full rounded-xl border border-card-border bg-white px-3 py-2.5 text-sm text-ink placeholder:text-muted/40 focus:border-primary/50 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            />
          </div>
          {error && (
            <p role="alert" className="text-xs text-error">
              {error}
            </p>
          )}
          <Button type="submit" size="lg" className="w-full">
            Have MediRelief take it over
          </Button>
          <p className="text-center text-[11px] leading-relaxed text-muted/80">
            Prototype form — nothing is sent or stored.
          </p>
        </form>
      )}
    </div>
  );
}
