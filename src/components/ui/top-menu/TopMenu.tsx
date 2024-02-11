'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { logoFont } from '@/components/config/fonts';
import { logout } from '@/action';
import { usePathname } from 'next/navigation';


export const TopMenu = () => {

  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  const path = usePathname();
  // console.log(session?.user)

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

      {/* Center Menu */}
      {
        isAuthenticated && (
          <div className='flex'>
            <Link
              href={'/profile'}
              className=''
            >
              Perfil
            </Link>

          </div>

        )
      }

      {/* Auth */}
      {
        !path.startsWith('/auth')  && (

          <div className="flex items-center">

            {
              !isAuthenticated ? (
                <Link
                  href={'/auth/login'}
                  className="m-2 group rounded-md transition-all relative inline-block overflow-hidden  px-5 py-2 text-sm font-medium  hover:text-violet-600 focus:outline-none focus:ring-violet-400 active:bg-violet-400 active:text-white"
                >
                  <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-violet-600 transition-all duration-200 group-hover:w-full"></span>
                  <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-violet-600 transition-all duration-200 group-hover:h-full"></span>
                  <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-violet-600 transition-all duration-200 group-hover:w-full"></span>
                  <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-violet-600 transition-all duration-200 group-hover:h-full"></span>
                  Login
                </Link>

              ) : (
                <button
                  onClick={() => logout()}
                  className="m-2 group rounded-md transition-all relative inline-block overflow-hidden  px-5 py-2 text-sm font-medium  hover:text-violet-600 focus:outline-none focus:ring-violet-400 active:bg-violet-400 active:text-white"
                >
                  <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-violet-600 transition-all duration-200 group-hover:w-full"></span>
                  <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-violet-600 transition-all duration-200 group-hover:h-full"></span>
                  <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-violet-600 transition-all duration-200 group-hover:w-full"></span>
                  <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-violet-600 transition-all duration-200 group-hover:h-full"></span>
                  Logout
                </button>
              )
            }

          </div>
        )
      }


    </nav>
  );
};