import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  CalendarDays,
  Clock3,
  MapPin,
  Sparkles,
} from "lucide-react";
import {
  buildBookingSearchParams,
  createGuestDetails,
  resolveBookingDetails,
  type BookingSearchParams,
} from "@/types/booking";

interface ConfirmationPageProps {
  searchParams?: BookingSearchParams | Promise<BookingSearchParams>;
}

export default async function BookingConfirmationPage({
  searchParams,
}: ConfirmationPageProps) {
  const booking = await resolveBookingDetails(searchParams);
  const searchParamsObject =
    searchParams instanceof Promise ? await searchParams : searchParams;
  const guest = createGuestDetails(searchParamsObject);
  const paymentId = Array.isArray(searchParamsObject?.paymentId)
    ? searchParamsObject?.paymentId[0]
    : searchParamsObject?.paymentId;
  const emailStatus = Array.isArray(searchParamsObject?.emailStatus)
    ? searchParamsObject?.emailStatus[0]
    : searchParamsObject?.emailStatus;
  const total = Number((booking.price + booking.price * 0.085).toFixed(2));
  const bookingQuery = buildBookingSearchParams(booking);

  return (
    <section className="w-full bg-primary-200 text-[#003531]">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 py-10 lg:py-16">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-white/70 px-4 py-2 text-sm font-semibold text-[#0b6b5d] shadow-sm">
              <CheckCircle2 size={16} /> Booking confirmed
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl font-bold">
                You’re all set.
              </h1>
              <p className="text-lg text-[#1e5a52] max-w-2xl">
                Your appointment at {booking.company} has been reserved. We’ve
                saved the selected service, image, and schedule so the entire
                booking stays connected.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
              <InfoCard
                icon={<Sparkles size={18} />}
                label="Service"
                value={booking.service}
              />
              <InfoCard
                icon={<MapPin size={18} />}
                label="Location"
                value={booking.company}
              />
              <InfoCard
                icon={<CalendarDays size={18} />}
                label="Date"
                value={booking.date}
              />
              <InfoCard
                icon={<Clock3 size={18} />}
                label="Time"
                value={booking.time}
              />
            </div>

            {(guest.fullName || guest.email) && (
              <div className="max-w-2xl rounded-2xl bg-white/85 p-4 border border-white/70 shadow-sm">
                <p className="text-[11px] uppercase tracking-wide text-[#1e5a52] font-semibold">
                  Guest details
                </p>
                <div className="mt-2 grid sm:grid-cols-2 gap-3 text-sm">
                  <span className="font-semibold text-primary-200">
                    {guest.fullName || "Guest"}
                  </span>
                  <span className="text-[#1e5a52]">
                    {guest.email || "No email added"}
                  </span>
                  <span className="text-[#1e5a52]">
                    {guest.phone || "No phone added"}
                  </span>
                  <span className="text-[#1e5a52]">
                    {guest.notes || "No special notes"}
                  </span>
                </div>
              </div>
            )}

            {paymentId && (
              <div className="max-w-2xl rounded-2xl bg-white/85 p-4 border border-white/70 shadow-sm">
                <p className="text-[11px] uppercase tracking-wide text-[#1e5a52] font-semibold">
                  Payment reference
                </p>
                <p className="mt-1 font-semibold text-[#003531] break-all">
                  {paymentId}
                </p>
              </div>
            )}

            {emailStatus && (
              <div
                className={`max-w-2xl rounded-2xl p-4 border ${
                  emailStatus === "sent"
                    ? "bg-green-50 border-green-200"
                    : "bg-yellow-50 border-yellow-200"
                }`}
              >
                <p
                  className={`text-sm ${emailStatus === "sent" ? "text-green-700" : "text-yellow-700"}`}
                >
                  {emailStatus === "sent"
                    ? "✓ Confirmation email sent successfully. Check your inbox for details."
                    : emailStatus === "unavailable"
                      ? "Email confirmation is not configured yet, but your booking is confirmed."
                      : "Email confirmation could not be sent, but your booking is confirmed."}
                </p>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href={`/bookings?${bookingQuery}`}
                className="rounded-full bg-white text-[#0b6b5d] px-5 py-3 font-semibold shadow-sm border border-white/70 hover:bg-white/90 transition"
              >
                Review Booking
              </Link>
              <Link
                href="/bookings/history"
                className="rounded-full bg-white text-[#0b6b5d] px-5 py-3 font-semibold shadow-sm border border-white/70 hover:bg-white/90 transition"
              >
                Payment History
              </Link>
              <Link
                href="/discover"
                className="rounded-full bg-[#0b6b5d] text-white px-5 py-3 font-semibold shadow-sm hover:opacity-90 transition"
              >
                Discover More
              </Link>
            </div>
          </div>

          <div className="bg-[#b3efe5] rounded-3xl p-5 sm:p-6 shadow-sm">
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden">
              <Image
                src={booking.image}
                alt={booking.service}
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold">{booking.service}</h2>
                <span className="font-bold text-lg">
                  ${booking.price.toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-[#1e5a52]">
                {booking.duration} minutes with {booking.staff}
              </p>
              <div className="border-t border-[#8ccfc2] pt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    ${booking.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tax</span>
                  <span className="font-semibold">
                    ${(total - booking.price).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-lg font-bold pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-white/85 p-4 border border-white/70 shadow-sm flex items-start gap-3">
      <span className="text-[#0b6b5d] mt-0.5">{icon}</span>
      <div>
        <p className="text-[11px] uppercase tracking-wide text-[#1e5a52] font-semibold">
          {label}
        </p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}
