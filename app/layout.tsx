import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {Providers} from "./provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Transcribelo.ai",
  description: "Transcrip text to speech with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Providers>
        <div className="h-screen w-screen bg-gray-200 flex flex-col justify-center items-center">
          {children}
        </div>
      </Providers>
      </body>
    </html>
  );
}
