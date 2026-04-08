"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, Plus, Star, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { categories } from "@/app/discover/data";
import { useFavourites } from "@/components/FavoritesProvider";

type FavouriteFilter = "all" | string;

const categoryChipLabel: Record<string, string> = {
  spa: "Spas",
  "hair-salon": "Salons",
  "auto-repair": "Auto",
  dentist: "Dental",
};

export default function FavouritesPage() {
  const { favourites, toggleFavourite } = useFavourites();
  const [activeFilter, setActiveFilter] = useState<FavouriteFilter>("all");

  const favouriteListings = useMemo(() => {
    return favourites
      .map((favourite) => {
        const category = categories.find(
          (item) => item.slug === favourite.categorySlug,
        );
        if (!category) {
          return null;
        }

        const listing = category.listings.find(
          (item) => item.id === favourite.listingId,
        );
        if (!listing) {
          return null;
        }

        return { category, listing, favourite };
      })
      .filter((entry): entry is NonNullable<typeof entry> => entry !== null);
  }, [favourites]);

  const filterChips = useMemo(() => {
    const fromFavourites = Array.from(
      new Set(favouriteListings.map((item) => item.category.slug)),
    );
    const allKnown = categories.map((item) => item.slug);
    const merged = Array.from(new Set([...fromFavourites, ...allKnown]));
    return ["all", ...merged] as FavouriteFilter[];
  }, [favouriteListings]);

  const visibleListings = useMemo(() => {
    if (activeFilter === "all") {
      return favouriteListings;
    }

    return favouriteListings.filter(
      (item) => item.category.slug === activeFilter,
    );
  }, [favouriteListings, activeFilter]);

  return (
    <section className="w-full bg-primary-200 text-[#003531]">
      <div className="mx-auto max-w-325 px-4 sm:px-8 py-12 space-y-8">
        <header className="space-y-2">
          <h1 className="text-5xl font-bold tracking-tight">Favourites</h1>
          <p className="text-[#1e5a52] text-lg">
            Your curated collection of local gems.
          </p>
        </header>

        <div className="flex flex-wrap gap-2">
          {filterChips.map((chip) => {
            const active = chip === activeFilter;
            const label =
              chip === "all" ? "All" : (categoryChipLabel[chip] ?? chip);
            return (
              <button
                key={chip}
                type="button"
                onClick={() => setActiveFilter(chip)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-[#0b6b5d] text-white"
                    : "bg-[#9eece0] text-[#0b6b5d] hover:bg-[#8ee6d8]"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {visibleListings.length === 0 ? (
          <div className="rounded-3xl bg-white/80 border border-white/70 p-8 shadow-sm text-center space-y-4">
            <p className="text-[#1e5a52]">
              No favourites in this category yet.
            </p>
            <Link
              href="/discover"
              className="inline-flex items-center justify-center rounded-full bg-[#0b6b5d] text-white px-6 py-3 font-semibold hover:opacity-90 transition"
            >
              Browse Categories
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleListings.map(({ category, listing, favourite }) => (
              <article
                key={`${category.slug}-${listing.id}`}
                className="bg-white/80 rounded-[26px] border border-white/70 overflow-hidden shadow-sm"
              >
                <div className="relative aspect-4/3">
                  <Image
                    src={listing.image}
                    alt={listing.name}
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => toggleFavourite(favourite)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 inline-flex items-center justify-center"
                    aria-label="Remove favourite"
                  >
                    <Heart
                      size={15}
                      className="fill-[#b1551b] text-[#b1551b]"
                    />
                  </button>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-3xl leading-tight font-semibold tracking-tight">
                        {listing.name}
                      </h2>
                      <p className="text-sm text-[#2a6b62] inline-flex items-center gap-1 mt-1">
                        <MapPin size={12} /> {listing.neighborhood},{" "}
                        {listing.address}
                      </p>
                    </div>
                    <span className="rounded-lg bg-[#ffe6d3] px-2 py-1 text-xs font-semibold text-[#b1551b] inline-flex items-center gap-1 shrink-0">
                      <Star
                        size={12}
                        className="fill-[#ff8f44] text-[#ff8f44]"
                      />{" "}
                      {listing.rating.toFixed(1)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`/discover/${encodeURIComponent(category.slug)}/${encodeURIComponent(listing.id)}`}
                      className="flex-1 rounded-full bg-[#0b6b5d] text-white py-2.5 text-center font-semibold hover:opacity-90 transition"
                    >
                      Book Again
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleFavourite(favourite)}
                      className="w-10 h-10 rounded-full bg-[#86e8d8] text-[#0b6b5d] inline-flex items-center justify-center hover:bg-[#76ddcc] transition"
                      aria-label="Remove favourite"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="pt-10 text-center space-y-4">
          <div className="mx-auto w-14 h-14 rounded-full bg-[#9eece0] text-[#0b6b5d] inline-flex items-center justify-center">
            <Plus size={24} />
          </div>
          <p className="text-[#1e5a52]">
            Keep exploring to discover more gems.
          </p>
          <Link
            href="/discover"
            className="font-semibold text-[#0b6b5d] hover:underline"
          >
            Browse Categories
          </Link>
        </div>
      </div>
    </section>
  );
}
