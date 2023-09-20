import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import BluThemeProvider from "../components/ThemeProvider";
import { BluDataProvider } from "../components/DataProvider";
import Navbar from "../components/navbar";
import BluToaster from "../components/notifications/BluToaster";
import Fathom from "../components/Fathom";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jett Hays",
  icons: ["/icon.ico"],
  openGraph: {
    images: ["/icon.ico"],
    description:
      "Hey, I'm Jett Hays! I make the world a better place through stories and technology. Right now, I attend Carnegie Mellon where I study statistics and machine learning.",
    title: "Jett Hays",
  },
  twitter: {
    images: ["/icon.ico"],
    description:
      "Hey, I'm Jett Hays! I make the world a better place through stories and technology. Right now, I attend Carnegie Mellon where I study statistics and machine learning.",
    title: "Jett Hays",
  },
  description:
    "Hey, I'm Jett Hays! I make the world a better place through stories and technology. Right now, I attend Carnegie Mellon where I study statistics and machine learning.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <main>
        <body
          className={`${inter.className} min-h-screen pb-20 px-4 bg-[#F8F6F1] dark:bg-gradient-to-r dark:from-black dark:to-[#010F15] text-black dark:text-white`}
          suppressHydrationWarning={true}
        >
          <BluThemeProvider>
            <BluDataProvider>
              <Navbar />
              <BluToaster />
              <div className="h-24" />
              {children}
            </BluDataProvider>
          </BluThemeProvider>
          <Fathom />
        </body>
      </main>
    </html>
  );
}
