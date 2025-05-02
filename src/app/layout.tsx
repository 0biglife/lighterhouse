import "./globals.css";
import type { Metadata } from "next";
import { ClientRoot } from "@/components";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lighterhouse",
  description: "One Click Analyzing Website Performance Tool",
  applicationName: "Lighterhouse",
  keywords: [
    "lighthouse",
    "performance",
    "seo",
    "website analyzer",
    "Lighterhouse",
    "0biglife",
  ],
  authors: [{ name: "0biglife", url: "https://github.com/0biglife" }],
  creator: "0biglife",
  metadataBase: new URL("https://lighterhouse.0biglife.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground`}
      suppressHydrationWarning
    >
      <body className={"font-sans antialiased"}>
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
