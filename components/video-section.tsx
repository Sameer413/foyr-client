"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";

const VideoSection = () => {
  const videoRef = useRef(null);
  const [visible, setVisble] = useState<boolean>(false);
  const [isInView, setIsInView] = useState(true);

  // Detect scroll progress inside this section (0 to 1)
  const { scrollYProgress } = useScroll({
    target: videoRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 1]);
  const x = useTransform(scrollYProgress, [0, 0.5], ["30%", "0%"]);

  useEffect(() => {
    // --- Wheel (Desktop / Laptop / Touchpad) ---
    const handleWheel = (event: WheelEvent) => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight;

      const atTop = scrollTop === 0;
      const atBottom = scrollTop + windowHeight >= fullHeight;

      // if (atTop && event.deltaY < 0) {
      //   console.log("Already at top — can't scroll further! mouse/touchpad");
      // } else
      if (atBottom && event.deltaY > 0) {
        // console.log("Already at bottom — can't scroll further! mouse/touchpad");
        setVisble(true);
      }
    };

    // --- Touch (Mobile devices) ---
    let startY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight;

      const currentY = e.touches[0].clientY;
      const isScrollingUp = currentY > startY;
      const isScrollingDown = currentY < startY;

      // if (scrollTop === 0 && isScrollingUp) {
      //   console.log("Already at top — can't scroll further! touch");
      // } else
      if (scrollTop + windowHeight >= fullHeight && isScrollingDown) {
        // console.log("Already at bottom — can't scroll further! touch");
        setVisble(true);
      }
    };

    // Add all listeners
    window.addEventListener("wheel", handleWheel);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 } // triggers when at least 30% of element is visible
    );

    if (videoRef.current) observer.observe(videoRef.current);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  // Optional: pause video when not visible
  useEffect(() => {
    if (videoRef.current) {
      if (!isInView) {
        // videoRef.current.play();
        setVisble(false);
      }
    }
  }, [isInView]);

  return (
    <div
      ref={videoRef}
      className="flex pt-20 mx-auto h-screen overflow-hidden justify-center items-center"
    >
      <motion.div
        style={{ scale, x }}
        className="relative h-screen p-8 aspect-video w-full"
      >
        <motion.video
          src="https://allhome.foyr.com/assets/house-of-w-slider-bg-video-21d207c3.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover aspect-video rounded-xl"
          // style={{ scale, x }}
        />
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 text-2xl text-center flex flex-col text-white items-center justify-center mx-auto"
          >
            <div className="font-nunito text-xl">Harmony</div>
            <div className="font-nunito">
              Your bathroom is your personal space. At Waterways we define this
              space, a space which is connected to one’s own senses and needs a
              place for inner contemplation, regeneration, and revitalization.
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default VideoSection;
