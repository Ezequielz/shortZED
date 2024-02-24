

import { getLink } from "@/action";
import { auth } from "@/auth.config";
import { ShortForm, SingleLink } from "@/components";
import { titleFont } from "@/components/config/fonts";
import { redirect } from "next/navigation";


interface Props {
  searchParams?: { [key: string]: string | string[] | undefined }
}
export default async function Home({ searchParams }: Props) {

  const short = searchParams?.short as string
  const session = await auth()

  if (short && session?.user?.id) {
    console.log('first')
    const { ok } = await getLink(short)

    if (!ok) {
      redirect('/')
    }
  }

  if (short && !session?.user?.id) {

    const { ok } = await getLink(short)
    if (!ok) {
      redirect('/')
    }
  }



  return (
    <>
      <h1 className={`${titleFont.className}  flex justify-center text-2xl `}> Acortador de URL</h1>

      <ShortForm />

      {
        short && (
       
            <SingleLink short={short} />
      
        )
      }

    </>
  );
}
