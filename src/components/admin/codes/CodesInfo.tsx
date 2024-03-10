import { getAllCodes } from '@/action';

interface Props {
    children: React.ReactNode
};

export const CodesInfo = async({ children }: Props) => {

    const {totalCodesCount, totalCodesActive, totalCodesInactive } = await getAllCodes({});
    return (
        <div className="flex flex-col justify-between items-center max-w-md mx-auto bg-gradient-to-tr from-fuchsia-600 to-fuchsia-400 rounded-lg m-2 p-2">
            <div>
                <span> Total de Códigos: {totalCodesCount}</span>
                <div className="flex flex-row justify-between gap-3">
                        <span>
                            activos: {totalCodesActive}

                        </span>
                        <span>
                            inactivos: {totalCodesInactive}
                        </span>
             
                </div>


            </div>

            {children}

        </div>
    )
}
