import { NasaLibraryAssetItem, NasaLibraryAssetResponse } from "@/libs/DTO";
import { LibraryClientService } from "@/libs/services/library-client.service";

const pickPlayableVideo = (items: NasaLibraryAssetItem[]): string | null => {
  const mp4 = items.find((item) => item.href.toLowerCase().endsWith(".mp4"));
  return mp4?.href || null;
};

export const fetchPlayableVideoSource = async (nasaId: string): Promise<string> => {
  const payload: NasaLibraryAssetResponse = await LibraryClientService.getAssetManifest(nasaId);
  const source = pickPlayableVideo(payload.collection?.items || []);

  if (!source) {
    throw new Error("A NASA nao retornou um arquivo MP4 reproduzivel para este item.");
  }

  return source;
};
