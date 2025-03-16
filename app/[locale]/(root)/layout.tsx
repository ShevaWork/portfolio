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
import "@/app/globals.css";

interface MessageMetadata {
  nameProj: string;
  myName: string;
  description: string;
  keywords: string[];
  altIMG: string;
  page_title: string;
  page_description: string;
}

interface Messages {
  Metadata?: MessageMetadata;
  [key: string]: any;
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

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const messages = (await getMessages({ locale: params.locale })) as Messages;
  
  // Перевірка та використання метаданих з безпечним доступом
  const metadata = messages.Metadata || {
    nameProj: "Portfolio",
    myName: "Oleksandr",
    description: "Professional portfolio",
    keywords: ["portfolio", "web developer"],
    altIMG: "Portfolio preview"
  };

  return {
    title: {
      template: `${metadata.nameProj} | ${metadata.myName} - %s`,
      default: `${metadata.nameProj} | ${metadata.myName}`,
    },
    description: metadata.description,
    keywords: metadata.keywords,
    openGraph: {
      title: `${metadata.nameProj} | ${metadata.myName}`,
      description: metadata.description,
      locale: params.locale,
      type: 'website',
      siteName: `${metadata.nameProj} | ${metadata.myName}`,
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: metadata.altIMG || "Portfolio preview",
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${metadata.nameProj} | ${metadata.myName}`,
      description: metadata.description,
      images: ['/og-image.jpg'],
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
    </html>
  );
}
