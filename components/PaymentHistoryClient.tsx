"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { CalendarDays, Clock3, CreditCard, Mail, ReceiptText, Search, UserRound } from "lucide-react";
import { type PaymentHistoryEntry } from "@/types/payment";
import { getPaymentHistory } from "@/lib/paymentHistory";

const formatCurrency = (amount: number, currency: string): string =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency, maximumFractionDigits: 2 }).format(amount);

export default function PaymentHistoryClient() {
  const [history, setHistory] = useState<PaymentHistoryEntry[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setHistory(getPaymentHistory());
  }, []);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) {
      return history;
    }

    return history.filter((entry) => {
      return [entry.company, entry.service, entry.guestName, entry.guestEmail, entry.paymentId, entry.orderId]
        .join(" ")
        .toLowerCase()
        .includes(search);
    });
  }, [history, query]);

  return (
    <section className="w-full bg-[#d5fff9] text-[#003531]">
      <div className="mx-auto max-w-[1300px] px-4 sm:px-8 py-12 space-y-8">
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-white/70 px-4 py-2 text-sm font-semibold text-[#0b6b5d] shadow-sm">
            <ReceiptText size={16} /> Payment history
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">All previous payments</h1>
          <p className="text-[#1e5a52] text-lg max-w-2xl">
            A local booking ledger stored in your browser so you can review past payments even before a backend database is added.
          </p>
        </header>

        <div className="rounded-3xl bg-white/80 border border-white/70 shadow-sm p-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-[#1e5a52]">
            <Search size={16} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search company, service, guest, payment ID..."
              className="w-full sm:w-[28rem] bg-transparent outline-none"
            />
          </div>
          <div className="text-sm text-[#1e5a52] font-semibold">{filtered.length} record(s)</div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-3xl bg-white/80 border border-white/70 shadow-sm p-8 text-center space-y-4">
            <p className="text-[#1e5a52]">No payment history yet.</p>
            <Link href="/bookings" className="inline-flex rounded-full bg-[#0b6b5d] text-white px-6 py-3 font-semibold hover:opacity-90 transition">
              Start a booking
            </Link>
          </div>
        ) : (
          <div className="grid gap-5">
            {filtered.map((entry) => (
              <article key={entry.id} className="rounded-3xl bg-white/90 border border-white/70 shadow-sm overflow-hidden grid lg:grid-cols-[220px_1fr]">
                <div className="relative min-h-56 bg-[#b3efe5]">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFVIDSpmGYVZjjeir7KATaO1flcbb3gQJ38DGNoJ2NQXqpOjjqM7M9X36c8I4ZS0VRuneCazYcJkM89edLUApS2-HtG1nE7SYXbYyMtZYf5fHZ-KqlaSx9T9ihaWpRnp47_sfdCcZJHiI-yFfEO4UBfNLBqtlOkrdo0kQ0SRTLFne2LEcxMJ74T2VsCa5qqqDlbQSRPK0L4pfYb0AEE4MCQEI_SVcu6eVSYZVbqEPJujCLsgrQvQomp_RDocNu5DbQ-KJJDMZsssrh"
                    alt={entry.service}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5 sm:p-6 space-y-4">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-semibold">{entry.service}</h2>
                      <p className="text-[#1e5a52] mt-1">{entry.company}</p>
                    </div>
                    <span className="rounded-full bg-[#e6f7f2] px-3 py-1 text-xs font-semibold text-[#0b6b5d]">
                      {formatCurrency(entry.amount, entry.currency)}
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                    <Meta icon={<UserRound size={14} />} label="Guest" value={entry.guestName || entry.guestEmail || "Unknown"} />
                    <Meta icon={<Mail size={14} />} label="Email" value={entry.guestEmail || "Not set"} />
                    <Meta icon={<CalendarDays size={14} />} label="Date" value={entry.date} />
                    <Meta icon={<Clock3 size={14} />} label="Time" value={entry.time} />
                  </div>

                  <div className="grid md:grid-cols-2 gap-3 text-xs text-[#1e5a52]">
                    <CodeBlock label="Payment ID" value={entry.paymentId} />
                    <CodeBlock label="Order ID" value={entry.orderId} />
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <Link
                      href={`/bookings/confirmation?paymentId=${encodeURIComponent(entry.paymentId)}&orderId=${encodeURIComponent(entry.orderId)}&signature=${encodeURIComponent(entry.signature)}&company=${encodeURIComponent(entry.company)}&category=${encodeURIComponent(entry.category)}&service=${encodeURIComponent(entry.service)}&price=${encodeURIComponent(String(entry.price))}&duration=${encodeURIComponent(String(entry.duration))}&staff=${encodeURIComponent(entry.staff)}&image=${encodeURIComponent(entry.image)}&date=${encodeURIComponent(entry.date)}&time=${encodeURIComponent(entry.time)}&guestName=${encodeURIComponent(entry.guestName)}&email=${encodeURIComponent(entry.guestEmail)}`}
                      className="rounded-full bg-[#0b6b5d] text-white px-5 py-2.5 font-semibold hover:opacity-90 transition"
                    >
                      Open receipt
                    </Link>
                    <Link href="/bookings" className="rounded-full bg-white border border-[#0b6b5d]/20 text-[#0b6b5d] px-5 py-2.5 font-semibold hover:bg-[#f4fffb] transition">
                      Book again
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Meta({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[#f4fffb] border border-[#d6eee8] px-4 py-3 flex items-start gap-2">
      <span className="text-[#0b6b5d] mt-0.5">{icon}</span>
      <div>
        <p className="text-[10px] uppercase tracking-wide text-[#1e5a52] font-semibold">{label}</p>
        <p className="font-semibold text-[#003531] break-all">{value}</p>
      </div>
    </div>
  );
}

function CodeBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[#003531] text-[#e5fff7] px-4 py-3 overflow-hidden">
      <p className="text-[10px] uppercase tracking-wide text-[#9fd8cc] font-semibold">{label}</p>
      <p className="mt-1 text-xs break-all leading-5">{value}</p>
    </div>
  );
}
