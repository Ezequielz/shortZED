import { Footer, ShortForm, Sidebar, TopMenu } from '@/components';

export default function ShortLayout( { children }: {
  children: React.ReactNode;
} ) {
  return (
    <main className="min-h-screen">
      <Sidebar />
      <TopMenu />
  
      <section className="flex-1 overflow-x-hidden overflow-y-hidden m-auto max-w-[1200px]">
        { children }

      </section>
      

      <Footer />
    </main>
  );
}