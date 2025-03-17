import AboutSection from "@/components/AboutSection/AboutSection";
import Skills from "@/components/Skills/Skills";
import MyProjects from "@/components/MyProjects/MyProjects";
import Reviews from "@/components/Reviews/Reviews";
import ContactsUs from "@/components/ContactsUs/ContactsUs";
import { getTranslations } from "next-intl/server";
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
    title: `${t("nameProj")} | ${t("myName")}`,
    description: t("page_description"),
    openGraph: {
      title: `${t("myName")} | ${t("nameProj")}`,
      description: t("description"),
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
