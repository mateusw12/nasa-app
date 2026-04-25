interface SectionHeaderProps {
  title: string;
  description: string;
}

export const SectionHeader = ({ title, description }: SectionHeaderProps) => {
  return (
    <header className="mb-6 space-y-3">
      <p className="inline-flex rounded-full border border-[var(--outline)] bg-white/45 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent-blue)]">
        NASA Experience
      </p>
      <h1 className="text-3xl font-bold text-[var(--text)] md:text-4xl">{title}</h1>
      <p className="max-w-3xl text-sm leading-relaxed text-[var(--muted)] md:text-base">{description}</p>
    </header>
  );
};
