


import QRCode from 'react-qr-code'

interface Props {
    value: string
}

export const QRCodeView = ({ value }: Props) => {
  
    return (
        <div className='flex flex-col justify-center items-center p-5 mt-2'>
            <h3 className='text-xl font-bold'>Codigo qr del link</h3>
            <div style={{ height: "auto", margin: "30px auto", maxWidth: 200, width: "100%", padding: 5, backgroundColor: 'red' }}>
                <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={value}
                    viewBox={`0 0 256 256`}
                />
            </div>

        </div>
    )
}
