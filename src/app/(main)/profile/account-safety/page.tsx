"use client";

import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { KeyRound, ShieldCheck, UserX } from "lucide-react";
import SettingToggleRow from "@/components/ui/SettingToggleRow";

interface BlockedUser {
  id: number;
  name: string;
  gradient: string;
}

const initialBlockedUsers: BlockedUser[] = [{ id: 1, name: "Sarah Johnson", gradient: "from-[#ff9472] to-[#ff5870]" }];

export default function AccountSafetyPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [blockedUsers, setBlockedUsers] = useState(initialBlockedUsers);

  function handleUpdatePassword(event: FormEvent) {
    event.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    toast.success("Password updated");
  }

  function handleUnblock(user: BlockedUser) {
    setBlockedUsers((current) => current.filter((item) => item.id !== user.id));
    toast.success(`${user.name} has been unblocked`);
  }

  return (
    <div className="w-full px-6 pb-12 sm:px-10 lg:px-16 xl:px-24">
      <h1 className="text-3xl font-semibold">Account Safety</h1>
      <p className="mt-2 text-sm text-black/60 dark:text-white/60">
        Manage your password, security, and blocked users.
      </p>

      <section className="mt-6 rounded-xl border border-black/10 bg-black/[0.02] p-5 dark:border-white/10 dark:bg-[#101010]">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-[#ff5870]">
          <KeyRound size={15} /> Password
        </h2>

        <form onSubmit={handleUpdatePassword} className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="mb-2 block text-sm font-medium">Current Password</span>
            <input
              type="password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              className="h-11 w-full rounded-md border border-black/15 bg-white px-4 text-sm outline-none focus:border-[#ff6670] dark:border-white/15 dark:bg-white/[0.03]"
            />
          </label>
          <label>
            <span className="mb-2 block text-sm font-medium">New Password</span>
            <input
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              className="h-11 w-full rounded-md border border-black/15 bg-white px-4 text-sm outline-none focus:border-[#ff6670] dark:border-white/15 dark:bg-white/[0.03]"
            />
          </label>
          <label>
            <span className="mb-2 block text-sm font-medium">Confirm New Password</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="h-11 w-full rounded-md border border-black/15 bg-white px-4 text-sm outline-none focus:border-[#ff6670] dark:border-white/15 dark:bg-white/[0.03]"
            />
          </label>
          <button
            type="submit"
            className="h-11 rounded-md bg-gradient-to-r from-[#ff5870] to-[#ff7651] text-sm font-semibold text-white hover:opacity-90 sm:col-span-2 sm:w-fit sm:px-6"
          >
            Update Password
          </button>
        </form>
      </section>

      {/* <h2 className="mt-8 flex items-center gap-2 text-sm font-semibold text-[#ff5870]">
        <ShieldCheck size={15} /> Security
      </h2>
      <div className="mt-3">
        <SettingToggleRow
          icon={ShieldCheck}
          title="Two-Factor Authentication"
          description="Add an extra layer of security by requiring a verification code at login."
          checked={twoFactorEnabled}
          onChange={setTwoFactorEnabled}
        />
      </div> */}

      <h2 className="mt-8 flex items-center gap-2 text-sm font-semibold text-[#ff5870]">
        <UserX size={15} /> Blocked Users
      </h2>
      <div className="mt-3 space-y-3">
        {blockedUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-4 rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-[#111]"
          >
            <span
              className={`flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white ${user.gradient}`}
            >
              {user.name.charAt(0)}
            </span>
            <p className="min-w-0 flex-1 truncate text-sm font-semibold">{user.name}</p>
            <button
              type="button"
              onClick={() => handleUnblock(user)}
              className="shrink-0 rounded-md border border-black/20 px-4 py-2 text-sm font-semibold hover:bg-black/5 dark:border-white/25 dark:hover:bg-white/10"
            >
              Unblock
            </button>
          </div>
        ))}

        {blockedUsers.length === 0 && (
          <p className="rounded-xl border border-black/10 bg-white p-6 text-center text-sm text-black/50 dark:border-white/10 dark:bg-[#111] dark:text-white/50">
            You haven&apos;t blocked anyone.
          </p>
        )}
      </div>
    </div>
  );
}
