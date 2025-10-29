"use client";

import ProductSection from "@/components/product-section";
import { productsData } from "@/productsData";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Header from "@/components/header";
import CarouselComponent from "@/components/corousel-section";

export default function Home() {
  const [currentProducts, setCurrentProducts] = useState(
    productsData["the house of w"].label
  );
  const [scrolled, setScrolled] = useState(false);
  const [products, setProducts] = useState(productsData["the house of w"]);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 0 && !scrolled) setScrolled(true); // scroll down
      if (e.deltaY < 0 && scrolled) setScrolled(false); // scroll up
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
      <Header />

      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="h-screen w-full relative no-select no-drag"
      >
        <CarouselComponent />
      </motion.div>

      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: scrolled ? "8%" : "100%" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-0 left-0 w-full h-screen z-40 flex flex-col justify-center items-start px-10 overflow-hidden"
      >
        <div className="w-full h-full overflow-y-scroll no-select no-drag">
          <ProductSection />
        </div>
      </motion.div>
    </div>
  );
}
