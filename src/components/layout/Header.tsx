"use client";

import Link from "next/link";
// import ThemeToggle from "./ThemeToggle";

const SERVICE_URL = "https://www.test.com";

export default function Header() {
  return (
    <header className="bg-background text-foreground  sticky top-0 z-50 flex items-center justify-between px-8 py-4 ">
      {/* <header className="bg-background text-foreground border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 flex items-center justify-between px-6 py-3">*/}
      <Link
        href={SERVICE_URL}
        className="font-bold italic text-[20px] hover:opacity-50 transition-opacity"
      >
        Beacon.
      </Link>

      {/* <div className="flex items-center gap-4">
        <ThemeToggle />
      </div> */}
    </header>
  );
}
