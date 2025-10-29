import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { carouselData } from "@/carousel-data";

interface CarouselProps {
  //   images: string[];
  autoPlay?: boolean;
  interval?: number;
}

const images = carouselData.map((item) => item.imgsrc);

const CarouselComponent: React.FC<CarouselProps> = ({
  autoPlay = true,
  interval = 5000,
}) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const DRAG_THRESHOLD = 80; // px to decide next/prev
  const [isDragging, setIsDragging] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  // Handle auto play
  useEffect(() => {
    if (!autoPlay || isDragging || userInteracted) return;
    const timer = setInterval(() => nextSlide(), interval);
    return () => clearInterval(timer);
  }, [index, autoPlay, isDragging, userInteracted]);

  const nextSlide = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const getTranslateX = () => {
    return `-${index * 75}%`;
  };

  return (
    <div className="relative w-full h-[101vh] overflow-hidden shadow-lg">
      <div className="relative w-full h-full overflow-hidden shadow-lg">
        {/* SLIDER WRAPPER */}
        <motion.div
          className="flex"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={() => {
            setIsDragging(true);
            setUserInteracted(true);
          }}
          onDragEnd={(e, info) => {
            setIsDragging(false);
            if (info.offset.x < -DRAG_THRESHOLD || info.velocity.x < -300)
              nextSlide();
            if (info.offset.x > DRAG_THRESHOLD || info.velocity.x > 300)
              prevSlide();
          }}
          animate={{ x: getTranslateX() }}
          transition={{ ease: "linear" }}
        >
          {images.map((slide, i) => (
            <div
              key={i}
              className="relative min-w-[75%] h-full overflow-hidden select-none"
            >
              <motion.img
                src={slide}
                alt={slide}
                className="w-full h-full object-cover select-none"
                animate={{
                  scale: index === i ? 1 : 1.15,
                }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
              {/* ANIMATED CAPTION/LOGO OVERLAY */}
              {index === i && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    className="absolute bottom-10 left-10 flex flex-col items-start gap-3 z-20"
                  >
                    {/* Logo */}
                    <motion.img
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                      exit={{ opacity: 1, y: 0 }}
                      src="https://allhome.foyr.com/assets/ColourCoatsLogo-1cad008b.png"
                      className="h-6 w-auto object-contain no-drag"
                    />

                    {/* Text */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, ease: "linear", duration: 1 }}
                      exit={{ opacity: 1 }}
                      className="text-white text-4xl font-medium w-96"
                    >
                      {index === 0 && "Premium Interior Facades"}
                      {index === 1 && "Modern Bathroom Designs"}
                      {index === 2 && "Luxury Home Spaces"}
                    </motion.div>

                    {/* Expanding bar (must be INSIDE same motion.div) */}
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{
                        delay: 0.9,
                        duration: 1,
                        ease: "easeInOut",
                      }}
                      className="h-1 w-28 bg-white origin-center mt-1"
                    />
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, ease: "linear", duration: 1 }}
                    exit={{ opacity: 1 }}
                    className="absolute bottom-10 right-10 bg-[rgba(0,0,0,.6)] border-none text-white py-2 px-4 rounded-full"
                  >
                    Explore Products
                  </motion.button>
                </AnimatePresence>
              )}
            </div>
          ))}

          {/* Duplicate first image at the end to peek on right */}
          <div className="relative min-w-[75%] h-full overflow-hidden">
            <img
              src={images[0]}
              className="w-full h-full object-cover"
              alt="duplicate-first"
            />
          </div>
        </motion.div>
      </div>

      {/* Arrows */}
      <div className="absolute bottom-10 right-10 flex items-center gap-4 z-10">
        <button
          onClick={prevSlide}
          className="p-2 bg-white/20 hover:bg-white/40 rounded-full transition"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="p-2 bg-white/20 hover:bg-white/40 rounded-full transition"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default CarouselComponent;
