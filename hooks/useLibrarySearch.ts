"use client";

import { useQuery } from "@tanstack/react-query";
import { LibraryMediaType } from "@/libs/enum";
import { LibraryClientService } from "@/libs/services";

export const useLibrarySearch = (query: string, mediaType: LibraryMediaType) => {
  return useQuery({
    queryKey: ["library-search", query, mediaType],
    queryFn: () => LibraryClientService.searchMedia(query, mediaType),
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 10,
  });
};
