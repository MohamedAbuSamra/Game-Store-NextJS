import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/tailwind.css";
import ClientProviders from "../components/default/ClientProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="min-h-screen">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans min-h-screen flex flex-col`}>
     
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
