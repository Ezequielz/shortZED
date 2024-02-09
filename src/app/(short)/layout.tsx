import { Footer, TopMenu } from '@/components';

export default function ShortLayout( { children }: {
  children: React.ReactNode;
} ) {
  return (
    <main className="min-h-screen">

      <TopMenu />
  
      <div className="px-0 ">
        { children }

      </div>

      <Footer />
    </main>
  );
}