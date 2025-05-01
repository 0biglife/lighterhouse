"use client";

import { FaLinkedin, FaGoogle, FaGithub } from "react-icons/fa";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/0biglife/",
    icon: FaLinkedin,
    hoverColor: "hover:text-blue-500",
  },
  {
    label: "Gmail",
    href: "mailto:your-email@example.com?subject=Hello&body=...",
    icon: FaGoogle,
    hoverColor: "hover:text-red-500",
  },
  {
    label: "Github",
    href: "https://github.com/0biglife",
    icon: FaGithub,
    hoverColor: "hover:text-purple-500",
  },
];

export default function Footer() {
  return (
    <footer className="w-full px-6 pb-16 mt-10 text-center">
      <div className="flex justify-center gap-5 mb-10">
        {socialLinks.map(({ label, href, icon: Icon, hoverColor }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors ${hoverColor}`}
            title={label}
          >
            <Icon className="w-5 h-5" />
          </a>
        ))}
      </div>

      <p className="text-xs">© 2025. 0biglife all rights reserved.</p>
    </footer>
  );
}
