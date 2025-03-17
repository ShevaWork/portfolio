import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Locale, routing } from "@/i18n/routing";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";
import "@/app/globals.css";
import { getTranslations } from "next-intl/server";
console.log(getTranslations);
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: {
      default: `${t("nameProj")} | ${t("myName")}`,
      template: `${t("myName")} | ${t("nameProj")}`,
    },
    description: t("description"),
    authors: [
      { name: t("myName"), url: "https://portfolio-ivory-phi-92.vercel.app/" },
    ],
    creator: t("myName"),
    openGraph: {
      type: "website",
      locale: "uk_UA",
      url: "https://portfolio-ivory-phi-92.vercel.app/",
      title: `${t("myName")} | ${t("nameProj")}`,
      description: t("description"),
      siteName: `${t("nameProj")} | ${t("myName")}`,
      images: [
        {
          url: "/og-image.jpg", // Додайте зображення у /public директорію
          width: 1899,
          height: 927,
          alt: t("altIMG"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("myName")} | ${t("nameProj")}`,
      description: t("description"),
      images: ["/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/logo_cur.svg",
    },
    viewport: {
      width: "device-width",
      initialScale: 1,
    },
    alternates: {
      canonical: "https://portfolio-ivory-phi-92.vercel.app",
      languages: {
        "uk-UA": "https://portfolio-ivory-phi-92.vercel.app/ua",
        "en-US": "https://portfolio-ivory-phi-92.vercel.app/en",
      },
    },
  };
}

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

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
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
    </html>
  );
}
