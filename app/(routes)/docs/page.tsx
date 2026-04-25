import { Card } from "@/components/card";
import { SectionHeader } from "@/components/section-header";
import { internalEndpoints, externalEndpoints } from "./docs-content";

export default function DocsPage() {
  return (
    <section className="space-y-6">
      <SectionHeader
        title="Documentacao de Endpoints"
        description="Guia rapido dos endpoints usados no app, com exemplos praticos."
      />

      <Card title="Endpoints internos do app" subtitle="Consumidos pelo frontend">
        <div className="space-y-3 text-sm">
          {internalEndpoints.map((item) => (
            <div
              key={item.endpoint}
              className="rounded-xl border border-[var(--outline)] bg-white/30 p-3"
            >
              <p className="font-semibold text-[var(--text)]">
                <span className="mr-2 rounded-md bg-[var(--surface)] px-2 py-1 text-xs">
                  {item.method}
                </span>
                {item.endpoint}
              </p>
              <p className="mt-2 text-[var(--muted)]">{item.useCase}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Endpoints externos utilizados" subtitle="NASA + parceiros">
        <div className="space-y-3 text-sm">
          {externalEndpoints.map((item) => (
            <div
              key={item.endpoint}
              className="rounded-xl border border-[var(--outline)] bg-white/30 p-3"
            >
              <p className="font-semibold text-[var(--text)]">
                <span className="mr-2 rounded-md bg-[var(--surface)] px-2 py-1 text-xs">
                  {item.method}
                </span>
                {item.endpoint}
              </p>
              <p className="mt-2 text-[var(--muted)]">{item.useCase}</p>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
