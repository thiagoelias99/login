import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Login with Next Auth.js",
  description: "A custom login with Next Auth.js page"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative w-screen h-screen bg-slate-100 text-[#0C1421] antialiased flex flex-col justify-center items-center px-4 lg:px-6 py-4 lg:py-20 max-w-screen-xl mx-auto [&::-webkit-scrollbar]:hidden`}>
        {children}
      </body>
    </html>
  );
}
