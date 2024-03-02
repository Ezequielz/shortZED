import { getOrderByUser } from "@/action";
import { auth } from "@/auth.config";
import { StatusBoxs, TableOrders } from "@/components";
import { notFound, redirect } from "next/navigation";

export default async function () {
    
    const session = await auth();
    if (!session) {
        redirect('/auth/login');
    };

 

  return (
    <div>
    
      <TableOrders />
    </div>
  );
}