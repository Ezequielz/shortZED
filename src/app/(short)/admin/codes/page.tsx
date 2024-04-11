import { Codes, CodesAdd, CodesInfo, CodesSkeleton, Search, Title } from "@/components";
import { Suspense } from "react";

interface Props {
  searchParams?: { [key: string]: string | undefined }
}

export default function ({ searchParams }: Props) {
  // const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const code = searchParams?.code;
  return (
    <div className="p-5 xl:ml-32 md:h-[calc(100vh-120px)]  mt-2">
      <Title title={"Administracion de Códigos"} />

      <Suspense fallback={<CodesSkeleton />}>
        
        <div className="flex flex-col md:flex-row md:gap-2">
          <CodesAdd />
          <CodesInfo>
            <Search label="Código" bg="bg-fuchsia-800 " paramsName="code" />
          </CodesInfo>
        </div>
        
        <Codes codeName={code} />
      </Suspense>
    </div>
  );
}