import React from 'react'
import { Pricing, UpdateForm } from '../..'
import { getLinkBySlug } from '@/action';

interface Props {

    short: string;
}

export const ModalOptionsLinksByUser = async({short}: Props) => {

    const {links} = await getLinkBySlug(short)
    if (!links) {
        return (
            <div>No se encontro link</div>
        )
    }
    return (
        <>
            <UpdateForm url={links![0].url} />
            <h1 className="text-2xl font-bold p-4">Precios</h1>
            <Pricing short={short} />

        </>
    )
}
