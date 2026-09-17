import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t border-card-border bg-background py-8 text-sm text-muted">
      <Container className="flex flex-col gap-2">
        <p>
          MediRelief USA is a prototype. Nothing here is legal, medical, or
          financial advice.
        </p>
        <p>
          Statistics from an Understanding America Study survey of 1,135 U.S.
          adults.{" "}
          <a href="#" className="underline hover:text-ink">
            Source
          </a>
        </p>
      </Container>
    </footer>
  );
}
