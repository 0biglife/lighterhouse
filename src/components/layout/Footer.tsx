"use client";

import { FaLinkedin, FaBloggerB, FaGithub } from "react-icons/fa";

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

export default function Footer() {
  return (
    <footer className="w-full px-6 pb-1 mt-10 text-center">
      <div className="flex justify-center gap-5 mb-10">
        {socialLinks.map(({ label, href, icon: Icon, hoverColor }) => (
          <div key={label} className="relative group">
            <a
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${hoverColor}`}
            >
              <Icon className="w-5 h-5" />
            </a>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
              {label}
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}
