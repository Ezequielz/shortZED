import { getAllLinks } from "@/action";

interface Props {
    children: React.ReactNode
}

export const LinksInfo = async({ children }: Props) => {
    const { totalLinkCount, totalLinkActive, totalLinkInactive } = await getAllLinks({});
    return (
        <div className="flex flex-row  w-full items-center justify-between bg-gradient-to-tr from-green-600 to-green-400 rounded-lg m-2 p-2">

            <div className="flex flex-row gap-2">
                <article className="bg-slate-100 text-neutral-900 p-2 rounded-xl flex gap-2  items-center justify-center">
                    <span> Total:</span>
                    <span>{totalLinkCount}</span>
                </article>
                <article className="bg-slate-100 text-neutral-900 p-2 rounded-xl flex gap-2  items-center justify-center">
                    <span> Activos:</span>
                    <span>{totalLinkActive}</span>
                </article>
                <article className="bg-slate-100 text-neutral-900 p-2 rounded-xl flex gap-2  items-center justify-center">
                    <span> Inactivos:</span>
                    <span>{totalLinkInactive}</span>
                </article>
            </div>
          
            
            {children}
        </div>
    )
}
