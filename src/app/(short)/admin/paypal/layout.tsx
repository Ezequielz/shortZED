import { Search, Title } from '@/components';



export default async function PaymentLayout({ children }: {
    children: React.ReactNode;
}) {

    return (
        <div className="p-5 xl:ml-32 md:h-[calc(100vh-120px)] mt-2">
            <Title title={"Checkeo de Paypal"} />

            <div className="flex flex-col items-center justify-between bg-gradient-to-tr from-emerald-600 to-emerald-400 rounded-lg m-2 p-4">
                <Search paramsName="payment" label="en paypal" bg="bg-emerald-600" />

            </div>
                {children}
        </div>
    );
}