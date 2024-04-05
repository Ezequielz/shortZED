import { LinkSkeleton, Links, LinksInfo, Search, Title } from "@/components";
import { Suspense } from "react";

interface Props {
  searchParams?: { [key: string]: string | undefined }
}

export default async function ({ searchParams }: Props) {

  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const search = searchParams?.adminsearch;
  const short = searchParams?.short as string;
  
  return (
    <div className="ml-32 h-[calc(100vh-120px)] mt-2">
      <Title title={"Administracion de Links"} />

      <Suspense fallback={<LinkSkeleton />}>
        <div className="flex gap-2">
          <LinksInfo >
            <Search bg="bg-green-800" label="Links" paramsName="adminsearch" />
          </LinksInfo>

        </div>
        
        <Links page={page} search={search} short={short} />
      </Suspense>
    </div>
  );
}