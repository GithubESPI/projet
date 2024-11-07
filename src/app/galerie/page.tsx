"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const galleryImages = [
  {
    id: 1,
    src: "/images/gal/1.jpg",
    alt: "Vérification d'un cadre d'une réhausse",
    title: "Vérification d'un cadre d'une réhausse",
    description: "Vue d'une de nos ruches dans leur environnement naturel",
    location: "chanteloup",
  },
  {
    id: 2,
    src: "/images/gal/2.jpg",
    alt: "Vérification d'un cadre d'une réhausse de plus près",
    title: "Vérification d'un cadre d'une réhausse de plus près",
    description: "Cadre d'une réhausse de plus près",
    location: "chanteloup",
  },
  {
    id: 3,
    src: "/images/gal/3.jpg",
    alt: "Cadre d'une réhausse sortie",
    title: "Cadre Sortie",
    description: "Cadre d'une réhausse sortie",
    location: "chanteloup",
  },
  {
    id: 4,
    src: "/images/gal/4.jpg",
    alt: "Réhausse en pleine air",
    title: "Réhausse en pleine air",
    description: "Réhausse en pleine air",
    location: "chanteloup",
  },
  {
    id: 5,
    src: "/images/gal/5.jpg",
    alt: "Ruches en pleine nature",
    title: "Nos Ruches",
    description: "Vue de nos ruches dans leur environnement naturel",
    location: "chanteloup",
  },
  {
    id: 6,
    src: "/images/gal/6.jpg",
    alt: "Ruchette en pleine air",
    title: "Ruchette en pleine air",
    description: "Ruchette en pleine air",
    location: "breviande",
  },
  {
    id: 7,
    src: "/images/gal/7.jpg",
    alt: "Rûches du domaine de Bréviande",
    title: "Rûches du domaine de Bréviande",
    description: "Rûches du domaine de Bréviande",
    location: "breviande",
  },
  {
    id: 8,
    src: "/images/gal/8.jpg",
    alt: "Vue de deux ruches du domaine de Bréviande",
    title: "Vue de deux ruches du domaine de Bréviande",
    description: "Vue de deux ruches du domaine de Bréviande",
    location: "breviande",
  },
  {
    id: 9,
    src: "/images/gal/9.jpg",
    alt: "Vue de trois ruches du domaine de Bréviande",
    title: "Vue de trois ruches du domaine de Bréviande",
    description: "Vue de trois ruches du domaine de Bréviande",
    location: "breviande",
  },
];

const filters = [
  { id: "tous", label: "Tous" },
  { id: "chanteloup", label: "Chanteloup" },
  { id: "breviande", label: "Bréviande" },
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("tous");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages = galleryImages.filter(
    (image) => activeFilter === "tous" || image.location === activeFilter
  );

  const handlePrevious = useCallback(() => {
    if (selectedImage === null) return;
    setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1);
  }, [selectedImage, filteredImages.length]);

  const handleNext = useCallback(() => {
    if (selectedImage === null) return;
    setSelectedImage(selectedImage === filteredImages.length - 1 ? 0 : selectedImage + 1);
  }, [selectedImage, filteredImages.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setSelectedImage(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, handleNext, handlePrevious]); // Ajout des dépendances

  return (
    <main className="min-h-screen bg-neutral-950 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif text-white mb-4">Notre Galerie Photo</h1>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Découvrez en images notre passion pour l&apos;apiculture et le processus de création de
            nos miels artisanaux.
          </p>
          <div className="w-20 h-1 bg-orange-200/60 rounded-full mx-auto mt-6" />
        </div>

        <div className="flex justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              variant={activeFilter === filter.id ? "default" : "outline"}
              className={`
                px-6 py-2 transition-all duration-300
                ${
                  activeFilter === filter.id
                    ? "bg-orange-200/60 text-white hover:bg-text-50"
                    : "bg-orange-200/60 border-amber-400/20 hover:border-orange-200 hover:text-orange-800/60 hover:bg-orange-200"
                }
              `}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((image, index) => (
            <Card
              key={image.id}
              className="group bg-neutral-900 border-none overflow-hidden hover:shadow-2xl hover:shadow-amber-400/10 transition-all duration-500 cursor-pointer"
              onClick={() => setSelectedImage(index)}
            >
              <div className="relative aspect-square">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-xl font-semibold text-white mb-2">{image.title}</h3>
                  <span className="text-orange-200 text-sm font-medium capitalize">
                    {image.location}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60 text-lg">Aucune image disponible pour ce lieu.</p>
          </div>
        )}

        {/* Modal pour l'affichage en grand format */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
            <button
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              onClick={handlePrevious}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="relative w-full max-w-5xl aspect-[16/9] mx-4">
              <Image
                src={filteredImages[selectedImage].src}
                alt={filteredImages[selectedImage].alt}
                fill
                className="object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {filteredImages[selectedImage].title}
                </h3>
                <p className="text-white/80">{filteredImages[selectedImage].description}</p>
              </div>
            </div>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              onClick={handleNext}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
