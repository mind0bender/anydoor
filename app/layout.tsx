import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FavouritesProvider from "@/components/FavoritesProvider";

const manropeSans = Manrope({
  variable: "--font-manrope-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AnyDoor",
  description:
    "Local business discovery platform that connects users with nearby services and shops, offering personalized recommendations and seamless navigation to enhance local exploration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col w-full min-h-screen bg-primary-200 text-primary font-sans ${manropeSans.variable} antialiased selection:bg-emerald-300`}
      >
        <FavouritesProvider>
          <Navbar />
          <main className={`flex grow`}>{children}</main>
          <Footer />
        </FavouritesProvider>
      </body>
    </html>
  );
}
