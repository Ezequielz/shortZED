import React from 'react'
import { QRCodeView, SingleLink } from '..'
import { redirect } from 'next/navigation'
import { getLink } from '@/action'

interface Props {
    short: string
}

export const ViewLink = async ({ short }: Props) => {


    const { ok, links } = await getLink(short)

    if (!ok || !links) {
        redirect('/')
    }

    const url = process.env.NEXT_PUBLIC_URL_DEV + links[0].shortUrl
    

    return (
        <>
            <SingleLink short={short} />
            <QRCodeView value={url} />
        </>
    )
}
