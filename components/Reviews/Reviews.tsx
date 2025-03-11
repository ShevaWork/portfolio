import React from "react";
import ReviewsPreview from "@/components/Reviews/ReviewsPreview";
import "@/app/globals.css";
import { useTranslations } from "next-intl";

const Reviews = () => {
  const t = useTranslations("Reviews");
  return (
    <section className="reviews_section flex justify-center" id="reviews">
      <div className="container flex flex-col items-center w-full gap-y-4 py-4">
        <h1 className="">{t("title")}</h1>
        <span className="font-semibold">{t("description")}</span>
        <ReviewsPreview />
      </div>
    </section>
  );
};

export default Reviews;
