"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";

const slides = [
  {
    image: "/images/home/home-1.jpg",
    title: "Bienvenue au rucher des Hauldres",
    subtitle: "Nos miels sont naturels, non chauffés, non agités, de grande qualité et savoureux !",
  },
  {
    image: "/images/home/home-3.jpg",
    title: "Découvrez nos différentes variétés de miels",
    subtitle:
      "Issues du domaine de Chanteloup, de la maison forestière du bois de Bréviande et Mardilly.",
  },
];

const AUTOPLAY_INTERVAL = 15000; // 5 secondes

export default function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // Autoplay
  useEffect(() => {
    if (!emblaApi) return;

    let intervalId = setInterval(() => {
      emblaApi.scrollNext();
    }, AUTOPLAY_INTERVAL);

    // Arrêter l'autoplay quand l'utilisateur interagit avec le carousel
    const stopAutoplay = () => {
      clearInterval(intervalId);
      // Redémarrer l'autoplay après 5 secondes d'inactivité
      intervalId = setInterval(() => {
        emblaApi.scrollNext();
      }, AUTOPLAY_INTERVAL);
    };

    emblaApi.on("pointerDown", stopAutoplay);
    emblaApi.on("select", stopAutoplay);

    return () => {
      clearInterval(intervalId);
      if (emblaApi) {
        emblaApi.off("pointerDown", stopAutoplay);
        emblaApi.off("select", stopAutoplay);
      }
    };
  }, [emblaApi]);

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0" ref={emblaRef}>
        <div className="flex h-full touch-pan-y">
          {slides.map((slide, index) => (
            <div key={index} className="relative flex-[0_0_100%] min-w-0">
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>

              <div className="relative h-full flex items-center justify-center">
                <div className="text-center max-w-5xl px-4 animate-fade-in">
                  <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">{slide.title}</h1>
                  <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">{slide.subtitle}</p>
                  <Link href="#miels">
                    <Button className="bg-text-50 text-black hover:bg-text-50 transition-all duration-300 px-8 py-6 text-lg font-medium rounded-md hover:scale-105">
                      Voir nos miels
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
