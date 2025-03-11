"use client";
import React, { useState, useEffect } from "react";
import { reviewsData } from "@/app/api/reviews_list";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useTranslations } from "next-intl";
import "@/app/globals.css";

const ReviewsPreview = () => {
  const t = useTranslations("Reviews");
  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const hasReviews = reviewsData.length > 0;
  const countReviews = hasReviews
    ? reviewsData.length > slidesPerView
      ? slidesPerView
      : reviewsData.length
    : 0;
  const [, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider(
    hasReviews
      ? {
          loop: true,
          slides: { perView: countReviews, spacing: 15 },
          slideChanged(s) {
            setCurrentSlide(s.track.details.rel);
          },
        }
      : {}
  );

  // Автопрокрутка кожні 30 секунд
  useEffect(() => {
    if (!hasReviews) return;

    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 30 * 1000);

    return () => clearInterval(interval);
  }, [instanceRef, hasReviews]);

  return (
    <div className="relative w-full">
      {hasReviews ? (
        <>
          {/* Slider */}
          <div ref={sliderRef} className="keen-slider">
            {reviewsData.map((item, index) => (
              <div
                key={index}
                className="keen-slider__slide flex flex-col reviews_coments_bg p-5 sm:rounded-xl sm:border sm:border-black"
              >
                <span className="p-1 border-b-2 border-b-black">
                  {item.review}
                </span>
                <div className="flex flex-row items-center gap-3 justify-between">
                  <div className="bg-gray-500 rounded-full w-12 h-12"></div>
                  <div>
                    <h2 className="text-right">{item.user.name}</h2>
                    <span className="block text-right">
                      {item.user.country}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-32 bg-gray-100 rounded-xl">
          <h2 className="text-gray-500">{t("none_reviews")}</h2>
        </div>
      )}
    </div>
  );
};

export default ReviewsPreview;
