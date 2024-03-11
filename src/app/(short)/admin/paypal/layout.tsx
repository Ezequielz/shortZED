import { Search, Title } from '@/components';



export default async function PaymentLayout({children}: {
    children: React.ReactNode;
}) {

    // TODO mejorar interfaz de checkeo de paypal
    return (
        <div className="ml-32 h-[calc(100vh-120px)] mt-2 ">
            <Title title={"Checkeo de Paypal"} />

            <Search paramsName="payment" label="en paypal" bg="bg-emerald-600" />
            {children}
        </div>
    );
}