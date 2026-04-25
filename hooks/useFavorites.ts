"use client";

import { useState } from "react";

const STORAGE_KEY = "nasa-space-favorites";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    try {
      return JSON.parse(raw) as string[];
    } catch {
      return [];
    }
  });

  const persist = (next: string[]) => {
    setFavorites(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      persist(favorites.filter((item) => item !== id));
      return;
    }

    persist([...favorites, id]);
  };

  return {
    favorites,
    isFavorite: (id: string) => favorites.includes(id),
    toggleFavorite,
  };
};
