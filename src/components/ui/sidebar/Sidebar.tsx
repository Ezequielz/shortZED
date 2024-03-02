'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPersonOutline, IoSearchOutline, IoLinkOutline } from 'react-icons/io5';
import { logout } from '@/action';
import { useUIStore } from '@/store';




export const Sidebar = () => {

    const { data: session } = useSession();
    const isAuthenticated = !!session?.user
    // const isAdmin = (session?.user?.roles === 'admin')

    const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);
    const closeMenu = useUIStore(state => state.closeSideMenu);

    return (
        <div>

            {/* Background black */}
            {
                isSideMenuOpen && (
                    <div
                        className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"
                    />

                )
            }


            {/* Blur */}
            {
                isSideMenuOpen && (
                    <div
                        onClick={closeMenu}
                        className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
                    />

                )
            }

            {/* Sidemenu */}
            <nav
                className={
                    clsx(
                        "fixed p-5 right-0 top-0 w-[500px] h-screen text-slate-100 bg-neutral-800 z-20 shadow-2xl transform transition-all duration-300",
                        {
                            "translate-x-full": !isSideMenuOpen
                        }
                    )
                }>


                <IoCloseOutline
                    size={50}
                    className="absolute top-5 right-5 cursor-pointer"
                    onClick={() => closeMenu()}
                />


                {/* Input */}
                <div className="relative mt-14">
                    <IoSearchOutline size={20} className="absolute top-2 left-2" />
                    <input
                        type="text"
                        placeholder="Buscar"
                        className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
                    />
                </div>

                {/* Menú */}

                {
                    isAuthenticated && (
                        <>
                            <Link
                                href="/profile"
                                onClick={() => closeMenu()}
                                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                            >
                                <IoPersonOutline size={30} />
                                <span className="ml-3 text-xl">Perfil</span>
                            </Link>

                            <Link
                                href="/links"
                                onClick={() => closeMenu()}
                                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                            >
                                <IoLinkOutline size={30} />
                                <span className="ml-3 text-xl">Links</span>
                            </Link>

                            <Link
                                href="/orders"
                                onClick={() => closeMenu()}
                                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                            >
                                <IoLinkOutline size={30} />
                                <span className="ml-3 text-xl">Ordenes</span>
                            </Link>

                            <button
                                className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                                onClick={() => logout()}
                            >
                                <IoLogOutOutline size={30} />
                                <span className="ml-3 text-xl">Salir</span>
                            </button>
                        </>

                    )
                }

                {
                    !isAuthenticated && (
                        <Link
                            href="/auth/login"
                            onClick={() => closeMenu()}
                            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                        >
                            <IoLogInOutline size={30} />
                            <span className="ml-3 text-xl">Ingresar</span>
                        </Link>

                    )
                }

            </nav>
        </div>
    );
};