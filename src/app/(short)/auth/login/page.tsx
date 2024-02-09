
import { LoginForm } from '@/components';
import { titleFont } from '@/config/fonts';


export default function () {
  return (
    <div className="flex flex-col min-h-[88.5vh] pt-32 sm:pt-40">

      <h1 className={ `${ titleFont.className } text-4xl mb-5` }>Ingresar</h1>

      <LoginForm />
    </div>
  );
}