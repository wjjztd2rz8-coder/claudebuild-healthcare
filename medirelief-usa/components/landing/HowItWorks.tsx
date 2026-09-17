import Link from "next/link";
import Container from "@/components/Container";

function UploadIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 15V4m0 0L7.5 8.5M12 4l4.5 4.5M5 16.5V19a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChecklistIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="3.5" width="16" height="17" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M8 8.5h8M8 12h8M8 15.5h5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SavingsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3v18M17 7.5c0-1.9-2.2-3-5-3s-5 1.15-5 3 2.2 2.7 5 3 5 1.1 5 3-2.2 3-5 3-5-1.1-5-3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const steps = [
  {
    icon: UploadIcon,
    title: "Upload your bill",
    detail: "PDF or photo, takes 30 seconds.",
  },
  {
    icon: ChecklistIcon,
    title: "We check every line",
    detail:
      "Codes, fair-price benchmarks, duplicates, insurance rules, and assistance programs.",
  },
  {
    icon: SavingsIcon,
    title: "You keep the savings",
    detail:
      "We negotiate or hand you a ready-to-send plan. Our fee is 25% of what you save, $0 otherwise.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            How it works
          </h2>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-3 sm:gap-6">
          {steps.map((step, index) => (
            <div key={step.title} className="relative rounded-2xl border border-card-border bg-white p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-50 text-primary">
                  <step.icon />
                </span>
                <span className="text-sm font-medium text-muted">
                  Step {index + 1}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/example"
            className="text-sm font-medium text-primary underline-offset-2 hover:underline"
          >
            See a worked example &rarr;
          </Link>
        </div>
      </Container>
    </section>
  );
}
