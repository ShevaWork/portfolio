import { Resend } from "resend";
import { NextResponse } from "next/server";
import EmailTemplate from "@/components/Footer/EmailTemplate";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;
    if (!email) {
      return NextResponse.json(
        { message: "Email is missing" },
        { status: 400 }
      );
    }

    console.log("Attempting to send email to:", email);

    const { data, error } = await resend.emails.send({
      from: "Onboarding <onboarding@resend.dev>",
      to: ["olexandr.sheva@gmail.com"], // Ваша пошта
      subject: `Нове повідомлення від ${email}`,
      react: EmailTemplate({ email }),
    });

    if (error) {
      console.error("Resend Error:", error);
      return NextResponse.json(
        { message: "Failed to send email", error },
        { status: 500 }
      );
    }

    console.log("Email sent successfully:", data);

    return NextResponse.json({
      message: "Email sent successfully",
      id: data?.id,
    });
  } catch (err) {
    console.error("Caught error:", err);
    return NextResponse.json(
      {
        message: "Email not sent",
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
