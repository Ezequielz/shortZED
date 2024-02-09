
import { redirect } from "next/navigation";
import { Links } from "@/components";
import { getUserLinks } from "@/action";

export default async function ProfilePage() {

    const session = 'db988207-9d08-4600-b183-0a651b2e1d7b'

    const { links = [] } = await getUserLinks(session)

    if (!session) {
        // redirect('/auth/login?returnTo=/perfil');
        redirect('/');
    }
    return (
      <div>
       
       <Links links={links} />
      </div>
    );
  }