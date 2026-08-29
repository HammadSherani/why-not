"use client";

import { Toaster } from "react-hot-toast";
import { useTheme } from "@/components/theme/ThemeProvider";

export default function AppToaster() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: isDark ? "#1c1c1c" : "#ffffff",
          color: isDark ? "#ffffff" : "#111111",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}`,
          borderRadius: "0.75rem",
          fontSize: "0.875rem",
          padding: "0.65rem 1rem",
        },
        success: {
          iconTheme: { primary: "#4ade80", secondary: isDark ? "#1c1c1c" : "#ffffff" },
        },
        error: {
          iconTheme: { primary: "#ff5870", secondary: isDark ? "#1c1c1c" : "#ffffff" },
        },
      }}
    />
  );
}
