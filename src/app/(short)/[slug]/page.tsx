import { getLink, updateLinkClicks } from "@/action";
import { notFound, redirect } from "next/navigation";

interface Props {
    params: {
        slug: string;
    };
}


export default async function LinkPage({ params }: Props) {
    const { slug } = params;
    
    const [ link ] = await Promise.all([
        getLink(slug),
        updateLinkClicks(slug)
    ])
    
    
    if (!link.ok) {
        notFound()
    }
   
    if (link?.links && !link.links[0].isActive) {
        redirect(`/inactive-link/${link.links[0].shortUrl}`)
    }
    
    redirect(link.links![0].url)
}