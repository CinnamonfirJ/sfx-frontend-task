"use client";
import React, { useState } from "react";
import { Bell, ChevronDownIcon, Search } from "lucide-react";
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

const Navbar = () => {
  const [lang, setLang] = useState("english"); // initial value
  const [isLive, setIsLive] = useState(true);

  const handleChange = (e: any) => {
    setLang(e.target.value);
  };

  return (
    <div className='flex justify-between items-center px-8 py-6'>
      <div className='flex-1'>
        <div className='relative w-full max-w-xs'>
          <Search className='top-1/2 left-3 absolute w-5 h-5 text-gray-400 -translate-y-1/2' />
          <Input
            placeholder='Search'
            className='focus:shadow-none py-2 pr-3 pl-10 border-none focus:outline-none'
          />
        </div>
      </div>
      <div className='flex justify-center items-center gap-8'>
        <div className='flex items-center space-x-3'>
          <button
            onClick={() => setIsLive(!isLive)}
            className={`relative inline-flex h-6 w-10 items-center rounded-full transition-colors duration-300 ${
              isLive ? "bg-[#6FCF97]/30" : "bg-[#828282]/30"
            }`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full  bg-[#6FCF97] transition-transform duration-300 ${
                isLive ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
          <span className='text-[#828282] text-sm transition-colors duration-300'>
            {isLive ? "Live" : "Offline"}
          </span>
        </div>
        <div>
          <NativeSelect
            className='rounded-full'
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
        <div className='flex sm:flex-row flex-col justify-center sm:justify-start items-center sm:items-center gap-3 sm:gap-5 p-2 text-[#828282]'>
          <Avatar>
            <AvatarImage src='/user.png' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className='sm:text-left text-center'>
            <p className='font-medium text-sm'>Martins Chidume</p>
            <span className='font-medium text-[#BDBDBD] text-sm'>
              ID: 1234567
            </span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <ChevronDownIcon aria-hidden='true' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
