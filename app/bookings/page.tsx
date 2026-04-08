import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock3, Leaf, Lock, UserRound, Users } from "lucide-react";
import { buildBookingSearchParams, resolveBookingDetails, type BookingSearchParams } from "@/types/booking";

interface BookingsPageProps {
  searchParams?: BookingSearchParams | Promise<BookingSearchParams>;
}

export default async function BookingsPage({ searchParams }: BookingsPageProps) {
  const booking = await resolveBookingDetails(searchParams);
  const bookingQuery = buildBookingSearchParams(booking);

  const tax = Number((booking.price * 0.085).toFixed(2));
  const total = Number((booking.price + tax).toFixed(2));

  return (
    <section className="w-full bg-[#d5fff9] text-[#003531]">
      <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-8 py-10 lg:py-12 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <header>
            <h1 className="text-4xl font-bold">Checkout</h1>
            <p className="mt-2 text-[#1e5a52]">Finalize your curated experience in four simple steps.</p>
          </header>

          <div className="flex items-center gap-3 sm:gap-5 text-sm sm:text-base">
            <StepChip number={1} active label="Confirm Service" />
            <span className="h-px w-8 bg-[#9cd8cc]" />
            <StepChip number={2} label="Guest Details" />
            <span className="h-px w-8 bg-[#9cd8cc]" />
            <StepChip number={3} label="Payment" />
            <span className="h-px w-8 bg-[#9cd8cc]" />
            <StepChip number={4} label="Confirmation" />
          </div>

          <article className="rounded-3xl bg-[#b3efe5] p-5 sm:p-6">
            <h2 className="text-2xl font-semibold mb-5">Selected Service</h2>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-start">
              <div className="relative w-full sm:w-56 aspect-[16/10] rounded-2xl overflow-hidden">
                <Image
                  src={booking.image}
                  alt={booking.service}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-semibold leading-tight">{booking.service}</h3>
                  <p className="font-semibold text-lg">${booking.price.toFixed(2)}</p>
                </div>
                <p className="mt-2 text-sm text-[#1e5a52]">
                  A deep-cleansing treatment designed for lasting glow and calm at {booking.company}.
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm font-medium text-[#0b6b5d]">
                  <span className="inline-flex items-center gap-2"><Clock3 size={14} /> {booking.duration} Minutes</span>
                  <span className="inline-flex items-center gap-2"><UserRound size={14} /> with {booking.staff}</span>
                  <span className="inline-flex items-center gap-2"><Leaf size={14} /> {booking.category}</span>
                </div>
              </div>
            </div>
          </article>

          <article className="rounded-3xl bg-[#b3efe5] p-5 sm:p-6">
            <h2 className="text-2xl font-semibold mb-5">Appointment Time</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/90 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#7de0cf] flex items-center justify-center">
                  <CalendarDays size={18} className="text-[#0b6b5d]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-[#1e5a52] font-semibold">Date</p>
                  <p className="font-semibold">{booking.date}</p>
                </div>
              </div>
              <div className="bg-white/90 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#7de0cf] flex items-center justify-center">
                  <Clock3 size={18} className="text-[#0b6b5d]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-[#1e5a52] font-semibold">Time</p>
                  <p className="font-semibold">{booking.time}</p>
                </div>
              </div>
            </div>
            <button className="mt-4 text-sm text-[#0b6b5d] font-semibold hover:underline">Change Date or Time</button>
          </article>

          <div className="pt-2">
            <Link
              href={`/bookings/guest-details?${bookingQuery}`}
              className="mx-auto block w-fit rounded-full bg-[#0b6b5d] text-white px-10 py-4 font-semibold hover:opacity-90 transition"
            >
              Continue to Guest Details
            </Link>
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-24 rounded-3xl bg-[#bdeee4] p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Booking Concierge</h2>
              <p className="text-sm text-[#1e5a52]">Secure your appointment</p>
            </div>

            <div className="space-y-5 text-sm text-[#1e5a52]">
              <StepRow icon={<Leaf size={16} />} step="Step 1" label="Services" active />
              <StepRow icon={<Users size={16} />} step="Step 2" label="Guest Details" />
              <StepRow icon={<CalendarDays size={16} />} step="Step 3" label="Payment" />
              <StepRow icon={<Clock3 size={16} />} step="Step 4" label="Confirmation" />
            </div>

            <div className="border-t border-[#8ccfc2] pt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">${booking.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Tax</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-2xl font-bold pt-2">
                <span>Total Cost</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Link href={`/bookings/guest-details?${bookingQuery}`} className="w-full rounded-full bg-[#b24e07] text-white py-3.5 font-semibold hover:opacity-90 transition inline-flex items-center justify-center">
              Continue
            </Link>
            <div className="text-center text-xs text-[#1e5a52] font-semibold inline-flex items-center justify-center gap-2 w-full">
              <Lock size={12} /> SECURE CHECKOUT
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function StepChip({
  number,
  label,
  active = false,
}: {
  number: number;
  label: string;
  active?: boolean;
}) {
  return (
    <div className="inline-flex items-center gap-2">
      <span
        className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold ${
          active ? "bg-[#0b6b5d] text-white" : "bg-[#7de0cf] text-[#0b6b5d]"
        }`}
      >
        {number}
      </span>
      <span className="font-medium text-[#124e47]">{label}</span>
    </div>
  );
}

function StepRow({
  icon,
  step,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  step: string;
  label: string;
  active?: boolean;
}) {
  return (
    <div className={`rounded-xl p-3 ${active ? "bg-white/90" : ""}`}>
      <div className="flex items-start gap-3">
        <span className="text-[#0b6b5d] mt-0.5">{icon}</span>
        <div>
          <p className="uppercase text-[10px] tracking-wide">{step}</p>
          <p className="font-semibold text-base text-[#003531]">{label}</p>
        </div>
      </div>
    </div>
  );
}
