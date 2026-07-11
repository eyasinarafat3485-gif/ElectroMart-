import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "./components/shared/Navbar/Navbar";
import Footer from "./components/shared/Footer/Footer";
import { ToastContainer } from "react-toastify";

const hindSiliguri = Hind_Siliguri({
  subsets: ['latin', 'bengali'],
  weight: ['300', '400', '500', '600', '700'], 
  variable: '--font-hind-siliguri',
});

export const metadata: Metadata = {
  title: "ElectroMart | TechSolution App",
  description: "ElectroMart - Your One-Stop Tech Solution Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hindSiliguri.variable} h-full antialiased`} 
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          {children}
        </main>
        
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}