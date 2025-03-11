"use client";

import React, { useRef } from "react";
import "@/app/globals.css";
import { MdOutlineEmail } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
import { CiLinkedin } from "react-icons/ci";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { toast } from "react-hot-toast";

const ContactsUs = () => {
  const t = useTranslations("ContactsUs");
  const copy = useRef<HTMLParagraphElement>(null);

  const handleCopy = (contact: string) => {
    if (contact) {
      navigator.clipboard.writeText(contact);
      toast.success(t("copy"), {
        position: "top-right",
        duration: 3000,
      });
    }
  };

  return (
    <section className="w-full flex justify-center contsctUs_section text-white" id="contacts">
      <div className="container flex flex-col items-center gap-y-4 py-4">
        <h1>{t("title")}</h1>
        <span className="block">{t("description")}</span>
        <div className="w-full flex md:flex-row flex-col gap-y-8 justify-between">
          <div
            className="md:w-1/3 flex flex-col gap-y-2 items-center cursor-pointer hover:font-semibold"
            ref={copy}
            onClick={() => {
              handleCopy("olexandr.sheva@gmail.com");
            }}
          >
            <MdOutlineEmail className="icons-ContactUs" />
            <h2>{t("title_email")}</h2>
            <p className="text-center">{t("description_email")}</p>
            <h3 className="mb-0 mt-auto">olexandr.sheva@gmail.com</h3>
          </div>
          <div
            className="md:w-1/3 flex flex-col gap-y-2 items-center cursor-pointer hover:font-semibold"
            ref={copy}
            onClick={() => {
              handleCopy("+38 067 354 28 23");
            }}
          >
            <BsTelephone className="icons-ContactUs" />
            <h2>{t("title_phone")}</h2>
            <p className="text-center">{t("description_phone")}</p>
            <h3 className="mb-0 mt-auto">+38 067 354 28 23</h3>
          </div>
          <Link
            href="https://www.linkedin.com/in/olexandr-shevchuk-77216317a"
            target="_blank"
            className="md:w-1/3 flex flex-col gap-y-2 items-center font-normal hover:font-semibold"
          >
            <CiLinkedin className="icons-ContactUs" />
            <h2>{t("title_linkedin")}</h2>
            <p className="text-center">{t("description_linkedin")}</p>

            <h3 className="font-normal mb-0 mt-auto">www.linkedin.com</h3>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactsUs;
