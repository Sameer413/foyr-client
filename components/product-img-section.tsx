import React, { useState } from "react";

const images = [
  "https://d1b2b4oevn2eyz.cloudfront.net/allhomes/House%20Of%20W/Sanitary-ISVEA/red%20vanity.png",
  "https://d1b2b4oevn2eyz.cloudfront.net/allhomes/House%20Of%20W/thumbnail/RPTBRVNU_00265_THUMBNAIL.png",
];

const ProductImageSection = () => {
  const [currentImg, setCurrentImg] = useState<string>(images[0]);

  return (
    <div className="flex flex-[0_0_60%] gap-6 items-start">
      {/* Thumbnails */}
      <div className="flex flex-col gap-4 flex-[0_0_6rem]">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentImg(img)}
            className="relative aspect-square overflow-hidden rounded-xl border border-gray-200 cursor-pointer"
          >
            <img
              src={img}
              alt=""
              className="h-full w-full object-cover aspect-square hover:scale-105 transition-transform duration-150 ease-linear "
            />
          </button>
        ))}
      </div>

      {/* Main Image (COVER + FIXED HEIGHT AREA) */}
      <div className="flex justify-center items-center flex-1">
        <div className="relative w-full h-[80vh] flex justify-center items-center overflow-hidden rounded-xl">
          <img
            src={currentImg}
            alt=""
            className="w-full h-full object-cover transition-all duration-300"
          />
          {/* 3D Button */}
          {/* <button className="absolute top-4 right-4 flex items-center gap-2 bg-gray-900 text-white text-sm rounded-full px-3 py-1.5 shadow">
            <span>3D</span>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ProductImageSection;
