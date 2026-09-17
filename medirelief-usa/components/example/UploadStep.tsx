"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Button from "@/components/Button";

const ACCEPTED = [".pdf", ".jpg", ".jpeg", ".png"];
const ACCEPT_ATTR = "application/pdf,image/jpeg,image/png,.pdf,.jpg,.jpeg,.png";
const MAX_BYTES = 10 * 1024 * 1024;

export interface UploadSelection {
  /** A real File, or the string 'sample' for the built-in demo bill. */
  source: File | "sample";
  name: string;
  /** Object URL for images, /sample-bill.svg for the sample, null for PDFs. */
  previewUrl: string | null;
  sizeLabel: string;
}

function humanSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function validate(file: File): string | null {
  const name = file.name.toLowerCase();
  const extOk = ACCEPTED.some((ext) => name.endsWith(ext));
  if (!extOk) {
    return `That file type isn't supported. Please upload a PDF, JPG, or PNG.`;
  }
  if (file.size > MAX_BYTES) {
    return `That file is ${humanSize(file.size)}. The limit is 10 MB — try a photo at a lower resolution.`;
  }
  if (file.size === 0) {
    return "That file looks empty. Please pick another one.";
  }
  return null;
}

export default function UploadStep({
  onAnalyze,
}: {
  onAnalyze: (selection: UploadSelection) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selection, setSelection] = useState<UploadSelection | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const createdUrl = useRef<string | null>(null);

  useEffect(
    () => () => {
      if (createdUrl.current) URL.revokeObjectURL(createdUrl.current);
    },
    [],
  );

  const accept = useCallback((file: File) => {
    const message = validate(file);
    if (message) {
      setError(message);
      return;
    }
    if (createdUrl.current) {
      URL.revokeObjectURL(createdUrl.current);
      createdUrl.current = null;
    }
    const isImage = /\.(jpe?g|png)$/i.test(file.name);
    let previewUrl: string | null = null;
    if (isImage) {
      previewUrl = URL.createObjectURL(file);
      createdUrl.current = previewUrl;
    }
    setError(null);
    setSelection({
      source: file,
      name: file.name,
      previewUrl,
      sizeLabel: humanSize(file.size),
    });
  }, []);

  const useSample = useCallback(() => {
    if (createdUrl.current) {
      URL.revokeObjectURL(createdUrl.current);
      createdUrl.current = null;
    }
    setError(null);
    const sample: UploadSelection = {
      source: "sample",
      name: "sample-bill.svg",
      previewUrl: "/sample-bill.svg",
      sizeLabel: "Sample ER bill · Riverside Regional",
    };
    setSelection(sample);
    onAnalyze(sample);
  }, [onAnalyze]);

  const clear = () => {
    if (createdUrl.current) {
      URL.revokeObjectURL(createdUrl.current);
      createdUrl.current = null;
    }
    setSelection(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="mx-auto max-w-2xl">
      <header className="text-center">
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Upload your bill
        </h1>
        <p className="mx-auto mt-3 max-w-md text-balance text-[15px] leading-relaxed text-muted">
          A photo or a PDF is fine. We check every line against fair-price
          benchmarks, coding rules, and the assistance you may be owed.
        </p>
      </header>

      <div className="mt-8 rounded-3xl border border-card-border bg-white p-4 shadow-[0_1px_3px_rgba(28,25,23,0.04)] sm:p-6">
        <input
          ref={inputRef}
          id="bill-file"
          type="file"
          accept={ACCEPT_ATTR}
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) accept(file);
          }}
        />

        {!selection ? (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              const file = e.dataTransfer.files?.[0];
              if (file) accept(file);
            }}
            aria-describedby="upload-hint"
            className={[
              "group flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-colors",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
              dragging
                ? "border-primary bg-primary/[0.06]"
                : "border-card-border bg-background hover:border-primary/40 hover:bg-primary/[0.03]",
            ].join(" ")}
          >
            <span
              className={[
                "flex h-12 w-12 items-center justify-center rounded-2xl transition-colors",
                dragging
                  ? "bg-primary text-white"
                  : "bg-primary/10 text-primary group-hover:bg-primary/15",
              ].join(" ")}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 15v2.5A2.5 2.5 0 0 0 6.5 20h11A2.5 2.5 0 0 0 20 17.5V15"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="text-[15px] font-medium text-ink">
              Drag your bill here, or{" "}
              <span className="text-primary underline decoration-primary/30 underline-offset-2">
                browse files
              </span>
            </span>
            <span id="upload-hint" className="text-xs text-muted">
              PDF, JPG, or PNG · up to 10 MB
            </span>
          </button>
        ) : (
          <div className="flex items-start gap-4 rounded-2xl border border-card-border bg-background p-4">
            <div className="flex h-24 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-card-border bg-white">
              {selection.previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={selection.previewUrl}
                  alt={`Preview of ${selection.name}`}
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <span className="flex flex-col items-center gap-1 text-primary">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-7 w-7"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 3h7l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13 3v5h5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[10px] font-semibold tracking-wider">
                    PDF
                  </span>
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink">
                {selection.name}
              </p>
              <p className="mt-0.5 text-xs text-muted">{selection.sizeLabel}</p>
              <div className="mt-3 flex flex-wrap gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="rounded-full font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Replace
                </button>
                <button
                  type="button"
                  onClick={clear}
                  className="rounded-full font-medium text-muted underline decoration-muted/30 underline-offset-2 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        )}

        {error && (
          <p
            role="alert"
            className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-sm text-error"
          >
            <svg
              viewBox="0 0 20 20"
              className="mt-0.5 h-4 w-4 shrink-0"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 4a.9.9 0 0 1 .9.9v4.2a.9.9 0 0 1-1.8 0V6.9A.9.9 0 0 1 10 6Zm0 9.2a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1Z"
                clipRule="evenodd"
              />
            </svg>
            <span>{error}</span>
          </p>
        )}

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            size="lg"
            disabled={!selection}
            onClick={() => selection && onAnalyze(selection)}
            className="w-full disabled:cursor-not-allowed disabled:bg-primary/25 disabled:hover:bg-primary/25 sm:w-auto"
          >
            Analyze my bill
          </Button>
          <p className="flex items-center justify-center gap-1.5 text-xs text-muted sm:justify-end">
            <svg
              viewBox="0 0 20 20"
              className="h-3.5 w-3.5 text-primary"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 1.5 4 4v5.2c0 3.6 2.4 6.9 6 9.3 3.6-2.4 6-5.7 6-9.3V4l-6-2.5Zm2.9 6.6-3.6 4a.9.9 0 0 1-1.3.05L6.3 10.6a.9.9 0 1 1 1.2-1.3l1 .95 3-3.35a.9.9 0 1 1 1.34 1.2Z"
                clipRule="evenodd"
              />
            </svg>
            Prototype: your file never leaves your browser.
          </p>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-muted">
        No bill handy?{" "}
        <button
          type="button"
          onClick={useSample}
          className="rounded font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Try a sample bill
        </button>
      </p>
    </div>
  );
}
