export type FlagKind =
  | "billing_error"
  | "above_benchmark"
  | "financial_assistance"
  | "insurance";

export interface Flag {
  kind: FlagKind;
  title: string;
  explanation: string;
  estimatedSavings: number;
  confidence: "high" | "medium" | "low";
}

export interface LineItem {
  id: string;
  code?: string;
  description: string;
  billed: number;
  fairPrice?: number;
  flags: Flag[];
}

export interface NextStep {
  id: string;
  title: string;
  detail: string;
  template?: string;
}

export interface BillAnalysis {
  provider: string;
  serviceDate: string;
  billTotal: number;
  estimatedSavingsLow: number;
  estimatedSavingsHigh: number;
  additionalAssistanceNote?: string; // charity care, not in headline number
  lineItems: LineItem[];
  diySteps: NextStep[];
  handoff: { feePercent: number; blurb: string };
}
