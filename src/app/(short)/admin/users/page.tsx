import { Suspense } from 'react';
import { Search, Title, UserAdd, UserSkeleton, Users, UsersInfo } from '@/components';

interface Props {
  searchParams?: { [key: string]: string | undefined };
};

export default async function ({ searchParams }: Props) {

  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const search = searchParams?.admsearch;
  return (
    <div className="p-5 xl:ml-32 md:h-[calc(100vh-120px)] mt-2 ">
      <Title title={"Administracion de usuarios"} />
      <Suspense fallback={ <UserSkeleton /> }>
       
        <div className="md:flex gap-2">
          <UserAdd />

          <UsersInfo>
            <Search bg="bg-blue-800" label="Usuarios" paramsName="admsearch" />
          </UsersInfo>

        </div>

        <Users page={page} search={search} />
      </Suspense>
    </div>
  );
}