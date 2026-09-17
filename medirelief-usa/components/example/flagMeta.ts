import type { FlagKind } from "@/lib/types";

export interface FlagMeta {
  label: string;
  short: string;
  /** Badge / pill styling. */
  badge: string;
  /** Soft tinted surface for cards and expanded rows. */
  surface: string;
  /** Small colored dot / accent. */
  dot: string;
  blurb: string;
}

export const FLAG_META: Record<FlagKind, FlagMeta> = {
  billing_error: {
    label: "Billing error",
    short: "Errors",
    badge: "bg-rose-50 text-rose-800 ring-1 ring-rose-200/80",
    surface: "bg-rose-50/60 border-rose-200/70",
    dot: "bg-rose-500",
    blurb: "Charges for something that did not happen, or was billed twice.",
  },
  above_benchmark: {
    label: "Above fair price",
    short: "Overpriced",
    badge: "bg-amber-50 text-amber-800 ring-1 ring-amber-200/80",
    surface: "bg-amber-50/60 border-amber-200/70",
    dot: "bg-amber-500",
    blurb: "Priced well above what the same service usually settles for.",
  },
  financial_assistance: {
    label: "Financial assistance",
    short: "Assistance",
    badge: "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200/80",
    surface: "bg-emerald-50/60 border-emerald-200/70",
    dot: "bg-emerald-500",
    blurb: "You may qualify to have part of the balance forgiven.",
  },
  insurance: {
    label: "Insurance / out-of-network",
    short: "Insurance",
    badge: "bg-sky-50 text-sky-800 ring-1 ring-sky-200/80",
    surface: "bg-sky-50/60 border-sky-200/70",
    dot: "bg-sky-500",
    blurb: "Protected by the No Surprises Act or misprocessed by your plan.",
  },
};

export const FLAG_ORDER: FlagKind[] = [
  "billing_error",
  "above_benchmark",
  "insurance",
  "financial_assistance",
];

export const CONFIDENCE_LABEL: Record<"high" | "medium" | "low", string> = {
  high: "High confidence",
  medium: "Medium confidence",
  low: "Worth asking about",
};

export function formatUSD(value: number, cents = false): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  });
}

export function formatServiceDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
