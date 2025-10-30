"use client";
import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { productsData } from "@/another";
import EachProducts from "./each-products";

const ProductSection: React.FC<{
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}> = ({ selectedIndex, setSelectedIndex }) => {
  const sections = Object.keys(productsData);
  // const [index, setIndex] = useState(0);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleSwipe = (dir: "left" | "right") => {
    if (dir === "left" && selectedIndex < sections.length - 1) {
      setSelectedIndex((prev) => prev + 1);
    } else if (dir === "right" && selectedIndex > 0) {
      setSelectedIndex((prev) => prev - 1);
    }
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    touchStartX.current = e.targetTouches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = () => {
    setIsDragging(false);
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 30) handleSwipe("left");
    else if (diff < -30) handleSwipe("right");
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    touchStartX.current = e.clientX;
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) touchEndX.current = e.clientX;
  };
  const handleMouseUp = () => {
    setIsDragging(false);
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) handleSwipe("left");
    else if (diff < -50) handleSwipe("right");
  };

  return (
    <div
      className="relative overflow-hidden min-h-screen bg-white select-none px-24 py-10"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <motion.div
        className="flex transition-transform duration-500 ease-in-out"
        animate={{ x: `-${selectedIndex * 100}%` }}
        // transition={{ type: "spring", stiffness: 200, damping: 30 }}
        transition={{ ease: "easeInOut", duration: 0.3 }}
      >
        {sections.map((key, i) => {
          // @ts-ignore
          const section = productsData[key];
          const allProducts =
            section.categories?.flatMap((cat: any) => cat.products) || [];

          return (
            <div
              key={i}
              className="w-full shrink-0"
              style={{ flex: "0 0 100%" }}
            >
              <EachProducts
                currentSection={section}
                allProducts={allProducts}
                index={i}
              />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ProductSection;
