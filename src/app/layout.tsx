import type { Metadata } from "next";
import { inter } from "@/config/fonts";

import "./globals.css";



export const metadata: Metadata = {
  title: {
    template: '%s - ShortZED',
    default: 'Acortador de URL - Short ZED',
  },
  description: "Acorta, personaliza y comparte URL cortas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-neutral-900 text-slate-100 `}>

        {children}
      </body>
    </html>
  );
}
