import { getLink } from "@/action";
import { notFound, redirect } from "next/navigation";

interface Props {
    params: {
        slug: string;
    };
}


export default async function LinkPage({ params }: Props) {
    const { slug } = params;

    const link = await getLink(slug)


    if (!link.ok) {
        notFound()
    }
    
    redirect(link.links![0].url)
}