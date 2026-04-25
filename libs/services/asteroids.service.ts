import { NasaApiClient } from "@/libs/api/nasa-client";
import { NeoFeedResponse } from "@/types/nasa";

export interface AsteroidsParams {
  start_date?: string;
  end_date?: string;
}

export class AsteroidsService {
  static getAsteroids(params: AsteroidsParams = {}): Promise<NeoFeedResponse> {
    return NasaApiClient.get<NeoFeedResponse>(
      "/neo/rest/v1/feed",
      {
        start_date: params.start_date,
        end_date: params.end_date,
      },
      { revalidate: 3600 },
    );
  }
}
