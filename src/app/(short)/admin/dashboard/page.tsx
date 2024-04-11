
import { Dashboard, Title } from '@/components';

export default async function () {

  return (
    <div className="p-5 xl:ml-32 xl:h-[calc(100vh-120px)] mt-2 ">
      <Title title={"Dashboard Administrativo"} />
      <Dashboard />
    </div>
  );
}