"use client";

import { useQuery } from "@tanstack/react-query";
import { NasaLibraryResponse } from "@/libs/DTO";
import { LibraryMediaType } from "@/libs/enum";

const fetchLibrary = async (query: string, mediaType: LibraryMediaType): Promise<NasaLibraryResponse> => {
  const response = await fetch(
    `/api/library/search?q=${encodeURIComponent(query)}&media_type=${encodeURIComponent(mediaType)}`,
  );

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(payload?.message || "Nao foi possivel carregar a biblioteca NASA.");
  }

  return response.json();
};

export const useLibrarySearch = (query: string, mediaType: LibraryMediaType) => {
  return useQuery({
    queryKey: ["library-search", query, mediaType],
    queryFn: () => fetchLibrary(query, mediaType),
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 10,
  });
};
