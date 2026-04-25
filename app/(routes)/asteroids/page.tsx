import { Card } from "@/components/card";
import { DatePicker } from "@/components/date-picker";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { SectionHeader } from "@/components/section-header";
import { AsteroidsService } from "@/libs/services/asteroids.service";
import { getToday } from "@/utils/date";

interface AsteroidsPageProps {
  searchParams: {
    start_date?: string;
  };
}

const hazardBadge = (value: boolean) => {
  return value
    ? "border-[color:var(--accent-red)]/70 bg-[color:var(--accent-red)]/15 text-[color:var(--accent-red)]"
    : "border-[color:var(--accent-blue)]/70 bg-[color:var(--accent-blue)]/15 text-[color:var(--accent-blue)]";
};

const hazardLabel = (value: boolean) => {
  return value ? "Observacao reforcada" : "Trajeto estavel";
};

export default async function AsteroidsPage({ searchParams }: AsteroidsPageProps) {
  const startDate = searchParams.start_date || getToday();
  let feed;
  try {
    feed = await AsteroidsService.getAsteroids({ start_date: startDate });
  } catch (error) {
    return <ErrorState message={(error as Error).message} />;
  }

  const asteroids = Object.values(feed.near_earth_objects).flat();

  return (
    <section className="space-y-6">
      <SectionHeader
        title="Near Earth Objects"
        description="Acompanhe objetos proximos da Terra com indicadores visuais amigaveis e contexto educativo."
      />

        <div className="rounded-2xl border border-white/20 bg-white/5 p-4">
          <DatePicker name="start_date" defaultValue={startDate} label="Data inicial" />
        </div>

        {asteroids.length === 0 ? (
          <EmptyState title="Nenhum objeto nessa data" description="Tente selecionar outra data para ver novos registros." />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {asteroids.slice(0, 24).map((asteroid) => {
              const approach = asteroid.close_approach_data[0];
              const maxDiameter = asteroid.estimated_diameter.meters.estimated_diameter_max;
              const distanceKm = Number(approach?.miss_distance.kilometers || 0);

              return (
                <Card key={asteroid.id} title={asteroid.name} className="card-hover">
                  <div className="space-y-2 text-sm text-[var(--muted)]">
                    <p>Tamanho estimado: {maxDiameter.toFixed(1)} m</p>
                    <p>Distancia da Terra: {distanceKm.toLocaleString("pt-BR")} km</p>
                    <span
                      className={`inline-flex rounded-full border px-2 py-1 text-xs ${hazardBadge(
                        asteroid.is_potentially_hazardous_asteroid,
                      )}`}
                    >
                      {hazardLabel(asteroid.is_potentially_hazardous_asteroid)}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
    </section>
  );
}
