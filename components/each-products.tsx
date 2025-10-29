"use client";
import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronRight } from "lucide-react";

interface EachProductsProps {
  currentSection: {
    label: string;
  };
  allProducts: { image: string; label: string }[];
  index: number;
  direction: number;
}

const EachProducts: React.FC<EachProductsProps> = ({
  currentSection,
  allProducts,
  index,
  direction,
}) => {
  return (
    <div className="px-24 py-10">
      {/* Section Heading */}
      <div className="mb-8">
        <AnimatePresence mode="wait">
          <div key={index + "_heading"}>
            <h2 className="text-4xl font-medium text-black capitalize">
              {currentSection.label}
            </h2>
            <h2 className="text-2xl font-semibold text-gray-700 mt-1">
              Products
            </h2>
            <div className="h-0.5 w-24 bg-black mt-2" />
          </div>
        </AnimatePresence>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-4 gap-8">
        {allProducts.map((p, idx) => (
          <div
            key={idx}
            className="rounded-2xl group overflow-hidden relative cursor-pointer"
          >
            <img
              src={p.image}
              alt={p.label}
              className="object-cover rounded-2xl h-full group-hover:scale-110 transition-transform duration-150 ease-linear"
            />
            <div className="absolute invisible group-hover:visible bottom-0 left-0 text-white h-full w-full p-4 flex items-end bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.7)] transition-opacity ease-linear duration-150 justify-between opacity-0 group-hover:opacity-100">
              <div className="w-3/4">{p.label}</div>
              <button className="p-2 bg-white/20 hover:bg-white/40 rounded-full transition">
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EachProducts;
