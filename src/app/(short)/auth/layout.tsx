// import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function ShopLayout( { children }: {
  children: React.ReactNode;
} ) {
//TODO session
//   const session = await auth();
  const session = {
    user: ''
  }

  if ( session?.user ) {
    redirect('/')
  }


  return (
    <main className="flex justify-center">
      <div className="w-full sm:w-[350px] px-10">

        { children }

      </div>
    </main>
  );
}