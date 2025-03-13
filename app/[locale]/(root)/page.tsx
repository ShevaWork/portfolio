import { Metadata } from "next";
import AboutSection from "@/components/AboutSection/AboutSection";
import Skills from "@/components/Skills/Skills";
import MyProjects from "@/components/MyProjects/MyProjects";
import Reviews from "@/components/Reviews/Reviews";
import ContactsUs from "@/components/ContactsUs/ContactsUs";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: 'Домашня сторінка',
    description: 'Вітаю на моєму сайті-портфоліо. Ознайомтеся з моїми проєктами, навичками та відгуками.',
    openGraph: {
      title: 'Портфоліо',
      description: 'Вітаю на моєму сайті-портфоліо. Ознайомтеся з моїми проєктами, навичками та відгуками.',
    }
  };
};

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
