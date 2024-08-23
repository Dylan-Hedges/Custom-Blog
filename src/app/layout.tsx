import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { Roboto } from 'next/font/google';
import "./globals.css";
import { Providers } from './ReduxStore/provider';
import Navbar from './components/navbar';


//Saves imported font Roboto
const roboto_init = Roboto({
  subsets: ['latin'],
  weight: ['100','300','400','500','700','900'],
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: "Custom Blog",
  description: "Custom blog developed using Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto_init.variable}>
        <Providers>
          <Navbar />
          <main>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
