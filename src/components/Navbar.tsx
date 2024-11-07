"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer le menu mobile lors du clic sur un lien
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/95 backdrop-blur-md py-2 shadow-lg" : "bg-black/95 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div>
            <Link href="/" className="flex items-center space-x-3 group">
              <Image
                src="/images/logo/logo-honey.png"
                alt="Rucher des Hauldres Logo"
                width={200}
                height={40}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </Link>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {["ACCUEIL", "PROPOS", "MIELS", "TRAVAIL", "GALERIE"].map((item) => (
              <Link
                key={item}
                href={
                  item === "ACCUEIL"
                    ? "/"
                    : item === "GALERIE"
                    ? `/${item.toLowerCase()}`
                    : `#${item.toLowerCase()}`
                }
                className="relative px-4 py-2 text-sm font-medium text-white/90 hover:text-orange-200 transition-colors group"
                onClick={handleLinkClick}
              >
                {item}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-orange-200 transform -translate-x-1/2 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <Link href="#contact" onClick={handleLinkClick}>
              <Button className="ml-4 bg-orange-200 text-black font-medium hover:bg-text-50 hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-amber-400/20">
                CONTACTEZ-NOUS
              </Button>
            </Link>
          </div>

          {/* Bouton Menu Mobile */}
          <button
            className="md:hidden p-2 text-white hover:bg-text-50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Menu Mobile */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-[400px] opacity-100 visible"
              : "max-h-0 opacity-0 invisible overflow-hidden"
          }`}
        >
          <div className="pt-4 pb-6 space-y-4">
            {["ACCUEIL", "PROPOS", "MIELS", "TRAVAIL", "GALERIE"].map((item) => (
              <Link
                key={item}
                href={
                  item === "ACCUEIL"
                    ? "/"
                    : item === "GALERIE"
                    ? `/${item.toLowerCase()}`
                    : `#${item.toLowerCase()}`
                }
                className="block px-4 py-2 text-sm font-medium text-white/90 hover:text-orange-200 transition-colors"
                onClick={handleLinkClick}
              >
                {item}
              </Link>
            ))}
            <div className="pt-4 px-4">
              <Link href="#contact" onClick={handleLinkClick}>
                <Button className="w-full bg-orange-200 text-black font-medium hover:bg-text-50 transition-all duration-300">
                  CONTACTEZ-NOUS
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
