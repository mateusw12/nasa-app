import { NasaApiClient } from "@/libs/api/nasa-client";
import { DonkiEvent } from "@/libs/DTO";

export class SpaceWeatherService {
  static getSpaceWeather(): Promise<DonkiEvent[]> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    return NasaApiClient.get<DonkiEvent[]>(
      "/DONKI/FLR",
      {
        startDate: startDate.toISOString().slice(0, 10),
      },
      { revalidate: 3600 },
    );
  }
}
