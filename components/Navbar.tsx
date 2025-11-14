"use client";
import React, { ChangeEvent, useState } from "react";
import { Bell, ChevronDownIcon, Search, Menu } from "lucide-react";
import { Input } from "./ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/context/SidebarContext";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { motion } from "framer-motion";
import { navbarVariants } from "@/lib/framerConstants";

const Navbar = () => {
  const [lang, setLang] = useState("english");
  const [isLive, setIsLive] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { setIsMobileOpen } = useSidebar();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLang(e.target.value);
  };

  return (
    <motion.div
      initial='initial'
      animate='animate'
      variants={navbarVariants}
      className='px-4 sm:px-6 lg:px-8 py-3 sm:py-4'
    >
      <div className='hidden lg:flex justify-between items-center'>
        <div className='flex-1'>
          <div className='relative w-full max-w-xs'>
            <Search className='top-1/2 left-3 absolute w-5 h-5 text-gray-400 -translate-y-1/2' />
            <Input
              placeholder='Search'
              className='focus:shadow-none py-2 pr-3 pl-10 border-none focus:outline-none'
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className='flex justify-center items-center gap-8'>
          <div className='flex items-center space-x-3'>
            <button
              onClick={() => setIsLive(!isLive)}
              className={`relative inline-flex h-6 w-10 items-center rounded-full transition-colors duration-300 ${
                isLive ? "bg-[#6FCF97]/30" : "bg-[#828282]/30"
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-[#6FCF97] transition-transform duration-300 ${
                  isLive ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <span className='text-[#828282] dark:text-[#BDBDBD] text-sm transition-colors duration-300'>
              {isLive ? "Live" : "Offline"}
            </span>
          </div>

          <div>
            <NativeSelect
              className='bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 w-32 text-gray-800 dark:text-gray-100'
              value={lang}
              onChange={handleChange}
            >
              <NativeSelectOption value='english'>English</NativeSelectOption>
              <NativeSelectOption value='hausa'>Hausa</NativeSelectOption>
              <NativeSelectOption value='yoruba'>Yoruba</NativeSelectOption>
              <NativeSelectOption value='igbo'>Igbo</NativeSelectOption>
            </NativeSelect>
          </div>

          <div className='relative flex items-center'>
            <Bell fill='#828282' stroke='#828282' />
            <div className='-top-1/2 left-5 absolute bg-[#E5A0FF] rounded-full w-3 h-3' />
          </div>
          <ModeToggle />

          <div className='flex items-center gap-3 p-2 text-[#828282] dark:text-[#BDBDBD]'>
            <Avatar>
              <AvatarImage src='/user.png' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className='text-left'>
              <p className='font-medium text-sm'>Martins Chidume</p>
              <span className='font-medium text-[#828282] dark:text-[#BDBDBD] text-sm'>
                ID: 1234567
              </span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <ChevronDownIcon aria-hidden='true' />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  <Link href='/settings'>Account Settings</Link>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href='/transactions'>Transactions</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href='/customers'>Customers</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href='/payouts'>Payouts</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href='/balances'>Balances</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Layout */}
      <div className='lg:hidden'>
        <div className='flex justify-between items-center gap-3 mb-3'>
          <div className='flex-1'>
            <div className='relative w-full'>
              <Search className='top-1/2 left-3 absolute w-4 sm:w-5 h-4 sm:h-5 text-gray-400 -translate-y-1/2' />
              <Input
                placeholder='Search'
                className='focus:shadow-none py-2 pr-3 pl-9 sm:pl-10 border-none focus:outline-none text-sm'
              />
            </div>
          </div>

          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className='hover:bg-gray-100 p-2 rounded-lg'
          >
            <Menu className='w-5 h-5 text-gray-600' />
          </button>
        </div>

        {showMobileMenu && (
          <div className='top-full left-0 z-50 shadow-lg p-4 border border-gray-200 rounded-lg w-full'>
            <div className='space-y-4'>
              <div className='flex items-center gap-3 pb-4 border-gray-200 border-b'>
                <Avatar className='w-10 h-10'>
                  <AvatarImage src='/user.png' />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className='text-left'>
                  <p className='font-medium text-sm'>Martins Chidume</p>
                  <span className='font-medium text-[#828282] dark:text-[#BDBDBD] text-sm'>
                    ID: 1234567
                  </span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <ChevronDownIcon aria-hidden='true' />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>
                      <Link href='/settings'>Account Settings</Link>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href='/transactions'>Transactions</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href='/customers'>Customers</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href='/payouts'>Payouts</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href='/balances'>Balances</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className='flex justify-between items-center'>
                <span className='text-[#828282] dark:text-[#BDBDBD] text-sm'>
                  Status
                </span>
                <div className='flex items-center space-x-3'>
                  <button
                    onClick={() => setIsLive(!isLive)}
                    className={`relative inline-flex h-6 w-10 items-center rounded-full transition-colors duration-300 ${
                      isLive ? "bg-[#6FCF97]/30" : "bg-[#828282]/30"
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-[#6FCF97] transition-transform duration-300 ${
                        isLive ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <span className='text-[#828282] dark:text-[#BDBDBD] text-sm'>
                    {isLive ? "Live" : "Offline"}
                  </span>
                </div>
              </div>

              <div className='flex justify-between items-center'>
                <span className='text-[#828282] dark:text-[#BDBDBD] text-sm'>
                  Language
                </span>
                <NativeSelect
                  className='bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 w-32 text-gray-800 dark:text-gray-100'
                  value={lang}
                  onChange={handleChange}
                >
                  <NativeSelectOption value='english'>
                    English
                  </NativeSelectOption>
                  <NativeSelectOption value='hausa'>Hausa</NativeSelectOption>
                  <NativeSelectOption value='yoruba'>Yoruba</NativeSelectOption>
                  <NativeSelectOption value='igbo'>Igbo</NativeSelectOption>
                </NativeSelect>
              </div>

              <div className='flex justify-between items-center'>
                <span className='text-[#828282] dark:text-[#BDBDBD] text-sm'>
                  Notifications
                </span>
                <div className='relative flex items-center'>
                  <Bell fill='#828282' stroke='#828282' className='w-5 h-5' />
                  <div className='-top-1 -right-1 absolute bg-[#E5A0FF] rounded-full w-3 h-3' />
                </div>
              </div>
            </div>
          </div>
        )}

        {!showMobileMenu && (
          <div className='flex justify-between items-center pt-2'>
            <div className='flex items-center gap-4'>
              <button
                onClick={() => setIsMobileOpen(true)}
                className='md:hidden flex hover:bg-gray-100 p-2 rounded-lg text-gray-600'
              >
                <Menu size={20} />
              </button>
              <div className='relative'>
                <Bell fill='#828282' stroke='#828282' className='w-5 h-5' />
                <div className='-top-1 -right-1 absolute bg-[#E5A0FF] rounded-full w-2.5 h-2.5' />
              </div>

              <ModeToggle />
              {/* <Avatar className='w-8 h-8'>
                <AvatarImage src='/user.png' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar> */}
            </div>

            <div className='flex items-center gap-2'>
              <div
                className={`w-2 h-2 rounded-full ${
                  isLive ? "bg-[#6FCF97]" : "bg-[#828282]"
                }`}
              />
              <span className='text-[#828282] dark:text-[#BDBDBD] text-xs'>
                {isLive ? "Live" : "Offline"}
              </span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Navbar;
