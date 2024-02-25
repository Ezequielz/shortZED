
import Image from 'next/image';

interface Props {
    qrCode: string
}

export const QRCodeView = async ({ qrCode }: Props) => {


    return (
        <div className='flex flex-col justify-center items-center p-5 mt-2'>

            <Image
                src={qrCode}
                alt="imgagen del codigo qr"
                width={200}
                height={200}

            />
         
            <a
                href={qrCode}
                download={qrCode}
                className="mt-2 group relative flex justify-center items-center h-12 w-48 overflow-hidden rounded-2xl bg-violet-600  text-lg font-bold text-white"
            >
                Descargar QR
                <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/20"/>
            </a>


        </div>
    )
}
