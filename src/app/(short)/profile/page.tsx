

import { redirect } from 'next/navigation';
import { Profile, Title } from '@/components';
import { auth } from '@/auth.config';
import { Metadata } from 'next';

export async function generateMetadata(
): Promise<Metadata> {

  const session = await auth();

  return {
    title:'Peril',
    description: `Perfil de ${session?.user?.name}`,
    openGraph: {
      title: `Perfil de ${session?.user?.name}`,
      description: `Perfil de ${session?.user?.name}`,
      images: [`${session?.user?.image}`]
    },
  }
}

export default async function ProfilePage() {

  const session = await auth();



  if (!session) {
    // redirect('/auth/login?returnTo=/perfil');
    redirect('/auth/login');
  };





  return (
    <>
      <Title title={'Perfil'} />
      <Profile />
    </>
  );
}