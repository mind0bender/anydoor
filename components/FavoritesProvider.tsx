"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const FAVORITES_STORAGE_KEY = "anydoor:favorites";

export interface FavoriteSelection {
  listingId: string;
  categorySlug: string;
}

interface FavoritesContextValue {
  favorites: FavoriteSelection[];
  favoriteCount: number;
  isFavorite: (selection: FavoriteSelection) => boolean;
  toggleFavorite: (selection: FavoriteSelection) => void;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

const isFavoriteSelection = (value: unknown): value is FavoriteSelection => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;
  return typeof record.listingId === "string" && typeof record.categorySlug === "string";
};

const getFavoriteKey = (selection: FavoriteSelection): string => `${selection.categorySlug}:${selection.listingId}`;

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteSelection[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (!raw) {
        return;
      }

      const parsed = JSON.parse(raw) as unknown;
      if (!Array.isArray(parsed)) {
        return;
      }

      const normalized = parsed.filter(isFavoriteSelection);
      setFavorites(normalized);
    } catch {
      // Ignore malformed local storage payloads.
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = useCallback(
    (selection: FavoriteSelection) => favorites.some((item) => getFavoriteKey(item) === getFavoriteKey(selection)),
    [favorites]
  );

  const toggleFavorite = useCallback((selection: FavoriteSelection) => {
    setFavorites((current) => {
      const exists = current.some((item) => getFavoriteKey(item) === getFavoriteKey(selection));
      if (exists) {
        return current.filter((item) => getFavoriteKey(item) !== getFavoriteKey(selection));
      }

      return [...current, selection];
    });
  }, []);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favorites,
      favoriteCount: favorites.length,
      isFavorite,
      toggleFavorite,
      clearFavorites,
    }),
    [favorites, isFavorite, toggleFavorite, clearFavorites]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider.");
  }

  return context;
}
