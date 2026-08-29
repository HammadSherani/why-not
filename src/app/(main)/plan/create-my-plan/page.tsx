"use client";

import { useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import toast from "react-hot-toast";
import {
  CalendarDays,
  ChevronDown,
  Clock3,
  Eye,
  Lock,
  MapPin,
  Send,
  ShieldCheck,
  Upload,
  UserRound,
  Wallet,
  X,
} from "lucide-react";
import { categories } from "@/lib/categories";

const paymentOptions = ["Split 50/50", "I'll Pay", "You Pay", "Prefer not to say"];
const MAX_PHOTOS = 3;
const DESCRIPTION_LIMIT = 500;

export default function CreateMyPlanPage() {
  const [activeCategory, setActiveCategory] = useState("Dinner");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [publicArea, setPublicArea] = useState("");
  const [age, setAge] = useState("");
  const [paymentSplit, setPaymentSplit] = useState("Split 50/50");
  const [photos, setPhotos] = useState<string[]>([]);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handlePhotoSelect(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setPhotos((current) => [...current, URL.createObjectURL(file)].slice(0, MAX_PHOTOS));
  }

  function removePhoto(index: number) {
    setPhotos((current) => current.filter((_, i) => i !== index));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsReviewOpen(true);
  }

  function formatDate(value: string) {
    if (!value) return "Date TBD";
    return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  function formatTime(value: string) {
    if (!value) return "Time TBD";
    const [hours, minutes] = value.split(":").map(Number);
    const reference = new Date();
    reference.setHours(hours, minutes);
    return reference.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  }

  return (
    <div className="w-full px-6 pb-12 sm:px-10 lg:px-16 xl:px-24">
      <h1 className="text-3xl font-semibold">Create a plan</h1>
      <p className="mt-2 text-sm text-black/60 dark:text-white/60">Share your idea and invite someone to join.</p>

      <form onSubmit={handleSubmit} className="mt-8 max-w-4xl space-y-6">
        <Field label="Activity Category">
          <div className="flex flex-wrap gap-3">
            {categories.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                onClick={() => setActiveCategory(label)}
                className={`flex items-center gap-2 rounded-md border px-4 py-2.5 text-sm transition-colors ${
                  activeCategory === label
                    ? "border-[#ff5870] bg-[#ff5870] text-white"
                    : "border-black/10 bg-black/[0.03] text-black/70 hover:border-black/30 dark:border-white/20 dark:bg-white/[0.08] dark:text-white/75 dark:hover:border-white/50"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        </Field>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Plan title">
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Dinner at Casa Bella Madrid"
              className="h-12 w-full rounded-md border border-black/30 bg-transparent px-4 text-sm text-black placeholder-black/40 outline-none focus:border-[#ff6670] dark:border-white/50 dark:text-white dark:placeholder-white/50"
            />
          </Field>
          <Field label="Short Description">
            <div className="relative">
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value.slice(0, DESCRIPTION_LIMIT))}
                placeholder="Looking for company to enjoy authentic Italian cuisine together in a cozy and romantic setting."
                rows={2}
                className="w-full resize-none rounded-md border border-black/30 bg-transparent px-4 py-3 text-sm text-black placeholder-black/40 outline-none focus:border-[#ff6670] dark:border-white/50 dark:text-white dark:placeholder-white/50"
              />
              <span className="pointer-events-none absolute bottom-2 right-3 text-[11px] text-black/40 dark:text-white/40">
                {description.length} / {DESCRIPTION_LIMIT}
              </span>
            </div>
          </Field>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Date">
            <IconField icon={<CalendarDays size={17} />}>
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="w-full bg-transparent text-sm text-black outline-none [color-scheme:light] dark:text-white dark:[color-scheme:dark]"
              />
            </IconField>
          </Field>
          <Field label="Time">
            <IconField icon={<Clock3 size={17} />}>
              <input
                type="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                className="w-full bg-transparent text-sm text-black outline-none [color-scheme:light] dark:text-white dark:[color-scheme:dark]"
              />
            </IconField>
          </Field>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Venue Name / Private Location">
            <IconField icon={<MapPin size={17} />}>
              <input
                value={venue}
                onChange={(event) => setVenue(event.target.value)}
                placeholder="Casa Bella Madrid"
                className="w-full bg-transparent text-sm text-black placeholder-black/40 outline-none dark:text-white dark:placeholder-white/50"
              />
            </IconField>
          </Field>
          <Field label="Public Area (City)">
            <IconField icon={<MapPin size={17} />}>
              <input
                value={publicArea}
                onChange={(event) => setPublicArea(event.target.value)}
                placeholder="Madrid"
                className="w-full bg-transparent text-sm text-black placeholder-black/40 outline-none dark:text-white dark:placeholder-white/50"
              />
            </IconField>
          </Field>
        </div>

        <Field label="Your Age">
          <div className="relative">
            <UserRound
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/50"
              size={17}
            />
            <select
              value={age}
              onChange={(event) => setAge(event.target.value)}
              className="h-12 w-full appearance-none rounded-md border border-black/30 bg-transparent pl-11 pr-10 text-sm text-black outline-none focus:border-[#ff6670] dark:border-white/50 dark:text-white"
            >
              <option value="" disabled hidden className="bg-white dark:bg-[#111]">
                Your Age
              </option>
              {Array.from({ length: 63 }, (_, index) => index + 18).map((value) => (
                <option key={value} value={value} className="bg-white dark:bg-[#111]">
                  {value}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/50"
              size={15}
            />
          </div>
        </Field>

        <Field label="Payment Split">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {paymentOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setPaymentSplit(option)}
                className={`h-12 rounded-md border text-sm font-medium transition-colors ${
                  paymentSplit === option
                    ? "border-[#ff5870] bg-[#ff5870] text-white"
                    : "border-black/20 text-black/70 hover:border-black/50 dark:border-white/30 dark:text-white/75 dark:hover:border-white/60"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </Field>

        <Field label={`Plan Photos (up to ${MAX_PHOTOS})`}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {photos.map((photo, index) => (
              <div
                key={photo}
                className="group relative aspect-square overflow-hidden rounded-lg border border-black/10 dark:border-white/10"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo} alt={`Plan photo ${index + 1}`} className="h-full w-full object-cover" />
                <button
                  type="button"
                  aria-label="Remove photo"
                  onClick={() => removePhoto(index)}
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
                <Upload size={20} />
                <span className="text-xs">Upload a photo</span>
              </button>
            )}
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoSelect} className="hidden" />
        </Field>

        <button
          type="submit"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#ff5870] to-[#ff7651] text-sm font-semibold text-white hover:opacity-90"
        >
          <Send size={16} />
          Publish Plan
        </button>
      </form>

      {isReviewOpen && (
        <ReviewModal
          title={title || "Untitled Plan"}
          description={description || "No description provided."}
          date={formatDate(date)}
          time={formatTime(time)}
          location={publicArea || venue || "Location TBD"}
          payment={paymentSplit}
          image={photos[0] ?? "/assets/sign-up.jpeg"}
          onBack={() => setIsReviewOpen(false)}
          onConfirm={() => {
            setIsReviewOpen(false);
            toast.success("Plan published!");
          }}
        />
      )}
    </div>
  );
}

function ReviewModal({
  title,
  description,
  date,
  time,
  location,
  payment,
  image,
  onBack,
  onConfirm,
}: {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  payment: string;
  image: string;
  onBack: () => void;
  onConfirm: () => void;
}) {
  return (
    <div
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onBack();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-title"
        onMouseDown={(event) => event.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl border border-black/10 bg-white px-6 pb-6 pt-10 text-black shadow-2xl dark:border-white/15 dark:bg-[#0b0b0b] dark:text-white"
      >
        <span className="absolute left-1/2 top-0 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-r from-[#ff5870] to-[#ff7651] shadow-lg">
          <Send size={20} />
        </span>

        <h2 id="review-title" className="text-center text-xl font-semibold">
          Review &amp; Publish Your Plan
        </h2>
        <p className="mt-1 text-center text-sm text-black/60 dark:text-white/60">
          This is how your plan will appear to other users.
        </p>

        <div className="mt-6 flex items-start gap-2">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#ff5870]/20 text-[#ff5870]">
            <Eye size={13} />
          </span>
          <div>
            <p className="text-sm font-medium">Public Card Preview</p>
            <p className="text-xs text-black/50 dark:text-white/50">This information will be visible to other users.</p>
          </div>
        </div>

        <div className="mt-3 flex gap-3 rounded-lg border border-black/10 bg-black/[0.02] p-3 dark:border-white/10 dark:bg-white/[0.03]">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={title} className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold">{title}</h3>
            <p className="mt-1 line-clamp-2 text-xs text-black/60 dark:text-white/60">{description}</p>
            <div className="mt-2 space-y-1 text-xs text-black/70 dark:text-white/70">
              <p className="flex items-center gap-1.5">
                <CalendarDays size={12} /> {date}
              </p>
              <p className="flex items-center gap-1.5">
                <Clock3 size={12} /> {time}
              </p>
              <p className="flex items-center gap-1.5">
                <MapPin size={12} /> {location}
              </p>
              <p className="flex items-center gap-1.5">
                <Wallet size={12} /> {payment}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-3 rounded-lg border border-black/10 bg-black/[0.02] p-3 dark:border-white/10 dark:bg-white/[0.03]">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#4ade80]/15 text-[#4ade80]">
            <ShieldCheck size={17} />
          </span>
          <div className="flex-1">
            <p className="text-sm font-medium">Your privacy is protected</p>
            <p className="mt-0.5 text-xs text-black/50 dark:text-white/50">
              Your exact address and contact details stay hidden until you both agree to meet.
            </p>
          </div>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#ff7651] to-[#ff5870]">
            <Lock size={16} className="text-white" />
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onBack}
            className="h-11 rounded-md border border-black/20 text-sm font-semibold text-black hover:bg-black/5 dark:border-white/25 dark:text-white dark:hover:bg-white/10"
          >
            Back
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="h-11 rounded-md bg-gradient-to-r from-[#ff5870] to-[#ff7651] text-sm font-semibold text-white hover:opacity-90"
          >
            Confirm &amp; Go Live
          </button>
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-black dark:text-white">{label}</label>
      {children}
    </div>
  );
}

function IconField({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="flex h-12 items-center gap-3 rounded-md border border-black/30 px-4 focus-within:border-[#ff6670] dark:border-white/50">
      <span className="text-black/40 dark:text-white/50">{icon}</span>
      {children}
    </div>
  );
}
