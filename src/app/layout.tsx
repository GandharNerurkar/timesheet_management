import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { SessionProvider } from "@/providers/session-provider";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ticktock Timesheets",
  description: "Timesheet management for modern teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-white font-sans text-slate-900">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
