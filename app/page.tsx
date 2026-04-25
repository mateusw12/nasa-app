import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { AnimatedReveal } from "@/components/animated-reveal";
import { Card } from "@/components/card";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { SectionHeader } from "@/components/section-header";
import { ApodService } from "@/libs/services/apod.service";
import { AsteroidsService } from "@/libs/services/asteroids.service";
import { getToday } from "@/utils/date";

const moduleCards = [
  {
    href: "/apod",
    title: "Astronomy Picture of the Day",
    description: "Imagem ou video do dia com contexto educativo.",
  },
  {
    href: "/mars",
    title: "Mars Rover Gallery",
    description: "Fotos reais de Marte com filtros por data e camera.",
  },
  {
    href: "/asteroids",
    title: "Near Earth Objects",
    description: "Objetos proximos da Terra com sinal visual amigavel.",
  },
  {
    href: "/earth",
    title: "EPIC Earth Images",
    description: "Imagens da Terra registradas do espaco profundo.",
  },
  {
    href: "/space-weather",
    title: "Space Weather",
    description: "Eventos solares em um formato leve e informativo.",
  },
  {
    href: "/library",
    title: "NASA Library",
    description: "Busca por imagens e videos oficiais da NASA.",
  },
  {
    href: "/docs",
    title: "API Docs",
    description: "Guia dos endpoints, exemplos e boas praticas de integracao.",
  },
];

const DashboardPreview = async () => {
  const [apod, asteroidsFeed] = await Promise.all([
    ApodService.getAPOD(),
    AsteroidsService.getAsteroids({ start_date: getToday() }),
  ]);

  const asteroids = Object.values(asteroidsFeed.near_earth_objects).flat();

  return (
    <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
      <Card title={apod.title} subtitle="Destaque do dia" className="card-hover">
        <div className="space-y-3">
          {apod.media_type === "image" ? (
            <Image
              src={apod.url}
              alt={apod.title}
              width={1200}
              height={700}
              className="h-64 w-full rounded-xl object-cover"
            />
          ) : (
            <a
              href={apod.url}
              target="_blank"
              rel="noreferrer"
              className="ui-button inline-flex rounded-xl px-3 py-2 text-sm font-semibold"
            >
              Assistir video do dia
            </a>
          )}
          <p className="line-clamp-4 text-sm text-[var(--muted)]">{apod.explanation}</p>
          <Link href="/apod" className="text-sm font-semibold text-[var(--accent-red)] underline-offset-4 hover:underline">
            Explorar APOD completo
          </Link>
        </div>
      </Card>

      <Card title="Asteroids em observacao" subtitle="Panorama rapido" className="card-hover">
        <ul className="space-y-3 text-sm text-[var(--muted)]">
          {asteroids.slice(0, 5).map((item) => {
            const approach = item.close_approach_data[0];
            return (
              <li key={item.id} className="rounded-xl border border-[var(--outline)] bg-white/35 p-3">
                <p className="font-semibold text-[var(--text)]">{item.name}</p>
                <p>Distancia: {Number(approach?.miss_distance.kilometers || 0).toLocaleString("pt-BR")} km</p>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
};

export default function Home() {
  return (
    <section className="space-y-8">
      <SectionHeader
        title="NASA Space Platform"
        description="Uma plataforma educativa para explorar o espaco com dados atualizados da NASA em uma experiencia leve e interativa."
      />

      <div className="ui-surface rounded-3xl p-6 md:p-8">
        <p className="max-w-3xl text-sm leading-relaxed text-[var(--muted)] md:text-base">
          Conteudo espacial confiavel, organizado em modulos e pronto para engajar estudantes, familias e
          curiosos em uma jornada visual pela NASA.
        </p>
      </div>

      <AnimatedReveal>
        <Suspense fallback={<LoadingSkeleton />}>
          <DashboardPreview />
        </Suspense>
      </AnimatedReveal>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {moduleCards.map((module, index) => (
          <Link
            key={module.href}
            href={module.href}
            className="stagger-in ui-surface card-hover rounded-2xl p-5"
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <h2 className="text-xl font-bold">{module.title}</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">{module.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
