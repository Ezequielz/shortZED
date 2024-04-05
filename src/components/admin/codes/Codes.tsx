
import { getAllCodes } from '@/action';
import { TableCodes } from './TableCodes';


interface Props {
    page?: number;
    codeName?: string
}

export const Codes = async ({ page, codeName }: Props) => {
    const { codes } = await getAllCodes({ page, codeName });

    if (!codes) {
        return (<div>No hay códigos</div>);
    };

    if (codes.length === 0) {
        return (
            <div>
                <span>
                    No hay resultados
                </span>
            </div>
        );
    };

    return (

        <div className="lg:min-h-[355px]">
            <TableCodes codes={codes} />
        </div>

    )
}

