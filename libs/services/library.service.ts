import { ExternalApiClient } from "@/libs/api/external-client";
import { NasaLibraryResponse } from "@/types/nasa";

const NASA_IMAGES_BASE_URL = "https://images-api.nasa.gov";

export class LibraryService {
  static searchMedia(query: string): Promise<NasaLibraryResponse> {
    const url = new URL(`${NASA_IMAGES_BASE_URL}/search`);
    url.searchParams.set("q", query || "space");
    url.searchParams.set("media_type", "image,video");

    return ExternalApiClient.get<NasaLibraryResponse>(url.toString(), { revalidate: 900 });
  }
}
