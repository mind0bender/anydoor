import { NextResponse } from "next/server";
import crypto from "node:crypto";

interface VerifyPayload {
  razorpay_payment_id?: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

export async function POST(request: Request) {
  const webhookSecret = process.env.RAZORPAY_KEY_SECRET;

  if (!webhookSecret) {
    return NextResponse.json(
      {
        success: false,
        message: "Missing RAZORPAY_KEY_SECRET for signature verification.",
      },
      { status: 500 }
    );
  }

  let body: VerifyPayload = {};
  try {
    body = (await request.json()) as VerifyPayload;
  } catch {
    return NextResponse.json({ success: false, message: "Invalid verification payload." }, { status: 400 });
  }

  const paymentId = body.razorpay_payment_id;
  const orderId = body.razorpay_order_id;
  const signature = body.razorpay_signature;

  if (!paymentId || !orderId || !signature) {
    return NextResponse.json({ success: false, message: "Incomplete Razorpay verification fields." }, { status: 400 });
  }

  const generated = crypto
    .createHmac("sha256", webhookSecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  if (generated !== signature) {
    return NextResponse.json({ success: false, message: "Signature verification failed." }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
