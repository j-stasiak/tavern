import { useEffect } from "react";

// @ts-ignore
export const useKeyPress = (callback): any => {
  useEffect(() => {
    window.addEventListener("keydown", callback);
    return () => window.removeEventListener("keydown", callback);
  }, []);
};
