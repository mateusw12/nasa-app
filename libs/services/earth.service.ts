import { NasaApiClient } from "@/libs/api/nasa-client";
import { EonetResponse, EpicImage } from "@/libs/DTO";

export class EarthService {
  static getEarthImages(date?: string): Promise<EpicImage[]> {
    const endpoint = date ? `/EPIC/api/natural/date/${date}` : "/EPIC/api/natural/images";
    return NasaApiClient.get<EpicImage[]>(endpoint, undefined, { revalidate: 3600 });
  }

  static getEarthEvents(): Promise<EonetResponse> {
    const path = "/EONET/api/v3/events";
    return NasaApiClient.get<EonetResponse>(path, { limit: "20", status: "open" }, { revalidate: 1800 });
  }
}
