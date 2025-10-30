import React, { useState } from "react";
import { motion } from "motion/react";

const images = [
  "https://d1b2b4oevn2eyz.cloudfront.net/allhomes/House%20Of%20W/Sanitary-ISVEA/red%20vanity.png",
  "https://d1b2b4oevn2eyz.cloudfront.net/allhomes/House%20Of%20W/thumbnail/RPTBRVNU_00265_THUMBNAIL.png",
  "https://d1b2b4oevn2eyz.cloudfront.net/allhomes/House%20Of%20W/Sanitary-ISVEA/red%20vanity%20img%201.png",
];

const ProductImageSection = () => {
  const [currentImg, setCurrentImg] = useState<string>(images[0]);

  return (
    <div className="flex flex-[0_0_60%] gap-6 items-start">
      {/* Thumbnails */}
      <div className="flex flex-col gap-4 flex-[0_0_6rem]">
        {images.map((img, idx) => (
          <motion.button
            key={idx}
            initial={{ opacity: 0, x: -30, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: idx * 0.12, // stagger effect
              ease: [0.25, 0.1, 0.25, 1],
            }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setCurrentImg(img)}
            className="relative aspect-square overflow-hidden rounded-xl border border-gray-200 cursor-pointer"
          >
            <img
              src={img}
              alt=""
              className="h-full w-full object-cover aspect-square hover:scale-105 transition-transform duration-150 ease-linear "
            />
          </motion.button>
        ))}
      </div>

      {/* Main Image (COVER + FIXED HEIGHT AREA) */}
      <div className="flex justify-center items-center flex-1">
        <div className="relative w-full h-[80vh] flex justify-center items-start overflow-hidden rounded-xl">
          <motion.img
            key={currentImg}
            initial={{ clipPath: "inset(0 0 100% 0)" }} // fully hidden from top
            animate={{ clipPath: "inset(0 0 0 0)" }} // fully revealed
            transition={{ duration: 1, ease: "easeInOut" }}
            src={currentImg}
            alt="product name"
            className="w-full object-cover transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductImageSection;
