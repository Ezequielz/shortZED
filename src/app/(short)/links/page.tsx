import { redirect } from "next/navigation";
import { getUserLinks } from "@/action";
import { auth } from "@/auth.config";
import { Links, UserLinks } from "@/components";

export default async function LinksPage() {
    const session = await auth();

    if (!session) {
      redirect('/');
    }

    const { links = [] } = await getUserLinks(session?.user?.id!)

  return (
    <>
        <UserLinks links={links} />
    </>
  );
}