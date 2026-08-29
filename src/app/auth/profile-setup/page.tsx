"use client";

import { ArrowRight, Link2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

const socialLinks = ["My Links", "Instagram", "TikTok", "Spotify", "Discord"];

export default function ProfileSetupPage() {
  const [bio, setBio] = useState("");
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/auth/profile-setup/photos");
  }

  return (
    <main className="min-h-screen bg-[#d0d0d0] px-3 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-3xl rounded-xl bg-white p-5 shadow-sm sm:p-8">
        <div className="flex items-center justify-between text-[11px] font-medium text-[#303030]">
          <span>Step 1</span>
          <span>1 of 3</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#dedede]">
          <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-[#ff5870] to-[#ff7651]" />
        </div>

        <div className="mt-4">
          <h1 className="text-xl font-semibold text-[#202020] sm:text-2xl">
            Tell us about yourself
          </h1>
          <p className="mt-1 text-xs text-[#666]">
            Let&apos;s start with the basics so people can get to know you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="First name">
              <input
                name="firstName"
                placeholder="Enter your first name"
                required
                className="profile-input"
              />
            </Field>
            <Field label="Last Name">
              <input
                name="lastName"
                placeholder="Enter your last name"
                required
                className="profile-input"
              />
            </Field>
            <Field label="Gender">
              <select name="gender" defaultValue="" required className="profile-input">
                <option value="" disabled>
                  Select your gender
                </option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
                <option>Prefer not to say</option>
              </select>
            </Field>
            <Field label="User Name">
              <input
                name="username"
                placeholder="Enter your username"
                required
                className="profile-input"
              />
            </Field>
          </div>

          <Field
            label="Short bio"
            hint={`${bio.length}/160`}
            description="Tell people a little about yourself."
          >
            <textarea
              name="bio"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              maxLength={160}
              placeholder="Write a short bio"
              className="profile-input min-h-9 resize-none py-2"
            />
          </Field>

          <Field label="Primary location">
            <input
              name="location"
              placeholder="Enter your location"
              required
              className="profile-input"
            />
          </Field>

          <Field label="Interest" description="Choose what you are interested in.">
            <select name="interest" defaultValue="" required className="profile-input">
              <option value="" disabled>
                Select an interest
              </option>
              <option>Technology</option>
              <option>Music</option>
              <option>Travel</option>
              <option>Sports</option>
              <option>Art &amp; Design</option>
            </select>
          </Field>

          <div className="flex flex-wrap gap-2 pt-1">
            {socialLinks.map((link) => (
              <button
                key={link}
                type="button"
                className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[#d5d5d5] px-2.5 text-[11px] text-[#555] transition-colors hover:border-[#ff6670] hover:text-[#ff5870]"
              >
                <Link2 size={12} />
                {link}
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#ff5870] to-[#ff7651] text-xs font-semibold text-white transition-opacity hover:opacity-90"
          >
            Next Step
            <ArrowRight size={14} />
          </button>
        </form>
      </div>
    </main>
  );
}

function Field({
  label,
  hint,
  description,
  children,
}: {
  label: string;
  hint?: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-center justify-between text-[10px] font-medium text-[#303030]">
        <span>{label}</span>
        {hint && <span className="font-normal text-[#888]">{hint}</span>}
      </span>
      {description && <span className="mt-0.5 block text-[9px] text-[#999]">{description}</span>}
      <span className="mt-1 block">{children}</span>
    </label>
  );
}
