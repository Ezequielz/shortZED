'use client'

import Link from "next/link"
import { usePathname } from "next/navigation";

interface Props {
    label: string;
    href: string;
    color: string;
    icon: JSX.Element;
}

export const AdminMenuList = ({ label, href, icon, color }: Props) => {

    const path = usePathname();

    return (
        <Link
            href={`${href}`}
            className={`${href === path && color} hover:bg-white/10 active:bg-white/30 middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-3 rounded-lg  w-full flex items-center gap-2 px-4 capitalize`}

        >
            <span>

                {icon}
            </span>
            <p className="block antialiased font-sans text- md:text-base leading-relaxed text-inherit font-medium capitalize">
                {label}
            </p>
        </Link>
    )
}
