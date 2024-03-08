'use client'
import { useRouter } from 'next/navigation';
import { Role } from '@prisma/client';
import { IoIosArrowDown } from 'react-icons/io'
import { setUserRole } from '@/action';

interface Props {
    userId: string;
    role: Role;
}

export const RolesSelect = ({ userId, role }: Props) => {

    const router = useRouter();

    const updateUserRole = async (value: Role) => {

        await setUserRole(userId, value);

        router.refresh();

    };


    return (
        <div className="relative inline-flex self-center">
            <IoIosArrowDown size={20} className="absolute top-0.5 right-0.5 pointer-events-none" />
            <select
                onChange={(e) => updateUserRole(e.target.value as Role)}
                className="text-sm font-bold rounded border-2 border-violet-700 text-gray-600 h-fit w-fit pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
            >
                <option value={Role.admin} selected={role === Role.admin}> Admin </option>
                <option value={Role.user} selected={role === Role.user}> User </option>
            </select>
        </div>
    )
}
