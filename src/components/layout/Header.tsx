"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronDown, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "@/components/layout/ThemeToggle";

const planMenuItems = [
  { label: "Create Plan", href: "/plan/create-my-plan" },
  { label: "My Plan", href: "/plan/my-plan" },
];

const profileMenuItems = [
  { label: "Profile", href: "/profile" },
  { label: "Terms of Service", href: "/profile/legal" },
  { label: "Privacy Policy", href: "/profile/privacy" },
];

export default function Header() {
  const pathname = usePathname();
  const [isPlanMenuOpen, setIsPlanMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsPlanMenuOpen(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isDiscoverActive = pathname?.startsWith("/discover");
  const isPlanActive = pathname?.startsWith("/plan");
  const isChatActive = pathname?.startsWith("/chat");

  return (
    <header className="flex items-center justify-between gap-4 px-6 py-6 sm:px-10 sm:py-8 lg:px-16 xl:px-24">
      <Link href="/discover">
        <Image src="/assets/logo.png" alt="WhyNot" width={90} height={58} className="hidden h-auto w-16 dark:block" />
        <Image
          src="/assets/logo-black.png"
          alt="WhyNot"
          width={90}
          height={58}
          className="block h-auto w-16 dark:hidden"
        />
      </Link>

      <nav className="hidden items-center gap-8 text-sm text-black/70 dark:text-white/75 sm:flex">
        <Link
          href="/discover"
          className={`border-b-2 pb-2 ${
            isDiscoverActive
              ? "border-[#ff5870] font-semibold text-[#ff5870]"
              : "border-transparent hover:text-black dark:hover:text-white"
          }`}
        >
          Discover
        </Link>

        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => setIsPlanMenuOpen((open) => !open)}
            className={`flex items-center gap-1 border-b-2 pb-2 ${
              isPlanActive
                ? "border-[#ff5870] font-semibold text-[#ff5870]"
                : "border-transparent hover:text-black dark:hover:text-white"
            }`}
          >
            Plan
            <ChevronDown size={13} className={`transition-transform ${isPlanMenuOpen ? "rotate-180" : ""}`} />
          </button>

          {isPlanMenuOpen && (
            <div className="absolute left-0 top-full z-50 mt-3 w-44 overflow-hidden rounded-lg border border-black/10 bg-white py-1 shadow-xl dark:border-white/15 dark:bg-[#121212]">
              {planMenuItems.map(({ label, href }) => {
                const isSelected = pathname === href || pathname?.startsWith(`${href}/`);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsPlanMenuOpen(false)}
                    className={`block px-4 py-2.5 text-sm ${
                      isSelected
                        ? "bg-black/5 text-black dark:bg-white/10 dark:text-white"
                        : "text-black/70 hover:bg-black/5 hover:text-black dark:text-white/75 dark:hover:bg-white/5 dark:hover:text-white"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <Link
          href="/chat"
          className={`border-b-2 pb-2 ${
            isChatActive
              ? "border-[#ff5870] font-semibold text-[#ff5870]"
              : "border-transparent hover:text-black dark:hover:text-white"
          }`}
        >
          Chat
        </Link>
      </nav>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="text-black/70 hover:text-black dark:text-white/80 dark:hover:text-white"
        >
          <Bell size={21} />
        </button>
        <div ref={profileMenuRef} className="relative">
          <button
            type="button"
            aria-label="Profile menu"
            onClick={() => setIsProfileMenuOpen((open) => !open)}
            className="flex items-center gap-0.5 text-black/70 hover:text-black dark:text-white/80 dark:hover:text-white"
          >
            <UserRound size={21} />
            <ChevronDown size={13} className={`transition-transform ${isProfileMenuOpen ? "rotate-180" : ""}`} />
          </button>

          {isProfileMenuOpen && (
            <div className="absolute right-0 top-full z-50 mt-3 w-48 overflow-hidden rounded-lg border border-black/10 bg-white py-1 shadow-xl dark:border-white/15 dark:bg-[#121212]">
              {profileMenuItems.map(({ label, href }) => {
                const isSelected = pathname === href || pathname?.startsWith(`${href}/`);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsProfileMenuOpen(false)}
                    className={`block px-4 py-2.5 text-sm ${
                      isSelected
                        ? "bg-black/5 text-black dark:bg-white/10 dark:text-white"
                        : "text-black/70 hover:bg-black/5 hover:text-black dark:text-white/75 dark:hover:bg-white/5 dark:hover:text-white"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
        <ThemeToggle />
        <Link
          href="/auth/login"
          className="rounded-full bg-gradient-to-r from-[#ff5870] to-[#ff7651] px-5 py-2.5 text-sm font-semibold text-white"
        >
          Log out
        </Link>
      </div>
    </header>
  );
}
