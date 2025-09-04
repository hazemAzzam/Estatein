import type { Metadata } from "next";
import { Geist, Geist_Mono, Urbanist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CTA from "@/components/landing/CTA";
import { Toaster } from "sonner";

const urbanist = Urbanist({
  variable: "--font-urbanist",
});

export const metadata: Metadata = {
  title: "Estatein - Find Your Dream Property",
  description:
    "Discover exceptional properties with Estatein. Your trusted partner in finding the perfect home, villa, or investment property.",
  keywords: "real estate, properties, homes, villas, apartments, investment",
  authors: [{ name: "Estatein Team" }],
  openGraph: {
    title: "Estatein - Find Your Dream Property",
    description:
      "Discover exceptional properties with Estatein. Your trusted partner in finding the perfect home.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`dark relative ${urbanist.variable} flex flex-col bg-gray-08 antialiased min-h-screen`}
      >
        <Toaster />
        <Navbar />
        {children}
        <CTA />
        <Footer />
      </body>
    </html>
  );
}
