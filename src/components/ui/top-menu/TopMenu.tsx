

import Link from 'next/link';
import { logoFont } from '@/components/config/fonts';
import { LoginButton } from './LoginButton';
import { MenuButton } from './MenuButton';
import { auth } from '@/auth.config';


export const TopMenu = async() => {

  const session = await auth();

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

      {/* Mid Menu */}


      {/* MENU */}
      {
        session?.user ? (
          <div className="flex items-center">

           <MenuButton />
          </div>

        ) : (
          <div className="flex items-center">

            <LoginButton />
          </div>
        )
      }


    </nav>
  );
};