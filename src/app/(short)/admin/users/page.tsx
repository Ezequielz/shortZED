import { TableUsers, Title, UserAdd, UserSearch, UsersInfo } from "@/components";

interface Props {
  searchParams?: { [key: string]: string | undefined }
}

export default async function ({ searchParams }: Props) {

  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  return (
    <div className="ml-32 h-[calc(100vh-120px)] mt-2">
      <Title title={"Administracion de usuarios"} />

      <div className="flex gap-2">
        <UserAdd />

        <UsersInfo>
          <UserSearch />
        </UsersInfo>

      </div>
      <TableUsers page={page} />
    </div>
  );
}