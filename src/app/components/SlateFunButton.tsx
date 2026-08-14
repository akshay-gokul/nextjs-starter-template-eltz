"use client";

import { useState } from "react";

export default function SlateFunButton() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("/api/slatefun");
      const text = await res.text();

      let pretty = text;
      try {
        pretty = JSON.stringify(JSON.parse(text), null, 2);
      } catch {
        // not JSON, show the raw body
      }

      if (!res.ok) {
        setError(`Request failed (${res.status})`);
      }
      setResponse(pretty);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col w-full gap-4">
      <button
        onClick={handleClick}
        disabled={loading}
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 disabled:opacity-60"
      >
        {loading ? "Calling…" : "Call slatefun"}
      </button>

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      {response !== null && (
        <pre className="w-full max-w-full overflow-x-auto rounded-lg bg-black/[.05] dark:bg-white/[.06] p-4 text-xs sm:text-sm whitespace-pre-wrap break-words font-[family-name:var(--font-geist-mono)]">
          {response}
        </pre>
      )}
    </div>
  );
}
