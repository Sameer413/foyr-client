"use client";

import ProductSection from "@/components/product-section";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Header from "@/components/header";
import CarouselComponent from "@/components/corousel-section";
import { useSelected } from "@/components/provider";

export default function Home() {
  // const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const { selectedIndex, setSelectedIndex } = useSelected();

  const [scrolled, setScrolled] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 0 && !scrolled) {
        setScrolled(true);
        setAutoPlay(false);
      } // scroll down
      if (e.deltaY < 0 && scrolled) {
        setScrolled(false);
        setAutoPlay(true);
      } // scroll up
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [scrolled]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const delta = touchStartY.current - touchEndY.current;
    if (Math.abs(delta) < 50) return; // ignore tiny moves

    if (delta > 0) {
      // swipe UP
      !scrolled && setScrolled(true);
    } else {
      // swipe DOWN
      scrolled && setScrolled(false);
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative h-full"
    >
      <Header
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />

      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="h-screen w-full relative no-select no-drag"
      >
        <CarouselComponent
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          autoPlay={autoPlay}
          setScrolled={setScrolled}
          setAutoPlay={setAutoPlay}
        />
      </motion.div>

      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: scrolled ? "8%" : "100%" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-0 left-0 w-full h-screen z-20 flex flex-col justify-center items-start px-10 overflow-hidden"
      >
        <div className="w-full h-full overflow-y-scroll no-select no-drag">
          <ProductSection
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        </div>
      </motion.div>
    </div>
  );
}
