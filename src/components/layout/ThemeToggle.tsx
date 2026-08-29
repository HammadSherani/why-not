"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="flex h-7 w-14 shrink-0 items-center rounded-full bg-gradient-to-r from-[#ff5870] to-[#ff7651] p-1 transition-colors"
    >
      <span
        className={`flex size-5 items-center justify-center rounded-full bg-white text-[#ff5870] shadow transition-transform duration-200 ${
          isDark ? "translate-x-7" : "translate-x-0"
        }`}
      >
        {isDark ? <Moon size={12} /> : <Sun size={12} />}
      </span>
    </button>
  );
}
