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
    
    if (link.ok) {
        redirect(link.link!.url)
    }
    return (
        <div>
            {
                JSON.stringify(link)
            }
        </div>
    );
}