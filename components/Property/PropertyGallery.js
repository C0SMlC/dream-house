"use client";
import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import Image from "next/image";

export default function PropertyGallery({
  photos,
  videos,
  propertyTitle = "Property",
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isVideo, setIsVideo] = useState(false);

  const allMedia = [
    ...(photos?.map((photo, index) => ({
      type: "photo",
      url: photo.photo_url,
      alt: photo.alt_text || `${propertyTitle} - Photo ${index + 1}`,
    })) || []),
    ...(videos?.map((video, index) => ({
      type: "video",
      url: video.video_url,
      title: video.title || `${propertyTitle} - Video ${index + 1}`,
    })) || []),
  ];

  useEffect(() => {
    let interval;
    if (isPlaying && allMedia.length > 1) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % allMedia.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, allMedia.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allMedia.length);
  };

  const openModal = (item, isVideoItem) => {
    setSelectedItem(item);
    setIsVideo(isVideoItem);
    setShowModal(true);
    setIsPlaying(false);
  };

  return (
    <section
      className="relative bg-gray-100 rounded-lg p-4 dark:bg-gray-800"
      aria-label={`${propertyTitle} Gallery`}
    >
      <div className="relative w-full h-96">
        {allMedia[currentIndex]?.type === "photo" ? (
          <figure>
            <div className="relative w-full h-full">
              <Image
                src={allMedia[currentIndex]?.url}
                alt={allMedia[currentIndex]?.alt || `${propertyTitle} photo`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={currentIndex === 0}
                className="object-cover rounded-lg cursor-pointer"
                onClick={() => openModal(allMedia[currentIndex].url, false)}
              />
            </div>
            <figcaption className="sr-only">
              {allMedia[currentIndex]?.alt}
            </figcaption>
          </figure>
        ) : (
          <figure>
            <video
              src={allMedia[currentIndex]?.url}
              title={allMedia[currentIndex]?.title}
              className="w-full h-full object-cover rounded-lg cursor-pointer"
              onClick={() => openModal(allMedia[currentIndex].url, true)}
              preload="metadata"
              aria-label={
                allMedia[currentIndex]?.title || `${propertyTitle} video`
              }
            />
            <figcaption className="sr-only">
              {allMedia[currentIndex]?.title}
            </figcaption>
          </figure>
        )}

        {/* Navigation buttons */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <button
            onClick={handlePrevious}
            className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Play/Pause button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute bottom-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          aria-pressed={isPlaying}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
      </div>

      {/* Thumbnails */}
      <nav
        className="mt-4 grid grid-cols-6 gap-2"
        aria-label="Gallery thumbnails"
      >
        {allMedia.map((item, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`cursor-pointer rounded-lg overflow-hidden h-16 ${
              currentIndex === index ? "ring-2 ring-blue-500" : ""
            }`}
            role="button"
            aria-label={`View ${item.type === "photo" ? "photo" : "video"} ${
              index + 1
            }`}
            aria-current={currentIndex === index}
          >
            {item.type === "photo" ? (
              <div className="relative w-full h-full">
                <Image
                  src={item.url}
                  alt={item.alt || `Thumbnail ${index + 1}`}
                  fill
                  sizes="100px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            ) : (
              <video
                src={item.url}
                className="w-full h-full object-cover"
                title={item.title}
                preload="none"
              />
            )}
          </div>
        ))}
      </nav>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          role="dialog"
          aria-modal="true"
          aria-label="Media viewer"
        >
          <div className="relative max-w-6xl max-h-screen p-4">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
              aria-label="Close"
            >
              <X size={24} />
            </button>
            {isVideo ? (
              <video
                src={selectedItem}
                controls
                className="max-h-[90vh] w-auto"
                preload="auto"
                autoPlay
              />
            ) : (
              <Image
                src={selectedItem}
                alt="Enlarged view"
                width={1200}
                height={800}
                className="max-h-[90vh] w-auto object-contain"
                priority
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
