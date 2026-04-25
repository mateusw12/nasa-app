import type { Metadata } from "next";
import { Nunito, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { Navbar } from "@/components/navbar";
import { Providers } from "@/app/providers";
import "./globals.css";

const displayFont = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const bodyFont = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NASA Space Platform",
  description:
    "Plataforma interativa e educativa com dados reais da NASA: APOD, Marte, asteroides e muito mais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--text)]">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                const saved = localStorage.getItem("nasa-theme");
                const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                const isDark = saved ? saved === "dark" : prefersDark;
                document.documentElement.dataset.theme = isDark ? "dark" : "light";
              })();
            `,
          }}
        />
        <Providers>
          <Navbar />
          <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:px-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
