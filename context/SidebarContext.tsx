"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextType {
  isMobileOpen: boolean;
  setIsMobileOpen: (value: boolean) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <SidebarContext.Provider
      value={{ isMobileOpen, setIsMobileOpen, isOpen, setIsOpen }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);

  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }

  return context;
};
