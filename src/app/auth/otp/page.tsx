"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useRef, useState, type ClipboardEvent, type FormEvent, type KeyboardEvent } from "react";

const OTP_LENGTH = 6;

export default function OtpPage() {
  return (
    <Suspense>
      <OtpForm />
    </Suspense>
  );
}

function OtpForm() {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSignupFlow = searchParams.get("flow") === "signup";

  function updateDigit(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    const nextOtp = [...otp];
    nextOtp[index] = digit;
    setOtp(nextOtp);

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const pastedOtp = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH)
      .split("");
    const nextOtp = Array(OTP_LENGTH).fill("");

    pastedOtp.forEach((digit, index) => {
      nextOtp[index] = digit;
    });

    setOtp(nextOtp);
    inputRefs.current[Math.min(pastedOtp.length, OTP_LENGTH - 1)]?.focus();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (otp.every(Boolean)) {
      router.push(isSignupFlow ? "/auth/profile-setup" : "/auth/create-password");
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#111827]">
      <div className="relative min-h-screen w-full overflow-hidden rounded-3xl">
        <Image
          src="/assets/forgot-screen.jpeg"
          alt="Couple enjoying a city rooftop at night"
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
              Email OTP
            </h1>
            <p className="mt-2 text-center text-xs text-white/85">
              Enter the 6-digit code sent to your email
            </p>

            <form onSubmit={handleSubmit} className="mt-7">
              <p className="text-center text-xs text-white/80">Enter Code</p>

              <div className="mt-3 flex justify-center gap-1.5 sm:gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(element) => {
                      inputRefs.current[index] = element;
                    }}
                    value={digit}
                    onChange={(event) => updateDigit(index, event.target.value)}
                    onKeyDown={(event) => handleKeyDown(index, event)}
                    onPaste={handlePaste}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    aria-label={`OTP digit ${index + 1}`}
                    className="size-9 rounded-md border border-white/70 bg-black/15 text-center text-lg text-white outline-none transition focus:border-[#ff6670] focus:ring-1 focus:ring-[#ff6670] sm:size-10"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="mt-7 h-11 w-full rounded-lg bg-gradient-to-r from-[#ff5870] to-[#ff7651] text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Verify
              </button>
            </form>

            <p className="mt-5 text-center text-xs text-white/80">
              Didn&apos;t receive OTP?{" "}
              <button
                type="button"
                onClick={() => setOtp(Array(OTP_LENGTH).fill(""))}
                className="font-semibold text-white hover:underline"
              >
                Resend OTP
              </button>
            </p>

          </div>
        </div>
      </div>
    </main>
  );
}
