// Backend swap point: replace body with a real API call.
//
// The signature below is the whole contract the UI depends on: hand it a File
// (or the string 'sample'), get back a BillAnalysis, and optionally receive
// human-readable progress messages along the way. A real implementation would
// POST the file to an OCR + pricing service and stream status updates.

import type { BillAnalysis } from "@/lib/types";
import { sampleAnalysis } from "@/lib/sampleAnalysis";

export const ANALYSIS_STAGES = [
  "Reading your bill",
  "Matching codes to fair-price benchmarks",
  "Checking for errors",
  "Preparing your results",
] as const;

export const ANALYSIS_STAGE_MS = 700;

export async function analyzeBill(
  input: File | "sample",
  onProgress?: (msg: string) => void,
): Promise<BillAnalysis> {
  void input; // the mock ignores the file; a real backend would upload it

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  for (const stage of ANALYSIS_STAGES) {
    onProgress?.(stage);
    await sleep(ANALYSIS_STAGE_MS);
  }

  // Total elapsed lands a little under 3s; hold on the last message briefly.
  await sleep(2500 - ANALYSIS_STAGES.length * ANALYSIS_STAGE_MS);

  return sampleAnalysis;
}

export default analyzeBill;
