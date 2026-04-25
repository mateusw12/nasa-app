import { ExternalApiClient } from "@/libs/api/external-client";
import {
  NasaLibraryAssetResponse,
  NasaLibraryCaptionsResponse,
  NasaLibraryMetadataResponse,
  NasaLibraryResponse,
} from "@/libs/DTO";
import { LibraryMediaType } from "@/libs/enum";

const NASA_IMAGES_BASE_URL = "https://images-api.nasa.gov";

export class LibraryService {
  static searchMedia(query: string, mediaType: LibraryMediaType = LibraryMediaType.All): Promise<NasaLibraryResponse> {
    const url = new URL(`${NASA_IMAGES_BASE_URL}/search`);
    url.searchParams.set("q", query || "space");
    url.searchParams.set("media_type", mediaType);

    return ExternalApiClient.get<NasaLibraryResponse>(url.toString(), { revalidate: 900 });
  }

  static getAssetManifest(nasaId: string): Promise<NasaLibraryAssetResponse> {
    const url = `${NASA_IMAGES_BASE_URL}/asset/${encodeURIComponent(nasaId)}`;
    return ExternalApiClient.get<NasaLibraryAssetResponse>(url, { revalidate: 3600 });
  }

  static getMetadataLocation(nasaId: string): Promise<NasaLibraryMetadataResponse> {
    const url = `${NASA_IMAGES_BASE_URL}/metadata/${encodeURIComponent(nasaId)}`;
    return ExternalApiClient.get<NasaLibraryMetadataResponse>(url, { revalidate: 3600 });
  }

  static getCaptionsLocation(nasaId: string): Promise<NasaLibraryCaptionsResponse> {
    const url = `${NASA_IMAGES_BASE_URL}/captions/${encodeURIComponent(nasaId)}`;
    return ExternalApiClient.get<NasaLibraryCaptionsResponse>(url, { revalidate: 3600 });
  }
}
