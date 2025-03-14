import AboutSection from "@/components/AboutSection/AboutSection";
import Skills from "@/components/Skills/Skills";
import MyProjects from "@/components/MyProjects/MyProjects";
import Reviews from "@/components/Reviews/Reviews";
import ContactsUs from "@/components/ContactsUs/ContactsUs";
import { getMessages } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const messages = await getMessages({ locale: params.locale });
  const metadata = messages.Metadata as any;

  return {
    title: metadata.page_title,
    description: metadata.page_description,
    openGraph: {
      title: metadata.page_title,
      description: metadata.page_description,
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
