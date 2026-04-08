import { resolveBookingDetails, type BookingSearchParams } from "@/types/booking";
import GuestDetailsClient from "./GuestDetailsClient";

interface GuestDetailsPageProps {
  searchParams?: BookingSearchParams | Promise<BookingSearchParams>;
}

export default async function GuestDetailsPage({ searchParams }: GuestDetailsPageProps) {
  const booking = await resolveBookingDetails(searchParams);
  return <GuestDetailsClient booking={booking} />;
}