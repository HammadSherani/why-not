"use client";

import Image from "next/image";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function ForgotPasswordPage() {
  const [contact, setContact] = useState("");
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (contact.trim()) {
      router.push("/auth/otp");
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#111827]">
      <div className="relative min-h-screen w-full overflow-hidden rounded-3xl">
        <Image
          src="/assets/forgot-screen.jpeg"
          alt="Couple walking through a rainy city street"
          fill
          priority
          sizes="100vw"
          className="rounded-3xl object-cover"
        />

        <div className="absolute inset-0 bg-black/10" />

        <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8 md:justify-end md:pr-[5%]">
          <div className="h-[430px] w-full max-w-sm rounded-2xl border border-white/20 bg-black/45 p-6 shadow-2xl backdrop-blur-xs">
            <div className="mb-4 flex justify-center">
              <Image
                src="/assets/logo.png"
                alt="WhyNot"
                width={112}
                height={72}
                className="h-auto w-20"
              />
            </div>

            <h1 className="text-center text-3xl font-semibold text-white">
              Forgot Password
            </h1>
            <p className="mt-3 text-center text-sm text-white/85">
              Enter your email to receive a link to reset your password
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <label className="flex h-14 items-center gap-3 rounded-xl border border-white/70 bg-black/15 px-4">
                <Mail size={18} className="shrink-0 text-white" />
                <input
                  type="text"
                  value={contact}
                  onChange={(event) => {
                    setContact(event.target.value);
                  }}
                  placeholder="Email or Phone"
                  aria-label="Email or Phone"
                  required
                  className="w-full bg-transparent text-sm text-white placeholder-white/75 outline-none"
                />
              </label>

              <button
                type="submit"
                className="h-14 w-full rounded-xl bg-gradient-to-r from-[#ff5870] to-[#ff7651] text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Continue
              </button>
            </form>

          </div>
        </div>
      </div>
    </main>
  );
}
