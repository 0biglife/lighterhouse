"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { SERIVCE_LOGO, SERVICE_URL } from "@/app/constants";

export default function Header() {
  return (
    <header className="h-16 sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-[rgb(var(--background))] text-[rgb(var(--foreground))]">
      <Link
        href={SERVICE_URL}
        className="font-bold italic text-[20px] hover:opacity-50 transition-opacity"
      >
        {SERIVCE_LOGO}
      </Link>

      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </header>
  );
}
