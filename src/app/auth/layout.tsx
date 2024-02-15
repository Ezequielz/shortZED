// import { auth } from "@/auth.config";
import { auth } from "@/auth.config";
import { TopMenu } from "@/components";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ShopLayout({ children }: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user) {
    redirect('/')
  }


  return (
    <main className="flex justify-center">
      <Link
      href={'/'}
        className="absolute top-10 left-10 hover:text-violet-500"
      >
        Vovler
      </Link>
      <div className="w-full sm:w-[350px] px-10">

        {children}

      </div>
    </main>
  );
}