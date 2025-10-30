import React from "react";
import { Download } from "lucide-react";

const ProductDetail = () => {
  return (
    <div className="flex flex-col justify-start gap-4 sm:gap-5 lg:gap-6 overflow-y-auto w-full lg:flex-[0_0_36%] mt-0 lg:mt-0">
      <div className="hidden lg:block">
        <p className="text-base text-[#888] font-nunito">
          SKU Code : RPTBRVNU_00265
        </p>
        <h1 className="text-4xl opacity-80 font-light tracking-[.125rem] self-stretch mt-1">
          Red Vanity Lavabo Dolabi Siyah Lavabolu
        </h1>
        <p className="text-base text-[#888] font-nunito">by House Of W</p>
      </div>

      {/* Download Button */}
      <button className="flex items-center gap-2 px-4 py-1 w-fit bg-gray-100 transition-colors rounded-full cursor-pointer hover:bg-gray-900 hover:text-white duration-300 ease-linear">
        <Download className="size-4" /> Download Raw
      </button>

      {/* Product Description */}
      <div>
        <h2 className="font-semibold mb-1 text-base text-[#888] font-nunito">
          Product Description
        </h2>
        <p className="text-gray-700 leading-relaxed text-sm font-nunito">
          The 130 series vanity units redefine bathroom elegance with a sleek
          design, premium black sink, and modern faucet. Available in bold blue
          and vibrant red variants, each unit features a subtle vertical-line
          pattern that adds texture and sophistication. These vanities combine
          functional storage with striking color statements, making them perfect
          for contemporary bathrooms.
        </p>
      </div>

      {/* Similar Products */}
      <div>
        <h2 className="font-semibold mb-2 text-base text-[#888] font-nunito">
          Similar Products
        </h2>
        <div className="flex gap-3">
          <img
            src="https://d1b2b4oevn2eyz.cloudfront.net/allhomes/House%20Of%20W/Sanitary-ISVEA/Blue%20Vanity.png"
            alt=""
            className="w-24 h-24 object-cover rounded-md border border-gray-200"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
