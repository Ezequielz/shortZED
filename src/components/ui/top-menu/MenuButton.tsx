'use client'

import { getUserById } from "@/action";
import { TopMenuButtonSkeleton } from "@/components";
import { useUIStore } from "@/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
    children: React.ReactNode
}

export const MenuButton = ( {children}: Props) => {
    const openSideMenu = useUIStore(state => state.openSideMenu);
    const [isLoadingSession, setIsLoadingSession] = useState(true)
    const { data: session } = useSession()
    const [userImage, setUserImage] = useState('/imgs/default-avatar.jpg')

    useEffect(() => {
        setIsLoadingSession(false)

    }, [session])

    useEffect(() => {
        if (!session) return;
        const getUserImage = async () => {
            const { user } = await getUserById(session?.user?.id! ?? '')
            return user?.image
        }

        getUserImage().then(image => {
            if (!image) return
            setUserImage(image)
        })

    }, [session])


    if (isLoadingSession) return (
        <TopMenuButtonSkeleton />
    );

    if (!session || !session.user) return null;



    return (
        <button
            onClick={openSideMenu}
            className="flex gap-2 justify-center items-center m-2 group rounded-md transition-all relative overflow-hidden  px-5 py-2 text-sm font-medium  hover:text-violet-600 focus:outline-none focus:ring-violet-400 active:bg-violet-400 active:text-white"
        >

            {children}

            <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-violet-600 transition-all duration-200 group-hover:w-full"></span>
            <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-violet-600 transition-all duration-200 group-hover:h-full"></span>
            <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-violet-600 transition-all duration-200 group-hover:w-full"></span>
            <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-violet-600 transition-all duration-200 group-hover:h-full"></span>
            {session.user.name!.charAt(0).toUpperCase() + session.user.name!.slice(1)}
        </button>
    )
}
