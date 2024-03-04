import React from 'react'
import { QRCodeView, SingleLink } from '..'
import { redirect } from 'next/navigation'
import { getLinkBySlug } from '@/action'

interface Props {
    short: string
}

export const ViewLink = async ({ short }: Props) => {


    const { ok, links } = await getLinkBySlug(short)

    if (!ok || !links) {
        redirect('/')
    }
    

    return (
        <>
            <SingleLink short={short} />
            <QRCodeView qrCode={links[0].qr} />
        </>
    )
}
