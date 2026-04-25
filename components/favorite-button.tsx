"use client";

import { useFavorites } from "@/hooks/useFavorites";

interface FavoriteButtonProps {
  id: string;
}

export const FavoriteButton = ({ id }: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(id);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(id)}
      className="rounded-full border border-white/30 px-3 py-1 text-xs transition hover:bg-white/20"
      aria-label="Favoritar item"
    >
      {active ? "★ Favorito" : "☆ Favoritar"}
    </button>
  );
};
