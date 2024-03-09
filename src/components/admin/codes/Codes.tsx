
import { getAllCodes } from '@/action';
import { TableCodes } from './TableCodes';


interface Props {
    codeName?: string;
}

export const Codes = async ({ codeName }: Props) => {
    const { codes } = await getAllCodes({});

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
        <>
        {/* TODO implementar creacion de codigos */}
            <div className="lg:min-h-[355px]">
                <TableCodes codes={codes} />
            </div>
        </>
    )
}

