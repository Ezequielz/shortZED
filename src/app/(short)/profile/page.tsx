

import { redirect } from 'next/navigation';
import { Profile, Title } from '@/components';
import { User } from '@prisma/client';
import { auth } from '@/auth.config';

export default async function ProfilePage() {

  const session = await auth();



  if (!session) {
    // redirect('/auth/login?returnTo=/perfil');
    redirect('/auth/login');
  };

  


  return (
    <>
      <Title title={'Perfil'} />
      <Profile  />
    </>
  );
}