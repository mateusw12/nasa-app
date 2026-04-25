import { MarsPhotosResponse } from "@/libs/DTO";

export class MissionsClientService {
  static async getCuriosityLandingPhoto(): Promise<MarsPhotosResponse> {
    const response = await fetch("/api/missions/curiosity-landing");

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { message?: string } | null;
      throw new Error(payload?.message || "Nao foi possivel carregar os dados da missao.");
    }

    return (await response.json()) as MarsPhotosResponse;
  }
}
