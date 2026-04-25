import { Card } from "@/components/card";
import { ErrorState } from "@/components/error-state";
import { SectionHeader } from "@/components/section-header";
import { resolveAsync } from "@/libs/helpers/async-result";
import { ScienceService } from "@/libs/services/science.service";

export default async function SciencePage() {
  const scienceResult = await resolveAsync(() =>
    Promise.all([ScienceService.getTechProjects(), ScienceService.getExoplanets()]),
  );
  if (!scienceResult.data || scienceResult.error) {
    return <ErrorState message={scienceResult.error || "Falha ao carregar Science & Technology."} />;
  }
  const [projects, exoplanets] = scienceResult.data;

  return (
    <section className="space-y-6">
      <SectionHeader
        title="Science and Technology"
        description="Panorama de projetos e descobertas cientificas para inspirar estudos e experimentos."
      />

        <div className="grid gap-4 lg:grid-cols-2">
          <Card title="Projetos TechPort" className="card-hover">
            <ul className="space-y-3 text-sm text-[var(--muted)]">
              {projects.slice(0, 8).map((project) => (
                <li key={project.projectId} className="rounded-xl border border-white/15 bg-black/20 p-3">
                  <p className="font-semibold text-[var(--text)]">{project.title}</p>
                  <p className="line-clamp-2">{project.description || "Descricao em atualizacao."}</p>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Catologo de exoplanetas" className="card-hover">
            <ul className="space-y-3 text-sm text-[var(--muted)]">
              {exoplanets.slice(0, 8).map((planet) => (
                <li key={planet.pl_name} className="rounded-xl border border-white/15 bg-black/20 p-3">
                  <p className="font-semibold text-[var(--text)]">{planet.pl_name}</p>
                  <p>Metodo: {planet.discoverymethod}</p>
                  <p>Ano: {planet.disc_year}</p>
                </li>
              ))}
            </ul>
          </Card>
        </div>
    </section>
  );
}
