import { NasaLibraryAssetResponse } from "@/libs/DTO";

export class LibraryClientService {
  static async getAssetManifest(nasaId: string): Promise<NasaLibraryAssetResponse> {
    const response = await fetch(`/api/library/asset/${encodeURIComponent(nasaId)}`);

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { message?: string } | null;
      throw new Error(payload?.message || "Nao foi possivel carregar o asset do video.");
    }

    return (await response.json()) as NasaLibraryAssetResponse;
  }
}
