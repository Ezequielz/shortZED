import { Codes, Title } from "@/components";
import { Suspense } from "react";

interface Props {
  searchParams?: { [key: string]: string | undefined }
}

export default function ({ searchParams }: Props) {
  const code = searchParams?.code as string;
  return (
    <div className="ml-32 h-[calc(100vh-120px)] mt-2">
      <Title title={"Administracion de Códigos"} />

      {/* TODO implementar skeleton codigos */}
      <Suspense fallback={<div>Cargando códigos...</div>}>
        <Codes codeName={ code }/>
      </Suspense>
    </div>
  );
}