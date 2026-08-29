"use client";

import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import toast from "react-hot-toast";
import { Clapperboard, Dumbbell, Gamepad2, Music2, Plane, Plus, Send, X } from "lucide-react";

const BIO_LIMIT = 500;
const MAX_PHOTOS = 6;

const defaultBio =
  "Love meeting new people, exploring hidden gems around the city, and creating unforgettable memories. Coffee lover, travel enthusiast, foodie at heart, and always up for live music and new adventures.";

const startingPhotos = [
  "/assets/sign-up.jpeg",
  "/assets/forgot-screen.jpeg",
  "/assets/WhatsApp Image 2026-08-10 at 3.26.41 PM (3).jpeg",
  "/assets/sign-up.jpeg",
  "/assets/forgot-screen.jpeg",
];

const interestOptions = [
  { label: "Gym", icon: Dumbbell },
  { label: "Games", icon: Gamepad2 },
  { label: "Travel", icon: Plane },
  { label: "Movie", icon: Clapperboard },
  { label: "Music", icon: Music2 },
];

export default function EditProfilePage() {
  const [bio, setBio] = useState(defaultBio);
  const [photos, setPhotos] = useState(startingPhotos.map((src, index) => ({ id: index, src })));
  const [interests, setInterests] = useState<string[]>(["Travel", "Music"]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nextPhotoId = useRef(startingPhotos.length);
  const dragIndex = useRef<number | null>(null);

  function toggleInterest(label: string) {
    setInterests((current) => (current.includes(label) ? current.filter((item) => item !== label) : [...current, label]));
  }

  function removePhoto(id: number) {
    setPhotos((current) => current.filter((photo) => photo.id !== id));
  }

  function handleAddPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setPhotos((current) => [...current, { id: nextPhotoId.current++, src: URL.createObjectURL(file) }]);
  }

  function handleDragStart(index: number) {
    dragIndex.current = index;
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function handleDrop(index: number) {
    const from = dragIndex.current;
    dragIndex.current = null;
    if (from === null || from === index) return;
    setPhotos((current) => {
      const next = [...current];
      const [moved] = next.splice(from, 1);
      next.splice(index, 0, moved);
      return next;
    });
  }

  function handleSave() {
    toast.success("Profile updated!");
  }

  return (
    <div className="w-full px-6 pb-12 sm:px-10 lg:px-16 xl:px-24">
      <h1 className="text-3xl font-semibold">Edit Profile</h1>
      <p className="mt-2 text-sm text-black/60 dark:text-white/60">
        Update your personal information and showcase your best self.
      </p>

      <section className="mt-6 rounded-xl border border-black/10 bg-black/[0.02] p-5 dark:border-white/10 dark:bg-[#101010]">
        <h2 className="text-lg font-semibold">Bio</h2>
        <p className="mt-1 text-sm text-black/60 dark:text-white/60">Tell people about yourself</p>

        <textarea
          value={bio}
          onChange={(event) => setBio(event.target.value.slice(0, BIO_LIMIT))}
          rows={3}
          className="mt-4 w-full resize-none rounded-lg border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-[#ff6670] dark:border-white/15 dark:bg-white/[0.03]"
        />

        <div className="mt-2 flex items-center justify-between text-xs text-black/40 dark:text-white/40">
          <span>Share what makes you unique, your passions, and what you&apos;re looking for.</span>
          <span className="shrink-0">
            {bio.length}/{BIO_LIMIT}
          </span>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">Photos</h2>
        <p className="mt-1 text-sm text-black/60 dark:text-white/60">
          Drag to reorder your photos. The first photo is your main profile picture.
        </p>

        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
              className="group relative aspect-square cursor-grab overflow-hidden rounded-lg border border-black/10 active:cursor-grabbing dark:border-white/10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.src} alt={`Profile photo ${index + 1}`} className="h-full w-full object-cover" draggable={false} />
              <button
                type="button"
                aria-label="Remove photo"
                onClick={() => removePhoto(photo.id)}
                className="absolute right-1.5 top-1.5 flex size-6 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X size={13} />
              </button>
            </div>
          ))}

          {photos.length < MAX_PHOTOS && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-black/25 text-black/50 hover:border-black/50 hover:text-black dark:border-white/40 dark:text-white/60 dark:hover:border-white/70 dark:hover:text-white"
            >
              <Plus size={20} />
              <span className="text-xs">Add Photo</span>
            </button>
          )}
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAddPhoto} className="hidden" />
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">Interests</h2>
        <p className="mt-1 text-sm text-black/60 dark:text-white/60">Choose topics you&apos;re passionate about.</p>

        <div className="mt-4 flex flex-wrap gap-3">
          {interestOptions.map(({ label, icon: Icon }) => {
            const selected = interests.includes(label);
            return (
              <button
                key={label}
                type="button"
                onClick={() => toggleInterest(label)}
                className={`flex items-center gap-2 rounded-md border px-4 py-2.5 text-sm transition-colors ${
                  selected
                    ? "border-[#ff5870] bg-[#ff5870] text-white"
                    : "border-black/15 text-black/70 hover:border-black/30 dark:border-white/20 dark:text-white/75 dark:hover:border-white/50"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            );
          })}
        </div>
      </section>

      <button
        type="button"
        onClick={handleSave}
        className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#ff5870] to-[#ff7651] text-sm font-semibold text-white hover:opacity-90"
      >
        <Send size={16} />
        Save Changes
      </button>
    </div>
  );
}
