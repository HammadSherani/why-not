"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BadgeCheck, Bell, CalendarDays, Eye, MapPin, MoreVertical } from "lucide-react";
import { categories } from "@/lib/categories";
import { myPlans } from "./data";

export default function MyPlanListPage() {
  const [tab, setTab] = useState<"active" | "previous">("active");
  const visiblePlans = myPlans.filter((plan) => plan.status === tab);

  return (
    <div className="w-full px-6 pb-12 sm:px-10 lg:px-16 xl:px-24">
      <h1 className="text-3xl font-semibold">My Plan</h1>
      <p className="mt-2 text-sm text-black/60 dark:text-white/60">
        View and manage all your created plans in one place.
      </p>

      <div className="mt-6 flex gap-6 border-b border-black/10 text-sm dark:border-white/10">
        <button
          type="button"
          onClick={() => setTab("active")}
          className={`border-b-2 pb-3 ${
            tab === "active"
              ? "border-[#ff5870] font-semibold text-[#ff5870]"
              : "border-transparent text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white"
          }`}
        >
          Active Plan
        </button>
        <button
          type="button"
          onClick={() => setTab("previous")}
          className={`border-b-2 pb-3 ${
            tab === "previous"
              ? "border-[#ff5870] font-semibold text-[#ff5870]"
              : "border-transparent text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white"
          }`}
        >
          Previous Plans
        </button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4">
        {visiblePlans.map((plan) => {
          const Icon = categories.find((category) => category.label === plan.category)?.icon;
          return (
            <Link
              key={plan.id}
              href={`/plan/my-plan/${plan.id}`}
              className="group overflow-hidden rounded-xl border border-black/10 bg-white transition-colors hover:border-[#ff5870]/60 dark:border-white/10 dark:bg-[#111]"
            >
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={plan.image}
                  alt={plan.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full bg-[#ff5870] px-2.5 py-1 text-[11px] font-semibold text-white">
                  {Icon && <Icon size={11} />}
                  {plan.category}
                </span>
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/85 to-transparent p-2.5 pt-6">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full border-2 border-white/40 bg-gradient-to-br from-[#ff9472] to-[#ff5870] text-xs font-semibold text-white">
                    {plan.organizerName.charAt(0)}
                  </span>
                  <div className="min-w-0 leading-tight text-white">
                    <p className="truncate text-xs font-semibold">
                      {plan.organizerName}, {plan.organizerAge}
                    </p>
                    <p className="flex items-center gap-1 truncate text-[10px] text-white/80">
                      <BadgeCheck size={10} className="text-[#4ade80]" /> Verified Organizer
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3">
                <h3 className="truncate text-sm font-semibold">{plan.title}</h3>
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-black/60 dark:text-white/60">
                  <CalendarDays size={12} /> {plan.date}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-black/60 dark:text-white/60">
                  <MapPin size={12} /> {plan.location}
                </p>

                <div className="mt-3 flex items-center justify-between border-t border-black/10 pt-2.5 text-black/50 dark:border-white/10 dark:text-white/50">
                  <Bell size={15} />
                  <Eye size={15} />
                  <MoreVertical size={15} />
                </div>
              </div>
            </Link>
          );
        })}

        {visiblePlans.length === 0 && (
          <p className="col-span-full rounded-xl border border-black/10 bg-white p-8 text-center text-sm text-black/50 dark:border-white/10 dark:bg-[#111] dark:text-white/50">
            No plans here yet.
          </p>
        )}
      </div>
    </div>
  );
}
