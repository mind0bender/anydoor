import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { defaultBookingDetails, type BookingDetails, type GuestDetails } from "@/types/booking";

interface CreateOrderPayload {
  booking?: BookingDetails;
  guest?: GuestDetails;
}

const parseJson = async (request: Request): Promise<CreateOrderPayload> => {
  try {
    return (await request.json()) as CreateOrderPayload;
  } catch {
    return {};
  }
};

export async function POST(request: Request) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json(
      {
        success: false,
        message: "Missing Razorpay credentials. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.",
      },
      { status: 500 }
    );
  }

  try {
    const body = await parseJson(request);
    const inputBooking = body.booking;

    const booking: BookingDetails = {
      ...defaultBookingDetails,
      ...(inputBooking ?? {}),
      price:
        typeof inputBooking?.price === "number" && Number.isFinite(inputBooking.price) && inputBooking.price > 0
          ? inputBooking.price
          : defaultBookingDetails.price,
      duration:
        typeof inputBooking?.duration === "number" && Number.isFinite(inputBooking.duration) && inputBooking.duration > 0
          ? inputBooking.duration
          : defaultBookingDetails.duration,
    };

    const total = Number((booking.price + booking.price * 0.085).toFixed(2));
    const amountInPaise = Math.round(total * 100);

    if (!Number.isFinite(amountInPaise) || amountInPaise <= 0) {
      return NextResponse.json({ success: false, message: "Invalid amount for order creation." }, { status: 400 });
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `anydoor_${Date.now()}`,
      notes: {
        company: booking.company,
        service: booking.service,
        guestEmail: body.guest?.email ?? "",
      },
    });

    return NextResponse.json({
      success: true,
      keyId,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to create Razorpay order right now. Please retry." },
      { status: 500 }
    );
  }
}
