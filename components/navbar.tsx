import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { AppRoute } from "@/libs/enum";

const navItems = [
  { href: AppRoute.Dashboard, label: "Dashboard" },
  { href: AppRoute.Apod, label: "APOD" },
  { href: AppRoute.Mars, label: "Mars" },
  { href: AppRoute.Asteroids, label: "Asteroids" },
  { href: AppRoute.Earth, label: "Earth" },
  { href: AppRoute.Universe, label: "Universe" },
  { href: AppRoute.Missions, label: "Missions" },
  { href: AppRoute.Library, label: "Library" },
  { href: AppRoute.Docs, label: "Docs" },
];

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--outline)] bg-[var(--surface)]/88 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-3 px-4 py-4 md:px-6">
        <Link href="/" className="mr-3 flex items-center gap-2 text-lg font-bold tracking-wide text-[var(--text)]">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[var(--accent-red)]" />
          <span className="brand-gradient">NASA</span>
          <span>Space Platform</span>
        </Link>

        <nav className="flex flex-1 flex-wrap items-center gap-2 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-transparent px-3 py-1.5 text-[var(--muted)] transition hover:border-[var(--outline)] hover:bg-white/35 hover:text-[var(--text)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
};
