import { Suspense } from 'react';
import { Search, Title, UserAdd, Users, UsersInfo } from '@/components';

interface Props {
  searchParams?: { [key: string]: string | undefined };
};

export default async function ({ searchParams }: Props) {

  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const search = searchParams?.admsearch;
  return (
    <div className="ml-32 h-[calc(100vh-120px)] mt-2">
      <Title title={"Administracion de usuarios"} />
      {/* TODO implementar skeleton usuarios */}
      <Suspense fallback={ <div>Cargando usuarios...</div> }>
        <div className="flex gap-2">
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