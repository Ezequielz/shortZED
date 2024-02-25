import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import { ModalLink, UserLinks } from '@/components';

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function LinksPage({searchParams}: Props) {
  const session = await auth();
  const short = searchParams?.short as string;

  if (!session || !session.user?.id) {
    redirect('/');
  };

  
  return (

    <section>
      
      <div className="container px-6 py-8 mx-auto">
        <h3 className="text-3xl font-medium text-gray-700">Links</h3>

          <ModalLink short={short} />
        {/* LINKS */}   
          <UserLinks />

      </div>
    </section>

  )
}