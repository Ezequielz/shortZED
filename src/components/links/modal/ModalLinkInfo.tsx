import { getLinkBySlug } from '@/action';

interface Props {
    short: string;
}


export const ModalLinkInfo = async ({ short }: Props) => {

    const { ok, links } = await getLinkBySlug(short);

    if (!ok) return null;

    const { url, clicks, shortUrl, limit } = links![0];

    const object = {
        Url: url,
        Hash: process.env.NEXT_PUBLIC_URL_DEV + shortUrl,
        Clicks: clicks,
        Limite: !limit ? '∞' : (limit > 10 ? limit : limit + ' Gratis'),

    };
    return (
        <ul className="w-full ">
            {
                Object.entries(object).map(([prop, value]) => (
                    <li key={prop} className="p-2 flex justify-between odd:bg-neutral-600 even:bg-neutral-500">
                        <span>{prop}:</span>
                        {
                            typeof (value) === 'string' && value.length > 30 ? (

                                <span className="w-[350px] break-words text-xs text-right">{value.length > 150 ? value.slice(0, 150) + '...' : value}</span>
                            ) : (

                                <span className="">{value}</span>
                            )
                        }
                    </li>
                ))
            }

        </ul>
    )
}
