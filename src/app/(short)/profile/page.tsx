

import { redirect } from "next/navigation";
import { Links } from "@/components";
import { getUserLinks } from "@/action";
import { auth } from "@/auth.config";
import Image from "next/image";

export default async function ProfilePage() {

    const session = await auth()
    const userImage = session?.user?.image ?? "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp";
    if (!session) {
      // redirect('/auth/login?returnTo=/perfil');
      redirect('/');
    }
    const { links = [] } = await getUserLinks(session?.user?.id!)
    return (
      <div>
       
       {/* <Image src={ userImage } alt="" width={100} height={100} className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28" /> */}
       {JSON.stringify(session)}
       <Links links={links} />
      </div>
    );
  }