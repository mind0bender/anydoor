"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CreditCard, Landmark, Lock, Smartphone } from "lucide-react";
import {
  buildBookingSearchParams,
  buildGuestDetailsSearchParams,
  type BookingDetails,
  type GuestDetails,
} from "@/types/booking";
import { savePaymentHistoryEntry } from "@/lib/paymentHistory";

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayCheckoutOptions) => {
      open: () => void;
      on: (event: string, callback: (payload: unknown) => void) => void;
    };
  }
}

interface RazorpayCheckoutOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  method?: {
    upi?: boolean;
    card?: boolean;
    netbanking?: boolean;
    wallet?: boolean;
  };
  notes?: Record<string, string>;
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
}

interface PaymentClientProps {
  booking: BookingDetails;
  guest: GuestDetails;
}

const loadRazorpayCheckout = async (): Promise<boolean> => {
  if (typeof window === "undefined") {
    return false;
  }

  if (window.Razorpay) {
    return true;
  }

  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function PaymentClient({ booking, guest }: PaymentClientProps) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmationNote, setConfirmationNote] = useState<string | null>(null);

  const bookingQuery = useMemo(
    () => buildBookingSearchParams(booking),
    [booking],
  );
  const guestQuery = useMemo(
    () => buildGuestDetailsSearchParams(guest),
    [guest],
  );
  const tax = Number((booking.price * 0.085).toFixed(2));
  const total = Number((booking.price + tax).toFixed(2));

  const startPayment = async () => {
    if (isProcessing) {
      return;
    }

    setIsProcessing(true);
    setError(null);
    setConfirmationNote(null);

    try {
      const sdkLoaded = await loadRazorpayCheckout();
      if (!sdkLoaded || !window.Razorpay) {
        setError(
          "Unable to load Razorpay checkout. Please check your connection and try again.",
        );
        return;
      }

      const orderResponse = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booking,
          guest,
        }),
      });

      const orderPayload = (await orderResponse.json()) as
        | {
            success: true;
            keyId: string;
            orderId: string;
            amount: number;
            currency: string;
          }
        | {
            success: false;
            message: string;
          };

      if (!orderResponse.ok || !orderPayload.success) {
        setError(
          orderPayload.success
            ? "Unable to start payment."
            : orderPayload.message,
        );
        return;
      }

      const checkout = new window.Razorpay({
        key: orderPayload.keyId,
        amount: orderPayload.amount,
        currency: orderPayload.currency,
        order_id: orderPayload.orderId,
        name: "AnyDoor",
        description: `Booking payment for ${booking.service}`,
        prefill: {
          name: guest.fullName,
          email: guest.email,
          contact: guest.phone,
        },
        theme: {
          color: "#0b6b5d",
        },
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
        },
        notes: {
          company: booking.company,
          service: booking.service,
        },
        handler: async (response) => {
          const verificationResponse = await fetch("/api/payments/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...response,
            }),
          });

          const verificationPayload = (await verificationResponse.json()) as
            | { success: true }
            | { success: false; message: string };

          if (!verificationResponse.ok || !verificationPayload.success) {
            setError(
              verificationPayload.success
                ? "Payment verification failed."
                : verificationPayload.message,
            );
            setIsProcessing(false);
            return;
          }

          const paymentMeta = new URLSearchParams({
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
          }).toString();

          savePaymentHistoryEntry({
            booking,
            guest,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            amount: orderPayload.amount / 100,
            currency: orderPayload.currency,
          });

          let emailStatus = "sent";

          try {
            const emailResponse = await fetch(
              "/api/notifications/send-confirmation",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  booking,
                  guest,
                  paymentId: response.razorpay_payment_id,
                  orderId: response.razorpay_order_id,
                  amount: orderPayload.amount / 100,
                  currency: orderPayload.currency,
                }),
              },
            );

            if (!emailResponse.ok) {
              const emailPayload = (await emailResponse.json()) as {
                message?: string;
              };
              emailStatus =
                emailResponse.status === 501 ? "unavailable" : "failed";
              setConfirmationNote(
                emailPayload.message ??
                  "Payment saved, but email confirmation is not configured yet.",
              );
            }
          } catch {
            emailStatus = "failed";
            setConfirmationNote(
              "Payment saved, but email confirmation could not be sent right now.",
            );
          }

          const emailMeta = new URLSearchParams({
            emailStatus,
          }).toString();

          router.push(
            `/bookings/confirmation?${bookingQuery}&${guestQuery}&${paymentMeta}&${emailMeta}`,
          );
        },
      });

      checkout.on("payment.failed", () => {
        setError(
          "Payment failed or was cancelled. You can retry using UPI, card, or net banking.",
        );
        setIsProcessing(false);
      });

      checkout.open();
    } catch {
      setError("Unexpected payment error. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="w-full bg-primary-200 text-[#003531]">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 py-10 lg:py-12 grid lg:grid-cols-[1.15fr_0.85fr] gap-8">
        <div className="space-y-6">
          <header className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-white/70 px-4 py-2 text-sm font-semibold text-[#0b6b5d] shadow-sm">
              <Lock size={16} /> Step 3 · Secure payment
            </div>
            <h1 className="text-4xl font-bold">
              Complete your booking payment
            </h1>
            <p className="text-[#1e5a52]">
              We request UPI, card, and net banking in checkout. Google Pay
              appears within supported UPI flows.
            </p>
          </header>

          <div className="rounded-3xl bg-[#b3efe5] p-5 sm:p-6 space-y-4">
            <h2 className="text-2xl font-semibold">
              Supported payment methods
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <MethodCard
                icon={<Smartphone size={18} />}
                label="UPI"
                description="Pay via UPI apps"
              />
              <MethodCard
                icon={<Smartphone size={18} />}
                label="Google Pay"
                description="Shown through UPI intent"
              />
              <MethodCard
                icon={<CreditCard size={18} />}
                label="Card"
                description="Credit and debit cards"
              />
              <MethodCard
                icon={<Landmark size={18} />}
                label="Net Banking"
                description="Major Indian banks"
              />
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href={`/bookings/guest-details?${bookingQuery}`}
                className="rounded-full bg-white text-[#0b6b5d] px-5 py-3 font-semibold shadow-sm border border-white/70 hover:bg-white/90 transition"
              >
                Back to Guest Details
              </Link>
              <button
                type="button"
                onClick={startPayment}
                disabled={isProcessing}
                className="rounded-full bg-[#0b6b5d] text-white px-6 py-3 font-semibold shadow-sm hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Initializing..." : `Pay $${total.toFixed(2)}`}
              </button>
            </div>

            {error && (
              <p className="text-sm rounded-xl bg-red-50 text-red-700 px-4 py-3 border border-red-200">
                {error}
              </p>
            )}

            {confirmationNote && (
              <p className="text-sm rounded-xl bg-white/85 text-[#0b6b5d] px-4 py-3 border border-white/70 shadow-sm">
                {confirmationNote}
              </p>
            )}
          </div>
        </div>

        <aside className="rounded-3xl bg-[#bdeee4] p-6 space-y-5 h-fit">
          <h2 className="text-xl font-semibold">Payment summary</h2>
          <div className="space-y-2 text-sm">
            <SummaryRow label="Company" value={booking.company} />
            <SummaryRow label="Service" value={booking.service} />
            <SummaryRow label="Date" value={booking.date} />
            <SummaryRow label="Time" value={booking.time} />
          </div>

          <div className="border-t border-[#8ccfc2] pt-4 space-y-2 text-sm">
            <SummaryRow
              label="Subtotal"
              value={`$${booking.price.toFixed(2)}`}
            />
            <SummaryRow label="Tax" value={`$${tax.toFixed(2)}`} />
            <div className="flex items-center justify-between text-lg font-bold pt-1">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function MethodCard({
  icon,
  label,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl bg-white/90 p-4 border border-white/70 shadow-sm flex items-start gap-3">
      <span className="text-[#0b6b5d] mt-0.5">{icon}</span>
      <div>
        <p className="font-semibold">{label}</p>
        <p className="text-xs text-[#1e5a52]">{description}</p>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-white/70 px-4 py-3">
      <span>{label}</span>
      <span className="font-semibold text-[#003531]">{value}</span>
    </div>
  );
}
