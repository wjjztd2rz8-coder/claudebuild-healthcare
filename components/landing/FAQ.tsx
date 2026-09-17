import Container from "@/components/Container";

const faqs = [
  {
    question: "Is this legal?",
    answer:
      "Yes. You have the right to request an itemized bill and to dispute charges you believe are incorrect. We help you exercise those rights.",
  },
  {
    question: "Is my data safe?",
    answer:
      "In this prototype, nothing you upload is sent anywhere or stored. In production, files would be encrypted in transit and at rest, and deleted on request.",
  },
  {
    question: "What bills qualify?",
    answer:
      "Hospital, ER, urgent care, physician, lab, and imaging bills. Any U.S. medical bill is a good candidate for review.",
  },
  {
    question: "How long does it take?",
    answer:
      "Analysis takes a few minutes. If we negotiate on your behalf, that typically takes 2 to 6 weeks depending on the provider.",
  },
  {
    question: "What does it cost?",
    answer:
      "It's free to check your bill. If we find savings and act on them, our fee is 25% of what you actually save. If we save you nothing, you pay nothing.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-20 sm:py-28">
      <Container className="max-w-3xl">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Frequently asked questions
        </h2>

        <div className="mt-12 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-card-border bg-white px-5 py-4 open:pb-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                {faq.question}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="shrink-0 text-muted transition-transform duration-200 group-open:rotate-45"
                >
                  <path
                    d="M8 2.5v11M2.5 8h11"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
