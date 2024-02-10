

import Link from 'next/link';
import { AiOutlineGithub } from "react-icons/ai";
import { TbWorld } from "react-icons/tb";
import { logoFont } from '@/components/config/fonts';

export const Footer = () => {
  return (
    <div className="flex w-full justify-center items-center text-xs mb-10 ">

      <Link
        href='/'
        className='p-2 rounded flex '
      >
        <div className='relative  mr-7'> 
          <span className={`${logoFont.className} antialiased font-bold`} >Short</span>
          <span className={`absolute -rotate-12 ${logoFont.className}`}> ZED</span>

        </div>
      
      <span>| © {new Date().getFullYear()}</span>
      </Link>

      <a
        href='https://github.com/Ezequielz'
        target="_blank"
        rel="noreferrer"
        className=" flex items-center  p-2  rounded hover:text-violet-600"
      >
        <AiOutlineGithub size={20} />
        <span>/Ezequielz</span>
      </a>

      <a
        href='https://zapataezequiel.netlify.app/'
        target="_blank"
        rel="noreferrer"
        className=" flex items-center p-2  rounded hover:text-violet-600"
      >
        <TbWorld size={20} />
        <span>Portfolio</span>
      </a>


    </div>
  )
}