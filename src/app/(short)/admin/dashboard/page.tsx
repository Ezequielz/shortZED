
import { Dashboard, Title } from '@/components';

export default async function () {

  return (
    <div className="ml-32 h-[calc(100vh-120px)] mt-2 ">
      <Title title={"Dashboard Administrativo"} />
      <Dashboard />
    </div>
  );
}