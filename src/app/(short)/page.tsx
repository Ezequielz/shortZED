
import { getAllLinks } from "@/action";
import {  ShortForm } from "@/components";
import { titleFont } from "@/components/config/fonts";

export default async function Home() {
 
  const { links = [] } = await getAllLinks()

  return (
      <>
        <h1 className={`${titleFont.className}  flex justify-center text-2xl `}> Acortador de URL</h1>

        <ShortForm />

        {/* <Links /> */}

    
      </>
  );
}
