import { auth } from "@/auth.config";
import { AdminAside } from "@/components";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";



export default async function ShortLayout({ children }: {
    children: React.ReactNode;
}) {

    const session = await auth();

    if (!session) {
        redirect('/auth/login')
    }
    if (session.user?.roles !== Role.admin ) {
        redirect('/')
    }

    return (
        <section className="flex-1 overflow-x-hidden overflow-y-hidden m-auto max-w-[1200px]">
            <AdminAside />
            {children}
        </section>
    );
}