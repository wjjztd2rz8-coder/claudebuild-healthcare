import Container from "@/components/Container";

const stats = [
  {
    value: "1 in 5",
    caption:
      "adults got a medical bill they disagreed with or could not afford",
  },
  {
    value: "86%",
    caption:
      "of those who did not contact the billing office assumed it would not make a difference",
  },
  {
    value: "76%",
    caption:
      "of people who called about an unaffordable bill got financial relief",
  },
  {
    value: "74%",
    caption: "who reported a suspected mistake got a correction",
  },
];

export default function StatsSection() {
  return (
    <section id="why" className="py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Most people overpay, and most never push back
          </h2>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.value}
              className="rounded-2xl border border-card-border bg-white p-6"
            >
              <p className="text-4xl font-semibold tracking-tight text-primary">
                {stat.value}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {stat.caption}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted">
          Source: Understanding America Study survey of 1,135 U.S. adults.{" "}
          <a href="#" className="underline underline-offset-2 hover:text-ink">
            View the study
          </a>
        </p>
      </Container>
    </section>
  );
}
