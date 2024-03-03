

import { ShortForm, Title, ViewLink } from '@/components';


interface Props {
  searchParams?: { [key: string]: string | string[] | undefined }
};
export default async function Home({ searchParams }: Props) {

  const short = searchParams?.short as string;

  return (
    <>
      <Title title={"Acortador de URL"} />

      <ShortForm />

      {
        short && (
       
            <ViewLink short={short} />
      
        )
      }

    </>
  );
}
