"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const FAVOURITES_STORAGE_KEY = "anydoor:favourites";

export interface FavouriteSelection {
  listingId: string;
  categorySlug: string;
}

interface FavouritesContextValue {
  favourites: FavouriteSelection[];
  favouriteCount: number;
  isFavourite: (selection: FavouriteSelection) => boolean;
  toggleFavourite: (selection: FavouriteSelection) => void;
  clearFavourites: () => void;
}

const FavouritesContext = createContext<FavouritesContextValue | null>(null);

const isFavouriteSelection = (value: unknown): value is FavouriteSelection => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;
  return (
    typeof record.listingId === "string" &&
    typeof record.categorySlug === "string"
  );
};

const getFavouriteKey = (selection: FavouriteSelection): string =>
  `${selection.categorySlug}:${selection.listingId}`;

export default function FavouritesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [favourites, setFavourites] = useState<FavouriteSelection[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const raw = window.localStorage.getItem(FAVOURITES_STORAGE_KEY);
      if (!raw) {
        setIsHydrated(true);
        return;
      }

      const parsed = JSON.parse(raw) as unknown;
      if (!Array.isArray(parsed)) {
        setIsHydrated(true);
        return;
      }

      const normalized = parsed.filter(isFavouriteSelection);
      setFavourites(normalized);
    } catch {
      // Ignore malformed local storage payloads.
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !isHydrated) {
      return;
    }

    window.localStorage.setItem(
      FAVOURITES_STORAGE_KEY,
      JSON.stringify(favourites),
    );
  }, [favourites, isHydrated]);

  const isFavourite = useCallback(
    (selection: FavouriteSelection) =>
      favourites.some(
        (item) => getFavouriteKey(item) === getFavouriteKey(selection),
      ),
    [favourites],
  );

  const toggleFavourite = useCallback((selection: FavouriteSelection) => {
    setFavourites((current) => {
      const exists = current.some(
        (item) => getFavouriteKey(item) === getFavouriteKey(selection),
      );
      if (exists) {
        return current.filter(
          (item) => getFavouriteKey(item) !== getFavouriteKey(selection),
        );
      }

      return [...current, selection];
    });
  }, []);

  const clearFavourites = useCallback(() => {
    setFavourites([]);
  }, []);

  const value = useMemo<FavouritesContextValue>(
    () => ({
      favourites,
      favouriteCount: favourites.length,
      isFavourite,
      toggleFavourite,
      clearFavourites,
    }),
    [favourites, isFavourite, toggleFavourite, clearFavourites],
  );

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites(): FavouritesContextValue {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error("useFavourites must be used within a FavouritesProvider.");
  }

  return context;
}
