"use client";

import { Suspense, useCallback, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Container from "@/components/Container";
import Stepper, { type StepId } from "@/components/example/Stepper";
import UploadStep, {
  type UploadSelection,
} from "@/components/example/UploadStep";
import AnalyzingStep from "@/components/example/AnalyzingStep";
import ResultsStep from "@/components/example/ResultsStep";
import { analyzeBill, ANALYSIS_STAGES } from "@/lib/analyzeBill";
import { sampleAnalysis } from "@/lib/sampleAnalysis";
import type { BillAnalysis } from "@/lib/types";

/**
 * Deep links for demos and screenshots:
 *   /example?demo=results    -> results view with the sample analysis, no delay
 *   /example?demo=analyzing  -> analyzing view frozen on stage 2
 *   (no param)               -> normal upload flow
 */
export default function ExamplePage() {
  return (
    <Suspense fallback={<ExampleFlow demo={null} />}>
      <DeepLinkedFlow />
    </Suspense>
  );
}

function DeepLinkedFlow() {
  const demo = useSearchParams().get("demo");
  return (
    <ExampleFlow
      demo={demo === "results" || demo === "analyzing" ? demo : null}
    />
  );
}

function ExampleFlow({ demo }: { demo: "results" | "analyzing" | null }) {
  const [step, setStep] = useState<StepId>(demo ?? "upload");
  const [message, setMessage] = useState<string>(
    demo === "analyzing" ? ANALYSIS_STAGES[1] : ANALYSIS_STAGES[0],
  );
  const [analysis, setAnalysis] = useState<BillAnalysis | null>(
    demo === "results" ? sampleAnalysis : null,
  );
  const [fileName, setFileName] = useState(
    demo ? "the sample ER bill" : "your bill",
  );
  const runId = useRef(0);

  const start = useCallback(async (selection: UploadSelection) => {
    const id = ++runId.current;
    setFileName(
      selection.source === "sample" ? "the sample ER bill" : selection.name,
    );
    setMessage(ANALYSIS_STAGES[0]);
    setStep("analyzing");

    const result = await analyzeBill(selection.source, (msg) => {
      if (runId.current === id) setMessage(msg);
    });

    if (runId.current !== id) return;
    setAnalysis(result);
    setStep("results");
  }, []);

  const startOver = useCallback(() => {
    runId.current += 1;
    setAnalysis(null);
    setStep("upload");
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  }, []);

  return (
    <main className="py-10 sm:py-14">
      <Container>
        <Stepper current={step} />

        <div className="mt-10 sm:mt-12">
          {step === "upload" && <UploadStep onAnalyze={start} />}
          {step === "analyzing" && (
            <AnalyzingStep message={message} fileName={fileName} />
          )}
          {step === "results" && analysis && (
            <ResultsStep
              analysis={analysis}
              fileName={fileName}
              onStartOver={startOver}
            />
          )}
        </div>
      </Container>
    </main>
  );
}
