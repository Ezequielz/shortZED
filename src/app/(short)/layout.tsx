import { Footer, ShortForm, Sidebar, TopMenu } from '@/components';

export default function ShortLayout( { children }: {
  children: React.ReactNode;
} ) {
  return (
    <main className="min-h-screen">
      <Sidebar />
      <TopMenu />
  
      <div className="px-0 ">
        { children }

      </div>
      

      <Footer />
    </main>
  );
}