"use client";

import React, { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import Link from "next/link";
import {
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
  FaGithub,
} from "react-icons/fa";
import { projectsData } from "@/app/api/projects_list";
import "keen-slider/keen-slider.min.css";
import "@/app/globals.css";
import { useLocale } from "next-intl";

const github_img = "/projects/github.webp";

interface Project {
  id: number;
  title: string;
  title_en: string;
  description: string;
  description_en: string;
  image?: string;
  liveUrl?: string;
  repoUrl?: string;
  tags: string[];
  previewUrl?: string;
}

const ProjectPreview = () => {
  const locale = useLocale();

  // console.log(locale==="en"?(project.description_en):locale==="ua"?(project.description):project.description_en)

  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [isLoading, setIsLoading] = useState<Record<number, boolean>>({});
  const [details_text, setDetails_text] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    slides: {
      perView: 1,
      spacing: 16,
    },
  });

  // Feature to obtain a URL preview of the site
  const getPreviewUrl = async (liveUrl: string): Promise<string> => {
    return `https://api.microlink.io/?url=${encodeURIComponent(
      liveUrl
    )}&screenshot=true&meta=false&embed=screenshot.url`;
  };

  useEffect(() => {
    const loadPreviews = async () => {
      const updatedProjects = [...projects];

      // create an array of stems for each project that requires previe
      const previewPromises = projects
        .filter((project) => !project.image && project.liveUrl)
        .map(async (project) => {
          if (project.liveUrl) {
            // indicate that this project is loaded
            setIsLoading((prev) => ({ ...prev, [project.id]: true }));

            try {
              const previewUrl = await getPreviewUrl(project.liveUrl);
              // Update the project object with previews
              const index = updatedProjects.findIndex(
                (p) => p.id === project.id
              );
              if (index !== -1) {
                updatedProjects[index] = {
                  ...updatedProjects[index],
                  previewUrl,
                };
              }
            } catch (error) {
              console.error(
                `Помилка завантаження превью для ${locale === "en" ? project.title_en : locale === "ua" ? project.title : project.title_en}:`,
                error
              );
            } finally {
              // remove the load status
              setIsLoading((prev) => ({ ...prev, [project.id]: false }));
            }
          }
          return project;
        });

      // Looking forward to completing all the requests
      await Promise.all(previewPromises);

      // update the state with new data
      setProjects(updatedProjects);
    };

    loadPreviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nextProject = () => {
    if (instanceRef.current) {
      instanceRef.current.next();
    }
  };

  const prevProject = () => {
    if (instanceRef.current) {
      instanceRef.current.prev();
    }
  };

  return (
    <>
      <div className="relative max-w-4xl mx-auto mt-8">
        {/* Navigation buttons */}
        <button
          onClick={prevProject}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-xl shadow-md project_slider"
          aria-label="Попередній проект"
        >
          <FaChevronLeft size={24} />
        </button>
        <button
          onClick={nextProject}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-xl shadow-md project_slider"
          aria-label="Наступний проект"
        >
          <FaChevronRight size={24} />
        </button>

        {/* Project carousel using Keen-Slider */}
        <div ref={sliderRef} className="keen-slider">
          {projects.map((project) => (
            <div key={project.id} className="keen-slider__slide">
              <div
                className="relative aspect-video mx-4 rounded-lg overflow-hidden"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Background image */}
                <div className="w-full h-full">
                  {/* Option 1: There is your own image */}
                  {project.image ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={project.image}
                        alt={project.title_en}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : project.previewUrl ? (
                    /* Option 2: Downloaded by preview */
                    <div className="relative w-full h-full">
                      <Image
                        src={project.previewUrl}
                        alt={project.title_en}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : project.liveUrl && isLoading[project.id] ? (
                    /* Option 3: Preview is loaded */
                    <div className="w-full h-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800 mb-2"></div>
                        <span className="text-gray-600">
                          Завантаження превью...
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Option 4: No image nor the URL of the project, or failed to download preview */
                    <div className="relative w-full h-full">
                      <Image
                        src={github_img}
                        alt={project.title_en}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Overlay when presented */}
                <div
                  className={`absolute inset-0 bg-black transition-opacity duration-300 flex items-center justify-center gap-4 ${
                    hoveredProject === project.id ? "opacity-80" : "opacity-0"
                  }`}
                >
                  {project.liveUrl && (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg_white_to_black p-3 rounded-xl hover:bg-gray-500 transition-colors"
                      aria-label="Відкрити проект"
                    >
                      <FaExternalLinkAlt size={24} />
                    </Link>
                  )}
                  {project.repoUrl && (
                    <Link
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg_white_to_black p-3 rounded-xl hover:bg-gray-500 transition-colors"
                      aria-label="Відкрити репозиторій"
                    >
                      <FaGithub size={24} />
                    </Link>
                  )}
                </div>
                {/* Project information */}
                <div className="absolute bottom-0 left-0 right-0 bg_white_to_black bg-opacity-90 p-2">
                  <button
                    className="flex w-full justify-end items-center pr-4"
                    onClick={() => setDetails_text(!details_text)}
                  >
                    <h2 className="font-bold">
                      {locale === "en"
                        ? project.title_en
                        : locale === "ua"
                          ? project.title
                          : project.title_en}
                    </h2>
                    <FaChevronRight
                      className={`transition-transform duration-300 ${
                        details_text ? "rotate-90" : "rotate-0"
                      }`}
                    />
                  </button>
                  <div className="flex flex-wrap gap-2 mt-2 max-sm:hidden">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-200 text-gray-700 rounded-xl"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section with detailed information */}
      <div className="w-full overflow-hidden transition-all duration-300">
        <div
          className={`${
            details_text
              ? "opacity-100 pt-4 px-7 border-t border-t-black"
              : "max-h-0 opacity-0"
          }`}
        >
          <span>
            {locale === "en"
              ? projects[currentSlide]?.description_en
              : locale === "ua"
                ? projects[currentSlide]?.description
                : projects[currentSlide]?.description_en}
          </span>
          <div className="flex flex-wrap gap-2 mt-2">
            {projects[currentSlide]?.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-200 text-gray-700 rounded-xl sm:hidden"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectPreview;
