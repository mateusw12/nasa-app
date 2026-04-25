"use client";

import { useQuery } from "@tanstack/react-query";
import { NasaLibraryResponse } from "@/libs/DTO";

const fetchLibrary = async (query: string): Promise<NasaLibraryResponse> => {
  const response = await fetch(`/api/library/search?q=${encodeURIComponent(query)}`);

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(payload?.message || "Nao foi possivel carregar a biblioteca NASA.");
  }

  return response.json();
};

export const useLibrarySearch = (query: string) => {
  return useQuery({
    queryKey: ["library-search", query],
    queryFn: () => fetchLibrary(query),
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 10,
  });
};
