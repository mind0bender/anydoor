import { createGuestDetails, resolveBookingDetails, type BookingSearchParams } from "@/types/booking";
import PaymentClient from "./PaymentClient";

interface PaymentPageProps {
  searchParams?: BookingSearchParams | Promise<BookingSearchParams>;
}

export default async function PaymentPage({ searchParams }: PaymentPageProps) {
  const booking = await resolveBookingDetails(searchParams);
  const resolvedSearchParams = searchParams instanceof Promise ? await searchParams : searchParams;
  const guest = createGuestDetails(resolvedSearchParams);

  return <PaymentClient booking={booking} guest={guest} />;
}
