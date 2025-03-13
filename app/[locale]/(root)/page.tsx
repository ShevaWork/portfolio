import { Metadata } from "next";
import { getMessages } from "next-intl/server";
import AboutSection from "@/components/AboutSection/AboutSection";
import Skills from "@/components/Skills/Skills";
import MyProjects from "@/components/MyProjects/MyProjects";
import Reviews from "@/components/Reviews/Reviews";
import ContactsUs from "@/components/ContactsUs/ContactsUs";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  // Завантажуємо повідомлення для поточної локалі
  const messages = await getMessages({ locale: params.locale }) as { home?: { page_title?: string; page_description?: string; myName?: string }, meta: { page_title: string; page_description: string; myName: string } };

  // Припустимо, що у вас є спеціальні значення для головної сторінки
  // Якщо немає окремих ключів для головної, можна використати meta.title напряму

  return {
    title: messages.home?.page_title || messages.meta.page_title,
    description:
      messages.home?.page_description || messages.meta.page_description,
    openGraph: {
      title: messages.home?.myName || messages.meta.myName,
      description:
        messages.home?.page_description || messages.meta.page_description,
    },
  };
}

export default function Home() {
  return (
    <>
      <AboutSection />
      <Skills />
      <MyProjects />
      <Reviews />
      <ContactsUs />
    </>
  );
}
