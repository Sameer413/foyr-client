"use client";
import Header from "@/components/header";
import { useSelected } from "@/components/provider";
import ProductImageSection from "@/components/product-img-section";
import ProductDetail from "@/components/product-detail";
import VideoSection from "@/components/video-section";

const ProductPage = () => {
  const { selectedIndex, setSelectedIndex } = useSelected();

  return (
    <div className="relative h-full bg-[#f9f9f9]">
      <Header
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />

      <div className="flex h-screen w-full text-black p-8 pt-20 gap-8 max-w-7xl mx-auto">
        {/* Left: Thumbnail List */}
        <ProductImageSection />

        {/* Right: Product Details */}
        <ProductDetail />
      </div>

      <div className="">
        <VideoSection />
      </div>
    </div>
  );
};

export default ProductPage;
