import { Card } from "@/components/card";
import { SectionHeader } from "@/components/section-header";
import { SatellitesService } from "@/libs/services/satellites.service";

export default async function SatellitesPage() {
  const satellites = await SatellitesService.getSatellites();

  return (
    <section className="space-y-6">
      <SectionHeader
        title="Satellites"
        description="Posicoes de satelites em visualizacao simplificada para aprendizado."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {satellites.map((satellite) => (
          <Card key={satellite.id} title={satellite.name} className="card-hover">
            <p className="text-sm text-[var(--muted)]">Latitude: {satellite.latitude.toFixed(2)}</p>
            <p className="text-sm text-[var(--muted)]">Longitude: {satellite.longitude.toFixed(2)}</p>
            <div className="mt-4 h-2 rounded-full bg-white/20">
              <div
                className="h-2 rounded-full bg-[var(--accent-blue)]"
                style={{ width: `${Math.min(100, Math.abs(satellite.latitude) * 1.5)}%` }}
              />
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
