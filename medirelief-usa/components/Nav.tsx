import Link from "next/link";
import Container from "./Container";
import Button from "./Button";

function WordmarkIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M14 24.5s-9.5-5.85-9.5-13.1C4.5 7.6 7.35 5 10.6 5c1.95 0 3.6.95 4.4 2.45C15.8 5.95 17.45 5 19.4 5c3.25 0 6.1 2.6 6.1 6.4 0 7.25-9.5 13.1-9.5 13.1H14z"
        fill="var(--color-primary)"
      />
      <path
        d="M14 10v6M11 13h6"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-card-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-ink">
          <WordmarkIcon />
          <span className="text-lg tracking-tight">MediRelief USA</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-muted sm:flex">
          <Link href="/#how-it-works" className="hover:text-ink">
            How it works
          </Link>
          <Link href="/#faq" className="hover:text-ink">
            FAQ
          </Link>
        </nav>

        <Button href="/example" size="md">
          See an example
        </Button>
      </Container>
    </header>
  );
}
