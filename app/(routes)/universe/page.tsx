import { Card } from "@/components/card";
import { ErrorState } from "@/components/error-state";
import { SectionHeader } from "@/components/section-header";
import { ApodService } from "@/libs/services/apod.service";
import { AsteroidsService } from "@/libs/services/asteroids.service";
import { ScienceService } from "@/libs/services/science.service";

export default async function UniversePage() {
  let apod;
  let asteroidsFeed;
  let exoplanets;
  try {
    [apod, asteroidsFeed, exoplanets] = await Promise.all([
      ApodService.getAPOD(),
      AsteroidsService.getAsteroids(),
      ScienceService.getExoplanets(),
    ]);
  } catch (error) {
    return <ErrorState message={(error as Error).message} />;
  }
  const asteroids = Object.values(asteroidsFeed.near_earth_objects).flat().slice(0, 6);

  return (
    <section className="space-y-6">
      <SectionHeader
        title="Universe Module"
        description="Explore APOD, objetos proximos e exoplanetas descobertos recentemente."
      />

        <div className="grid gap-4 lg:grid-cols-3">
          <Card title="APOD de hoje" subtitle={apod.date} className="card-hover lg:col-span-2">
            <p className="font-semibold">{apod.title}</p>
            <p className="mt-2 text-sm text-[var(--muted)]">{apod.explanation.slice(0, 280)}...</p>
          </Card>

          <Card title="Exoplanetas recentes" className="card-hover">
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              {exoplanets.slice(0, 6).map((planet) => (
                <li key={planet.pl_name} className="rounded-lg border border-white/15 bg-black/20 p-2">
                  <p className="font-semibold text-[var(--text)]">{planet.pl_name}</p>
                  <p>Sistema: {planet.hostname}</p>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <Card title="Near Earth Objects" className="card-hover">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {asteroids.map((asteroid) => (
              <div key={asteroid.id} className="rounded-xl border border-white/15 bg-black/20 p-3 text-sm">
                <p className="font-semibold">{asteroid.name}</p>
                <p className="text-[var(--muted)]">
                  Magnitude: {asteroid.absolute_magnitude_h.toFixed(1)}
                </p>
              </div>
            ))}
          </div>
        </Card>
    </section>
  );
}
