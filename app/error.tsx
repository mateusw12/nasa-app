"use client";

import { ErrorState } from "@/components/error-state";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="space-y-4">
      <ErrorState message={error.message || "Nao foi possivel carregar os dados."} />
      <button
        type="button"
        onClick={reset}
        className="rounded-xl border border-white/30 bg-white/10 px-4 py-2 text-sm"
      >
        Tentar novamente
      </button>
    </div>
  );
}
