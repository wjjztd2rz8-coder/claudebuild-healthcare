"use client";

import Button from "@/components/Button";
import type { BillAnalysis } from "@/lib/types";
import SavingsSummary from "@/components/example/SavingsSummary";
import LineItemTable from "@/components/example/LineItemTable";
import NextSteps from "@/components/example/NextSteps";

export default function ResultsStep({
  analysis,
  fileName,
  onStartOver,
}: {
  analysis: BillAnalysis;
  fileName: string;
  onStartOver: () => void;
}) {
  return (
    <div className="mx-auto max-w-4xl">
      <p className="mb-4 text-center text-xs text-muted">
        Analyzed <span className="font-medium text-ink">{fileName}</span>
      </p>

      <SavingsSummary analysis={analysis} />
      <LineItemTable analysis={analysis} />
      <NextSteps analysis={analysis} />

      <div className="mt-12 flex flex-col items-center gap-3 border-t border-card-border pt-8">
        <Button variant="secondary" size="lg" onClick={onStartOver}>
          Start over
        </Button>
        <p className="max-w-md text-center text-xs leading-relaxed text-muted/80">
          MediRelief USA is a prototype. This analysis is illustrative and is
          not legal, medical, or financial advice.
        </p>
      </div>
    </div>
  );
}
