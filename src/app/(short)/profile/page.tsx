

import { redirect } from 'next/navigation';
import { Profile, Title } from '@/components';
import { auth } from '@/auth.config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Perfil',
  description: "Perfil de usuario de Shortzed",
};


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