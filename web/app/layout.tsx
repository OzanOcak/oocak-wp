import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import "./globals.css";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: {
    default: "Oocak",
    template: "%s | Oocak",
  },
  description: "Software engineering, web development, and technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-white text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100">
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
          {children}
        </main>
        {/* Footer */}
        <footer className=" dark:bg-gray-900 pt-8 text-center">
          <p className="dark:text-gray-400">
            © 2026 OOApps Blog. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
