import clsx from "clsx"
import { IoCardOutline } from "react-icons/io5";

interface Props {
    orderId: string;
    isPaid: boolean;
}

export const OrderStatus = ({ isPaid, orderId }: Props) => {
    return (
        <div className={
            clsx(
                " lg:flex justify-between items-center p-2 mb- 2",
                { 'bg-red-600': !isPaid },
                { 'bg-green-600': isPaid }
            )
        }
        >
            <h2> Número de orden:  {orderId.split('-').at(-1)} </h2>

            <span className="flex gap-1 items-center">
                <IoCardOutline size={30} />
                {isPaid ? 'Pagada' : 'Pendiente de pago'}

            </span>

        </div>
    )
}
