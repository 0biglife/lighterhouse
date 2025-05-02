"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      title="Theme Toggle"
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
