import { ethers } from "ethers";

export const getBrowserProvider = () => {
  if (typeof window === "undefined" || !window.ethereum) return null;
  return new ethers.BrowserProvider(window.ethereum);
};
