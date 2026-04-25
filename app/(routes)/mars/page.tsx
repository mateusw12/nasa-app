import Image from "next/image";
import { Card } from "@/components/card";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { GalleryGrid } from "@/components/gallery-grid";
import { SectionHeader } from "@/components/section-header";
import { MarsCamera } from "@/libs/enum";
import { resolveAsync } from "@/libs/helpers/async-result";
import { MarsService } from "@/libs/services/mars.service";
import { getToday } from "@/utils/date";

interface MarsPageProps {
  searchParams: Promise<{
    earth_date?: string;
    camera?: string;
  }>;
}

const cameras = Object.values(MarsCamera);

export default async function MarsPage({ searchParams }: MarsPageProps) {
  const params = await searchParams;
  const earthDate = params.earth_date || getToday();
  const camera = params.camera || "";
  const responseResult = await resolveAsync(() => MarsService.getMarsPhotos({ earth_date: earthDate, camera }));
  if (!responseResult.data || responseResult.error) {
    return <ErrorState message={responseResult.error || "Falha ao carregar fotos de Marte."} />;
  }
  const response = responseResult.data;

  const photos = response.photos.slice(0, 18);

  return (
    <section className="space-y-6">
      <SectionHeader
        title="Mars Rover Photos"
        description="Fotos reais do rover Curiosity para explorar Marte em familia de forma visual e divertida."
      />

        <form className="grid gap-3 rounded-2xl border border-white/20 bg-white/5 p-4 md:grid-cols-3">
          <label className="text-sm text-[var(--muted)]">
            Data
            <input
              type="date"
              name="earth_date"
              defaultValue={earthDate}
              className="mt-1 w-full rounded-xl border border-white/30 bg-black/20 px-3 py-2 text-[var(--text)]"
            />
          </label>

          <label className="text-sm text-[var(--muted)]">
            Camera
            <select
              name="camera"
              defaultValue={camera}
              className="mt-1 w-full rounded-xl border border-white/30 bg-black/20 px-3 py-2 text-[var(--text)]"
            >
              <option value="">Todas</option>
              {cameras.map((item) => (
                <option key={item} value={item}>
                  {item.toUpperCase()}
                </option>
              ))}
            </select>
          </label>

          <div className="flex items-end">
            <button className="w-full rounded-xl border border-white/30 bg-white/10 px-3 py-2 text-sm">
              Aplicar filtros
            </button>
          </div>
        </form>

        {photos.length === 0 ? (
          <EmptyState title="Sem fotos para esse filtro" description="Tente outra data ou camera para encontrar novas imagens." />
        ) : (
          <GalleryGrid>
            {photos.map((photo) => (
              <Card
                key={photo.id}
                title={photo.camera.full_name}
                subtitle={`Data: ${photo.earth_date}`}
                className="card-hover"
              >
                <Image
                  src={photo.img_src}
                  alt={`Foto de Marte ${photo.id}`}
                  width={700}
                  height={700}
                  className="h-52 w-full rounded-xl object-cover"
                  loading="lazy"
                />
              </Card>
            ))}
          </GalleryGrid>
        )}
    </section>
  );
}
