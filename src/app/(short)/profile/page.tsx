

import { redirect } from "next/navigation";
import { Profile } from "@/components";
import { User } from "@prisma/client";
import { auth } from "@/auth.config";

export default async function ProfilePage() {

    const session = await auth();

  
  
    if (!session) {
      // redirect('/auth/login?returnTo=/perfil');
      redirect('/');
    }

    const { id, password, ...rest } = session.user as User 


    return (
      <div>
        <Profile user={ rest } />
      </div>
    );
  }