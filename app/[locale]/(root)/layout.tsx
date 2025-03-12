import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Locale, routing } from "@/i18n/routing";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import "@/app/globals.css";

const fredoka = localFont({
  src: [
    {
      path: "./fonts/Fredoka/Fredoka-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Fredoka/Fredoka-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Fredoka/Fredoka-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Fredoka/Fredoka-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Fredoka/Fredoka-Light.ttf",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-fedoka",
});

export const metadata: Metadata = {
  title: "Test Portfolio App",
  description: "Test Portfolio App",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className={fredoka.variable}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            <div className="min-h-screen bg-background text-foreground">
              <Toaster />
              <Navbar />
              {children}
              <Footer />
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
      <Analytics />
    </html>
  );
}
