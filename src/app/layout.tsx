import type { Metadata } from "next";
import { Radio_Canada } from "next/font/google";
import "./globals.css";
import 'animate.css';
import { PageIntro } from "@/components";

const font = Radio_Canada({ subsets: ["latin"], weight: ['300','400','600','700','500'] });

export const metadata: Metadata = {
  title: 'Movies App',
  description: 'Find a movie to watch. See the providers,the ratings and other information. An informative movie platform powered by React.js to explore and discover details about your favorite films.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} min-h-calc[100vh] w-full font-bold`}>
        {children}

        <PageIntro />
      </body>
    </html>
  );
}
