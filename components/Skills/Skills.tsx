"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import "@/app/globals.css";
import { useTranslations } from "next-intl";

const Skills = () => {
  const t = useTranslations("Skills");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="flex justify-center skills_section s">
      <div className="flex flex-wrap max-md:flex-col container">
        <div className="w-1/2 p-4 flex flex-col items-start justify-center max-md:w-full">
          <p className="font-semibold mb-3">{t("title")}</p>
          <h1>{t("title_text")}</h1>
        </div>
        <div className="w-1/2 p-4 max-md:w-full">
          <span>{t("description")}</span>
          <div className="flex gap-3 items-center justify-between pt-8">
            <Link
              href="#contacts"
              className="font-normal skills-det"
            >
              {t("contacts")}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className=" flex flex-row font-normal text-sm skills-contact p-[0.2em] items-center gap-1 max-md:text-lg"
            >
              <p>{t("more")}</p>
              <FaChevronRight
                className={`transition-transform duration-300 ${
                  isOpen ? "rotate-90" : "rotate-0"
                }`}
              />
            </button>
          </div>
        </div>
        <div
          className={`w-full overflow-hidden transition-all duration-300 ${
            isOpen ? "opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <span className=" text-end mr-4 block skills_more_text">
            {t("more_text")
              .split("/n")
              .map((line, index) => (
                <span className="block" key={index}>{line}</span>
              ))}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Skills;
