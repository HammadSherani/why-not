"use client";

import Image from "next/image";
import Link from "next/link";
import { Dancing_Script } from "next/font/google";
import { useParams } from "next/navigation";
import { useState, type ComponentType } from "react";
import {
  ArrowLeft,
  ArrowLeftRight,
  BadgeCheck,
  CheckCircle2,
  Clock3,
  Eye,
  Heart,
  MapPin,
  Shirt,
  Sparkles,
  UserRound,
  Utensils,
} from "lucide-react";
import { getMyPlan } from "../data";

const scriptFont = Dancing_Script({ subsets: ["latin"], weight: "700" });

const stats = [
  { label: "Views", value: 28, icon: Eye, iconClass: "bg-[#3d3a86]/15 text-[#5e59c9] dark:bg-[#3d3a86]/50 dark:text-[#a5a3ff]" },
  { label: "Like", value: 55, icon: Heart, iconClass: "bg-[#ff6b81]/15 text-[#d9385a] dark:bg-[#5c1f2e]/60 dark:text-[#ff6b81]" },
  { label: "Join Request", value: 18, icon: UserRound, iconClass: "bg-[#ffb37a]/20 text-[#b25c1a] dark:bg-[#5c3323]/60 dark:text-[#ffb37a]" },
  { label: "Accepted", value: 3, icon: CheckCircle2, iconClass: "bg-[#4ade80]/15 text-[#1f9d5c] dark:bg-[#1f4a34]/60 dark:text-[#4ade80]" },
];

interface Response {
  id: number;
  name: string;
  age: number;
  location: string;
  message: string;
}

const initialResponses: Response[] = [
  {
    id: 1,
    name: "Lucía",
    age: 26,
    location: "Madrid, Spain",
    message: "Hi Sofia! I'd love to join. I enjoy Italian food and meeting new people.",
  },
  {
    id: 2,
    name: "Lucía",
    age: 26,
    location: "Madrid, Spain",
    message: "Hi Sofia! I'd love to join. I enjoy Italian food and meeting new people.",
  },
  {
    id: 3,
    name: "Lucía",
    age: 26,
    location: "Madrid, Spain",
    message: "Hi Sofia! I'd love to join. I enjoy Italian food and meeting new people.",
  },
];

const avatarGradients = [
  "from-[#ff9472] to-[#ff5870]",
  "from-[#6a5cff] to-[#3d2b9e]",
  "from-[#4ade80] to-[#0f9b6c]",
  "from-[#38bdf8] to-[#2563eb]",
];

export default function MyPlanDetailPage() {
  const params = useParams<{ id: string }>();
  const plan = getMyPlan(params.id);

  const [responses, setResponses] = useState(initialResponses);
  const [matchedName, setMatchedName] = useState<string | null>(null);

  function handleAccept(response: Response) {
    setResponses((current) => current.filter((item) => item.id !== response.id));
    setMatchedName(response.name);
  }

  function handleDecline(id: number) {
    setResponses((current) => current.filter((response) => response.id !== id));
  }

  if (!plan) {
    return (
      <div className="w-full px-6 pb-12 sm:px-10 lg:px-16 xl:px-24">
        <Link href="/plan/my-plan" className="inline-flex items-center gap-1.5 text-sm text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white">
          <ArrowLeft size={15} /> Back to My Plan
        </Link>
        <p className="mt-6 text-sm text-black/60 dark:text-white/60">This plan could not be found.</p>
      </div>
    );
  }

  return (
    <div className="w-full px-6 pb-12 sm:px-10 lg:px-16 xl:px-24">
      <Link href="/plan/my-plan" className="inline-flex items-center gap-1.5 text-sm text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white">
        <ArrowLeft size={15} /> Back to My Plan
      </Link>

      <h1 className="mt-3 text-3xl font-semibold">{plan.title}</h1>

      <div className="mt-6 rounded-xl border border-black/10 bg-black/[0.02] p-5 dark:border-white/10 dark:bg-[#101010]">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr_auto] lg:items-start">
          <div className="relative h-56 w-full overflow-hidden rounded-lg lg:h-full">
            <Image
              src={plan.image}
              alt={plan.title}
              fill
              sizes="(max-width: 1024px) 100vw, 280px"
              className="object-cover"
            />
            <span className="absolute left-3 top-3 rounded-md bg-[#ff5870] px-2.5 py-1 text-xs font-semibold text-white">
              {plan.status === "active" ? "Live" : "Ended"}
            </span>
          </div>

          <div>
            <h2 className="text-lg font-semibold">{plan.title}</h2>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-black/70 dark:text-white/70">
              <Tag icon={Utensils}>{plan.category}</Tag>
              <Tag icon={Clock3}>{plan.duration}</Tag>
              <Tag icon={MapPin}>{plan.location}</Tag>
            </div>

            <p className="mt-3 max-w-xl text-sm text-black/60 dark:text-white/60">{plan.description}</p>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-black/70 dark:text-white/70">
              <Tag icon={ArrowLeftRight}>{plan.paymentSplit}</Tag>
              <Tag icon={Clock3}>{plan.duration}</Tag>
              <Tag icon={Shirt}>{plan.dressCode}</Tag>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:w-64">
            {stats.map(({ label, value, icon: Icon, iconClass }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-lg border border-black/10 bg-white p-3 dark:border-white/10 dark:bg-white/[0.02]"
              >
                <span className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${iconClass}`}>
                  <Icon size={17} />
                </span>
                <div>
                  <p className="text-base font-semibold leading-tight">{value}</p>
                  <p className="text-xs text-black/50 dark:text-white/50">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 border-t border-black/10 pt-4 text-xs text-black/40 dark:border-white/10 dark:text-white/40">
          {plan.publishedOn}
        </div>
      </div>

      <h2 className="mt-8 text-lg font-semibold">Responses: {responses.length}</h2>

      <div className="mt-4 space-y-3">
        {responses.map((response) => (
          <div
            key={response.id}
            className="flex flex-col gap-4 rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-[#111] sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex gap-3">
              <InitialAvatar
                name={response.name}
                gradient={avatarGradients[response.id % avatarGradients.length]}
                className="size-12 shrink-0 text-base"
              />
              <div>
                <div className="flex flex-wrap items-center gap-1.5 text-sm font-semibold">
                  {response.name}, {response.age}
                  <BadgeCheck size={14} className="text-[#ff5870]" />
                  <span className="ml-1 text-xs font-normal text-black/40 dark:text-white/40">{response.location}</span>
                </div>
                <p className="mt-1 max-w-md text-sm text-black/60 dark:text-white/60">{response.message}</p>
              </div>
            </div>

            <div className="flex gap-3 sm:shrink-0">
              <button
                type="button"
                onClick={() => handleAccept(response)}
                className="rounded-md bg-gradient-to-r from-[#ff5870] to-[#ff7651] px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={() => handleDecline(response.id)}
                className="rounded-md border border-black/20 px-5 py-2 text-sm font-semibold text-black hover:bg-black/5 dark:border-white/25 dark:text-white dark:hover:bg-white/10"
              >
                Decline
              </button>
            </div>
          </div>
        ))}

        {responses.length === 0 && (
          <p className="rounded-xl border border-black/10 bg-white p-6 text-center text-sm text-black/50 dark:border-white/10 dark:bg-[#111] dark:text-white/50">
            No pending responses.
          </p>
        )}
      </div>

      {matchedName && (
        <MatchModal name={matchedName} venue={plan.venue} onClose={() => setMatchedName(null)} />
      )}
    </div>
  );
}

function Tag({ icon: Icon, children }: { icon: ComponentType<{ size?: number }>; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1.5">
      <Icon size={14} />
      {children}
    </span>
  );
}

function InitialAvatar({ name, gradient, className = "" }: { name: string; gradient: string; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-full border-2 border-black/10 bg-gradient-to-br font-semibold text-white dark:border-white/20 ${gradient} ${className}`}
    >
      {name.charAt(0)}
    </div>
  );
}

const confetti = [
  { top: "6%", left: "10%", size: 14, rotate: -15, opacity: 0.55, icon: Heart },
  { top: "12%", left: "84%", size: 11, rotate: 20, opacity: 0.4, icon: Sparkles },
  { top: "68%", left: "6%", size: 13, rotate: 10, opacity: 0.4, icon: Heart },
  { top: "76%", left: "90%", size: 16, rotate: -20, opacity: 0.5, icon: Heart },
  { top: "42%", left: "3%", size: 9, rotate: 5, opacity: 0.35, icon: Sparkles },
  { top: "38%", left: "94%", size: 11, rotate: -10, opacity: 0.4, icon: Heart },
  { top: "4%", left: "48%", size: 10, rotate: 0, opacity: 0.35, icon: Sparkles },
  { top: "90%", left: "48%", size: 12, rotate: 15, opacity: 0.4, icon: Heart },
];

function MatchModal({ name, venue, onClose }: { name: string; venue: string; onClose: () => void }) {
  return (
    <div
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="match-title"
        onMouseDown={(event) => event.stopPropagation()}
        className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-b from-[#ffe1e7] via-white to-[#fff3ee] px-6 pb-6 pt-8 text-center text-[#2b0e15] shadow-2xl dark:border-white/10 dark:from-[#3a0f1e] dark:via-[#1c0a12] dark:to-black dark:text-white"
      >
        {confetti.map(({ top, left, size, rotate, opacity, icon: Icon }, index) => (
          <Icon
            key={index}
            size={size}
            style={{ position: "absolute", top, left, opacity, transform: `rotate(${rotate}deg)` }}
            className="fill-[#ff5870] text-[#ff5870]"
          />
        ))}

        <h2 id="match-title" className={`${scriptFont.className} text-5xl leading-tight`}>
          Its a match
        </h2>

        <div className="mt-6 flex justify-center">
          <div className="relative inline-flex items-center">
            <InitialAvatar name={name} gradient="from-[#ff9472] to-[#ff5870]" className="size-28 border-4 text-3xl" />
            <InitialAvatar name="You" gradient="from-[#6a5cff] to-[#3d2b9e]" className="-ml-6 size-28 border-4 text-3xl" />
            <span className="absolute left-1/2 top-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#ff5870] shadow-lg">
              <Heart size={16} fill="currentColor" />
            </span>
          </div>
        </div>

        <p className="mt-6 text-base font-semibold">
          You and {name} are going to {venue}!
        </p>
        <p className="mt-2 text-sm text-black/60 dark:text-white/60">
          Get ready for a great time, memorable moments, and an even better conversation.
        </p>

        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={onClose}
            className="h-12 w-full rounded-md bg-gradient-to-r from-[#ff5870] to-[#ff7651] text-sm font-semibold text-white hover:opacity-90"
          >
            Open Chat Now
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-12 w-full rounded-md border border-black/20 text-sm font-semibold text-black hover:bg-black/5 dark:border-white/25 dark:text-white dark:hover:bg-white/10"
          >
            Keep Browsing Plans
          </button>
        </div>
      </section>
    </div>
  );
}
