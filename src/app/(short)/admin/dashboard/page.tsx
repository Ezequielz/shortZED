import { getAllCodes, getAllLinks, getAllOrders, getAllPlans, getAllUsers } from "@/action";
import { Dashboard, Title } from "@/components";
import Link from "next/link";
import { Suspense } from "react";
import { ImBarcode } from "react-icons/im";
import { IoCardOutline, IoLinkOutline, IoPersonOutline } from "react-icons/io5";
import { MdCurrencyExchange } from "react-icons/md";

export default async function () {



  return (
    <div className="ml-32 h-[calc(100vh-120px)] mt-2">
      <Title title={"Dashboard Administrativo"} />
      {/* TODO implementar esqueleton Dashboard */}
      <Suspense fallback={<div>Cargando...</div>}>
        <Dashboard />
      </Suspense>
    </div>
  );
}