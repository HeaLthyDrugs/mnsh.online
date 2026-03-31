"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { cn } from "@/lib/utils";

type GalleryItem = {
  type: "image" | "video";
  url: string;
  thumbnail?: string;
};

interface WorkCarouselProps {
  gallery: GalleryItem[];
}

export function WorkCarousel({ gallery }: WorkCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isExpanded) {
        if (e.key === "Escape") setIsExpanded(false);
        // We can still support arrow keys while expanded if they want to browse images fullscreen
        if (e.key === "ArrowRight") {
          setCurrentIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
        }
        if (e.key === "ArrowLeft") {
          setCurrentIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
        }
        return;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded, gallery.length]);

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isExpanded]);

  if (!gallery || gallery.length === 0) return null;

  const handlePrevious = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  const currentItem = gallery[currentIndex];

  const scrollThumbnails = (direction: "left" | "right") => {
    if (thumbnailsRef.current) {
      const scrollAmount = thumbnailsRef.current.offsetWidth * 0.8;
      thumbnailsRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="flex flex-col gap-[2px] w-full max-w-5xl mx-auto">
        {/* Main Viewport */}
        <div
          className={cn(
            "relative w-full aspect-video bg-black group overflow-hidden",
            currentItem.type === "image" ? "cursor-pointer" : ""
          )}
          onClick={() => {
            if (currentItem.type === "image") {
              setIsExpanded(true);
            }
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center bg-black z-0"
            >
              {currentItem.type === "video" ? (
                <video
                  src={currentItem.url}
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                  muted
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <img
                  src={currentItem.url}
                  alt={`Gallery image ${currentIndex + 1}`}
                  className="w-full h-full object-contain"
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Overlays */}
          {gallery.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 flex items-center justify-center bg-transparent opacity-0 group-hover:opacity-100 hover:bg-black/20 hover:backdrop-blur-sm transition-all text-white z-10"
                aria-label="Previous image"
              >
                <ChevronLeft size={40} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 flex items-center justify-center bg-transparent opacity-0 group-hover:opacity-100 hover:bg-black/20 hover:backdrop-blur-sm transition-all text-white z-10"
                aria-label="Next image"
              >
                <ChevronRight size={40} />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {gallery.length > 1 && (
          <div className="relative group/thumbs flex items-center bg-black/5 dark:bg-white/5">
            <button
              onClick={() => scrollThumbnails("left")}
              className="absolute left-0 z-10 h-full w-8 flex items-center justify-center bg-black/20 backdrop-blur-sm text-white opacity-0 group-hover/thumbs:opacity-100 transition-all hover:bg-black/40"
            >
              <ChevronLeft size={20} />
            </button>

            <div
              ref={thumbnailsRef}
              className="flex gap-[4px] overflow-x-auto scrollbar-hide py-[4px] px-[4px] w-full"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {gallery.map((item, index) => {
                const isActive = index === currentIndex;
                const thumbUrl = item.thumbnail || (item.type === "image" ? item.url : "");
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      "relative flex-shrink-0 h-[72px] sm:h-[90px] bg-black/20 focus:outline-none transition-all box-border",
                      isActive
                        ? "border-2 border-white z-10 opacity-100 shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                        : "border-2 border-transparent opacity-50 hover:opacity-100"
                    )}
                  >
                    {thumbUrl ? (
                      <img
                        src={thumbUrl}
                        alt={`Thumbnail ${index + 1}`}
                        className="h-full w-auto block object-cover"
                      />
                    ) : (
                      <div className="h-full aspect-video flex items-center justify-center bg-zinc-800 text-zinc-400">
                        {item.type === "video" ? <Play size={24} /> : "No media"}
                      </div>
                    )}
                    {item.type === "video" && thumbUrl && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                        <div className="bg-black/60 rounded-none p-2">
                          <Play size={16} className="text-white fill-white" />
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => scrollThumbnails("right")}
              className="absolute right-0 z-10 h-full w-8 flex items-center justify-center bg-black/20 backdrop-blur-sm text-white opacity-0 group-hover/thumbs:opacity-100 transition-all hover:bg-black/40"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Simple Fullscreen Image Overlay */}
      <AnimatePresence>
        {isExpanded && currentItem.type === "image" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-8"
            onClick={() => setIsExpanded(false)}
          >
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-none transition-all z-50"
              aria-label="Close fullscreen"
            >
              <X size={24} />
            </button>

            <img
              src={currentItem.url}
              alt="Fullscreen expanded view"
              className="max-w-full max-h-full object-contain select-none shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent click on image from closing
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
