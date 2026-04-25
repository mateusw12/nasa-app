"use client";

import { useQuery } from "@tanstack/react-query";
import { MissionsClientService } from "@/libs/services";

export const useMissionPhotos = () => {
  return useQuery({
    queryKey: ["missions", "curiosity-landing"],
    queryFn: () => MissionsClientService.getCuriosityLandingPhoto(),
    staleTime: 1000 * 60 * 60 * 6,
    gcTime: 1000 * 60 * 60 * 12,
  });
};
