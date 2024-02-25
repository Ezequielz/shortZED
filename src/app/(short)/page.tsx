

import { getLink } from "@/action";
import { auth } from "@/auth.config";
import { ShortForm, SingleLink, ViewLink } from "@/components";
import { titleFont } from "@/components/config/fonts";
import { redirect } from "next/navigation";


interface Props {
  searchParams?: { [key: string]: string | string[] | undefined }
}
export default async function Home({ searchParams }: Props) {

  const short = searchParams?.short as string

  return (
    <>
      <h1 className={`${titleFont.className}  flex justify-center text-2xl `}> Acortador de URL</h1>

      <ShortForm />

      {
        short && (
       
            <ViewLink short={short} />
      
        )
      }

    </>
  );
}
