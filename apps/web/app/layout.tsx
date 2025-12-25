import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Ezy Todo - Task Management",
  description: "A simple and elegant todo application to manage your tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-gray-50`}>
        <header className="bg-white shadow-sm border-b border-gray-200">
          <nav className="max-w-2xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">✓</span>
                <h1 className="text-xl font-bold text-gray-900">Ezy Todo</h1>
              </div>
              <p className="text-gray-600 text-sm">Your personal task manager</p>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
