// app/SelectedProvider.tsx
"use client";
import React, { createContext, useContext, useState } from "react";

const SelectedContext = createContext<any>(null);

export const SelectedProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <SelectedContext.Provider value={{ selectedIndex, setSelectedIndex }}>
      {children}
    </SelectedContext.Provider>
  );
};

export const useSelected = () => useContext(SelectedContext);
