"use client";

import { useCallback, useRef, useState } from "react";
import Container from "@/components/Container";
import Stepper, { type StepId } from "@/components/example/Stepper";
import UploadStep, {
  type UploadSelection,
} from "@/components/example/UploadStep";
import AnalyzingStep from "@/components/example/AnalyzingStep";
import ResultsStep from "@/components/example/ResultsStep";
import { analyzeBill, ANALYSIS_STAGES } from "@/lib/analyzeBill";
import type { BillAnalysis } from "@/lib/types";

export default function ExamplePage() {
  const [step, setStep] = useState<StepId>("upload");
  const [message, setMessage] = useState<string>(ANALYSIS_STAGES[0]);
  const [analysis, setAnalysis] = useState<BillAnalysis | null>(null);
  const [fileName, setFileName] = useState("your bill");
  const runId = useRef(0);

  const start = useCallback(async (selection: UploadSelection) => {
    const id = ++runId.current;
    setFileName(
      selection.source === "sample"
        ? "the sample ER bill"
        : selection.name,
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
