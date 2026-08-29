"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import {
  Bell,
  CalendarDays,
  ChevronRight,
  FileText,
  MapPin,
  Pencil,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  UserRound,
} from "lucide-react";

const stats = [
  { label: "Connection", value: 64 },
  { label: "Plan Joined", value: 18 },
  { label: "Plan Hosted", value: 12 },
];

const settingsRows = [
  {
    icon: UserRound,
    title: "Edit Profile",
    description: "Update your personal information and profile details",
    href: "/profile/edit",
  },
  {
    icon: SlidersHorizontal,
    title: "Preferences",
    description: "Set your preferences for plans, privacy, and more",
    href: "/profile/preferences",
  },
  {
    icon: ShieldCheck,
    title: "Account Safety",
    description: "Manage your password, security, and blocked users",
    href: "/profile/account-safety",
  },
  { icon: Bell, title: "Notifications", description: "Control what notifications you receive and how" },
  {
    icon: FileText,
    title: "Legal Info",
    description: "View terms of service, privacy policy, and other legal documents",
    href: "/profile/legal",
  },
];

export default function ProfilePage() {
  return (
    <div className="w-full px-6 pb-12 sm:px-10 lg:px-16 xl:px-24">
      <h1 className="text-3xl font-semibold">Profile Settings</h1>
      <p className="mt-2 text-sm text-black/60 dark:text-white/60">Manage your account settings and preferences</p>

      <div className="mt-6 rounded-xl border border-black/10 bg-black/[0.02] p-5 dark:border-white/10 dark:bg-[#101010]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <div className="flex size-20 items-center justify-center rounded-full border-2 border-black/10 bg-gradient-to-br from-[#ff9472] to-[#ff5870] text-2xl font-semibold text-white dark:border-white/20">
                S
              </div>
              <button
                type="button"
                aria-label="Change photo"
                onClick={() => toast("Photo upload coming soon")}
                className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full bg-[#ff5870] text-white shadow-md hover:opacity-90"
              >
                <Pencil size={13} />
              </button>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Sofia Johnson</h2>
              <p className="mt-1 max-w-sm text-sm text-black/60 dark:text-white/60">
                Love meeting new people and exploring amazing places around the city.
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-black/50 dark:text-white/50">
                <span className="flex items-center gap-1">
                  <MapPin size={12} /> New York, USA
                </span>
                <span className="flex items-center gap-1">
                  <CalendarDays size={12} /> Joined May 2024
                </span>
              </div>
              <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#ff5870]/10 px-2.5 py-1 text-xs font-semibold text-[#ff5870]">
                <Star size={12} fill="currentColor" /> Active Explorer
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:w-auto">
            {stats.map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 rounded-lg border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.02]"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#ff5870]/10 text-[#ff5870]">
                  <UserRound size={15} />
                </span>
                <div>
                  <p className="text-sm font-semibold leading-tight">{value}</p>
                  <p className="text-[11px] text-black/50 dark:text-white/50">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <h2 className="mt-8 text-lg font-semibold">Account Setting</h2>
      <div className="mt-4 space-y-3">
        {settingsRows.map(({ icon: Icon, title, description, href }) => {
          const rowClassName =
            "flex w-full items-center gap-4 rounded-xl border border-black/10 bg-white p-4 text-left transition-colors hover:border-[#ff5870]/50 dark:border-white/10 dark:bg-[#111]";
          const content = (
            <>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#ff5870]/10 text-[#ff5870]">
                <Icon size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{title}</p>
                <p className="mt-0.5 text-xs text-black/50 dark:text-white/50">{description}</p>
              </div>
              <ChevronRight size={16} className="shrink-0 text-black/30 dark:text-white/30" />
            </>
          );

          return href ? (
            <Link key={title} href={href} className={rowClassName}>
              {content}
            </Link>
          ) : (
            <button key={title} type="button" onClick={() => toast(`${title} coming soon`)} className={rowClassName}>
              {content}
            </button>
          );
        })}
      </div>
    </div>
  );
}
