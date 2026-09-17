/*
 * MediRelief IL — Eligibility Engine
 * -----------------------------------
 * Deterministic, auditable implementation of the Illinois
 * Hospital Uninsured Patient Discount Act (210 ILCS 89).
 *
 * This is intentionally NOT an LLM. The sliding scale is real
 * statutory math mapping household size + income to a discount tier.
 * Every number below can be traced to a public source.
 */

/*
 * 2024 HHS Federal Poverty Guidelines — 48 contiguous states + DC.
 * Source: U.S. Dept. of Health & Human Services (published annually).
 * Illinois uses the contiguous-states figures.
 */
const FPL_2024 = {
  base: {
    1: 15060,
    2: 20440,
    3: 25820,
    4: 31200,
    5: 36580,
    6: 41960,
    7: 47340,
    8: 52720,
  },
  // Add this amount for each person beyond 8.
  perAdditionalPerson: 5380,
  year: 2024,
};

/**
 * Return the annual Federal Poverty Level for a household size.
 * @param {number} householdSize - integer >= 1
 * @returns {number} annual FPL threshold in USD
 */
function federalPovertyLevel(householdSize) {
  const size = Math.max(1, Math.floor(householdSize || 1));
  if (size <= 8) return FPL_2024.base[size];
  return FPL_2024.base[8] + (size - 8) * FPL_2024.perAdditionalPerson;
}

/*
 * Discount tiers under the Hospital Uninsured Patient Discount Act.
 * Uninsured patients under 600% FPL receive a sliding-scale discount.
 * Tiers are expressed as an upper bound on FPL percentage (inclusive).
 */
const DISCOUNT_TIERS = [
  { maxPct: 200, discount: 100, label: "≤ 200% FPL" },
  { maxPct: 300, discount: 90, label: "200.01–300% FPL" },
  { maxPct: 400, discount: 80, label: "300.01–400% FPL" },
  { maxPct: 500, discount: 75, label: "400.01–500% FPL" },
  { maxPct: 600, discount: 70, label: "500.01–600% FPL" },
];

/*
 * Illinois Medicaid (ACA expansion) covers adults up to 138% FPL.
 * Hospitals must screen patients for Medicaid / public coverage first,
 * so we surface this as a recommendation when income is low enough.
 */
const MEDICAID_ADULT_FPL_PCT = 138;

/**
 * Core eligibility calculation.
 *
 * @param {Object} input
 * @param {number} input.householdSize   - people in the household
 * @param {number} input.annualIncome    - family annual gross income (USD)
 * @param {number} input.billBalance     - outstanding hospital balance (USD)
 * @param {boolean} input.uninsured      - true if patient is uninsured
 * @returns {Object} structured, fully transparent result
 */
function calculateEligibility(input) {
  const householdSize = Math.max(1, Math.floor(input.householdSize || 1));
  const annualIncome = Math.max(0, Number(input.annualIncome) || 0);
  const billBalance = Math.max(0, Number(input.billBalance) || 0);
  const uninsured = input.uninsured !== false; // default true

  const fpl = federalPovertyLevel(householdSize);
  const fplPercent = fpl > 0 ? (annualIncome / fpl) * 100 : Infinity;

  // Find the applicable discount tier.
  let tier = null;
  for (const t of DISCOUNT_TIERS) {
    if (fplPercent <= t.maxPct) {
      tier = t;
      break;
    }
  }

  const discountPct = tier ? tier.discount : 0;
  const discountAmount = Math.round((billBalance * discountPct) / 100);
  const remainingBalance = billBalance - discountAmount;

  // Statutory annual collection cap: no more than 20% of family
  // annual gross income may be collected from an eligible patient
  // in any 12-month period.
  const annualCollectionCap = Math.round(annualIncome * 0.2);

  // Effective amount the patient could owe: the smaller of the
  // post-discount balance and the annual collection cap (when eligible).
  const cappedByIncomeCap =
    discountPct > 0 && remainingBalance > annualCollectionCap;
  const estimatedYouPay =
    discountPct > 0
      ? Math.min(remainingBalance, annualCollectionCap)
      : remainingBalance;

  // Presumptive eligibility signal: very low income (at or under the
  // top discount tier) is where hospitals most often grant automatic,
  // full relief without a full application.
  const presumptiveLikely = discountPct === 100;

  // Medicaid screening recommendation.
  const medicaidRecommended =
    uninsured && fplPercent <= MEDICAID_ADULT_FPL_PCT;

  return {
    householdSize,
    annualIncome,
    billBalance,
    uninsured,
    fpl,
    fplYear: FPL_2024.year,
    fplPercent: Math.round(fplPercent * 10) / 10,
    tierLabel: tier ? tier.label : "Over 600% FPL",
    eligible: uninsured && discountPct > 0,
    discountPct,
    discountAmount,
    remainingBalance,
    annualCollectionCap,
    cappedByIncomeCap,
    estimatedYouPay,
    presumptiveLikely,
    medicaidRecommended,
    // The exact tier table, so the UI can show the full sliding scale.
    tiers: DISCOUNT_TIERS,
  };
}

/**
 * Estimate the application deadline from the bill statement date.
 * The Act's deadline windows vary by hospital; we surface a
 * conservative common window and let the user confirm with the hospital.
 *
 * @param {string} statementDateISO - e.g. "2025-08-15"
 * @param {number} windowDays       - days allowed from statement date
 * @returns {Object|null}
 */
function estimateDeadline(statementDateISO, windowDays = 90) {
  if (!statementDateISO) return null;
  const start = new Date(statementDateISO + "T00:00:00");
  if (isNaN(start.getTime())) return null;
  const deadline = new Date(start.getTime());
  deadline.setDate(deadline.getDate() + windowDays);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysLeft = Math.ceil((deadline - today) / msPerDay);
  return {
    statementDate: start,
    deadline,
    windowDays,
    daysLeft,
    expired: daysLeft < 0,
  };
}

// Expose for the app (plain script, no bundler — GitHub Pages friendly).
window.MediReliefEngine = {
  FPL_2024,
  federalPovertyLevel,
  calculateEligibility,
  estimateDeadline,
  DISCOUNT_TIERS,
};
