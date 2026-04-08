import { PAYMENT_HISTORY_STORAGE_KEY, type PaymentHistoryEntry, type PaymentSnapshot } from "@/types/payment";

const COOKIE_NAME = "anydoor_payment_history";
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year in seconds

// Helper to read cookie value
const getCookieValue = (name: string): string | null => {
  if (typeof document === "undefined") {
    return null;
  }

  const cookieString = document.cookie;
  const cookies = cookieString.split(";");

  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName.trim() === name) {
      return decodeURIComponent(cookieValue);
    }
  }

  return null;
};

// Helper to set cookie value
const setCookieValue = (name: string, value: string, maxAge: number): void => {
  if (typeof document === "undefined") {
    return;
  }

  const cookieString = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
  document.cookie = cookieString;
};

export const getPaymentHistory = (): PaymentHistoryEntry[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = getCookieValue(COOKIE_NAME);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((item): item is PaymentHistoryEntry => {
      const record = item as PaymentHistoryEntry;
      return Boolean(
        record &&
          typeof record.id === "string" &&
          typeof record.paymentId === "string" &&
          typeof record.orderId === "string" &&
          typeof record.company === "string" &&
          typeof record.service === "string"
      );
    });
  } catch {
    return [];
  }
};

export const savePaymentHistoryEntry = (snapshot: PaymentSnapshot): PaymentHistoryEntry | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const entry: PaymentHistoryEntry = {
    id: crypto.randomUUID(),
    paymentId: snapshot.paymentId,
    orderId: snapshot.orderId,
    signature: snapshot.signature,
    company: snapshot.booking.company,
    category: snapshot.booking.category,
    service: snapshot.booking.service,
    price: snapshot.booking.price,
    duration: snapshot.booking.duration,
    staff: snapshot.booking.staff,
    image: snapshot.booking.image,
    date: snapshot.booking.date,
    time: snapshot.booking.time,
    guestName: snapshot.guest.fullName,
    guestEmail: snapshot.guest.email,
    amount: snapshot.amount,
    currency: snapshot.currency,
    createdAt: new Date().toISOString(),
  };

  try {
    const current = getPaymentHistory();
    const next = [entry, ...current.filter((item) => item.paymentId !== entry.paymentId)];
    setCookieValue(COOKIE_NAME, JSON.stringify(next), COOKIE_MAX_AGE);
    return entry;
  } catch {
    return null;
  }
};
