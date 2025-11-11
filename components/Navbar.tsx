import React from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

const Navbar = () => {
  return (
    <div>
      <div>
        <div className='relative w-full max-w-xs'>
          <Search className='top-1/2 left-3 absolute w-5 h-5 text-gray-400 -translate-y-1/2' />
          <Input
            placeholder='Search'
            className='focus:shadow-none py-2 pr-3 pl-10 border-none focus:outline-none'
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
