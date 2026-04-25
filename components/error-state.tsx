interface ErrorStateProps {
  title?: string;
  message: string;
}

export const ErrorState = ({ title = "Ops, algo nao saiu como esperado", message }: ErrorStateProps) => {
  return (
    <div className="rounded-2xl border border-amber-300/40 bg-amber-50/10 p-5 text-[var(--text)]">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-[var(--muted)]">{message}</p>
    </div>
  );
};
