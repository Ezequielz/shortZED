import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import { ModalLink, UserLinks, UserLinksSkeleton } from "@/components";
import { Suspense } from "react";

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined }
}


export default async function LinksPage({ searchParams }: Props) {
  const session = await auth();
  
  if (!session || !session.user?.id) {
    redirect('/');
  }

  const modalSlug = searchParams?.sl as string;
  
  return (

    <section>
      <ModalLink modalSlug={ modalSlug }/>
      <div className="container px-6 py-8 mx-auto">
        <h3 className="text-3xl font-medium text-gray-700">Links</h3>


        {/* LINKS */}

        <Suspense fallback={<UserLinksSkeleton />}>
          <UserLinks />

        </Suspense>




      </div>
    </section>

  )
}