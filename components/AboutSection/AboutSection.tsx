"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "@/app/globals.css";
import { useTranslations } from "next-intl";

const images = [
  "/portfolio_picture/about_me/photo-1.jpg",
  "/portfolio_picture/about_me/photo-2.jpg",
  "/portfolio_picture/about_me/photo-3.jpg",
];

const AboutSection = () => {
  const t = useTranslations("AboutSection");
  const [currentImage, setCurrentImage] = useState(images[0]);

  const getRandomImage = () => {
    let newImage;
    do {
      newImage = images[Math.floor(Math.random() * images.length)];
    } while (newImage === currentImage);
    return newImage;
  };

  useEffect(() => {
    // Changing the photo
    const interval = setInterval(
      () => {
        setCurrentImage(getRandomImage());
      },
      10 * 60 * 1000
    );

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentImage]);

  return (
    <section
      className="relative min-h-96 h-[70svh] top_section flex "
      id="about"
    >
      <div className="absolute inset-0 flex">
        <div className="w-1/2 h-full opacity-100 max-md:hidden"></div>
        <div className="w-1/2 h-full relative max-md:w-full">
          <Image
            src={currentImage}
            alt="Profile photo"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-all duration-300 max-md:brightness-50"
            priority
          />
        </div>
      </div>

      <div className="z-10 w-full flex justify-center">
        <div className="container flex items-center">
          <div className="w-1/2 p-3 max-md:w-full max-md:flex max-md:flex-col max-md:text-white">
            <h1>{t("title")}</h1>
            <p className="py-2">{t("description")}</p>
            <Link
              href="#contacts"
              className="link-contact w-max ml-3 max-md:p-2"
            >
              <span>{t("contacts")}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
