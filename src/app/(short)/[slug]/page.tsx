import { getLinkBySlug, updateLinkClicks } from "@/action";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

interface Props {
    params: {
        slug: string;
    };
}
export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {

    const { slug } = params;
    const { links } = await getLinkBySlug(slug)

    return {
        title: 'Link acortado ',
        description: `Link acortado de  ${links![0].url ?? ''}`,
        openGraph: {
            images: [`${links![0].qr ?? ''}`]
        },
    }
}


export default async function LinkPage({ params }: Props) {
    const { slug } = params;

    const [link] = await Promise.all([
        getLinkBySlug(slug),
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