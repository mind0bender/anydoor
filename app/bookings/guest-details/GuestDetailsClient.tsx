"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Clock3,
  Mail,
  Phone,
  Sparkles,
  UserRound,
} from "lucide-react";
import {
  buildBookingSearchParams,
  buildGuestDetailsSearchParams,
  defaultGuestDetails,
  type BookingDetails,
} from "@/types/booking";

interface GuestDetailsClientProps {
  booking: BookingDetails;
}

export default function GuestDetailsClient({
  booking,
}: GuestDetailsClientProps) {
  const router = useRouter();
  const bookingQuery = useMemo(
    () => buildBookingSearchParams(booking),
    [booking],
  );

  const [guest, setGuest] = useState(defaultGuestDetails);

  const fullName = guest.fullName.trim();
  const email = guest.email.trim();
  const phone = guest.phone.trim();
  const canContinue =
    fullName.length > 1 &&
    email.includes("@") &&
    phone.replace(/\D/g, "").length >= 7;

  return (
    <section className="w-full bg-primary-200 text-[#003531]">
      <div className="w-full max-w-300 mx-auto px-4 sm:px-8 py-10 lg:py-12 grid lg:grid-cols-[1.15fr_0.85fr] gap-8">
        <div className="space-y-8">
          <header className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-white/70 px-4 py-2 text-sm font-semibold text-[#0b6b5d] shadow-sm">
              <UserRound size={16} /> Step 2 · Guest details
            </div>
            <h1 className="text-4xl font-bold">Tell us who to prepare for.</h1>
            <p className="text-[#1e5a52] max-w-2xl">
              Add the guest information so the reservation stays connected to
              the service and schedule you already selected.
            </p>
          </header>

          <div className="rounded-3xl bg-[#b3efe5] p-5 sm:p-6 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <StatCard
                icon={<Sparkles size={16} />}
                label="Service"
                value={booking.service}
              />
              <StatCard
                icon={<CalendarDays size={16} />}
                label="Date"
                value={booking.date}
              />
              <StatCard
                icon={<Clock3 size={16} />}
                label="Time"
                value={booking.time}
              />
              <StatCard
                icon={<UserRound size={16} />}
                label="Provider"
                value={booking.staff}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Full name"
                value={guest.fullName}
                onChange={(value) =>
                  setGuest((current) => ({ ...current, fullName: value }))
                }
                placeholder="Avery Morgan"
              />
              <Field
                label="Email address"
                type="email"
                value={guest.email}
                onChange={(value) =>
                  setGuest((current) => ({ ...current, email: value }))
                }
                placeholder="avery@example.com"
                icon={<Mail size={16} />}
              />
              <Field
                label="Phone number"
                value={guest.phone}
                onChange={(value) =>
                  setGuest((current) => ({ ...current, phone: value }))
                }
                placeholder="(555) 123-4567"
                icon={<Phone size={16} />}
              />
              <Field
                label="Notes"
                value={guest.notes}
                onChange={(value) =>
                  setGuest((current) => ({ ...current, notes: value }))
                }
                placeholder="Accessibility or arrival notes"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href={`/bookings?${bookingQuery}`}
                className="rounded-full bg-white text-[#0b6b5d] px-5 py-3 font-semibold shadow-sm border border-white/70 hover:bg-white/90 transition"
              >
                Back to Checkout
              </Link>
              <button
                type="button"
                disabled={!canContinue}
                onClick={() => {
                  const guestQuery = buildGuestDetailsSearchParams(guest);
                  router.push(
                    `/bookings/payment?${bookingQuery}&${guestQuery}`,
                  );
                }}
                className="rounded-full bg-[#0b6b5d] text-white px-5 py-3 font-semibold shadow-sm hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 h-fit rounded-3xl bg-[#bdeee4] p-6 space-y-6 shadow-sm">
          <div>
            <h2 className="text-xl font-semibold">Booking recap</h2>
            <p className="text-sm text-[#1e5a52]">
              Everything stays connected.
            </p>
          </div>

          <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-white/80">
            <Image
              src={booking.image}
              alt={booking.service}
              fill
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-3 text-sm text-[#1e5a52]">
            <DetailRow label="Service" value={booking.service} />
            <DetailRow label="Company" value={booking.company} />
            <DetailRow label="Date" value={booking.date} />
            <DetailRow label="Time" value={booking.time} />
            <DetailRow
              label="Total"
              value={`$${(booking.price + booking.price * 0.085).toFixed(2)}`}
              strong
            />
          </div>
        </aside>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  icon,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  icon?: React.ReactNode;
}) {
  return (
    <label className="rounded-2xl bg-white/90 p-4 border border-white/70 shadow-sm flex flex-col gap-2">
      <span className="text-xs uppercase tracking-wide text-[#1e5a52] font-semibold flex items-center gap-2">
        {icon}
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="bg-transparent outline-none text-[#003531] placeholder:text-[#7aa79f]"
      />
    </label>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-white/90 p-4 border border-white/70 shadow-sm flex items-start gap-3">
      <span className="text-[#0b6b5d] mt-0.5">{icon}</span>
      <div>
        <p className="text-[11px] uppercase tracking-wide text-[#1e5a52] font-semibold">
          {label}
        </p>
        <p className="font-semibold text-[#003531]">{value}</p>
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-white/70 px-4 py-3">
      <span>{label}</span>
      <span
        className={
          strong ? "font-bold text-[#003531]" : "font-semibold text-[#003531]"
        }
      >
        {value}
      </span>
    </div>
  );
}
