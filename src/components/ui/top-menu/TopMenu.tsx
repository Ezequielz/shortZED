'use client';

import Link from 'next/link';
import { logoFont } from '@/components/config/fonts';
import { useUIStore } from '@/store';


export const TopMenu = () => {

  const openSideMenu = useUIStore(state => state.openSideMenu);

  return (
    <nav className="flex  px-3 lg:px-10  justify-between items-center">

      {/* Logo */}
      <div className='relative py-3'>
        <Link
          href="/">
          <span className={`${logoFont.className} antialiased font-bold`} >Short</span>
          <span className={`absolute -rotate-12 ${logoFont.className}`}> ZED</span>
        </Link>
      </div>

      {/* MENU */}
      <div className="flex items-center">

        <button
          onClick={ openSideMenu }
          className="m-2 group rounded-md transition-all relative inline-block overflow-hidden  px-5 py-2 text-sm font-medium  hover:text-violet-600 focus:outline-none focus:ring-violet-400 active:bg-violet-400 active:text-white"
        >
          <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-violet-600 transition-all duration-200 group-hover:w-full"></span>
          <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-violet-600 transition-all duration-200 group-hover:h-full"></span>
          <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-violet-600 transition-all duration-200 group-hover:w-full"></span>
          <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-violet-600 transition-all duration-200 group-hover:h-full"></span>
          Menu
        </button>
      </div>

    </nav>
  );
};