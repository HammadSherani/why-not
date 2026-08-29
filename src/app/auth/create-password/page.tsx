"use client";

import Image from "next/image";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function CreatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    router.push("/auth/profile-setup");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#111827]">
      <div className="relative min-h-screen w-full overflow-hidden rounded-3xl">
        <Image
          src="/assets/create-password.jpeg"
          alt="Couple sitting beside a lake at sunset"
          fill
          priority
          sizes="100vw"
          className="rounded-3xl object-cover"
        />

        <div className="absolute inset-0 bg-black/10" />

        <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8 md:justify-end md:pr-[5%]">
          <div className="h-[430px] w-full max-w-sm rounded-2xl border border-white/20 bg-black/45 p-6 shadow-2xl backdrop-blur-xs">
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
              Create new password
            </h1>
            <p className="mt-2 text-center text-xs text-white/85">
              Create a strong password to keep your account secure.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
              <label className="flex h-11 items-center gap-3 rounded-lg border border-white/70 bg-black/15 px-3">
                <Lock size={16} className="shrink-0 text-white/85" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setMessage("");
                  }}
                  placeholder="Password"
                  aria-label="Password"
                  minLength={8}
                  required
                  className="w-full bg-transparent text-sm text-white placeholder-white/70 outline-none"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="shrink-0 text-white/80 transition-colors hover:text-white"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </label>

              <label className="flex h-11 items-center gap-3 rounded-lg border border-white/70 bg-black/15 px-3">
                <Lock size={16} className="shrink-0 text-white/85" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                    setMessage("");
                  }}
                  placeholder="Confirm Password"
                  aria-label="Confirm Password"
                  minLength={8}
                  required
                  className="w-full bg-transparent text-sm text-white placeholder-white/70 outline-none"
                />
                <button
                  type="button"
                  aria-label={
                    showConfirmPassword ? "Hide confirm password" : "Show confirm password"
                  }
                  onClick={() => setShowConfirmPassword((visible) => !visible)}
                  className="shrink-0 text-white/80 transition-colors hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </label>

              <button
                type="submit"
                className="mt-2 h-11 w-full rounded-lg bg-gradient-to-r from-[#ff5870] to-[#ff7651] text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Continue
              </button>
            </form>

            {message && (
              <p className="mt-4 text-center text-xs text-white/85" role="status">
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
