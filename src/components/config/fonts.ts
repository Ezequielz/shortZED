import { Montserrat_Alternates,  Aclonica , Roboto, Abel } from 'next/font/google';




export const logoFont = Aclonica({ 
  subsets: ['latin'],
  weight: ['400'],
});
export const titleFont = Montserrat_Alternates({ 
  subsets: ['latin'],
  weight: ['400','800'],
});
export const textFont = Roboto({ 
  subsets: ['latin'],
  weight: ['400'],
});
export const subtitleFont = Abel({ 
  subsets: ['latin'],
  weight: ['400'],
});
