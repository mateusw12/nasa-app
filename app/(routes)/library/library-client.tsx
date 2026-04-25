"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/card";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { SectionHeader } from "@/components/section-header";
import { NasaLibraryResponse } from "@/libs/DTO";

const fetchLibrary = async (query: string): Promise<NasaLibraryResponse> => {
  const response = await fetch(`/api/library/search?q=${encodeURIComponent(query)}`);

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(payload?.message || "Nao foi possivel carregar a biblioteca NASA.");
  }

  return response.json();
};

export const LibraryClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "nebula";

  const libraryQuery = useQuery({
    queryKey: ["library-search", query],
    queryFn: () => fetchLibrary(query),
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 10,
  });

  const submitSearch = (formData: FormData) => {
    const value = String(formData.get("q") || "").trim();
    const next = value || "nebula";
    router.push(`/library?q=${encodeURIComponent(next)}`);
  };

  const items = libraryQuery.data?.collection.items.slice(0, 18) || [];

  return (
    <section className="space-y-6">
      <SectionHeader
        title="NASA Image and Video Library"
        description="Pesquise imagens e videos oficiais da NASA em uma galeria visual responsiva."
      />

      <form action={submitSearch} className="ui-surface rounded-2xl p-4">
        <label className="flex flex-col gap-2 text-sm text-[var(--muted)] md:flex-row md:items-center">
          Buscar midia
          <input
            name="q"
            defaultValue={query}
            placeholder="Ex: moon, mars, hubble"
            className="w-full rounded-xl border border-[var(--outline)] bg-white/40 px-3 py-2 text-[var(--text)] md:max-w-lg"
          />
          <button className="ui-button rounded-xl px-4 py-2 text-sm font-semibold">Pesquisar</button>
        </label>
      </form>

      {libraryQuery.isError ? (
        <ErrorState message={libraryQuery.error.message} />
      ) : libraryQuery.isPending ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-72 animate-pulse rounded-2xl bg-white/20" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyState title="Sem resultados" description="Tente outra palavra-chave para buscar novos arquivos." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const data = item.data[0];
            const preview = item.links?.[0]?.href;

            return (
              <Card key={`${data.nasa_id}-${index}`} title={data.title} className="card-hover">
                {preview ? (
                  <Image
                    src={preview}
                    alt={data.title}
                    width={640}
                    height={420}
                    className="h-48 w-full rounded-xl object-cover"
                    loading="lazy"
                  />
                ) : null}
                <p className="mt-2 line-clamp-3 text-sm text-[var(--muted)]">
                  {data.description || "Registro sem descricao detalhada."}
                </p>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
};
