import { Inter, Montserrat_Alternates,  Aclonica } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });


export const logoFont = Aclonica({ 
  subsets: ['latin'],
  weight: ['400'],
});
export const titleFont = Montserrat_Alternates({ 
  subsets: ['latin'],
  weight: ['400','800'],
});