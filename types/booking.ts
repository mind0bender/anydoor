export type BookingQueryValue = string | string[] | undefined;

export interface BookingSearchParams {
  company?: BookingQueryValue;
  category?: BookingQueryValue;
  service?: BookingQueryValue;
  price?: BookingQueryValue;
  duration?: BookingQueryValue;
  staff?: BookingQueryValue;
  date?: BookingQueryValue;
  time?: BookingQueryValue;
  image?: BookingQueryValue;
  fullName?: BookingQueryValue;
  email?: BookingQueryValue;
  phone?: BookingQueryValue;
  notes?: BookingQueryValue;
}

export interface GuestDetails {
  fullName: string;
  email: string;
  phone: string;
  notes: string;
}

export interface BookingDetails {
  company: string;
  category: string;
  service: string;
  price: number;
  duration: number;
  staff: string;
  date: string;
  time: string;
  image: string;
}

const DEFAULT_BOOKING_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCFVIDSpmGYVZjjeir7KATaO1flcbb3gQJ38DGNoJ2NQXqpOjjqM7M9X36c8I4ZS0VRuneCazYcJkM89edLUApS2-HtG1nE7SYXbYyMtZYf5fHZ-KqlaSx9T9ihaWpRnp47_sfdCcZJHiI-yFfEO4UBfNLBqtlOkrdo0kQ0SRTLFne2LEcxMJ74T2VsCa5qqqDlbQSRPK0L4pfYb0AEE4MCQEI_SVcu6eVSYZVbqEPJujCLsgrQvQomp_RDocNu5DbQ-KJJDMZsssrh";

const getFirstValue = (value: BookingQueryValue): string | undefined =>
  Array.isArray(value) ? value[0] : value;

const toNumber = (value: BookingQueryValue, fallback: number): number => {
  const parsed = Number(getFirstValue(value));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const toString = (value: BookingQueryValue, fallback: string): string => {
  const resolved = getFirstValue(value)?.trim();
  return resolved && resolved.length > 0 ? resolved : fallback;
};

const getSearchValue = (
  searchParams: BookingSearchParams | URLSearchParams | undefined,
  key: keyof BookingSearchParams
): BookingQueryValue => {
  if (!searchParams) {
    return undefined;
  }

  if (searchParams instanceof URLSearchParams) {
    const values = searchParams.getAll(key);
    if (values.length === 0) {
      return undefined;
    }

    return values.length > 1 ? values : values[0];
  }

  return searchParams[key];
};

export const defaultBookingDetails: BookingDetails = {
  company: "Serenity Spa",
  category: "Wellness",
  service: "Botanical Rejuvenation Facial",
  price: 145,
  duration: 60,
  staff: "Elena M.",
  date: "Thursday, Oct 24, 2024",
  time: "14:30 - 15:30",
  image: DEFAULT_BOOKING_IMAGE,
};

export const defaultGuestDetails: GuestDetails = {
  fullName: "",
  email: "",
  phone: "",
  notes: "",
};

export const createBookingDetails = (
  searchParams?: BookingSearchParams | URLSearchParams
): BookingDetails => ({
  company: toString(getSearchValue(searchParams, "company"), defaultBookingDetails.company),
  category: toString(getSearchValue(searchParams, "category"), defaultBookingDetails.category),
  service: toString(getSearchValue(searchParams, "service"), defaultBookingDetails.service),
  price: toNumber(getSearchValue(searchParams, "price"), defaultBookingDetails.price),
  duration: toNumber(getSearchValue(searchParams, "duration"), defaultBookingDetails.duration),
  staff: toString(getSearchValue(searchParams, "staff"), defaultBookingDetails.staff),
  date: toString(getSearchValue(searchParams, "date"), defaultBookingDetails.date),
  time: toString(getSearchValue(searchParams, "time"), defaultBookingDetails.time),
  image: toString(getSearchValue(searchParams, "image"), defaultBookingDetails.image),
});

export const createGuestDetails = (searchParams?: BookingSearchParams | URLSearchParams): GuestDetails => ({
  fullName: toString(getSearchValue(searchParams, "fullName"), defaultGuestDetails.fullName),
  email: toString(getSearchValue(searchParams, "email"), defaultGuestDetails.email),
  phone: toString(getSearchValue(searchParams, "phone"), defaultGuestDetails.phone),
  notes: toString(getSearchValue(searchParams, "notes"), defaultGuestDetails.notes),
});

export const resolveBookingDetails = async (
  searchParams?: BookingSearchParams | Promise<BookingSearchParams>
): Promise<BookingDetails> => {
  const params = searchParams instanceof Promise ? await searchParams : searchParams;

  return createBookingDetails(params);
};

export const buildBookingSearchParams = (booking: BookingDetails): string => {
  const params = new URLSearchParams({
    company: booking.company,
    category: booking.category,
    service: booking.service,
    price: String(booking.price),
    duration: String(booking.duration),
    staff: booking.staff,
    date: booking.date,
    time: booking.time,
    image: booking.image,
  });

  return params.toString();
};

export const buildGuestDetailsSearchParams = (guest: GuestDetails): string => {
  const params = new URLSearchParams({
    fullName: guest.fullName,
    email: guest.email,
    phone: guest.phone,
    notes: guest.notes,
  });

  return params.toString();
};
