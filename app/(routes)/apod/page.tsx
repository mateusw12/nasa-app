import Image from "next/image";
import Link from "next/link";
import { DatePicker } from "@/components/date-picker";
import { ErrorState } from "@/components/error-state";
import { FavoriteButton } from "@/components/favorite-button";
import { SectionHeader } from "@/components/section-header";
import { resolveAsync } from "@/libs/helpers/async-result";
import { ApodService } from "@/libs/services/apod.service";
import { getToday, shiftDate } from "@/utils/date";

interface APODPageProps {
  searchParams: Promise<{
    date?: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function APODPage({ searchParams }: APODPageProps) {
  const params = await searchParams;
  const date = params.date || getToday();
  const apodResult = await resolveAsync(() => ApodService.getAPOD(date));
  if (!apodResult.data || apodResult.error) {
    return <ErrorState message={apodResult.error || "Falha ao carregar APOD."} />;
  }
  const apod = apodResult.data;

  return (
    <section className="space-y-6">
      <SectionHeader
        title="Astronomy Picture of the Day"
        description="Uma janela diaria para o universo com explicacoes acessiveis e curiosidades cientificas."
      />

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/20 bg-white/5 p-4">
          <DatePicker name="date" defaultValue={date} label="Escolha a data" />
          <div className="flex items-center gap-2">
            <Link
              href={`/apod?date=${shiftDate(date, -1)}`}
              className="rounded-xl border border-white/30 bg-white/10 px-3 py-2 text-sm"
            >
              Dia anterior
            </Link>
            <Link
              href={`/apod?date=${shiftDate(date, 1)}`}
              className="rounded-xl border border-white/30 bg-white/10 px-3 py-2 text-sm"
            >
              Proximo dia
            </Link>
          </div>
        </div>

        <article className="space-y-4 rounded-2xl border border-white/20 bg-white/5 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold">{apod.title}</h2>
            <FavoriteButton id={`apod:${apod.date}`} />
          </div>

          {apod.media_type === "image" ? (
            <Image
              src={apod.url}
              alt={apod.title}
              width={1600}
              height={900}
              className="max-h-[70vh] w-full rounded-xl object-cover"
              priority
            />
          ) : (
            <a
              href={apod.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-xl border border-white/30 bg-black/20 px-4 py-2"
            >
              Abrir video
            </a>
          )}

          <p className="text-sm text-[var(--muted)]">{apod.explanation}</p>
          <p className="text-xs text-[var(--muted)]">Data: {apod.date}</p>
        </article>
    </section>
  );
}
