"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "@/public/logo_cur.svg";
import Image from "next/image";
import "@/app/globals.css";
import { useTranslations } from "next-intl";
const Navbar = () => {
  const t = useTranslations("Navbar");

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target as Node) &&
      !(e.target as HTMLElement).closest("button[aria-label='Toggle menu']")
    ) {
      setIsMobileMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen, handleClickOutside]);

  //Navigation points with translations
  const navItems = [
    { key: "about", label: t("about"), href: "#about" },
    { key: "projects", label: t("projects"), href: "#projects" },
    { key: "reviews", label: t("reviews"), href: "#reviews" },
    {
      key: "contacts",
      label: t("contacts"),
      href: "#contacts",
      className: "link-contact",
    },
  ];

  return (
    <header className="py-1 top_section" id="header">
      <div className="container mx-auto px-2 flex justify-between items-center">
        <Link href="#header">
          <Image src={logo} alt="logo" width={60} priority />
        </Link>
        {/* DesktopNAV */}
        <nav className="hidden md:flex space-x-4 header-nav-desk ">
          {navItems.map((item) => (
            <Link key={item.key} href={item.href} className={item.className}>
              {item.label}
            </Link>
          ))}
        </nav>
        {/* MobileNAV */}
        <button
          className="md:hidden"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <FaTimes className="w-6 h-6" />
          ) : (
            <FaBars className="w-6 h-6" />
          )}
        </button>
        {isMobileMenuOpen && (
          <div
            ref={menuRef}
            className={`md:hidden absolute flex flex-col top-16 right-4 w-48 bg-[#AFAE83] rounded-md shadow-lg py-2 z-20 transition-transform duration-300 ${
              isMobileMenuOpen
                ? "scale-100 opacity-100"
                : "scale-95 opacity-0 pointer-events-none"
            }`}
          >
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="block px-4 py-2 hover:bg-[#696954]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
