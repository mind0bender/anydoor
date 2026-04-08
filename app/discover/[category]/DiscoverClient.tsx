"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Home,
  MapPin,
  SlidersHorizontal,
  Star,
  Wand2,
} from "lucide-react";
import { Listing, PriceTier } from "../data";
import { useFavourites } from "@/components/FavoritesProvider";

export type ViewMode = "grid" | "list";

export interface CategoryPayload {
  slug: string;
  title: string;
  tagline: string;
  total: number;
  listings: Listing[];
}

interface Props {
  category: CategoryPayload;
  initialView: ViewMode;
}

interface PriceOption {
  value: PriceTier;
  label: string;
  description: string;
  min: number;
  max?: number;
}

const priceOptions: PriceOption[] = [
  {
    value: "₹",
    label: "Under ₹900",
    description: "Everyday picks",
    min: 0,
    max: 900,
  },
  {
    value: "₹₹",
    label: "₹900 - ₹1,400",
    description: "Comfort",
    min: 900,
    max: 1400,
  },
  {
    value: "₹₹₹",
    label: "₹1,400 - ₹2,400",
    description: "Premium",
    min: 1400,
    max: 2400,
  },
  { value: "₹₹₹₹", label: "₹2,400+", description: "Luxury", min: 2400 },
];

const ratingOptions = [
  { label: "Any rating", value: 0 },
  { label: "4.5+ Exceptional", value: 4.5 },
  { label: "4.0+ Highly Rated", value: 4.0 },
];

const formatINR = (amount: number): string =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const cn = (...classes: Array<string | undefined | null | false>) =>
  classes.filter(Boolean).join(" ");

export default function DiscoverClient({ category, initialView }: Props) {
  const [view, setView] = useState<ViewMode>(initialView);
  const [price, setPrice] = useState<PriceOption | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [distance, setDistance] = useState<number>(5);

  const filteredListings = useMemo(() => {
    return category.listings.filter((listing) => {
      const inPrice = price
        ? price.max
          ? listing.startingFrom >= price.min &&
            listing.startingFrom <= price.max
          : listing.startingFrom >= price.min
        : true;
      const inRating = listing.rating >= rating;
      // Distance is cosmetic for now; real data not available.
      return inPrice && inRating;
    });
  }, [category.listings, price, rating]);

  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-8">
      <aside className="w-full lg:w-[320px] shrink-0 bg-white/95 rounded-3xl p-6 shadow-sm border border-white/60 flex flex-col gap-6 lg:sticky lg:top-6 lg:h-fit">
        <div className="flex items-center justify-between">
          <SectionLabel label="Filters" />
          <button
            className="text-xs font-semibold text-[#0b6b5d] hover:underline"
            onClick={() => {
              setPrice(null);
              setRating(0);
              setDistance(5);
            }}
          >
            Reset
          </button>
        </div>

        <SectionLabel label="Price range" />
        <div className="grid grid-cols-2 gap-3">
          <PillButton
            active={price === null}
            full
            onClick={() => setPrice(null)}
          >
            All prices
          </PillButton>
          {priceOptions.map((option) => (
            <PriceTile
              key={option.value}
              option={option}
              active={option.value === price?.value}
              onClick={() => setPrice(option)}
            />
          ))}
        </div>

        <SectionLabel label="Minimum rating" />
        <div className="flex flex-col gap-2 text-sm text-[#003531]">
          {ratingOptions.map((opt) => (
            <RadioItem
              key={opt.label}
              label={opt.label}
              active={rating === opt.value}
              onChange={() => setRating(opt.value)}
            />
          ))}
        </div>

        <SectionLabel label="Distance" />
        <div className="flex flex-col gap-2">
          <input
            type="range"
            min={1}
            max={10}
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="accent-[#0b6b5d]"
          />
          <div className="flex justify-between text-xs text-[#1e5a52]">
            <span>&lt; 1 km</span>
            <span>{distance} km</span>
          </div>
        </div>

        <SectionLabel label="Availability" />
        <PillButton active full>
          Any Date
        </PillButton>

        <button className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#0b6b5d] text-white py-3 px-4 hover:opacity-90 transition">
          <MapPin size={16} /> View on Map
        </button>
      </aside>

      <section className="flex-1 flex flex-col gap-4 min-w-0">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white/80 rounded-2xl border border-white/60 shadow-sm p-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white/80 border border-white/60 px-4 py-2 text-sm font-semibold text-[#0b6b5d] shadow-sm hover:bg-white transition"
            >
              <Home size={16} /> Home
            </Link>
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl sm:text-3xl font-semibold">
                {category.title}
              </h1>
              <p className="text-sm text-[#1e5a52]">{category.tagline}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm text-[#1e5a52] flex-wrap">
            <span>
              Showing {filteredListings.length} of {category.total} sanctuaries
            </span>
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-white/80 rounded-full shadow-sm border border-white/60">
              <SlidersHorizontal size={16} />
              <span>Filters</span>
            </div>
            <ViewToggle view={view} onChange={setView} />
          </div>
        </header>

        <div className="bg-white/80 rounded-2xl border border-white/60 shadow-sm p-4 flex flex-wrap items-center gap-3 justify-between">
          <div className="flex items-center gap-2 text-sm text-[#1e5a52]">
            <SlidersHorizontal size={16} />
            <span>
              Curated for balance — showing nearby, top rated, and great value.
            </span>
          </div>
          <button className="rounded-full px-4 py-2 text-sm font-semibold bg-[#0b6b5d] text-white hover:opacity-90 transition">
            Sort: Rating
          </button>
        </div>

        <div
          className={
            view === "grid"
              ? "grid sm:grid-cols-2 gap-6"
              : "flex flex-col gap-4"
          }
        >
          {filteredListings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              view={view}
              categorySlug={category.slug}
            />
          ))}
          {filteredListings.length === 0 && (
            <div className="rounded-2xl border border-dashed border-[#0b6b5d]/30 bg-white/70 p-6 text-sm text-[#1e5a52]">
              No matches found. Try relaxing price or rating filters.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

const SectionLabel = ({ label }: { label: string }) => (
  <div className="text-xs uppercase font-semibold tracking-wide text-[#1e5a52] flex items-center gap-2">
    <span>{label}</span>
    <span className="h-px flex-1 bg-[#b3e7dc]" />
  </div>
);

interface PillButtonProps {
  children: React.ReactNode;
  active?: boolean;
  full?: boolean;
  onClick?: () => void;
}

const PillButton = ({
  children,
  active = false,
  full = false,
  onClick,
}: PillButtonProps) => (
  <button
    onClick={onClick}
    className={cn(
      "rounded-full px-4 py-2 text-sm font-semibold border transition shadow-sm",
      active
        ? "bg-[#0b6b5d] text-white border-transparent"
        : "bg-white text-[#0b6b5d] border-[#0b6b5d]/20 hover:border-[#0b6b5d]/60",
      full ? "w-full" : undefined,
    )}
  >
    {children}
  </button>
);

interface PriceTileProps {
  option: PriceOption;
  active?: boolean;
  onClick: () => void;
}

const PriceTile = ({ option, active = false, onClick }: PriceTileProps) => (
  <button
    onClick={onClick}
    className={cn(
      "rounded-2xl border p-3 shadow-sm cursor-pointer transition text-left w-full",
      active
        ? "bg-[#0b6b5d] text-white border-transparent shadow-md"
        : "bg-white text-[#0b6b5d] border-[#0b6b5d]/20 hover:border-[#0b6b5d]/60",
    )}
  >
    <div className="text-sm font-semibold">{option.label}</div>
    <div className="text-xs opacity-80">{option.description}</div>
  </button>
);

interface RadioItemProps {
  label: string;
  active?: boolean;
  onChange: () => void;
}

const RadioItem = ({ label, active = false, onChange }: RadioItemProps) => (
  <label className="flex items-center gap-2 cursor-pointer" onClick={onChange}>
    <span
      className={cn(
        "w-4 h-4 rounded-full border flex items-center justify-center",
        active ? "border-[#0b6b5d]" : "border-[#1e5a52]",
      )}
    >
      {active && <span className="w-2.5 h-2.5 rounded-full bg-[#0b6b5d]" />}
    </span>
    <span>{label}</span>
  </label>
);

interface ViewToggleProps {
  view: ViewMode;
  onChange: (view: ViewMode) => void;
}

const ViewToggle = ({ view, onChange }: ViewToggleProps) => (
  <div className="flex items-center gap-1 rounded-full border border-white/60 bg-white/80 shadow-sm p-1">
    <button
      onClick={() => onChange("grid")}
      className={cn(
        "px-3 py-1.5 rounded-full font-semibold transition",
        view === "grid"
          ? "bg-[#0b6b5d] text-white shadow"
          : "text-[#0b6b5d] hover:bg-white",
      )}
    >
      Grid
    </button>
    <button
      onClick={() => onChange("list")}
      className={cn(
        "px-3 py-1.5 rounded-full font-semibold transition",
        view === "list"
          ? "bg-[#0b6b5d] text-white shadow"
          : "text-[#0b6b5d] hover:bg-white",
      )}
    >
      List
    </button>
  </div>
);

interface ListingCardProps {
  listing: Listing;
  view: ViewMode;
  categorySlug: string;
}

const ListingCard = ({ listing, view, categorySlug }: ListingCardProps) => {
  const { isFavourite, toggleFavourite } = useFavourites();
  const { name, neighborhood, address, rating, image, startingFrom } = listing;
  const priceLabel = `From ${formatINR(startingFrom)}`;
  const isList = view === "list";
  const selection = { listingId: listing.id, categorySlug };
  const favourite = isFavourite(selection);

  const imageWrapperClasses = isList
    ? "relative w-36 md:w-44 flex-shrink-0 aspect-[4/5] overflow-hidden rounded-2xl"
    : "relative w-full aspect-[4/5] max-h-[320px] overflow-hidden rounded-2xl";

  return (
    <article
      className={cn(
        "bg-white/90 rounded-3xl shadow-sm border border-white/60 overflow-hidden transition hover:shadow-md hover:-translate-y-0.5 flex",
        isList ? "flex-row" : "flex-col",
      )}
    >
      <div className={cn(imageWrapperClasses, "bg-white")}>
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover hover:scale-[1.02] transition duration-300"
          sizes={
            isList
              ? "(max-width: 768px) 50vw, 320px"
              : "(max-width: 768px) 100vw, 50vw"
          }
        />
        {!isList && (
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <Tag tone="dark">{priceLabel}</Tag>
            <Tag>
              <Star className="text-[#f59e0b] fill-[#f59e0b]" size={14} />{" "}
              {rating.toFixed(1)}
            </Tag>
            <button
              type="button"
              onClick={() => toggleFavourite(selection)}
              aria-pressed={favourite}
              className="w-9 h-9 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow-sm border border-white/60 hover:scale-105 transition"
              aria-label={favourite ? "Remove favourite" : "Add favourite"}
            >
              <Heart
                size={16}
                className={
                  favourite ? "text-[#0b6b5d] fill-[#0b6b5d]" : "text-[#0b6b5d]"
                }
              />
            </button>
          </div>
        )}
      </div>
      <div className="p-4 sm:p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="text-sm text-[#1e5a52] flex items-center gap-2">
            <MapPin size={14} /> {neighborhood}, {address}
          </div>
          {isList && (
            <div className="flex items-center gap-2 flex-wrap justify-end">
              <Tag tone="dark">{priceLabel}</Tag>
              <Tag>
                <Star className="text-[#f59e0b] fill-[#f59e0b]" size={14} />{" "}
                {rating.toFixed(1)}
              </Tag>
            </div>
          )}
        </div>
        <h3 className="text-lg font-semibold text-[#003531]">{name}</h3>
        <div className="mt-auto flex gap-2 sm:gap-3 items-center flex-wrap">
          {!isList && <Tag tone="dark">{priceLabel}</Tag>}
          <Link
            href={`/discover/${encodeURIComponent(categorySlug)}/${encodeURIComponent(listing.id)}`}
            className="flex-1 min-w-40 flex items-center justify-center gap-2 rounded-full bg-[#0b6b5d] text-white font-semibold py-3 hover:opacity-90 transition"
          >
            Book Now <Wand2 size={16} />
          </Link>
          <button
            type="button"
            onClick={() => toggleFavourite(selection)}
            aria-pressed={favourite}
            className="w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow-sm border border-white/60 hover:scale-105 transition"
            aria-label={favourite ? "Remove favourite" : "Add favourite"}
          >
            <Heart
              size={18}
              className={
                favourite ? "text-[#0b6b5d] fill-[#0b6b5d]" : "text-[#0b6b5d]"
              }
            />
          </button>
        </div>
      </div>
    </article>
  );
};

const Tag = ({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
}) => (
  <span
    className={cn(
      "px-3 py-1 rounded-full text-sm font-semibold shadow-sm border flex items-center gap-1",
      tone === "dark"
        ? "bg-[#0b6b5d] text-white border-[#0b6b5d]"
        : "bg-white/90 text-[#003531] border-white/60",
    )}
  >
    {children}
  </span>
);
