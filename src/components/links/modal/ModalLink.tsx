

import { Suspense } from 'react';
import { Dialog, ModalLinkInfo } from '../..';
import { ModalCloseBtn } from './ModalCloseBtn';

interface Props {
    short: string;
    children: React.ReactNode;
};


export const ModalLink = async ({ short, children }: Props) => {

    if (!short) return null;

    return (

        <Dialog >
            <div className="flex flex-col justify-center items-center p-2 rounded-lg">
                <h3 className="text-2xl font-bold">Editar Link</h3>
                <ModalCloseBtn />
                {/* TODO implementar skeleton modal */}
                <Suspense fallback={ <div>Cargando modal...</div> } >
                    <ModalLinkInfo short={short} />

                    {children}

                </Suspense>
            </div>
        </Dialog>
    )
}
