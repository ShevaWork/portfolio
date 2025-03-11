import React from "react";
import ProjectPreview from "@/components/MyProjects/ProjectPreview";
import { useTranslations} from "next-intl";
import "@/app/globals.css";

const MyProjects = () => {
  const t = useTranslations("MyProjects");
  return (
    <section className=" flex justify-center project_section" id="projects">
      <div className="container p-8">
        <div className="flex flex-col items-center gap-y-4 py-4">
          <p className="font-semibold">{t("pre_titpe")}</p>
          <h1>{t("title")}</h1>
          <span>{t("description")}</span>
        </div>
        <ProjectPreview />
      </div>
    </section>
  );
};

export default MyProjects;
