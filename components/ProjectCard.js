"use client";
import { Heart, Trash } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProjectCard({
  id,
  title,
  location,
  priceRange,
  images,
  type,
}) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isDeleteEnabled = type === "delete";

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);
    return () => clearInterval(interval);
  }, [images]);

  const handleDelete = async (e) => {
    e.stopPropagation();

    const password = prompt("Enter admin password to confirm deletion:");
    if (!password) return; // Cancel deletion if no password is provided

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/properties/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete property");
      }

      if (data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to delete property:", error);
      alert(error.message);
    }
  };

  const currentImage =
    images?.[currentImageIndex]?.photo_url ||
    "https://images.pexels.com/photos/2179603/pexels-photo-2179603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors group cursor-pointer"
      onClick={() => router.push(`/properties/${id}`)}
    >
      <div className="relative h-48">
        <Image
          src={currentImage}
          alt={`${title} - Image ${currentImageIndex + 1}`}
          fill
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
        {isDeleteEnabled ? (
          <button
            className="absolute top-2 right-2 p-1 bg-white dark:bg-gray-800 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={handleDelete}
          >
            <Trash className="w-5 h-5 text-red-500" />
          </button>
        ) : (
          <button
            className="absolute top-2 right-2 p-1 bg-white dark:bg-gray-800 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
          >
            <Heart
              className={`w-5 h-5 ${
                isLiked ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </button>
        )}

        {images?.length > 1 && (
          <>
            <div className="absolute bottom-2 right-2 bg-black/50 px-2 py-1 rounded-full text-xs text-white">
              {currentImageIndex + 1}/{images.length}
            </div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    currentImageIndex === index ? "bg-white" : "bg-white/50"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
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
