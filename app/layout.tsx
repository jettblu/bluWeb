import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import BluThemeProvider from "../components/ThemeProvider";
import { BluDataProvider } from "../components/DataProvider";
import Navbar from "../components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nanograd",
  description:
    "A minimal deep learning library. Built with Rust and WebAssembly. Try it out!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <BluThemeProvider>
        <BluDataProvider>
          <main className="min-h-screen">
            <body className={`${inter.className} lg:mb-8 mb-[250px] px-3`}>
              <Navbar />
              <div className="h-20" />
              {children}
            </body>
          </main>
        </BluDataProvider>
      </BluThemeProvider>
    </html>
  );
}
