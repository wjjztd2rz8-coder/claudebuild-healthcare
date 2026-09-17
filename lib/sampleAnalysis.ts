import type { BillAnalysis } from "@/lib/types";

/**
 * Illustrative sample analysis — a fictional emergency-room bill.
 * Numbers are placeholders chosen to show the shape of a real result,
 * not real benchmark data.
 */
export const sampleAnalysis: BillAnalysis = {
  provider: "Riverside Regional Medical Center",
  serviceDate: "2026-07-14",
  billTotal: 4063,
  estimatedSavingsLow: 1900,
  estimatedSavingsHigh: 2255,
  additionalAssistanceNote:
    "Riverside is a nonprofit hospital. If your household income is under 300% of the federal poverty level, its financial assistance policy may reduce whatever is left of your balance by 50–100%. Nonprofit hospitals are required to have a policy like this, and you can apply even after the bill has gone to collections. This is not counted in the savings estimate above.",
  lineItems: [
    {
      id: "li-1",
      code: "99284",
      description: "ER visit, level 4",
      billed: 1450,
      fairPrice: 650,
      flags: [
        {
          kind: "above_benchmark",
          title: "Charged more than twice the typical price",
          explanation:
            "This is the hospital's fee just for being seen in the ER, at the second-highest severity level. In this area, a level 4 ER visit is usually settled at around $650 — you were billed $1,450. Hospitals set these list prices themselves, and they routinely accept far less. Asking for the cash-pay or insurer-negotiated rate on this one line is the single biggest lever on this bill.",
          estimatedSavings: 800,
          confidence: "high",
        },
      ],
    },
    {
      id: "li-2",
      code: "70450",
      description: "CT head without contrast",
      billed: 1180,
      fairPrice: 400,
      flags: [
        {
          kind: "above_benchmark",
          title: "CT scan priced about 3x the going rate",
          explanation:
            "A head CT without contrast is a routine scan. Outpatient imaging centers in most metro areas charge $300–$500 for exactly the same study, and Medicare pays well under that. $1,180 is a list price, not a real price. Ask what the same scan would have cost as a cash-pay outpatient and request that rate.",
          estimatedSavings: 780,
          confidence: "high",
        },
      ],
    },
    {
      id: "li-3",
      code: "96360",
      description: "IV infusion, first hour",
      billed: 310,
      flags: [],
    },
    {
      id: "li-4",
      code: "96361",
      description: "IV infusion, additional hour",
      billed: 310,
      flags: [
        {
          kind: "billing_error",
          title: "Billed for a second hour of IV that never happened",
          explanation:
            "Code 96361 is an add-on that can only be billed for each extra hour of infusion beyond the first. Your own visit record shows you were in the department for 45 minutes total, so there was no second hour. This is a clear coding error, and the whole $310 should come off. Ask the billing office for an itemized statement and point to the arrival and discharge times.",
          estimatedSavings: 310,
          confidence: "high",
        },
      ],
    },
    {
      id: "li-5",
      code: "85025",
      description: "CBC w/ differential",
      billed: 85,
      flags: [],
    },
    {
      id: "li-6",
      code: "80048",
      description: "Basic metabolic panel",
      billed: 95,
      flags: [],
    },
    {
      id: "li-7",
      code: "J2405",
      description: "Ondansetron 4 mg injection",
      billed: 48,
      flags: [],
    },
    {
      id: "li-8",
      description: "IV start kit / supplies",
      billed: 65,
      flags: [
        {
          kind: "billing_error",
          title: "Supplies already paid for in the infusion charge",
          explanation:
            "The needle, tubing and prep kit used to start an IV are considered part of the infusion charge you were already billed on line 3. Billing them again separately is called unbundling, and payers do not allow it. Ask for this line to be removed as included in code 96360.",
          estimatedSavings: 65,
          confidence: "medium",
        },
      ],
    },
    {
      id: "li-9",
      description: "ER physician fee (out-of-network)",
      billed: 520,
      fairPrice: 220,
      flags: [
        {
          kind: "insurance",
          title: "Surprise out-of-network bill — likely not allowed",
          explanation:
            "The ER doctor who saw you does not contract with your insurance, even though the hospital does. You had no way to choose. Under the federal No Surprises Act, emergency care has to be billed to you as if it were in-network, so your share should be an ordinary in-network copay or coinsurance. The doctor's group and your insurer settle the rest between themselves. Tell them the No Surprises Act applies and ask for the bill to be reprocessed.",
          estimatedSavings: 300,
          confidence: "medium",
        },
      ],
    },
  ],
  diySteps: [
    {
      id: "step-1",
      title: "Ask for a fully itemized bill",
      detail:
        "Summary bills hide the lines that are wrong. You are entitled to an itemized statement with every code, date and charge. Request it first — every other step gets easier once you have it, and the clock on payment usually pauses while a billing question is open.",
      template:
        `Hello, my name is [YOUR NAME], date of birth [DOB], account number [ACCOUNT #], for a visit on July 14, 2026.

I'd like to request a fully itemized statement for this visit, including all CPT and HCPCS codes, the date and time of each service, and the charge for each line.

Please also note on my account that I am disputing charges in good faith and ask that the balance not be sent to collections while my questions are open.

Could you also email or mail me a copy of your financial assistance policy and application? Thank you.`,
    },
    {
      id: "step-2",
      title: "Call the billing office about the errors",
      detail:
        "One short, calm phone call resolves most of this. Have the itemized bill in front of you and work down the flagged lines one at a time. Ask for the representative's name and a reference number, and write down what they agree to.",
      template:
        `Hi, I'm calling about account number [ACCOUNT #] for my emergency visit on July 14, 2026. I have the itemized bill in front of me and I have three specific questions.

1. Line for code 96361, "IV infusion, additional hour," $310. My arrival and discharge times show a 45-minute visit, so there was no second hour of infusion. I'm asking for that line to be removed.

2. Line for "IV start kit / supplies," $65. My understanding is that IV supplies are bundled into code 96360, which I was already billed for. I'm asking for that line to be removed as well.

3. Code 99284, the level 4 ER visit, $1,450, and code 70450, the head CT, $1,180. Both are far above what these services usually cost here. What is your cash-pay or self-pay rate for each, and can that rate be applied to my account?

Could you tell me your name and a reference number for this call, and confirm in writing what we agree to? Thank you for your help.`,
    },
    {
      id: "step-3",
      title: "Send a short written dispute",
      detail:
        "Put it in writing the same week, even if the call went well. A dated letter creates a record, and mailing or emailing it to the billing department is usually all it takes. Keep it to one page and attach the itemized bill with the flagged lines circled.",
      template:
        `[DATE]

Riverside Regional Medical Center — Patient Billing
Re: [YOUR NAME], DOB [DOB], account [ACCOUNT #], date of service July 14, 2026

To whom it may concern,

I am disputing the following charges on the itemized bill for this visit:

• CPT 96361, IV infusion additional hour, $310. My visit lasted 45 minutes; no second hour of infusion was provided. I request removal of this charge.
• IV start kit / supplies, $65. These supplies are bundled into CPT 96360, which was billed separately. I request removal of this charge.
• CPT 99284, ER visit level 4, $1,450, and CPT 70450, CT head without contrast, $1,180. These charges are substantially above prevailing rates for the same services in this area. I request that your self-pay or negotiated rate be applied.

I am disputing these charges in good faith and request that my account not be referred to collections while this dispute is pending. Please respond in writing within 30 days.

I have also requested a copy of your financial assistance policy and intend to apply.

Sincerely,
[YOUR NAME]
[ADDRESS]
[PHONE] · [EMAIL]`,
    },
    {
      id: "step-4",
      title: "Apply for financial assistance (charity care)",
      detail:
        "Riverside is a nonprofit, so it is required to have a written financial assistance policy. Applying is free, it does not affect your credit, and it can wipe out 50–100% of what remains. You can apply even if you have insurance, and even if the bill is already past due.",
      template:
        `Hello, my name is [YOUR NAME], account number [ACCOUNT #], date of service July 14, 2026.

I would like to apply for financial assistance under your charity care policy. Please send me the application and tell me what documents you need — I can provide recent pay stubs, my most recent tax return, and proof of household size.

My household is [NUMBER] people and our annual household income is approximately $[AMOUNT].

Please also confirm that my account will be placed on hold and not referred to collections while my financial assistance application is being reviewed. Thank you.`,
    },
    {
      id: "step-5",
      title: "File a No Surprises Act complaint if the doctor's bill stands",
      detail:
        "If the out-of-network ER physician charge is not reprocessed as in-network, you can file a free federal complaint at 1-800-985-3059 or cms.gov/nosurprises. Providers take these seriously, and complaints are frequently resolved in the patient's favor without a lawyer.",
      template:
        `Complaint summary for the No Surprises Help Desk (1-800-985-3059):

I received emergency care at Riverside Regional Medical Center, an in-network hospital, on July 14, 2026. The treating emergency physician was out-of-network and has billed me $520 directly. I had no opportunity to choose an in-network physician for emergency care.

Under the No Surprises Act, my cost sharing for emergency services should be calculated as in-network, and the provider should not balance-bill me for the remainder.

Patient: [YOUR NAME], DOB [DOB]
Insurer: [INSURANCE PLAN], member ID [MEMBER ID]
Facility: Riverside Regional Medical Center
Billing provider: [PHYSICIAN GROUP NAME]
Amount billed: $520
Date of service: July 14, 2026

I have contacted both the physician group and my insurer and the charge has not been corrected.`,
    },
    {
      id: "step-6",
      title: "As a fallback, ask for an interest-free payment plan",
      detail:
        "Whatever balance survives, you rarely have to pay it in one go. Most hospitals will spread it over 12–24 months at no interest, and asking does not waive anything you have already disputed. Never put a disputed hospital bill on a credit card.",
      template:
        `Hello, this is [YOUR NAME], account number [ACCOUNT #].

Once the corrections and financial assistance on my account are finalized, I would like to set up an interest-free monthly payment plan for the remaining balance. I can comfortably pay $[AMOUNT] per month.

Please confirm the plan in writing, including the monthly amount, the number of payments, and that no interest or fees will be added. Thank you.`,
    },
  ],
  handoff: {
    feePercent: 25,
    blurb:
      "We take it from here. We request the itemized bill, dispute the coding errors, negotiate the two overpriced lines against benchmark rates, file the No Surprises Act paperwork on the out-of-network physician charge, and submit your financial assistance application — then send you a plain-English summary of what changed. You stay in the loop and approve anything before it is agreed to.",
  },
};

export default sampleAnalysis;
