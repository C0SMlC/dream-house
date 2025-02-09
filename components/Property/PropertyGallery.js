"use client";
import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

export default function PropertyGallery({ photos, videos }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isVideo, setIsVideo] = useState(false);

  const allMedia = [
    ...(photos?.map((photo) => ({ type: "photo", url: photo.photo_url })) ||
      []),
    ...(videos?.map((video) => ({ type: "video", url: video.video_url })) ||
      []),
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
    <div className="relative bg-gray-100 rounded-lg p-4 dark:bg-gray-800">
      <div className="relative w-full h-96">
        {allMedia[currentIndex]?.type === "photo" ? (
          <img
            src={allMedia[currentIndex]?.url}
            alt={`Media ${currentIndex + 1}`}
            className="w-full h-full object-cover rounded-lg cursor-pointer"
            onClick={() => openModal(allMedia[currentIndex].url, false)}
          />
        ) : (
          <video
            src={allMedia[currentIndex]?.url}
            className="w-full h-full object-cover rounded-lg cursor-pointer"
            onClick={() => openModal(allMedia[currentIndex].url, true)}
          />
        )}

        {/* Navigation buttons */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <button
            onClick={handlePrevious}
            className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Play/Pause button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute bottom-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
      </div>

      {/* Thumbnails */}
      <div className="mt-4 grid grid-cols-6 gap-2">
        {allMedia.map((item, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`cursor-pointer rounded-lg overflow-hidden h-16 ${
              currentIndex === index ? "ring-2 ring-blue-500" : ""
            }`}
          >
            {item.type === "photo" ? (
              <img
                src={item.url}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <video src={item.url} className="w-full h-full object-cover" />
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative max-w-6xl max-h-screen p-4">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
            >
              <X size={24} />
            </button>
            {isVideo ? (
              <video
                src={selectedItem}
                controls
                className="max-h-[90vh] w-auto"
              />
            ) : (
              <img
                src={selectedItem}
                alt="Enlarged view"
                className="max-h-[90vh] w-auto"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
