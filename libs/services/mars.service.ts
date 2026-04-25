import { NasaApiClient, NasaApiError } from "@/libs/api/nasa-client";
import { LibraryService } from "@/libs/services/library.service";
import { MarsPhotosResponse, NasaLibraryResponse } from "@/libs/DTO";

export interface MarsPhotosParams {
  earth_date?: string;
  camera?: string;
}

const mapLibraryToMarsPhotos = (payload: NasaLibraryResponse): MarsPhotosResponse => {
  const photos = payload.collection.items
    .map((item, index) => {
      const data = item.data[0];
      const preview = item.links?.[0]?.href;

      if (!preview) {
        return null;
      }

      return {
        id: Number(data.nasa_id?.replace(/\D/g, "").slice(0, 8) || `${index + 1}`),
        sol: 0,
        camera: {
          id: 0,
          name: "library",
          rover_id: 0,
          full_name: "NASA Media Library",
        },
        img_src: preview,
        earth_date: (data.date_created || "").slice(0, 10) || "N/A",
        rover: {
          id: 0,
          name: "Curiosity Archive",
          landing_date: "N/A",
          launch_date: "N/A",
          status: "active",
        },
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return { photos };
};

export class MarsService {
  static async getMarsPhotos(params: MarsPhotosParams = {}): Promise<MarsPhotosResponse> {
    try {
      return await NasaApiClient.get<MarsPhotosResponse>(
        "/mars-photos/api/v1/rovers/curiosity/photos",
        {
          earth_date: params.earth_date,
          camera: params.camera,
        },
        { revalidate: 1800 },
      );
    } catch (error) {
      if (error instanceof NasaApiError && error.status === 404) {
        const cameraHint = params.camera ? ` ${params.camera}` : "";
        const fallbackQuery = `mars rover curiosity${cameraHint}`;
        const fallback = await LibraryService.searchMedia(fallbackQuery);
        return mapLibraryToMarsPhotos(fallback);
      }

      throw error;
    }
  }
}
