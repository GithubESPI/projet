import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const forum = DM_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Rucher des Hauldres",
  description: "Découvrez nos miels naturels, non chauffés et savoureux du Rucher des Hauldres.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={forum.className}>
        <Navbar />
        {children}
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
