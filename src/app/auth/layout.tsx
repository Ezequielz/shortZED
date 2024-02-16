// import { auth } from "@/auth.config";
import { auth } from "@/auth.config";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoIosArrowRoundBack } from "react-icons/io";


export default async function ShopLayout({ children }: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user) {
    redirect('/')
  }


  return (
    <main className="flex justify-center">

      <div className="absolute top-10 left-10 flex items-center">

        <Link
          href={'/'}
          className=" flex gap-2 justify-center items-center m-2 group rounded-md transition-all relative overflow-hidden  px-3 py-2 text-sm font-medium  hover:text-violet-600 focus:outline-none focus:ring-violet-400 active:bg-violet-400 active:text-white"
        >

          <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-violet-600 transition-all duration-200 group-hover:w-full"></span>
          <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-violet-600 transition-all duration-200 group-hover:h-full"></span>
          <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-violet-600 transition-all duration-200 group-hover:w-full"></span>
          <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-violet-600 transition-all duration-200 group-hover:h-full"></span>
          <span className=" group flex ">
            <IoIosArrowRoundBack size={20} className="transition-all duration-300 group-hover:-translate-x-1" />
            ir a Página principal

          </span>
        </Link>
      </div>




      <div className="w-full sm:w-[350px] px-10">

        {children}

      </div>
    </main>
  );
}