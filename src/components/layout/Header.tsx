"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FaLinkedin,
  FaBloggerB,
  FaGithub,
  FaChevronRight,
} from "react-icons/fa6";
import ThemeToggle from "./ThemeToggle";
import { SERIVCE_LOGO, SERVICE_URL } from "@/app/constants";
import clsx from "clsx";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/0biglife/",
    icon: FaLinkedin,
    hoverColor: "hover:text-blue-500",
  },
  {
    label: "Blog",
    href: "https://0biglife.com",
    icon: FaBloggerB,
    hoverColor: "hover:text-red-500",
  },
  {
    label: "Github",
    href: "https://github.com/0biglife/lighterhouse",
    icon: FaGithub,
    hoverColor: "hover:text-purple-500",
  },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="h-14 sticky top-0 z-50 flex items-center justify-between px-5 py-4 bg-[rgb(var(--background))] text-[rgb(var(--foreground))]">
      <Link
        href={"/"}
        replace={true}
        className="font-bold italic text-[20px] hover:opacity-50 transition-opacity"
      >
        {SERIVCE_LOGO}
      </Link>

      <div className="flex items-center gap-1 relative">
        <div className="flex items-center gap-2">
          <div
            className={clsx(
              "flex items-center gap-4 pr-1 transition-all duration-500",
              open
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-4 pointer-events-none"
            )}
          >
            {socialLinks.map(({ label, href, icon: Icon, hoverColor }) => (
              <div key={label} className="relative group">
                <a
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx(
                    "transition-colors cursor-pointer",
                    hoverColor
                  )}
                >
                  <Icon className="w-4 h-4" />
                </a>
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                  {label}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle Social Links"
            className="p-1 hover:opacity-80 transition cursor-pointer"
          >
            <FaChevronRight
              className={clsx(
                "w-4 h-4 transition-transform duration-500",
                open ? "rotate-180" : "rotate-0"
              )}
            />
          </button>
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
}
