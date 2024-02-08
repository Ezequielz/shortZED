
import { AllLinks, ShortForm } from "@/components";
import { titleFont } from "@/config/fonts";

export default async function Home() {
 

  return (
      <main className="max-w-4xl m-auto">
        <h1 className={`${titleFont.className}  flex justify-center text-2xl `}> Acortador de URL</h1>

        <ShortForm />

        <AllLinks />

      </main>
  );
}
