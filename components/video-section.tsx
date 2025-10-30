import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const VideoSection = () => {
  const videoRef = useRef(null);

  // Detect scroll progress inside this section (0 to 1)
  const { scrollYProgress } = useScroll({
    target: videoRef,
    offset: ["start end", "end start"],
  });

  // Transform scroll progress to scale range (0.8 to 1.2 for example)
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 1]);
  const x = useTransform(scrollYProgress, [0, 0.5], ["30%", "0%"]);
  const y = useTransform(scrollYProgress, [0, 0.5], ["30%", "0%"]);

  return (
    // <div
    //   ref={videoRef}
    //   //   className="relative h-screen overflow-hidden flex items-center justify-center"
    //   className="flex text-black p-8 pt-20 gap-8 mx-auto relative h-screen overflow-hidden justify-center items-center"
    // >
    //   <motion.video
    //     src="https://allhome.foyr.com/assets/house-of-w-slider-bg-video-21d207c3.mp4"
    //     autoPlay
    //     loop
    //     muted
    //     playsInline
    //     // className="max-w-full aspect-video object-cover"
    //     className="aspect-video h-screen"
    //     style={{ scale, x, y }}
    //   />
    // </div>
    <div
      ref={videoRef}
      className="flex p-8 pt-20 mx-auto relative h-screen overflow-hidden justify-center items-center"
    >
      <motion.video
        src="https://allhome.foyr.com/assets/house-of-w-slider-bg-video-21d207c3.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover aspect-video"
        style={{ scale, x, y }}
      />
    </div>
  );
};

export default VideoSection;
