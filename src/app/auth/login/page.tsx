

import { LoginForm } from '@/components';
import { titleFont } from '@/components/config/fonts';


export default async function () {


  return (
    <div className="flex flex-col min-h-[88.5vh] pt-32 ">

      <h1 className={ `${ titleFont.className } text-4xl mb-5` }>Ingresar</h1>

      <LoginForm />
    </div>
  );
}