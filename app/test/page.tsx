"use client";
import React from "react";
import ImageSectionTest from "../product/image-section-test";
import ProductDetail from "@/components/product-detail";
import VideoSection from "@/components/video-section";
import { useSelected } from "@/components/provider";
import Header from "@/components/header";

const Page = () => {
  const { selectedIndex, setSelectedIndex } = useSelected();

  return (
    <div className="relative h-full bg-[#f9f9f9]">
      <Header
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] min-h-screen w-full max-w-7xl mx-auto px-6 lg:px-8 pt-20 lg:gap-8 gap-4 text-black">
        <ImageSectionTest />
        <ProductDetail />
      </div>

      <VideoSection />
    </div>
  );
};

export default Page;
