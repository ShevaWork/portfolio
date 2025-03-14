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
  interface MetadataMessages {
    page_title: string;
    page_description: string;
  }

  const metadata = messages.Metadata as unknown as MetadataMessages;

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
