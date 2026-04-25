import { Card } from "@/components/card";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { SectionHeader } from "@/components/section-header";
import { resolveAsync } from "@/libs/helpers/async-result";
import { SpaceWeatherService } from "@/libs/services/space-weather.service";

export default async function SpaceWeatherPage() {
  const eventsResult = await resolveAsync(() => SpaceWeatherService.getSpaceWeather());
  if (!eventsResult.data || eventsResult.error) {
    return <ErrorState message={eventsResult.error || "Falha ao carregar clima espacial."} />;
  }
  const events = eventsResult.data;

  return (
    <section className="space-y-6">
      <SectionHeader
        title="Space Weather"
        description="Eventos solares apresentados com linguagem calma e educativa para facilitar o entendimento."
      />

        {events.length === 0 ? (
          <EmptyState title="Sem eventos recentes" description="Nao ha alertas no intervalo consultado." />
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {events.slice(0, 10).map((event) => (
              <Card key={event.activityID} title={event.catalog} subtitle={event.startTime} className="card-hover">
                <p className="text-sm text-[var(--muted)]">
                  {event.note || "Evento monitorado para analise cientifica."}
                </p>
              </Card>
            ))}
          </div>
        )}
    </section>
  );
}
