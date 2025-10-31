import React, { useState } from "react";
import { navItems } from "@/another";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";

const Header: React.FC<{
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}> = ({ selectedIndex, setSelectedIndex }) => {
  const [activeMain, setActiveMain] = useState<string | null>(null);
  const [activeSub, setActiveSub] = useState<string | null>(null);

  const activeData = navItems.find((item) => item.label === activeMain);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white">
      {/* Top Header */}
      <div className="max-w-5xl mx-auto flex items-center justify-between px-8 py-4 ">
        <Link href={"/"} className="text-xl font-semibold text-nowrap">
          All home.
        </Link>

        {/* Navigation */}
        <nav className="invisible lg:visible flex items-center gap-10 relative">
          {navItems.map((navItem, idx) => (
            <Link
              href={"/"}
              key={navItem.label}
              onMouseEnter={() => setActiveMain(navItem.label)}
              onMouseLeave={() => {
                setActiveSub(null);
              }}
              onClick={() => setSelectedIndex(idx)}
              // className="relative"
              className={`relative uppercase text-sm font-medium text-neutral-600 tracking-wide hover:text-neutral-950 ${
                selectedIndex === idx ? "text-neutral-950" : "text-neutral-600"
              } ${navItem.data.items === null && "pointer-events-none"}`}
            >
              {navItem.label}
            </Link>
          ))}
        </nav>

        <button className="cursor-pointer text-gray-600">🔍</button>
      </div>

      {/* Dropdown Section (below header) */}
      <AnimatePresence>
        {activeMain && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl z-40 transition-all ease-linear"
            onMouseLeave={() => {
              setActiveMain(null);
              setActiveSub(null);
            }}
          >
            <div className="max-w-5xl mx-auto px-10 py-6 flex gap-10">
              <div className="w-1/3">
                <div className="text-start mb-2">Explore Products</div>
                {activeData?.data.items?.map((subItem, idx: number) => (
                  <motion.div
                    key={subItem.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                      delay: idx * 0.07, // staggered timing
                    }}
                    onMouseEnter={() => setActiveSub(subItem.label)}
                    className={`py-1 cursor-pointer text-sm text-gray-700 hover:text-gray-500 flex items-center justify-start group ${
                      activeSub === subItem.label ? "text-gray-700" : ""
                    }`}
                  >
                    {subItem.label}
                    <span className="text-gray-400 invisible group-hover:visible transition-all ease-linear duration-150 text-3xl -mt-1.5">
                      ›
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="">
                {activeData?.data.items
                  .find((s) => s.label === activeSub)
                  ?.data.map((product, idx) => (
                    <motion.div
                      key={product.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeOut",
                        delay: idx * 0.07, // staggered timing
                      }}
                      className="flex flex-col items-center text-start my-1 hover:bg-gray-50 rounded-lg cursor-pointer"
                    >
                      <p className="text-sm text-gray-700">{product.label}</p>
                    </motion.div>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
