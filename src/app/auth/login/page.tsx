"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-[#111827]">
      <div className="relative min-h-screen w-full overflow-hidden rounded-3xl">
        <Image
          src="/assets/login.jpeg"
          alt="Mountain sunset background"
          fill
          priority
          className="rounded-3xl object-cover"
        />

        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 flex min-h-screen items-center justify-center px-4 md:justify-end md:pr-[6%]">
          <div className="h-[460px] w-full max-w-sm rounded-2xl border border-white/20 bg-white/[0.08] p-6 shadow-2xl backdrop-blur-xl">
            <div className="mb-3 flex justify-center">
              <Image
                src="/assets/logo.png"
                alt="WhyNot"
                width={112}
                height={72}
                className="h-auto w-20"
              />
            </div>

            <h1 className="text-center text-2xl font-semibold text-white">
              Login to your account
            </h1>
            <p className="mt-1 text-center text-sm text-white/75">
              Access your dashboard to manage orders and menu.
            </p>

            <div className="mt-5 space-y-3">
              <label className="flex h-10 items-center gap-2 rounded-lg border border-white/35 bg-white/[0.03] px-3">
                <Mail size={16} className="shrink-0 text-white/75" />
                <input
                  type="email"
                  placeholder="Email or user name"
                  className="w-full bg-transparent text-sm text-white placeholder-white/60 outline-none"
                />
              </label>

              <label className="flex h-10 items-center gap-2 rounded-lg border border-white/35 bg-white/[0.03] px-3">
                <Lock size={16} className="shrink-0 text-white/75" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  className="w-full bg-transparent text-sm text-white placeholder-white/60 outline-none"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="shrink-0 text-white/75 transition-colors hover:text-white"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </label>

              <div className="flex items-center justify-between text-xs text-white/80">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="size-3.5 accent-[#ff6670]"
                  />
                  Remember me
                </label>
                <Link href="/auth/forgot-password" className="font-semibold text-white hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <Link
                href="/discover"
                className="mt-1 flex h-11 w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#ff5870] to-[#ff7651] text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Login
              </Link>
            </div>

            <p className="mt-3 text-center text-sm text-white/80">
              Don&apos;t have an account?{" "}
              <button type="button" className="font-semibold text-white hover:underline">
                Join us today.
              </button>
            </p>

            <div className="mt-4 flex justify-center gap-2">
              <button
                type="button"
                className="flex h-9 items-center gap-2 rounded-lg border border-white/40 px-3 text-sm text-white transition-colors hover:bg-white/10"
              >
                <span className="text-base font-bold text-[#4285f4]">G</span>
                Google
              </button>
              <button
                type="button"
                className="flex h-9 items-center gap-2 rounded-lg border border-white/40 px-3 text-sm text-white transition-colors hover:bg-white/10"
              >
                <span aria-hidden="true" className="text-base leading-none">
                  
                </span>
                Apple
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
