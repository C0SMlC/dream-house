"use client";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ProjectCard({ title, location, priceRange }) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors">
      <div className="relative h-48">
        <Image
          src="https://images.pexels.com/photos/2179603/pexels-photo-2179603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Project thumbnail"
          fill
          className="object-cover"
        />
        <button
          className="absolute top-2 right-2 p-1 bg-white dark:bg-gray-800 rounded-full transition-colors"
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart
            className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
          />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{location}</p>
        <p className="text-sm font-semibold mt-2 dark:text-gray-200">
          {priceRange}
        </p>
      </div>
    </div>
  );
}
