"use client";

import { useQuery } from "@tanstack/react-query";
import { MarsPhotosResponse } from "@/libs/DTO";

const fetchMissionLandingPhoto = async (): Promise<MarsPhotosResponse> => {
  const response = await fetch("/api/missions/curiosity-landing");

  if (!response.ok) {
    const errorPayload = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(errorPayload?.message || "Nao foi possivel carregar os dados da missao.");
  }

  return response.json();
};

export const useMissionPhotos = () => {
  return useQuery({
    queryKey: ["missions", "curiosity-landing"],
    queryFn: fetchMissionLandingPhoto,
    staleTime: 1000 * 60 * 60 * 6,
    gcTime: 1000 * 60 * 60 * 12,
  });
};
