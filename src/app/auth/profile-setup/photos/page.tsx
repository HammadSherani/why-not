"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Crop, Plus, RefreshCw, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent } from "react";

const defaultGallery = [
  "/assets/login.jpeg",
  "/assets/sign-up.jpeg",
  "/assets/otp.jpeg",
  "/assets/WhatsApp Image 2026-08-10 at 3.26.41 PM (3).jpeg",
];

export default function ProfilePhotosPage() {
  const [profilePhoto, setProfilePhoto] = useState("/assets/create-password.jpeg");
  const [gallery, setGallery] = useState(defaultGallery);
  const router = useRouter();

  function replaceProfilePhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      setProfilePhoto(URL.createObjectURL(file));
    }
  }

  function addGalleryPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file && gallery.length < 5) {
      setGallery((photos) => [...photos, URL.createObjectURL(file)]);
    }
  }

  function removeProfilePhoto() {
    setProfilePhoto("");
  }

  function selectGalleryPhoto(photo: string) {
    setProfilePhoto(photo);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/auth/profile-setup/verify-identity");
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
          <span>Step 2</span>
          <span>2 of 3</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#dedede]">
          <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-[#ff5870] to-[#ff7651]" />
        </div>

        <div className="mt-5">
          <h1 className="text-xl font-semibold text-[#202020] sm:text-2xl">
            Add Your Photos
          </h1>
          <p className="mt-1 text-xs text-[#666]">
            Upload a profile photo and pictures that represent you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-5">
          <section className="rounded-lg border border-[#e3e3e3] p-4 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-full border-2 border-[#ff5870] bg-[#f2f2f2] sm:size-20">
                  {profilePhoto ? (
                    <Image
                      src={profilePhoto}
                      alt="Profile photo"
                      fill
                      unoptimized={profilePhoto.startsWith("blob:")}
                      className="object-cover"
                    />
                  ) : (
                    <span className="flex size-full items-center justify-center text-[10px] text-[#888]">
                      No photo
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#303030]">Alex Morgan</p>
                  <p className="mt-0.5 text-[11px] text-[#555]">Main Profile Photo</p>
                  <p className="mt-1 text-[10px] text-[#888]">Uploaded on</p>
                  <p className="text-[10px] text-[#888]">01 Aug 2026, 10:30 AM</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 sm:justify-end">
                <button
                  type="button"
                  className="inline-flex h-9 items-center gap-1.5 rounded-md border border-[#cfcfcf] px-3 text-xs text-[#444] hover:border-[#ff6670] hover:text-[#ff5870]"
                >
                  <Crop size={14} />
                  Crop
                </button>
                <label className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-md border border-[#cfcfcf] px-3 text-xs text-[#444] hover:border-[#ff6670] hover:text-[#ff5870]">
                  <RefreshCw size={14} />
                  Replace
                  <input
                    type="file"
                    accept="image/*"
                    onChange={replaceProfilePhoto}
                    className="sr-only"
                  />
                </label>
                <button
                  type="button"
                  onClick={removeProfilePhoto}
                  className="inline-flex h-9 items-center gap-1.5 rounded-md border border-[#cfcfcf] px-3 text-xs text-[#444] hover:border-[#ff6670] hover:text-[#ff5870]"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          </section>

          <section className="mt-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xs font-semibold text-[#303030]">
                  Gallery Photos ({gallery.length}/5)
                </h2>
                <p className="mt-1 text-[10px] text-[#888]">Add up to 5 photos</p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-6">
              {gallery.map((photo, index) => (
                <button
                  key={`${photo}-${index}`}
                  type="button"
                  onClick={() => selectGalleryPhoto(photo)}
                  aria-label={`Set gallery photo ${index + 1} as profile photo`}
                  className={`relative aspect-square overflow-hidden rounded-lg bg-[#ededed] ${
                    profilePhoto === photo ? "ring-2 ring-[#ff5870] ring-offset-2" : ""
                  }`}
                >
                  <Image
                    src={photo}
                    alt={`Gallery photo ${index + 1}`}
                    fill
                    unoptimized={photo.startsWith("blob:")}
                    className="object-cover"
                  />
                </button>
              ))}

              {Array.from({ length: gallery.length < 5 ? Math.min(2, 5 - gallery.length) : 0 }).map(
                (_, index) => (
                  <label
                    key={`add-photo-${index}`}
                    className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#bdbdbd] text-[#666] transition-colors hover:border-[#ff6670] hover:text-[#ff5870]"
                  >
                    <Plus size={18} />
                    <span className="mt-1 text-[10px]">Add Photo</span>
                    <span className="mt-0.5 text-[8px] text-[#999]">JPG, PNG Max 5MB</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={addGalleryPhoto}
                      className="sr-only"
                    />
                  </label>
                ),
              )}
            </div>
          </section>

          <button
            type="submit"
            onClick={() => router.push("/auth/profile-setup/verify-identity")}
            className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#ff5870] to-[#ff7651] text-xs font-semibold text-white transition-opacity hover:opacity-90"
          >
            Save & continue
            <ArrowRight size={14} />
          </button>
        </form>
      </div>
    </main>
  );
}
