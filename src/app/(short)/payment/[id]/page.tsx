import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import { getOrderById } from '@/action';

interface Props {
    params: {
        id: string;
    };
}

export default async function ({ params }: Props) {
    const { id } = params;

    const session = await auth();
    if (!session) {
        redirect('/auth/login');
    }

    const { order, ok } = await getOrderById(id)

    if (!ok) {
      redirect('/')
    }

  return (
    <div>
      <h1>{order?.id}</h1>
      <p>{order?.user.email}</p>
      <p>{order?.code?.name}</p>
    </div>
  );
}