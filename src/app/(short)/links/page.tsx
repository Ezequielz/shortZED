import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import {  UserLinks, UserLinksSkeleton } from "@/components";
import { Suspense } from "react";



export default async function LinksPage() {
  const session = await auth();

  if (!session || !session.user?.id ) {
    redirect('/');
  }

  return (

    <div className="container px-6 py-8 mx-auto">
      <h3 className="text-3xl font-medium text-gray-700">Links</h3>


      {/* LINKS */}

      <Suspense fallback={<UserLinksSkeleton />}>
        <UserLinks />
      
      </Suspense>


    </div>

  )
}