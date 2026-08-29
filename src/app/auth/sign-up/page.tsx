import Image from "next/image";
import Link from "next/link";
import { User, Mail, Phone, Lock } from "lucide-react";
import InputField from "@/components/ui/InputField";

// Static UI only — no form logic/validation/state yet.

export default function SignupCard() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden rounded-3xl">
      {/* Background image */}
      <Image
        src="/assets/sign-up.jpeg"
        alt="Background"
        fill
        priority
        className="object-cover"
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Card wrapper - positioned right on desktop, centered on mobile */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 md:justify-end md:pr-24">
        <div className="h-[550px] w-full max-w-sm rounded-2xl border border-white/20 bg-white/[0.08] p-5 backdrop-blur-xl shadow-2xl">
          {/* Logo */}
          <div className="mb-3 flex justify-center">
            <div className="flex items-center gap-2">
              <Image
                src="/assets/logo.png"
                alt="WhyNot"
                width={112}
                height={72}
                className="h-auto w-20"
              />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-center text-2xl font-semibold text-white">
            Create an Account
          </h1>
          <p className="mt-1 text-center text-sm text-white/75">
            Create your account to control your dashboard and menu
          </p>

          {/* Form */}
          <div className="mt-4 space-y-2">
            <InputField icon={<User size={16} />} placeholder="First name" />
            <InputField icon={<User size={16} />} placeholder="Last name" />
            <InputField icon={<Mail size={16} />} placeholder="Email" type="email" />
            <InputField icon={<Phone size={16} />} placeholder="Mobile Number" type="tel" />
            <InputField icon={<Lock size={16} />} placeholder="Password" type="password" />

            <Link
              href="/discover"
              className="mt-1 block w-full rounded-lg bg-gradient-to-r from-[#ff5870] to-[#ff7651] py-2.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Sign Up
            </Link>
          </div>

          {/* Footer */}
          <p className="mt-3 text-center text-sm text-white/70">
            Already have an account?{" "}
            <span className="cursor-pointer font-semibold text-white underline">
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

