"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Bell, Mail, Megaphone, MessageCircle, Trash2, TriangleAlert } from "lucide-react";
import SettingToggleRow from "@/components/ui/SettingToggleRow";

export default function PreferencesPage() {
  const [newMatches, setNewMatches] = useState(true);
  const [chatMessages, setChatMessages] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  function handleDeleteAccount() {
    setIsDeleteOpen(false);
    toast.success("Account deletion requested");
  }

  return (
    <div className="w-full px-6 pb-12 sm:px-10 lg:px-16 xl:px-24">
      <h1 className="text-3xl font-semibold">Preferences &amp; Notifications</h1>
      <p className="mt-2 text-sm text-black/60 dark:text-white/60">
        Manage how you receive updates and control your account experience.
      </p>

      <SectionHeading icon={Mail}>Email Notification</SectionHeading>
      <div className="mt-3 space-y-3">
        <SettingToggleRow
          icon={Mail}
          title="New Matches"
          description="Get notified when someone matches with your plan."
          checked={newMatches}
          onChange={setNewMatches}
        />
        <SettingToggleRow
          icon={MessageCircle}
          title="Chat Messages"
          description="Receive updates when new messages arrive."
          checked={chatMessages}
          onChange={setChatMessages}
        />
        <SettingToggleRow
          icon={Megaphone}
          title="Marketing"
          description="Occasional product news, tips, and offers."
          checked={marketing}
          onChange={setMarketing}
        />
      </div>

      <SectionHeading icon={Bell} className="mt-8">
        Browser Push Notification
      </SectionHeading>
      <div className="mt-3">
        <SettingToggleRow
          icon={Bell}
          title="Enable Push Notifications"
          description="Receive instant updates in your browser, even when you're not on WhyNot."
          checked={pushEnabled}
          onChange={setPushEnabled}
        />
      </div>

      <div className="mt-8 flex flex-col gap-4 rounded-xl border border-[#ff5870]/30 bg-[#ff5870]/10 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-[#ff5870]">
            <TriangleAlert size={18} />
          </span>
          <div>
            <p className="text-sm font-semibold text-[#ff5870]">Danger zone</p>
            <p className="mt-1 text-xs text-black/60 dark:text-white/60">
              Deleting your account is permanent and cannot be undone. All your data, matches, and messages will be
              lost forever.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsDeleteOpen(true)}
          className="flex shrink-0 items-center justify-center gap-2 rounded-md border border-[#ff5870] px-4 py-2.5 text-sm font-semibold text-[#ff5870] hover:bg-[#ff5870]/10"
        >
          <Trash2 size={15} />
          Delete Account
        </button>
      </div>

      {isDeleteOpen && (
        <div
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsDeleteOpen(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-account-title"
            onMouseDown={(event) => event.stopPropagation()}
            className="w-full max-w-sm rounded-2xl border border-[#ff5870]/60 bg-white p-6 text-center text-black shadow-2xl dark:bg-[#111] dark:text-white"
          >
            <span className="mx-auto flex size-12 items-center justify-center rounded-full border-2 border-[#ff5870]/50 bg-[#ff5870]/10 text-[#ff5870]">
              <TriangleAlert size={22} />
            </span>
            <h2 id="delete-account-title" className="mt-3 text-lg font-semibold">
              Delete your account?
            </h2>
            <p className="mt-1.5 text-sm text-black/60 dark:text-white/60">
              This is permanent. All your data, matches, and messages will be lost forever.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                className="h-11 rounded-md border border-black/20 text-sm font-semibold hover:bg-black/5 dark:border-white/25 dark:hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                className="h-11 rounded-md bg-[#ff5870] text-sm font-semibold text-white hover:opacity-90"
              >
                Delete Account
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function SectionHeading({
  icon: Icon,
  children,
  className = "",
}: {
  icon: typeof Mail;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={`flex items-center gap-2 text-sm font-semibold text-[#ff5870] ${className}`}>
      <Icon size={15} />
      {children}
    </h2>
  );
}
