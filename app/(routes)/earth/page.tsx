import Image from "next/image";
import { Card } from "@/components/card";
import { DatePicker } from "@/components/date-picker";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { GalleryGrid } from "@/components/gallery-grid";
import { SectionHeader } from "@/components/section-header";
import { EarthService } from "@/libs/services/earth.service";
import { getToday } from "@/utils/date";

interface EarthPageProps {
  searchParams: {
    date?: string;
  };
}

const epicImageUrl = (date: string, image: string) => {
  const [year, month, day] = date.slice(0, 10).split("-");
  return `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${image}.png`;
};

export default async function EarthPage({ searchParams }: EarthPageProps) {
  const date = searchParams.date || getToday();
  let images;
  try {
    images = await EarthService.getEarthImages(date);
  } catch (error) {
    return <ErrorState message={(error as Error).message} />;
  }

  return (
    <section className="space-y-6">
      <SectionHeader
        title="Earth Images (EPIC)"
        description="Imagens da Terra vistas do espaco, para observar o planeta com perspectiva global."
      />

        <div className="rounded-2xl border border-white/20 bg-white/5 p-4">
          <DatePicker name="date" defaultValue={date} label="Data" />
        </div>

        {images.length === 0 ? (
          <EmptyState title="Sem imagens para essa data" description="Selecione outro dia para buscar novas fotos EPIC." />
        ) : (
          <GalleryGrid>
            {images.slice(0, 15).map((item) => (
              <Card key={item.identifier} title={item.caption} subtitle={item.date} className="card-hover">
                <Image
                  src={epicImageUrl(item.date, item.image)}
                  alt={item.caption}
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
