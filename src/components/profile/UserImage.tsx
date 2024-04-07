import Image from 'next/image';
import { AddImage } from './AddImage';
import { getUserById } from '@/action';
import { auth } from '@/auth.config';



export const UserImage = async() => {
    const session = await auth();
    const {user} = await getUserById(session?.user?.id ?? '');
    return (
        <div className="flex flex-col items-center gap-1 justify-center relative">
            <Image
                src={user?.image ?? '/imgs/default-avatar.jpg'}
                alt="image profile"
                width={200}
                height={200}
                className='object-cover'
            />
            <AddImage />
        </div>
    )
}
