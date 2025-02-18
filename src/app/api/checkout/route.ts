import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import connectToDB from "@/config/db";
import Payment from "../models/Payment";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-01-27.acacia",
});

interface CheckoutRequestBody {
  userId: string;
  plan: string;
  price: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: CheckoutRequestBody = await req.json();
    const { userId, plan, price } = body;

    if (!userId || !plan || !price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const formattedPrice = parseInt(price.replace(/Rs|,| /g, "")) * 100;
    if (isNaN(formattedPrice) || formattedPrice <= 0) {
      return NextResponse.json({ error: "Invalid price format" }, { status: 400 });
    }

    const currency = "lkr"; // Change if needed

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency,
            product_data: { name: plan },
            unit_amount: formattedPrice,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    await connectToDB();
    const newPayment = new Payment({
      userId,
      planName: plan,
      price: formattedPrice / 100,
      paymentId: session.id,
      status: "pending",
      timestamp: new Date(),
    });

    await newPayment.save();
    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}

// ✅ Fetch All Payments or a Single Payment
export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const paymentId = searchParams.get("paymentId");

    if (paymentId) {
      const payment = await Payment.findById(paymentId);
      if (!payment) {
        return NextResponse.json({ error: "Payment not found" }, { status: 404 });
      }
      return NextResponse.json(payment);
    }

    const payments = await Payment.find();
    return NextResponse.json(payments);
  } catch (error: any) {
    console.error("Fetch error:", error);
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}

// ✅ Update Payment Status
export async function PUT(req: NextRequest) {
  try {
    await connectToDB();
    const { paymentId, status } = await req.json();

    if (!paymentId || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updatedPayment = await Payment.findByIdAndUpdate(
      paymentId,
      { status },
      { new: true }
    );

    if (!updatedPayment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    return NextResponse.json(updatedPayment);
  } catch (error: any) {
    console.error("Update error:", error);
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}

// ✅ Delete Payment
export async function DELETE(req: NextRequest) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const paymentId = searchParams.get("paymentId");

    if (!paymentId) {
      return NextResponse.json({ error: "Payment ID required" }, { status: 400 });
    }

    const deletedPayment = await Payment.findByIdAndDelete(paymentId);
    if (!deletedPayment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Payment deleted successfully" });
  } catch (error: any) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}
