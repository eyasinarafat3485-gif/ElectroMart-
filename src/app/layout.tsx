import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import type { Metadata, Viewport } from "next";
import { Hind_Siliguri, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/shared/Navbar/Navbar";
import Footer from "./components/shared/Footer/Footer";
import SmoothScroll from "./components/shared/SmoothScroll";
import { ToastContainer } from "react-toastify";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["latin", "bengali"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#030712",
};

export const metadata: Metadata = {
  title: "ElectroMart BD | Bangladesh's Leading Tech & Gadget Store",
  description:
    "Shop original smartphones, flagship laptops, smartwatches, cameras and audio accessories in Bangladesh with official brand warranty & express 24h delivery.",
  keywords: [
    "ElectroMart",
    "Gadget store BD",
    "Electronics Bangladesh",
    "Laptops Dhaka",
    "Smartphones BD",
    "Apple products Bangladesh",
    "Tech store",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${hindSiliguri.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#030712] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden">
        <SmoothScroll>
          <Navbar />

          <main className="flex-1 w-full max-w-full overflow-x-hidden">{children}</main>

          <Footer />
          <ToastContainer
            position="bottom-right"
            theme="dark"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
          />
        </SmoothScroll>
      </body>
    </html>
  );
}