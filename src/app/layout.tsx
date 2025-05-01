import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientRoot } from "@/components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Beacon Service",
  description: "One Click Analyzing Website Performance Tool",
  applicationName: "Beacon",
  keywords: [
    "lighthouse",
    "performance",
    "seo",
    "website analyzer",
    "Beacon",
    "0biglife",
  ],
  authors: [{ name: "0biglife", url: "https://github.com/0biglife" }],
  creator: "0biglife",
  metadataBase: new URL("https://beacon.0biglife.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="" lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground font-sans antialiased`}
      >
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
