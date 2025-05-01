"use client";

import { useEffect, useState } from "react";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");

    if (stored === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else if (stored === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDark(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }

    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");

    if (next) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="rounded-[20px] p-2 transition-transform active:scale-90 hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      <motion.div
        key={isDark ? "dark" : "light"}
        initial={{ rotate: 0, scale: 1 }}
        animate={{ rotate: isDark ? 15 : -15, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        {isDark ? <MdOutlineLightMode size={20} /> : <MdDarkMode size={20} />}
      </motion.div>
    </button>
  );
}
