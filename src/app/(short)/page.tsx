
import { getLink } from "@/action";
import {  LinkSkeleton, ShortForm, SingleLink } from "@/components";
import { titleFont } from "@/components/config/fonts";
import { Suspense } from "react";


interface Props {
  searchParams?: { [key: string]: string | string[] | undefined }
}
export default async function Home({searchParams}: Props) {
 
 
  const short = searchParams?.short as string

 

  return (
      <>
        <h1 className={`${titleFont.className}  flex justify-center text-2xl `}> Acortador de URL</h1>

        <ShortForm />

        {
          short && (
            <Suspense fallback={ <LinkSkeleton quantity={1} /> }>
              <SingleLink short={short}/>
            </Suspense>
          )
        }
    
      </>
  );
}
