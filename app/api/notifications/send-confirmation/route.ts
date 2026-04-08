import { NextResponse } from "next/server";
import { type BookingDetails, type GuestDetails } from "@/types/booking";

interface SendConfirmationPayload {
  booking?: BookingDetails;
  guest?: GuestDetails;
  paymentId?: string;
  orderId?: string;
  amount?: number;
  currency?: string;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Email provider not configured. Set RESEND_API_KEY and RESEND_FROM_EMAIL to enable booking confirmations.",
      },
      { status: 501 }
    );
  }

  let payload: SendConfirmationPayload = {};
  try {
    payload = (await request.json()) as SendConfirmationPayload;
  } catch {
    return NextResponse.json({ success: false, message: "Invalid email payload." }, { status: 400 });
  }

  const guest = payload.guest;
  const booking = payload.booking;

  if (!guest || !guest.email || !booking || !payload.paymentId || !payload.orderId) {
    return NextResponse.json({ success: false, message: "Missing confirmation data." }, { status: 400 });
  }

  const amount = payload.amount ?? booking.price;
  const subject = `AnyDoor booking confirmed for ${booking.service}`;
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #003531;">
      <h2>Your AnyDoor booking is confirmed</h2>
      <p>Hi ${guest.fullName || "there"},</p>
      <p>Your payment was successful and your booking is confirmed.</p>
      <ul>
        <li><strong>Company:</strong> ${booking.company}</li>
        <li><strong>Service:</strong> ${booking.service}</li>
        <li><strong>Date:</strong> ${booking.date}</li>
        <li><strong>Time:</strong> ${booking.time}</li>
        <li><strong>Amount:</strong> ${amount.toFixed(2)} ${payload.currency ?? "USD"}</li>
        <li><strong>Payment ID:</strong> ${payload.paymentId}</li>
        <li><strong>Order ID:</strong> ${payload.orderId}</li>
      </ul>
      <p>Thank you for booking with AnyDoor.</p>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: guest.email,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const responseText = await response.text();
    return NextResponse.json(
      {
        success: false,
        message: responseText || "Unable to send confirmation email.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
