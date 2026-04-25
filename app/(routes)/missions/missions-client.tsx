"use client";

import Image from "next/image";
import { Card } from "@/components/card";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { useMissionPhotos } from "@/hooks/useMissionPhotos";
import { SectionHeader } from "@/components/section-header";

const missionTimeline = [
  { year: "2012", label: "Curiosity chega a Marte" },
  { year: "2018", label: "InSight inicia estudo sismico" },
  { year: "2021", label: "Perseverance pousa em Jezero" },
];

export const MissionsClient = () => {
  const missionPhotos = useMissionPhotos();

  if (missionPhotos.isError) {
    return <ErrorState message={missionPhotos.error.message} />;
  }

  const firstPhoto = missionPhotos.data?.photos?.[0];

  return (
    <section className="space-y-6">
      <SectionHeader
        title="Space Missions"
        description="Uma visao amigavel de marcos das missoes e registros visuais de Marte."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Timeline de missoes" className="card-hover">
          <ol className="space-y-3 text-sm text-[var(--muted)]">
            {missionTimeline.map((item) => (
              <li key={item.year} className="rounded-xl border border-[var(--outline)] bg-white/35 p-3">
                <p className="font-semibold text-[var(--text)]">{item.year}</p>
                <p>{item.label}</p>
              </li>
            ))}
          </ol>
        </Card>

        <Card title="Foto de Marte no dia do pouso" className="card-hover">
          {missionPhotos.isPending ? (
            <div className="h-72 animate-pulse rounded-xl bg-white/25" />
          ) : firstPhoto ? (
            <Image
              src={firstPhoto.img_src}
              alt="Marte"
              width={800}
              height={600}
              className="h-72 w-full rounded-xl object-cover"
            />
          ) : (
            <EmptyState
              title="Sem foto para o dia selecionado"
              description="A API nao retornou imagens para esse recorte historico."
            />
          )}
        </Card>
      </div>
    </section>
  );
};
