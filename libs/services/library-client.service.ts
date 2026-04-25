import { NasaLibraryAssetResponse, NasaLibraryResponse } from "@/libs/DTO";
import { LibraryMediaType } from "@/libs/enum";

export class LibraryClientService {
  static async searchMedia(query: string, mediaType: LibraryMediaType): Promise<NasaLibraryResponse> {
    const response = await fetch(
      `/api/library/search?q=${encodeURIComponent(query)}&media_type=${encodeURIComponent(mediaType)}`,
    );

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { message?: string } | null;
      throw new Error(payload?.message || "Nao foi possivel carregar a biblioteca NASA.");
    }

    return (await response.json()) as NasaLibraryResponse;
  }

  static async getAssetManifest(nasaId: string): Promise<NasaLibraryAssetResponse> {
    const response = await fetch(`/api/library/asset/${encodeURIComponent(nasaId)}`);

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { message?: string } | null;
      throw new Error(payload?.message || "Nao foi possivel carregar o asset do video.");
    }

    return (await response.json()) as NasaLibraryAssetResponse;
  }
}
