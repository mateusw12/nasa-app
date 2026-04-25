import { Card } from "@/components/card";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { SectionHeader } from "@/components/section-header";
import { EarthService } from "@/libs/services/earth.service";

export default async function EarthLivePage() {
  let events;
  let images;
  try {
    [events, images] = await Promise.all([EarthService.getEarthEvents(), EarthService.getEarthImages()]);
  } catch (error) {
    return <ErrorState message={(error as Error).message} />;
  }

  return (
    <section className="space-y-6">
      <SectionHeader
        title="Earth in Real Time"
        description="Eventos naturais e imagens da Terra para compreender mudancas do planeta em contexto educativo."
      />

        <div className="grid gap-4 lg:grid-cols-2">
          <Card title="Eventos abertos (EONET)" className="card-hover">
            {events.events.length === 0 ? (
              <EmptyState title="Sem eventos agora" description="Volte em alguns minutos para novas atualizacoes." />
            ) : (
              <ul className="space-y-3 text-sm text-[var(--muted)]">
                {events.events.slice(0, 8).map((event) => (
                  <li key={event.id} className="rounded-xl border border-white/15 bg-black/20 p-3">
                    <p className="font-semibold text-[var(--text)]">{event.title}</p>
                    <p>{event.categories.map((item) => item.title).join(", ")}</p>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card title="Imagens EPIC" subtitle="Visao geral recente" className="card-hover">
            <div className="space-y-3 text-sm text-[var(--muted)]">
              {images.slice(0, 8).map((image) => (
                <div key={image.identifier} className="rounded-xl border border-white/15 bg-black/20 p-3">
                  <p className="font-semibold text-[var(--text)]">{image.caption}</p>
                  <p>{new Date(image.date).toLocaleString("pt-BR")}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
    </section>
  );
}
