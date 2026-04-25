import { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface CardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export const Card = ({ title, subtitle, children, className }: CardProps) => {
  return (
    <article
      className={cn(
        "ui-surface rounded-2xl p-4 text-[var(--text)] shadow-[0_10px_30px_rgba(8,15,30,0.12)]",
        className,
      )}
    >
      {(title || subtitle) && (
        <header className="mb-3">
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {subtitle && <p className="text-sm text-[var(--muted)]">{subtitle}</p>}
        </header>
      )}
      {children}
    </article>
  );
};
