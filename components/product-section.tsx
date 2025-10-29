"use client";
import { productsData } from "@/productsData";
import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronRight } from "lucide-react";
// currentProduct: string;
const ProductSection: React.FC<{}> = ({}) => {
  const sections = Object.keys(productsData);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 = right, -1 = left

  // ✅ useRef ensures values persist across renders
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleSwipe = (dir) => {
    if (dir === "left" && index < sections.length - 1) {
      setDirection(1);
      setIndex((prev) => prev + 1);
    } else if (dir === "right" && index > 0) {
      setDirection(-1);
      setIndex((prev) => prev - 1);
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) handleSwipe("left");
    else if (diff < -50) handleSwipe("right");
  };

  const currentData = productsData[sections[index]];

  return (
    <div
      className="min-h-screen bg-white overflow-hidden px-24 py-10 select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: direction === 1 ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === 1 ? -100 : 100 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <h2 className="text-4xl font-medium text-black capitalize">
              {currentData.label} Products
            </h2>
            <div className="h-0.5 w-24 bg-black mt-2" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: direction === 1 ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === 1 ? -100 : 100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="grid grid-cols-4 gap-8"
          >
            {currentData.products.map((p, idx: number) => (
              <div
                key={idx}
                className="rounded-2xl group overflow-hidden relative cursor-pointer"
              >
                <img
                  src={p.image}
                  alt=""
                  className="object-cover rounded-2xl h-full group-hover:scale-115 transition-transform duration-150 ease-linear"
                />

                <div className="absolute invisible group-hover:visible bottom-0 left-0 text-white h-full w-full p-4 flex items-end bg-linear-to-b from-transparent to-[rgba(0,0,0,0.7)] transition-opacity ease-linear duration-150 justify-between opacity-0 group-hover:opacity-100">
                  <div className="w-3/4">{p.label}</div>
                  <div className="">
                    <button className="p-2 bg-white/20 hover:bg-white/40 rounded-full transition">
                      <ChevronRight className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductSection;
