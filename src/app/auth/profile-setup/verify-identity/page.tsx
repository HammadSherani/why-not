"use client";

import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  ShieldCheck,
  Upload,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent } from "react";

export default function VerifyIdentityPage() {
  const [selfie, setSelfie] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();

  function handleSelfieUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      setSelfie(URL.createObjectURL(file));
      setStatus("");
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (selfie) {
      router.push("/auth/profile-setup/complete");
      return;
    }

    setStatus("Please upload a selfie first.");
  }

  return (
    <main className="min-h-screen bg-[#d0d0d0] px-3 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white p-5 shadow-sm sm:p-9">
        <button
          type="button"
          aria-label="Go back"
          className="mb-3 flex size-7 items-center justify-center rounded-full bg-[#ff5870] text-white transition-opacity hover:opacity-90"
        >
          <ArrowLeft size={15} />
        </button>

        <div className="flex items-center justify-between text-[11px] font-medium text-[#303030]">
          <span>Step 3</span>
          <span>3 of 3</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#dedede]">
          <div className="h-full w-full rounded-full bg-gradient-to-r from-[#ff5870] to-[#ff7651]" />
        </div>

        <div className="mt-5">
          <h1 className="text-xl font-semibold text-[#202020] sm:text-2xl">
            Verify your identity
          </h1>
          <p className="mt-1 max-w-xl text-xs text-[#666]">
            A quick selfie helps keep Why Not? safe and builds trust across the community.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-5">
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden rounded-lg bg-[#fff1ef] p-6">
                {selfie ? (
                  <Image
                    src={selfie}
                    alt="Uploaded selfie"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <>
                    <div className="absolute inset-x-[28%] inset-y-[4%] rounded-[50%] border border-dashed border-[#ff7580]" />
                    <div className="absolute left-[17%] top-3 h-5 w-6 border-l-2 border-t-2 border-[#888]" />
                    <div className="absolute right-[17%] top-3 h-5 w-6 border-r-2 border-t-2 border-[#888]" />
                    <div className="absolute bottom-3 left-[17%] h-5 w-6 border-b-2 border-l-2 border-[#888]" />
                    <div className="absolute bottom-3 right-[17%] h-5 w-6 border-b-2 border-r-2 border-[#888]" />
                    <div className="z-10 flex flex-col items-center text-center text-[10px] text-[#888]">
                      <Camera size={22} strokeWidth={1.5} />
                      <span className="mt-2">Position Your Face</span>
                      <span>inside your frame</span>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <label className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#ff5870] to-[#ff7651] text-xs font-semibold text-white transition-opacity hover:opacity-90">
                  <Camera size={14} />
                  Open Camera
                  <input
                    type="file"
                    accept="image/*"
                    capture="user"
                    onChange={handleSelfieUpload}
                    className="sr-only"
                  />
                </label>
                <label className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md border border-[#cfcfcf] text-xs font-medium text-[#444] transition-colors hover:border-[#ff6670] hover:text-[#ff5870]">
                  <Upload size={14} />
                  Upload from Gallery
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSelfieUpload}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <div className="rounded-lg bg-[#fafafa] p-4">
              <h2 className="text-xs font-semibold text-[#303030]">Before you take your selfie</h2>
              <div className="mt-3 flex items-end justify-between border-b border-[#ddd] pb-3">
                {[1, 2, 3, 4].map((faceNumber) => (
                  <div key={faceNumber} className="relative flex size-16 items-center justify-center sm:size-20">
                    <Image
                      src={`/assets/face-images/${faceNumber}.png`}
                      alt={`Selfie example ${faceNumber}`}
                      width={100}
                      height={100}
                      className="size-full object-contain"
                    />
                  </div>
                ))}
              </div>

              <h2 className="mt-4 text-xs font-semibold text-[#303030]">Reference Pose</h2>
              <div className="relative mt-2 flex min-h-[105px] items-center justify-center overflow-hidden rounded-md bg-white">
                <Image
                  src="/assets/face-images/5.png"
                  alt="Reference selfie pose"
                  width={180}
                  height={180}
                  className="h-40 w-40 object-contain"
                />
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-center gap-2 rounded-md bg-[#ff8b78] px-3 py-2 text-center text-[10px] text-white">
            <ShieldCheck size={14} />
            Your selfie is used for verification only.
          </div>

          <button
            type="submit"
            className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#ff5870] to-[#ff7651] text-xs font-semibold text-white transition-opacity hover:opacity-90"
          >
            Submit For Verification
            <ArrowRight size={14} />
          </button>

          <button
            type="button"
            onClick={() => router.push("/auth/profile-setup/complete")}
            className="mt-3 h-10 w-full rounded-md border border-[#cfcfcf] text-xs font-medium text-[#444] transition-colors hover:border-[#ff6670] hover:text-[#ff5870]"
          >
            Skip
          </button>

          {status && (
            <p className="mt-3 text-center text-xs text-[#666]" role="status">
              {status}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
