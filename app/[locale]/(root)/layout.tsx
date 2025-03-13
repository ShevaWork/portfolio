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

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  // Завантажуємо повідомлення для поточної локалі
  const messages = await getMessages({ locale: params.locale });
  interface MetaData {
    nameProj: string;
    myName: string;
    description: string;
    keywords: string[];
    altIMG: string;
  }

  const meta = messages.meta as unknown as MetaData;

  // Базовий URL сайту
  const baseUrl = "https://portfolio-ivory-phi-92.vercel.app/";
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: meta.nameProj,
      template: meta.myName,
    },
    description: meta.description,
    keywords: meta.keywords,
    authors: [
      {
        name: meta.myName,
        url: baseUrl,
      },
    ],
    creator: meta.myName,
    openGraph: {
      type: "website",
      locale: params.locale === "ua" ? "uk_UA" : "en_US",
      url: `${baseUrl}/${params.locale}`,
      title: meta.myName,
      description: meta.description,
      siteName: meta.nameProj,
      images: [
        {
          url: "/og-image.jpg", // Зображення у /public директорії
          width: 1899,
          height: 927,
          alt: meta.altIMG,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.myName,
      description: meta.description,
      images: ["/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    viewport: {
      width: "device-width",
      initialScale: 1,
    },
    alternates: {
      canonical: `${baseUrl}/${params.locale}`,
      languages: {
        "uk-UA": `${baseUrl}/ua`,
        "en-US": `${baseUrl}/en`,
        // Додайте інші мови за потреби
      },
    },
  };
}

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
