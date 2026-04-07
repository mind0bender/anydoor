"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Listing, CategoryDefinition, PriceTier } from "../data";
import { FC, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, Sparkles, Users, Clock3, Heart } from "lucide-react";
import { buildBookingSearchParams } from "@/types/booking";
import { useFavorites } from "@/components/FavoritesProvider";

interface CompanyProfileProps {
  listing: Listing;
  category: CategoryDefinition;
}

interface ServiceOption {
  name: string;
  desc: string;
  price: number;
  mins: number;
}

type BookingSlot = {
  time: string;
  period: "morning" | "afternoon";
};
type BookingState = {
  date: Date;
  slot: BookingSlot | null;
};

const today = new Date(2024, 10, 16); // November 16, 2024 (mockup)
const morningSlots: BookingSlot[] = [
  { time: "09:00 AM", period: "morning" },
  { time: "10:30 AM", period: "morning" },
];
const afternoonSlots: BookingSlot[] = [
  { time: "01:45 PM", period: "afternoon" },
  { time: "03:30 PM", period: "afternoon" },
];

const services: ServiceOption[] = [
  {
    name: "The Signature Silk Ritual",
    desc: "A 90-minute immersion involving hot stones, lavender-infused oils, and a full-body exfoliation.",
    price: 210,
    mins: 90,
  },
  {
    name: "Botanical Radiance Facial",
    desc: "Custom-blended serums using seasonal flora to restore your skin's natural glow.",
    price: 145,
    mins: 60,
  },
  {
    name: "Deep Tissue Restoration",
    desc: "Focused therapeutic pressure to release chronic muscle tension and improve mobility.",
    price: 180,
    mins: 75,
  },
];

type SidebarTab = "availability" | "services" | "staff" | "summary";

const mockStaff = [
  { name: "Priya S.", role: "Senior Therapist" },
  { name: "Rahul M.", role: "Massage Specialist" },
];

const priceTierLabel: Record<PriceTier, string> = {
  "₹": "Budget Tier",
  "₹₹": "Comfort Tier",
  "₹₹₹": "Premium Tier",
  "₹₹₹₹": "Luxury Tier",
};

const CompanyProfile: FC<CompanyProfileProps> = ({ listing, category }) => {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [booking, setBooking] = useState<BookingState>({ date: today, slot: afternoonSlots[0] });
  const [selectedImage, setSelectedImage] = useState<string>(listing.image);
  // Sidebar state
  const [tab, setTab] = useState<SidebarTab>("availability");
  // Calendar navigation
  const [calendarMonth, setCalendarMonth] = useState<number>(10); // November (0-based)
  const [calendarYear, setCalendarYear] = useState<number>(2024);

  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const firstDayOffset = (new Date(calendarYear, calendarMonth, 1).getDay() + 6) % 7; // Monday = 0
  const calendarCells: Array<number | null> = [
    ...Array.from({ length: firstDayOffset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  const goToPreviousMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear((year) => year - 1);
      return;
    }

    setCalendarMonth((month) => month - 1);
  };

  const goToNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear((year) => year + 1);
      return;
    }

    setCalendarMonth((month) => month + 1);
  };
  // selected service for UX + summary
  const [selectedService, setSelectedService] = useState<ServiceOption>(services[0]);
  const favoriteSelection = { listingId: listing.id, categorySlug: category.slug };
  const favorite = isFavorite(favoriteSelection);
  const reviews = [
    {
      name: "Elena S.",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwarYn6RedGsH9-2X8U_dCd3Sr4v81RRuO0dHyQxfNaAw9NxEAq_UW63gzegPeeP7xAHr2C5hTo4q9a6eXa_oEgQcn83YSvMoUQ4_C4myZKqCb0FJvPmMvF7aMrGgT8LuPUoA2k9DGnsyhmnnZUut5cbVSYwHyBh4pm5P9YIapqG-vs9xiBVnfVfG5K3jMJWSiAnjtew-2nuboJC0Gtm0XMtmw3KkQ5gFJ6aeNtnNR0avawuffP2XnCsvIes4M5ocAvTLObEH2qxBo",
      rating: 5,
      text: "The most peaceful 90 minutes of my year. The Silk Ritual is life-changing.",
    },
    {
      name: "Marcus L.",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiicQ_kE1ZyCKjE3UZ6uBg7euBMdeA4qhOAyFADg-o_Sn6HFDnjAQtCPaDNxn2LQ4qsRsEDl1gDgPN3sJZLRmi1OAYs9krsTdxB3II8TzkES1FcLLf36kWKl7wN_ytnHKugtxDSJQK0JgS4GE-1PmEPcsXQ83eFp1lCWpJITV04E-YEyUDyuQbVtiJ_GbqG8jhvC5tWoyxw4uGaErhnP1BzKmhEpFkytZhYDkWknNyu45yuQO4UFwPdtI_vpll9R8BOAx8fQahoOce",
      rating: 5,
      text: "Incredible staff and impeccable design. Truly lives up to the 'Curated' name.",
    },
  ];
  const gallery = [
    listing.image,
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAqkT0xqX6JOvrXeIyId6K_GjkC0LhfL3NgHwrZHiEgkoyl7aapXSBlhSM_Brt-UXCLhmChZp2gsTEkN7zeTJxoqqHZi7hH-qJL00QQ-BNWq_4h65vcnUSVaiB2uQQwI97d12FnDjF_c5VbA-58rP92QPyfsLW7NmLcYkFcC43qP1VBMYE13ZTJNxooLLAg4Irrl6XFmNHchGfZiHdlEtQRvjtcgh1Mq7QNrzP_Iez29trIpOYcuEaGnqh2Ipl8I_UeAZQF0wv35-Bt",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBRgPGh0PNmU6QS2iMSRUG0ZH-xU-gCeeZHK_qWK875keERI7SwCJ1Dqmn_XTbwYN1tHdREjeCjgplDYiW7_xXbz2MVSyVYhoCch0vimEe4LCCqzQKJQkbE3BDfZJ9y0jXGFeLLCCnJ6nHkSW-yoTugULNokUpMRvNmKq424i1epoVEt2uqiyv-yPeCQ-nTPQwbyGXz0tdUjhCFJi-m4EEzAa1rhFkcvd_HlgYaN96uOZfEt1O3nOvbnSJTvFue5sVxlcStjsTJ1w7Z",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAxVizA0NedNyi2jbIddTlXlBmZGoMZh0rTzKiiCKPwohIMHAEgJSF3F-6rBT_qR-LVTUs2IBCurIvGyRg-o7kllD0he8zn49mRGzRhhPh-YhQtymZwHBMQUSkQNN-vCqZ9cZfVdMCn_j53rbplRDH6WZ3sihNZ_eYhsapTGc54vB3_S2CtZxF9PFHRK0miLk5nRgGKt0Hu46QeNOrynmwQxGS0ZWl0SSAAJrr5hh6yp9K_GJsUZS3wraw5LuJgAzhc6g8w7YYv3NH5",
  ];

  return (
    <main className="px-4 sm:px-6 lg:px-8 py-8 lg:py-12 lg:pr-[30rem] xl:pr-[32rem]">
      <div className="max-w-[1400px] w-full mx-auto grid lg:grid-cols-16 gap-8">
        {/* Main content (left) */}
        <section className="lg:col-span-10 col-span-12 space-y-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#1e5a52]">
            <span className="rounded-full bg-white/70 px-3 py-1">{category.title}</span>
            <span className="rounded-full bg-white/70 px-3 py-1">{listing.neighborhood}</span>
            <span className="rounded-full bg-white/70 px-3 py-1">{priceTierLabel[listing.priceTier]}</span>
            <span className="rounded-full bg-white/70 px-3 py-1">★ {listing.rating.toFixed(1)}</span>
            <button
              type="button"
              onClick={() => toggleFavorite(favoriteSelection)}
              aria-pressed={favorite}
              className="rounded-full bg-white/70 px-3 py-1 inline-flex items-center gap-1.5 hover:bg-white transition"
            >
              <Heart size={13} className={favorite ? "fill-[#0b6b5d] text-[#0b6b5d]" : "text-[#0b6b5d]"} />
              {favorite ? "Saved" : "Save"}
            </button>
          </div>

          <div className="relative rounded-[2rem] overflow-hidden bg-surface-container-low h-[24rem] sm:h-[30rem] shadow-lg">
            <Image src={selectedImage} alt={listing.name} fill className="object-cover" priority />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#003531]/80 via-[#003531]/35 to-transparent p-5 sm:p-6">
              <div className="max-w-2xl space-y-2 text-white">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-emerald-300" /> Curated booking experience
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">{listing.name}</h1>
                <p className="text-sm sm:text-base text-white/85 max-w-xl">
                  {category.title} • starting at ₹{listing.startingFrom} • refined service with a calm, editorial look.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-1">
            {gallery.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setSelectedImage(image)}
                className={`relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-2xl border-2 transition ${
                  selectedImage === image ? "border-[#0b6b5d] shadow-lg scale-[1.02]" : "border-transparent opacity-80 hover:opacity-100"
                }`}
                aria-pressed={selectedImage === image}
                aria-label={`Preview image ${index + 1}`}
              >
                <Image src={image} alt={`${listing.name} preview ${index + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl bg-white/80 p-6 shadow-sm border border-white/60 space-y-4">
              <h2 className="text-xl font-semibold">The Art of Stillness</h2>
              <p className="text-sm text-[#1e5a52] leading-7">
                Serenity Spa is a sanctuary of wellness, designed to harmonize body and mind through botanical
                therapies, quiet architecture, and highly personalized care.
              </p>
            </div>
            <div className="rounded-3xl bg-[#b3efe5] p-6 shadow-sm border border-white/40 space-y-3">
              <p className="text-xs uppercase tracking-wide text-[#1e5a52] font-semibold">Quick details</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <MiniStat label="Duration" value={`${selectedService.mins} min`} />
                <MiniStat label="Price" value={`₹${selectedService.price}`} />
                <MiniStat label="Location" value={listing.address} />
                <MiniStat label="Staff" value="Elena M." />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Curated Services</h3>
            <div className="grid grid-cols-1 gap-4">
              {services.map((s) => (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => setSelectedService(s)}
                  className={`text-left p-6 rounded-3xl border transition shadow-sm flex justify-between items-start gap-6 ${
                    selectedService.name === s.name
                      ? "bg-[#0b6b5d] text-white border-transparent shadow-lg"
                      : "bg-white/80 border-white/70 hover:shadow-md"
                  }`}
                  aria-pressed={selectedService.name === s.name}
                >
                  <div className="space-y-2 max-w-[60%]">
                    <h4 className="text-lg font-semibold">{s.name}</h4>
                    <p className={`text-sm ${selectedService.name === s.name ? "text-white/80" : "text-[#1e5a52]"}`}>{s.desc}</p>
                    <span className={`mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${selectedService.name === s.name ? "bg-white/15 text-white" : "bg-[#e6f7f2] text-[#0b6b5d]"}`}>
                      {selectedService.name === s.name ? "Selected" : "Select service"}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xl font-bold">₹{s.price}</div>
                    <div className={`text-sm ${selectedService.name === s.name ? "text-white/70" : "text-[#1e5a52]"}`}>{s.mins} mins</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Middle column: imagery + reviews (desktop) */}
        <div className="hidden lg:block lg:col-span-4">
          <div className="space-y-6 lg:sticky lg:top-8">
            <div className="grid grid-cols-1 gap-4">
              {gallery.slice(1, 4).map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={`relative rounded-2xl overflow-hidden bg-surface-container-low h-40 transform transition ${selectedImage === img ? "scale-[1.02] ring-2 ring-[#0b6b5d]" : "hover:scale-105"}`}
                  aria-pressed={selectedImage === img}
                >
                  <Image src={img} alt={`Gallery ${i}`} fill className="object-cover" />
                </button>
              ))}
            </div>

            <div className="bg-white/80 p-6 rounded-3xl shadow-sm border border-white/60">
              <h3 className="text-lg font-bold mb-4">Voices of Serenity</h3>
              <div className="space-y-4">
                {reviews.map((r) => (
                  <div key={r.name} className="bg-[#d5fff9] p-4 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image src={r.avatar} alt={r.name} width={40} height={40} className="object-cover" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{r.name}</div>
                        <div className="text-xs text-emerald-700/70">{r.rating} ★</div>
                      </div>
                    </div>
                    <p className="text-sm italic text-on-surface-variant">"{r.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar (fixed at right) */}
        <aside className="lg:col-span-2 col-span-12">
          <div className="lg:fixed lg:top-20 lg:right-8 lg:w-[24rem] xl:w-[26rem] w-full bg-gradient-to-b from-white/85 to-[#e6f8f3] p-5 rounded-3xl shadow-md border border-white/70 backdrop-blur-md z-50 max-h-[calc(100vh-5rem)] overflow-y-auto">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Booking Concierge</h2>
              <p className="text-sm text-[#2a6b62]">Secure your appointment</p>
            </div>

            <div className="space-y-4 mb-4">
              <nav className="grid grid-cols-2 gap-2">
                <button
                  className={`rounded-xl px-3 py-2.5 text-sm font-semibold border transition inline-flex items-center gap-2 justify-center ${
                    tab === "availability"
                      ? "bg-[#0b6b5d] text-white border-transparent shadow"
                      : "bg-white text-emerald-900 border-[#cde8e1] hover:bg-[#f8fffd]"
                  }`}
                  onClick={() => setTab("availability")}
                >
                  <CalendarDays size={14} /> Availability
                </button>
                <button
                  className={`rounded-xl px-3 py-2.5 text-sm font-semibold border transition inline-flex items-center gap-2 justify-center ${
                    tab === "services"
                      ? "bg-[#0b6b5d] text-white border-transparent shadow"
                      : "bg-white text-emerald-900 border-[#cde8e1] hover:bg-[#f8fffd]"
                  }`}
                  onClick={() => setTab("services")}
                >
                  <Sparkles size={14} /> Services
                </button>
                <button
                  className={`rounded-xl px-3 py-2.5 text-sm font-semibold border transition inline-flex items-center gap-2 justify-center ${
                    tab === "staff"
                      ? "bg-[#0b6b5d] text-white border-transparent shadow"
                      : "bg-white text-emerald-900 border-[#cde8e1] hover:bg-[#f8fffd]"
                  }`}
                  onClick={() => setTab("staff")}
                >
                  <Users size={14} /> Staff
                </button>
                <button
                  className={`rounded-xl px-3 py-2.5 text-sm font-semibold border transition inline-flex items-center gap-2 justify-center ${
                    tab === "summary"
                      ? "bg-[#0b6b5d] text-white border-transparent shadow"
                      : "bg-white text-emerald-900 border-[#cde8e1] hover:bg-[#f8fffd]"
                  }`}
                  onClick={() => setTab("summary")}
                >
                  <Clock3 size={14} /> Summary
                </button>
              </nav>
              <div>
                {tab === "availability" && (
                  <div className="space-y-4 rounded-2xl bg-[#f4fffb] p-3 border border-[#d6eee8] transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <button aria-label="Previous month" onClick={goToPreviousMonth} className="p-1 rounded transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                        <ArrowLeft size={16} className="text-emerald-800" />
                      </button>
                      <div className="text-sm font-bold">{new Date(calendarYear, calendarMonth).toLocaleString("default", { month: "long", year: "numeric" })}</div>
                      <button aria-label="Next month" onClick={goToNextMonth} className="p-1 rounded transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                        <ArrowRight size={16} className="text-emerald-800" />
                      </button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-[11px] mb-1 text-emerald-700/80">
                      <div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div><div>S</div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {calendarCells.map((day, index) => {
                        if (!day) {
                          return <div key={`empty-${index}`} className="h-8" aria-hidden="true" />;
                        }

                        const date = new Date(calendarYear, calendarMonth, day);
                        const sel =
                          booking.date.getDate() === day &&
                          booking.date.getMonth() === calendarMonth &&
                          booking.date.getFullYear() === calendarYear;

                        return (
                          <button
                            key={`${calendarYear}-${calendarMonth}-${day}`}
                            onClick={() => setBooking((b) => ({ ...b, date }))}
                            aria-pressed={sel}
                            className={`h-8 flex items-center justify-center rounded-full text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${sel ? "bg-emerald-800 text-white scale-105" : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"}`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                    <div>
                      <div className="text-xs font-bold mb-2">Morning Slots</div>
                      <div className="flex flex-col gap-2">
                        {morningSlots.map((s) => (
                          <button key={s.time} onClick={() => setBooking((b) => ({ ...b, slot: s }))} aria-pressed={booking.slot?.time === s.time} className={`py-2 rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${booking.slot?.time === s.time ? "bg-emerald-800 text-white" : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"}`}>{s.time}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold mb-2">Afternoon Slots</div>
                      <div className="flex flex-col gap-2">
                        {afternoonSlots.map((s) => (
                          <button key={s.time} onClick={() => setBooking((b) => ({ ...b, slot: s }))} aria-pressed={booking.slot?.time === s.time} className={`py-2 rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${booking.slot?.time === s.time ? "bg-emerald-800 text-white" : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"}`}>{s.time}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {tab === "services" && (
                  <div className="space-y-3 rounded-2xl bg-[#f4fffb] p-3 border border-[#d6eee8] transition-all duration-300">
                    {services.map((s) => (
                      <div key={s.name} className="p-3 rounded-lg bg-emerald-50 transition-all duration-200 hover:bg-emerald-100">
                        <div className="font-semibold">{s.name}</div>
                        <div className="text-sm text-emerald-700/80">₹{s.price} • {s.mins} mins</div>
                        <div className="text-xs text-emerald-700/60 mt-1">{s.desc}</div>
                      </div>
                    ))}
                  </div>
                )}
                {tab === "staff" && (
                  <div className="space-y-3 rounded-2xl bg-[#f4fffb] p-3 border border-[#d6eee8] transition-all duration-300">
                    {mockStaff.map((st) => (
                      <div key={st.name} className="p-3 rounded-lg bg-emerald-50 transition-all duration-200 hover:bg-emerald-100">
                        <div className="font-semibold">{st.name}</div>
                        <div className="text-sm text-emerald-700/80">{st.role}</div>
                      </div>
                    ))}
                  </div>
                )}
                {tab === "summary" && (
                  <div className="p-3 rounded-2xl bg-[#f4fffb] border border-[#d6eee8] transition-all duration-300">
                    <div className="font-semibold">Booking Summary</div>
                    <div className="text-sm text-emerald-700/80 mt-2">Date: {booking.date.toDateString()}</div>
                    <div className="text-sm text-emerald-700/80">Time: {booking.slot?.time ?? "Not selected"}</div>
                  </div>
                )}
                {selectedService && (
                  <div className="mb-3 p-3 rounded-lg bg-white border border-[#d6eee8]">
                    <div className="text-sm font-semibold">{selectedService.name}</div>
                    <div className="text-sm text-emerald-700/80">₹{selectedService.price} • {selectedService.mins} mins</div>
                  </div>
                )}
                <div className="mt-4">
                  <button
                    onClick={() => {
                      if (!booking.slot) return;
                        const bookingHref = buildBookingSearchParams({
                          company: listing.name,
                          category: category.title,
                          service: selectedService.name,
                          price: selectedService.price,
                          duration: selectedService.mins,
                          staff: "Elena M.",
                          date: booking.date.toDateString(),
                          time: booking.slot.time,
                          image: selectedImage,
                        });

                        router.push(`/bookings?${bookingHref}`);
                    }}
                    disabled={!booking.slot}
                    className="w-full py-3 rounded-full bg-[#0b6b5d] hover:bg-[#0a5f53] text-white font-bold shadow transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-emerald-200"
                  >
                    Continue to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/80 px-3 py-3 border border-white/70">
      <p className="text-[10px] uppercase tracking-wide text-[#1e5a52] font-semibold">{label}</p>
      <p className="font-semibold text-[#003531] mt-1">{value}</p>
    </div>
  );
}

export default CompanyProfile;
