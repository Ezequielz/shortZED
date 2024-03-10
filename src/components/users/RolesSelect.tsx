'use client'
import { useRouter } from 'next/navigation';
import { Role } from '@prisma/client';
import { IoIosArrowDown } from 'react-icons/io'
import { setUserRole } from '@/action';
import { enqueueSnackbar } from 'notistack';

interface Props {
    userId: string;
    role: Role;
}

export const RolesSelect = ({ userId, role }: Props) => {

    const router = useRouter();

    const updateUserRole = async (value: Role) => {

        const { ok, user } = await setUserRole(userId, value);

        if (!ok) return enqueueSnackbar('Hubo un error al actualizar el rol', { variant: "error" });

        enqueueSnackbar(`El ${role} ${user?.name} ahora es ${value}`, { variant: "success" })
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
