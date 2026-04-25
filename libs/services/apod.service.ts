import { NasaApiClient } from "@/libs/api/nasa-client";
import { APODResponse } from "@/types/nasa";

export class ApodService {
  static getAPOD(date?: string): Promise<APODResponse> {
    return NasaApiClient.get<APODResponse>("/planetary/apod", { date }, { revalidate: 1800 });
  }
}
