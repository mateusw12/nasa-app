"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/card";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { useLibrarySearch } from "@/hooks/useLibrarySearch";
import { LibraryMediaType } from "@/libs/enum";
import { fetchPlayableVideoSource } from "@/libs/helpers/library-video";
import { SectionHeader } from "@/components/section-header";

export const LibraryClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [videoSources, setVideoSources] = useState<Record<string, string>>({});
  const [videoErrors, setVideoErrors] = useState<Record<string, string>>({});
  const [loadingVideoId, setLoadingVideoId] = useState<string | null>(null);
  const query = searchParams.get("q") || "nebula";
  const mediaType = (searchParams.get("media_type") as LibraryMediaType) || LibraryMediaType.All;

  const libraryQuery = useLibrarySearch(query, mediaType);

  const submitSearch = (formData: FormData) => {
    const value = String(formData.get("q") || "").trim();
    const media = String(formData.get("media_type") || LibraryMediaType.All) as LibraryMediaType;
    const next = value || "nebula";
    router.push(`/library?q=${encodeURIComponent(next)}&media_type=${encodeURIComponent(media)}`);
  };

  const loadVideo = async (nasaId: string): Promise<string | null> => {
    if (videoSources[nasaId]) {
      return videoSources[nasaId];
    }

    setVideoErrors((previous) => {
      const next = { ...previous };
      delete next[nasaId];
      return next;
    });
    setLoadingVideoId(nasaId);

    try {
      const source = await fetchPlayableVideoSource(nasaId);

      setVideoSources((previous) => ({
        ...previous,
        [nasaId]: source,
      }));
      return source;
    } catch (error) {
      setVideoErrors((previous) => ({
        ...previous,
        [nasaId]: error instanceof Error ? error.message : "Falha ao carregar video.",
      }));
      return null;
    } finally {
      setLoadingVideoId(null);
    }
  };

  const downloadFile = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.target = "_blank";
    link.rel = "noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleDownloadVideo = async (nasaId: string) => {
    const existingSource = videoSources[nasaId];

    if (existingSource) {
      downloadFile(existingSource, `${nasaId}.mp4`);
      return;
    }

    const resolvedSource = await loadVideo(nasaId);

    if (resolvedSource) {
      downloadFile(resolvedSource, `${nasaId}.mp4`);
    }
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
          <select
            name="media_type"
            defaultValue={mediaType}
            className="theme-select rounded-xl border border-[var(--outline)] bg-[var(--surface)] px-3 py-2 text-[var(--text)]"
          >
            <option value={LibraryMediaType.All}>Imagens e videos</option>
            <option value={LibraryMediaType.Image}>Somente imagens</option>
            <option value={LibraryMediaType.Video}>Somente videos</option>
          </select>
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
            const isVideo = data.media_type === "video";
            const videoSource = videoSources[data.nasa_id];
            const videoError = videoErrors[data.nasa_id];
            const mediaLabel = isVideo ? "Video" : "Imagem";

            return (
              <Card
                key={`${data.nasa_id}-${index}`}
                title={data.title}
                subtitle={data.date_created ? new Date(data.date_created).toLocaleDateString("pt-BR") : undefined}
                className="card-hover group overflow-hidden border border-[var(--outline)]/70 bg-gradient-to-b from-white/30 to-transparent"
              >
                <div className="relative">
                  {isVideo && videoSource ? (
                    <video
                      controls
                      preload="metadata"
                      className="h-48 w-full rounded-xl bg-black object-cover"
                      src={videoSource}
                    >
                      Seu navegador nao suporta reproducao de video.
                    </video>
                  ) : preview ? (
                    <Image
                      src={preview}
                      alt={data.title}
                      width={640}
                      height={420}
                      className="h-48 w-full rounded-xl object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  ) : null}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 rounded-b-xl bg-gradient-to-t from-black/45 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full border border-white/35 bg-black/40 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white">
                    {mediaLabel}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                  {isVideo ? (
                    <button
                      type="button"
                      onClick={() => loadVideo(data.nasa_id)}
                      disabled={loadingVideoId === data.nasa_id}
                      className="rounded-full border border-[var(--outline)] bg-[var(--surface)] px-3 py-1.5 text-[var(--text)] transition hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)] disabled:opacity-50"
                    >
                      {loadingVideoId === data.nasa_id ? "Carregando..." : "Reproduzir"}
                    </button>
                  ) : null}

                  {isVideo ? (
                    <button
                      type="button"
                      onClick={() => handleDownloadVideo(data.nasa_id)}
                      disabled={loadingVideoId === data.nasa_id}
                      className="rounded-full border border-[var(--outline)] bg-[var(--surface)] px-3 py-1.5 text-[var(--text)] transition hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)] disabled:opacity-50"
                    >
                      Baixar video
                    </button>
                  ) : preview ? (
                    <button
                      type="button"
                      onClick={() => downloadFile(preview, `${data.nasa_id}.jpg`)}
                      className="rounded-full border border-[var(--outline)] bg-[var(--surface)] px-3 py-1.5 text-[var(--text)] transition hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)]"
                    >
                      Baixar imagem
                    </button>
                  ) : null}

                  <a
                    href={`/api/library/asset/${encodeURIComponent(data.nasa_id)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-[var(--outline)] bg-transparent px-3 py-1.5 text-[var(--muted)] transition hover:border-[var(--accent-red)] hover:text-[var(--accent-red)]"
                  >
                    Ver manifest
                  </a>
                </div>
                {isVideo && videoError ? (
                  <p className="mt-2 text-xs text-[var(--accent-red)]">{videoError}</p>
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
