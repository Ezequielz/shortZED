'use client'
import { useRouter } from 'next/navigation';
import { IoIosArrowDown } from 'react-icons/io';
import { setUserStatus } from '@/action';

interface Props {
    userId: string;
    isActive: boolean;
};


export const StatusSelect = ({ userId, isActive }: Props) => {

    const router = useRouter();

    const updateStatus = async (value: string) => {
        const status: boolean = value === 'true' ? true : false;
        await setUserStatus(userId, status);
        router.refresh();
    };

    return (
        <div className="relative inline-flex self-center">
            <IoIosArrowDown size={20} className="absolute top-0.5 right-0.5 pointer-events-none" />
            <select
                onChange={(e) => updateStatus(e.target.value)}
                className="text-sm font-bold rounded border-2 border-violet-700 text-gray-600 h-fit w-fit pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
            >
                <option value="true" selected={isActive}> Activo </option>
                <option value="false" selected={!isActive}> Baneado </option>
            </select>
        </div>
    )
}
