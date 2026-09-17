import Button from "@/components/Button";
import Container from "@/components/Container";

export default function FinalCta() {
  return (
    <section className="pb-20 sm:pb-28">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="absolute -top-16 -right-10 h-56 w-56 rounded-full bg-white/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-white/10 blur-3xl"
          />
          <div className="relative">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              See what a bill review looks like
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-teal-50">
              No sign-up, no upload required. Walk through a real worked
              example in about a minute.
            </p>
            <div className="mt-8">
              <Button href="/example" variant="secondary" size="lg">
                Try the example
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
