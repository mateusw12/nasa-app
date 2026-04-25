import { Card } from "@/components/card";
import { DatePicker } from "@/components/date-picker";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { SectionHeader } from "@/components/section-header";
import { getHazardBadgeClass, getHazardLabel } from "@/libs/helpers/asteroids";
import { resolveAsync } from "@/libs/helpers/async-result";
import { AsteroidsService } from "@/libs/services/asteroids.service";
import { getToday } from "@/utils/date";

interface AsteroidsPageProps {
  searchParams: Promise<{
    start_date?: string;
  }>;
}

export default async function AsteroidsPage({ searchParams }: AsteroidsPageProps) {
  const params = await searchParams;
  const startDate = params.start_date || getToday();
  const feedResult = await resolveAsync(() => AsteroidsService.getAsteroids({ start_date: startDate }));
  if (!feedResult.data || feedResult.error) {
    return <ErrorState message={feedResult.error || "Falha ao carregar asteroides."} />;
  }
  const feed = feedResult.data;

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
                    className={`inline-flex rounded-full border px-2 py-1 text-xs ${getHazardBadgeClass(
                      asteroid.is_potentially_hazardous_asteroid,
                    )}`}
                  >
                    {getHazardLabel(asteroid.is_potentially_hazardous_asteroid)}
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
