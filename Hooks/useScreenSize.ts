import { useState, useEffect } from "react";

const getScreenWidth = (w: typeof window) => {
  if (window) {
    const size = +w?.screen?.availWidth;
    return size;
  }
};

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(1820);

  useEffect(() => {
    window.addEventListener("resize", () => {
      const width = getScreenWidth(window);
      setScreenSize(width ?? 1820);
    });

    return window.removeEventListener("resize", () => {});
  });

  return screenSize;
};
