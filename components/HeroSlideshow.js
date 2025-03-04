"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  "/hero1.jpg",
  "/hero2.jpg",
  "/hero3.jpg",
  // Add more images as needed
];

export default function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[300px] sm:h-[450px] md:h-[550px] lg:h-[450px] xl:h-[650px] overflow-x-hidden">
      {images.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={`Hero image ${index + 1}`}
          fill
          className={`object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          priority={index === 0}
          sizes="100vw"
        />
      ))}
    </div>
  );
}
