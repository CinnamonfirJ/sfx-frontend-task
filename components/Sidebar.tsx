"use client";

import { useState } from "react";
import { useSidebar } from "@/context/SidebarContext";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Send,
  Users,
  CreditCard,
  Wallet,
  Repeat,
  Calendar,
  Share2,
  Eye,
  Settings,
  X,
  LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

interface MenuSection {
  title: string;
  key: string;
  items: MenuItem[];
}

const Sidebar = () => {
  const { isOpen, setIsOpen, isMobileOpen, setIsMobileOpen } = useSidebar();
  const pathname = usePathname();

  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({
    payments: true,
    commerce: false,
  });

  const toggleDropdown = (section: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const menuSections: MenuSection[] = [
    {
      title: "Payments",
      key: "payments",
      items: [
        { icon: Send, label: "Transactions", href: "transactions" },
        { icon: Users, label: "Customers", href: "customers" },
        { icon: CreditCard, label: "Payouts", href: "payouts" },
        { icon: Wallet, label: "Balances", href: "balances" },
        { icon: Repeat, label: "Subscriptions", href: "/" },
        { icon: Calendar, label: "Payment plans", href: "/" },
      ],
    },
    {
      title: "Commerce",
      key: "commerce",
      items: [
        { icon: Share2, label: "Referrals", href: "/" },
        { icon: Eye, label: "Audit logs", href: "/" },
        { icon: Settings, label: "Settings", href: "settings" },
      ],
    },
  ];

  const SidebarContent = () => (
    <nav className='flex-1 space-y-2 p-3'>
      {menuSections.map((section) => (
        <div key={section.key}>
          {/* Section Header */}
          <button
            onClick={() => toggleDropdown(section.key)}
            className='flex justify-between items-center w-full font-bold text-[#828282] tracking-wide'
          >
            <span
              className={`transition-opacity duration-200 ${
                isOpen ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              {section.title}
            </span>
            {isOpen &&
              (openDropdowns[section.key] ? (
                <ChevronUp size={20} fill='#BDBDBD' stroke='' />
              ) : (
                <ChevronDown size={20} fill='#BDBDBD' stroke='' />
              ))}
          </button>

          {/* Section Items */}
          {openDropdowns[section.key] && (
            <div className='space-y-1 mt-2'>
              {section.items.map((item, idx) => {
                const isActive = pathname === `/${item.href}`;
                return (
                  <Link
                    key={idx}
                    href={item.href}
                    className={`flex items-center gap-3 hover:bg-gray-100 px-3 py-2 rounded-lg font-medium ${
                      isActive ? "text-[#8c52ff]" : "text-[#828282]"
                    } text-sm transition-colors`}
                  >
                    <item.icon size={18} className='shrink-0' />
                    {isOpen && (
                      <span className='transition-opacity duration-300'>
                        {item.label}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
          <hr className='my-3 border-gray-200' />
        </div>
      ))}
    </nav>
  );

  return (
    <aside>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        <Link href='/'>
          <div className='flex justify-between items-center p-4 border-gray-200 border-b'>
            <Image
              src='/logo.svg'
              alt='Company Logo'
              width={80}
              height={80}
              priority
            />

            <button
              onClick={() => setIsOpen(!isOpen)}
              className='p-2 rounded-lg'
            >
              {isOpen ? (
                <ChevronLeft size={20} fill='#BDBDBD' stroke='' />
              ) : (
                <ChevronRight size={20} fill='#BDBDBD' stroke='' />
              )}
            </button>
          </div>
        </Link>

        <SidebarContent />
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className='md:hidden z-40 fixed inset-0 bg-black/30'
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 md:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className='flex justify-between items-center p-4 border-gray-200 border-b'>
          <Image
            src='/logo.svg'
            alt='Company Logo'
            width={80}
            height={80}
            priority
          />
          <button
            onClick={() => setIsMobileOpen(false)}
            className='hover:bg-gray-100 p-2 rounded-lg text-gray-600'
          >
            <X size={20} />
          </button>
        </div>

        <SidebarContent />
      </aside>
    </aside>
  );
};

export default Sidebar;
