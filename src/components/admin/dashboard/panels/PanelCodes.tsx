import Link from 'next/link';
import { ImBarcode } from 'react-icons/im';
import { getAllCodes } from '@/action';
import { TopInfo } from '.';

export const PanelCodes = async () => {
    const { totalCodesCount, totalCodesActive, totalCodesInactive } = await getAllCodes({});

    return (
        <Link
            href={'/admin/codes'}
            className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md hover:bg-gradient-to-tr hover:from-fuchsia-600 hover:to-fuchsia-400 hover:text-white"
        >
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-fuchsia-600 to-fuchsia-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <ImBarcode size={30} />
            </div>
            <TopInfo label='codigos' totalCount={totalCodesCount} />
            <div className="flex justify-between items-center border-t p-4 antialiased tracking-normal font-sans text-sm font-extralight leading-snug">
                <div className="flex flex-col items-center" >
  
                </div>

                <div className="flex flex-col items-center">
                    <h4 className="font-normal">Estado</h4>
                    <ul>
                        <li>
                            Activos: {totalCodesActive}
                        </li>
                        <li>
                            Inactivos: {totalCodesInactive}
                        </li>
                    </ul>
                </div>
            </div>
        </Link>
    )
}
