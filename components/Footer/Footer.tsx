"use client";

import React from "react";
import SendEmail from "@/components/Footer/SendEmail";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo_cur.svg";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaGlobeEurope,
} from "react-icons/fa";
import "@/app/globals.css";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toogle";

const Footer = () => {
  const t = useTranslations("Navbar");
  const f = useTranslations("Footer");

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = () => {
    const newLocale = locale === "ua" ? "en" : "ua";
    const currentPath = pathname;

    // Отримуємо шлях без поточної локалі
    const pathWithoutLocale = currentPath.replace(`/${locale}`, "");

    // Перенаправляємо на ту ж сторінку з новою локаллю
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <section className="footer_section w-full flex justify-center text-white">
      <div className="container py-4">
        <div className="w-full flex flex-col  md:flex-row md:justify-between border-b-2 border-white py-2">
          <div className="max-md:pb-4">
            <h2 className="max-md:text-center">{f("title_email")}</h2>
            <span className="max-md:block max-md:text-center">
              {f("description_email")}
            </span>
          </div>
          <SendEmail />
        </div>
        <div className="flex md:flex-row flex-col items-center h-auto p-4 border-b border-white">
          <Link href="#header" className="md:w-1/3">
            <Image
              src={logo}
              alt="logo"
              width={100}
              priority
              className="fill-white"
            />
          </Link>
          <div className="md:w-1/3 flex flex-col text-center lg:flex-row lg:justify-between">
            <Link href="#about" className="link-footer">
              {" "}
              {t("about")}
            </Link>
            <Link href="#projects" className="link-footer">
              {" "}
              {t("projects")}
            </Link>
            <Link href="#reviews" className="link-footer">
              {" "}
              {t("reviews")}
            </Link>
            <Link href="#contacts" className="link-footer">
              {" "}
              {t("contacts")}
            </Link>
          </div>
          <div className="md:w-1/3 flex flex-row justify-center md:justify-end">
            <Link
              href="https://www.instagram.com/0_s.h.e.v.a_0?igsh=MTNuNDNybHlqd2RjaQ=="
              target="_blank"
            >
              <FaInstagram className="icon-footer mx-4" />
            </Link>
            <Link
              href="https://www.facebook.com/share/18VAcWCAs8/"
              target="_blank"
            >
              <FaFacebook className="icon-footer mx-4" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/olexandr-shevchuk-77216317a"
              target="_blank"
            >
              <FaLinkedin className="icon-footer mx-4" />
            </Link>
          </div>
        </div>
        <div className="flex flex-row items-center h-auto p-2 justify-between">
          <ThemeToggle />
          <button
            onClick={switchLanguage}
            className="flex items-center cursor-pointer hover:text-gray-300 mr-4"
          >
            <FaGlobeEurope className="mr-2" />
            <span>{locale === "ua" ? "EN" : "UA"}</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Footer;
