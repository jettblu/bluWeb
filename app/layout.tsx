import "./globals.css";
import "highlight.js/styles/github-dark-dimmed.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/navbar";
import BluToaster from "../components/notifications/BluToaster";
import Fathom from "../components/Fathom";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jett Hays",
  icons: ["/icon.ico"],
  metadataBase: new URL("https://jetthays.com"),
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen px-4 min-w-[100vw] prose dark:prose-invert md:prose-xl prose-blockquote:border-sky-400 prose-code:-mx-4 prose-code:-my-3 prose-code:rounded-md prose-code:hover:cursor-pointer prose-code:scrollbar-thin prose-code:scrollbar-thumb-sky-400 prose-code:scrollbar-track-gray-700 prose-blockquote:rounded-md prose-img:rounded-md prose-a:text-sky-400 prose-li:marker:text-sky-400 prose-quoteless prose-blockquote:not-italic`}
      >
        <Navbar />
        <BluToaster />
        <div className="h-20" />
        {children}

        <Fathom />
      </body>
    </html>
  );
}
