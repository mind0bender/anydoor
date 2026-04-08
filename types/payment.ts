import type { BookingDetails, GuestDetails } from "@/types/booking";

export interface PaymentHistoryEntry {
  id: string;
  paymentId: string;
  orderId: string;
  signature: string;
  company: string;
  category: string;
  service: string;
  price: number;
  duration: number;
  staff: string;
  image: string;
  date: string;
  time: string;
  guestName: string;
  guestEmail: string;
  amount: number;
  currency: string;
  createdAt: string;
}

export interface PaymentSnapshot {
  booking: BookingDetails;
  guest: GuestDetails;
  paymentId: string;
  orderId: string;
  signature: string;
  amount: number;
  currency: string;
}

export const PAYMENT_HISTORY_STORAGE_KEY = "anydoor:payment-history";
