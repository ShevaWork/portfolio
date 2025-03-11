import AboutSection from "@/components/AboutSection/AboutSection";
import Skills from "@/components/Skills/Skills";
import MyProjects from "@/components/MyProjects/MyProjects";
import Reviews from "@/components/Reviews/Reviews";
import ContactsUs from "@/components/ContactsUs/ContactsUs";

export default function Home() {
  return (
    <>
      <AboutSection />
      <Skills />
      <MyProjects />
      <Reviews/>
      <ContactsUs/>
    </>
  );
}
