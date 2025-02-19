"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
} from "lucide-react";

export default function TabbedGallery({ photos = [], videos = [] }) {
  const [activeTab, setActiveTab] = useState("photos");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalType, setModalType] = useState("photo");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);

  const openModal = (content, type, index) => {
    console.log(content);
    setModalContent(content);
    setModalType(type);
    setCurrentIndex(index);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
    setIsFullscreen(false);
    document.body.style.overflow = "unset";
  };

  const navigate = (direction) => {
    const items = modalType === "photo" ? photos : videos;
    let newIndex = currentIndex + direction;

    if (newIndex < 0) newIndex = items.length - 1;
    if (newIndex >= items.length) newIndex = 0;

    setCurrentIndex(newIndex);
    setModalContent(
      modalType === "photo" ? items[newIndex] : items[newIndex].video_url
    );
  };

  const toggleFullscreen = async () => {
    if (!videoRef.current) return;

    try {
      if (!isFullscreen) {
        if (videoRef.current.requestFullscreen) {
          await videoRef.current.requestFullscreen();
        } else if (videoRef.current.webkitRequestFullscreen) {
          await videoRef.current.webkitRequestFullscreen();
        } else if (videoRef.current.msRequestFullscreen) {
          await videoRef.current.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          await document.msExitFullscreen();
        }
      }
      setIsFullscreen(!isFullscreen);
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  };

  // Handle fullscreen change events
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        !!(
          document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement
        )
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  return (
    <div className="w-full">
      {/* Tab Buttons */}
      <div className="flex border-b mb-4">
        <motion.button
          whileHover={{ y: -2 }}
          onClick={() => setActiveTab("photos")}
          className={`py-3 px-6 -mb-px border-b-2 font-medium transition-colors focus:outline-none ${
            activeTab === "photos"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600 hover:text-blue-500"
          }`}
          aria-label="Show photos"
        >
          Photos ({photos.length})
        </motion.button>
        <motion.button
          whileHover={{ y: -2 }}
          onClick={() => setActiveTab("videos")}
          className={`py-3 px-6 -mb-px border-b-2 font-medium transition-colors focus:outline-none ${
            activeTab === "videos"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600 hover:text-blue-500"
          }`}
          aria-label="Show videos"
        >
          Videos ({videos.length})
        </motion.button>
      </div>

      {/* Gallery Grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {activeTab === "photos" &&
          photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden"
            >
              <img
                src={photo}
                alt={`Property photo ${index + 1}`}
                className="object-cover w-full h-full cursor-pointer"
                onClick={() => openModal(photo, "photo", index)}
                loading="lazy"
              />
            </motion.div>
          ))}
        {activeTab === "videos" &&
          videos.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden relative"
              onClick={() => openModal(video.video_url, "video", index)}
            >
              <video
                src={video.video_url}
                className="object-cover w-full h-full cursor-pointer"
                muted
                loop
                onClick={() => openModal(video.video_url, "video", index)}
                playsInline
              />
              <motion.div
                className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center"
                whileHover={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              >
                <motion.svg
                  className="h-16 w-16 text-white"
                  whileHover={{ scale: 1.1 }}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </motion.svg>
              </motion.div>
            </motion.div>
          ))}
      </motion.div>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-7xl w-full mx-4 h-[80vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Navigation Buttons */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute left-4 p-2 text-white rounded-full bg-black bg-opacity-50 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(-1);
                }}
                aria-label="Previous item"
              >
                <ChevronLeft size={24} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-4 p-2 text-white rounded-full bg-black bg-opacity-50 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(1);
                }}
                aria-label="Next item"
              >
                <ChevronRight size={24} />
              </motion.button>

              {/* Controls */}
              <div className="absolute top-4 right-4 flex gap-2">
                {modalType === "video" && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFullscreen();
                    }}
                    className="p-2 text-white rounded-full bg-black bg-opacity-50 z-10"
                    aria-label="Toggle fullscreen"
                  >
                    {isFullscreen ? (
                      <Minimize2 size={24} />
                    ) : (
                      <Maximize2 size={24} />
                    )}
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeModal}
                  className="p-2 text-white rounded-full bg-black bg-opacity-50 z-10"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* Content */}
              <div className="w-full h-full flex items-center justify-center">
                {modalType === "photo" && (
                  <motion.img
                    key={modalContent}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    src={modalContent}
                    alt="Enlarged Property Photo"
                    className="max-w-full max-h-full object-contain"
                  />
                )}
                {modalType === "video" && (
                  <motion.video
                    ref={videoRef}
                    key={modalContent}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    src={modalContent}
                    controls
                    autoPlay
                    className="max-w-full max-h-full rounded-lg"
                    playsInline
                    controlsList="nodownload"
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
