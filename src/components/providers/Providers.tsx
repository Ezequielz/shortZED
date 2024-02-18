'use client'

import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from 'notistack'

interface Props {
    children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {


    return (
        <SessionProvider >
            <SnackbarProvider>
                {children}
            </SnackbarProvider>
        </SessionProvider>
    )
}