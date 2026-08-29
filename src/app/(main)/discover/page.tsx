"use client";

import Image from "next/image";
import {
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Filter,
  Heart,
  Info,
  MapPin,
  Search,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import toast from "react-hot-toast";
import { categories } from "@/lib/categories";

const plans = [
  {
    image: "/assets/sign-up.jpeg",
    title: "Dinner at a Nice Restaurant",
    category: "Dinner Night",
    name: "Sofia, 27",
    date: "Friday, 20:30",
    location: "Madrid Central",
  },
  {
    image: "/assets/forgot-screen.jpeg",
    title: "An Evening to Remember",
    category: "Night Out",
    name: "Maya, 25",
    date: "Saturday, 19:00",
    location: "City Center",
  },
  {
    image: "/assets/WhatsApp Image 2026-08-10 at 3.26.41 PM (3).jpeg",
    title: "Sunset Rooftop Drinks",
    category: "Rooftop",
    name: "Elena, 29",
    date: "Sunday, 18:30",
    location: "Old Town",
  },
];

// Animation timing - transition duration; dono cards isi duration me saath saath move karte hain
const TRANSITION_DURATION = 300;

type Direction = "left" | "right";
type Stage = "start" | "run";

interface Transition {
  direction: Direction;
  fromIndex: number;
  toIndex: number;
  stage: Stage;
}

export default function DiscoverPage() {
  const [activeCategory, setActiveCategory] = useState("Dinner");
  const [planIndex, setPlanIndex] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [timeRange, setTimeRange] = useState("Any time");
  const [filterActivities, setFilterActivities] = useState<string[]>(["Dinner"]);
  const [dateRange, setDateRange] = useState("Today");
  const [paymentType, setPaymentType] = useState("Split 50/50");

  // Jab tak transition chal rahi hai, dono (outgoing + incoming) cards ek saath render hote hain
  const [transition, setTransition] = useState<Transition | null>(null);
  const isAnimating = transition !== null;

  const dragStartX = useRef<number | null>(null);
  const dragCurrentX = useRef(0);
  const [dragOffset, setDragOffset] = useState(0);

  const restingPlan = plans[planIndex % plans.length];

  function startTransition(message: string, direction: Direction) {
    if (isAnimating) return;
    // if (direction === "right") {
    //   toast.success(message);
    // } else {
    //   toast(message, { icon: "👋" });
    // }
    setTransition({
      direction,
      fromIndex: planIndex,
      toIndex: planIndex + 1,
      stage: "start",
    });
  }

  // Step 1: outgoing card apni current jagah (ya drag position) par mount hoti hai,
  // aur incoming card back-slot par mount hoti hai - dono "start" stage me, bina transition ke.
  // Agle animation frame par dono ko ek saath "run" stage me le jaate hain taake unki
  // CSS transition SIMULTANEOUSLY fire ho - ek ja rahi nazar aaye, dosri aati howi.
  useEffect(() => {
    if (!transition || transition.stage !== "start") return;
    const frame = requestAnimationFrame(() => {
      setTransition((current) => (current ? { ...current, stage: "run" } : current));
    });
    return () => cancelAnimationFrame(frame);
  }, [transition]);

  // Step 2: "run" stage khatam hone ke baad official planIndex commit kar dein
  useEffect(() => {
    if (!transition || transition.stage !== "run") return;
    const timer = window.setTimeout(() => {
      setPlanIndex(transition.toIndex);
      setTransition(null);
      setDragOffset(0);
    }, TRANSITION_DURATION);
    return () => window.clearTimeout(timer);
  }, [transition]);

  function handlePointerDown(event: PointerEvent<HTMLElement>) {
    if (isAnimating) return;
    dragStartX.current = event.clientX;
    dragCurrentX.current = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (dragStartX.current === null) return;
    dragCurrentX.current = event.clientX - dragStartX.current;
    setDragOffset(dragCurrentX.current);
  }

  function handlePointerUp() {
    if (dragStartX.current === null) return;

    const distance = dragCurrentX.current;
    dragStartX.current = null;

    if (Math.abs(distance) < 80) {
      setDragOffset(0);
      return;
    }

    startTransition(distance < 0 ? "Plan skipped" : "Plan liked", distance < 0 ? "left" : "right");
  }

  // Back-slot (small preview) position jahan se incoming card grow hoke aati hai / jahan outgoing simat jaati hai
  function backSlotTransform(direction: Direction) {
    const x = direction === "left" ? 78 : -78;
    return `translate(-50%, -50%) translateX(${x}%) scale(0.85)`;
  }

  function exitTransform(direction: Direction) {
    const x = direction === "left" ? 78 : -78;
    const rotate = direction === "left" ? 6 : -6;
    return `translate(-50%, -50%) translateX(${x}%) scale(0.85) rotate(${rotate}deg)`;
  }

  let outgoingStyle: CSSProperties | null = null;
  let incomingStyle: CSSProperties | null = null;
  let restingStyle: CSSProperties = {
    transform: `translate(-50%, -50%) translateX(${dragOffset}px) rotate(${dragOffset / 20}deg)`,
    transition: dragStartX.current !== null ? "none" : "transform 300ms ease-out",
  };

  if (transition) {
    const { direction, stage } = transition;
    outgoingStyle = {
      transform:
        stage === "start"
          ? `translate(-50%, -50%) translateX(${dragOffset}px) rotate(${dragOffset / 20}deg)`
          : exitTransform(direction),
      opacity: stage === "start" ? 1 : 0,
      transition: stage === "start" ? "none" : "transform 300ms ease-out, opacity 300ms ease-out",
      zIndex: 10,
    };
    incomingStyle = {
      transform: stage === "start" ? backSlotTransform(direction) : "translate(-50%, -50%) translateX(0) scale(1) rotate(0deg)",
      opacity: 1,
      transition: stage === "start" ? "none" : "transform 300ms ease-out",
      zIndex: 20,
    };
  }

  const activeDirection = transition?.direction;

  return (
    <>
      <div className="w-full px-6 pb-6 sm:px-10 sm:pb-8 lg:px-16 xl:px-24">
        <div className="flex flex-col gap-4 sm:flex-row">
          <label className="flex h-12 flex-1 items-center gap-3 rounded-md border border-black/30 px-4 text-black/70 dark:border-white/50 dark:text-white/70">
            <Search size={19} />
            <input
              type="search"
              placeholder="Search"
              className="w-full bg-transparent text-base text-black placeholder-black/40 outline-none dark:text-white dark:placeholder-white/60"
            />
          </label>
          <button
            type="button"
            onClick={() => setIsFilterOpen(true)}
            className="flex h-12 items-center justify-center gap-2 rounded-md border border-black/30 px-5 text-base text-black/70 hover:border-[#ff6670] hover:text-black dark:border-white/50 dark:text-white/80 dark:hover:text-white"
          >
            <Filter size={15} />
            Filter
            <ChevronDown size={13} />
          </button>
        </div>

        <div className="mt-5 flex gap-3 overflow-x-auto pb-2">
          {categories.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              onClick={() => setActiveCategory(label)}
              className={`flex shrink-0 items-center gap-2 rounded-md border px-4 py-2.5 text-sm transition-colors ${
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

        <div id="discover" className="mt-10 grid gap-12 lg:min-h-[calc(100vh-15rem)] lg:grid-cols-[0.85fr_1.15fr] lg:items-center xl:gap-20">
          <section>
            <h1 className="text-3xl font-semibold sm:text-4xl">Simple Swipe-Based Discovery</h1>
            <p className="mt-3 max-w-xl text-base text-black/60 dark:text-white/60">
              Find plans that match your interests, one swipe at a time.
            </p>

            <div className="mt-8 max-w-xl space-y-6">
              <Instruction icon={<X size={15} />} title="Swipe Left to Cancel">
                Like or save the plans you are genuinely interested in exploring further
              </Instruction>
              <Instruction icon={<Heart size={15} />} title="Swipe Right to Like">
                Skip plans that do not match your interests and move to the next option instantly.
              </Instruction>
              <Instruction icon={<Info size={15} />} title="Tap to View Details">
                Review the date, time, location and payment arrangement.
              </Instruction>
            </div>
          </section>

          <section
            id="plans"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => {
              dragStartX.current = null;
              setDragOffset(0);
            }}
            className="relative mx-auto h-[460px] w-full max-w-[720px] touch-pan-y select-none overflow-hidden cursor-grab active:cursor-grabbing"
          >
            <div
              className={`absolute right-0 top-24 h-64 w-44 overflow-hidden rounded-xl transition-all duration-300 sm:h-80 sm:w-56 ${
                activeDirection === "left" ? "scale-90 opacity-30" : "opacity-70"
              }`}
            >
              <CrossfadeImage src={plans[(planIndex + 1) % plans.length].image} alt="Next plan" />
            </div>
            <div
              className={`absolute left-2 top-32 h-60 w-40 overflow-hidden rounded-xl transition-all duration-300 sm:h-72 sm:w-48 ${
                activeDirection === "right" ? "scale-90 opacity-30" : "opacity-50"
              }`}
            >
              <CrossfadeImage src={plans[(planIndex + 2) % plans.length].image} alt="Previous plan" />
            </div>

            {transition ? (
              <>
                <PlanCard
                  keyId={transition.fromIndex}
                  plan={plans[transition.fromIndex % plans.length]}
                  style={outgoingStyle!}
                  onSkip={() => {}}
                  onLike={() => {}}
                  onInfo={() => setIsDetailsOpen(true)}
                  actionsDisabled
                  infoDisabled={false}
                />
                <PlanCard
                  keyId={transition.toIndex}
                  plan={plans[transition.toIndex % plans.length]}
                  style={incomingStyle!}
                  onSkip={() => {}}
                  onLike={() => {}}
                  onInfo={() => setIsDetailsOpen(true)}
                  actionsDisabled
                  infoDisabled={false}
                />
              </>
            ) : (
              <PlanCard
                keyId={planIndex}
                plan={restingPlan}
                style={restingStyle}
                onSkip={() => startTransition("Plan skipped", "left")}
                onLike={() => startTransition("Plan liked", "right")}
                onInfo={() => setIsDetailsOpen(true)}
                actionsDisabled={isAnimating}
                infoDisabled={false}
              />
            )}
          </section>
        </div>
      </div>

      {isFilterOpen && (
        <div
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsFilterOpen(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="filter-title"
            onMouseDown={(event) => event.stopPropagation()}
            className="max-h-[calc(100vh-2rem)] w-full max-w-[570px] overflow-y-auto rounded-xl border border-[#ff5870]/80 bg-white p-5 text-black shadow-2xl dark:bg-[#070707] dark:text-white sm:p-6"
          >
            <div className="flex items-start justify-between border-b border-black/10 pb-4 dark:border-white/25">
              <div>
                <h2 id="filter-title" className="text-2xl font-semibold">Find the perfect plan</h2>
                <p className="mt-1 text-sm text-black/60 dark:text-white/60">Filter and join dates that match your vibe</p>
              </div>
              <button
                type="button"
                aria-label="Close filter modal"
                onClick={() => setIsFilterOpen(false)}
                className="text-2xl leading-none text-black/70 hover:text-black dark:text-white/80 dark:hover:text-white"
              >
                ×
              </button>
            </div>

            <FilterSection title="Time Range">
              <div className="relative">
                <Clock3 className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/60 dark:text-white/70" size={18} />
                <select
                  value={timeRange}
                  onChange={(event) => setTimeRange(event.target.value)}
                  className="h-12 w-full appearance-none rounded-lg border border-black/30 bg-transparent pl-11 pr-10 text-sm text-black outline-none focus:border-[#ff6670] dark:border-white/50 dark:text-white"
                >
                  <option className="bg-white dark:bg-[#111]">Any time</option>
                  <option className="bg-white dark:bg-[#111]">Morning</option>
                  <option className="bg-white dark:bg-[#111]">Afternoon</option>
                  <option className="bg-white dark:bg-[#111]">Evening</option>
                  <option className="bg-white dark:bg-[#111]">Night</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black/60 dark:text-white/70" size={16} />
              </div>
            </FilterSection>

            <FilterSection title="Choose Activity">
              <div className="flex flex-wrap gap-2">
                {categories.map(({ label, icon: Icon }) => {
                  const selected = filterActivities.includes(label);
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => {
                        setFilterActivities((current) =>
                          selected ? current.filter((item) => item !== label) : [...current, label],
                        );
                      }}
                      className={`flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm transition-colors ${
                        selected
                          ? "border-[#ff5870] bg-[#ff5870] text-white"
                          : "border-black/30 bg-transparent text-black/70 hover:border-black dark:border-white/50 dark:text-white/75 dark:hover:border-white"
                      }`}
                    >
                      <Icon size={15} />
                      {label}
                    </button>
                  );
                })}
              </div>
            </FilterSection>

            <FilterSection title="Date Range">
              <div className="flex flex-wrap gap-2">
                {["Today", "Tomorrow", "This week", "Custom Date"].map((date) => (
                  <button
                    key={date}
                    type="button"
                    onClick={() => setDateRange(date)}
                    className={`flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm transition-colors ${
                      dateRange === date
                        ? "border-[#ff5870] bg-[#ff5870] text-white"
                        : "border-black/30 text-black/70 hover:border-black dark:border-white/50 dark:text-white/75 dark:hover:border-white"
                    }`}
                  >
                    <CalendarDays size={14} />
                    {date}
                  </button>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Payment Type">
              <div className="grid grid-cols-2 gap-3 text-sm text-black/70 dark:text-white/70 sm:grid-cols-4">
                {["Split 50/50", "I’ll Pay", "You Pay", "Prefer not to say"].map((payment) => {
                  const selected = paymentType === payment;
                  return (
                    <button
                      key={payment}
                      type="button"
                      onClick={() => setPaymentType(payment)}
                      className="flex items-center gap-2 text-left hover:text-black dark:hover:text-white"
                    >
                      <span
                        className={`flex size-4 items-center justify-center rounded-sm border ${
                          selected ? "border-[#56b957] bg-[#56b957] text-black" : "border-black/30 dark:border-white/40"
                        }`}
                      >
                        {selected && <Check size={12} strokeWidth={3} />}
                      </span>
                      {payment}
                    </button>
                  );
                })}
              </div>
            </FilterSection>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => {
                  setTimeRange("Any time");
                  setFilterActivities(["Dinner"]);
                  setDateRange("Today");
                  setPaymentType("Split 50/50");
                }}
                className="h-12 rounded-lg border border-black/30 text-sm font-semibold text-black hover:bg-black/5 dark:border-white/60 dark:text-white dark:hover:bg-white/10"
              >
                Reset all
              </button>
              <button
                type="button"
                onClick={() => {
                  if (filterActivities[0]) setActiveCategory(filterActivities[0]);
                  toast.success("Filters applied");
                  setIsFilterOpen(false);
                }}
                className="h-12 rounded-lg bg-gradient-to-r from-[#ff5870] to-[#ff7651] text-sm font-semibold text-white hover:opacity-90"
              >
                Apply Filters
              </button>
            </div>
          </section>
        </div>
      )}

      {isDetailsOpen && (
        <PlanDetailsModal plan={restingPlan} onClose={() => setIsDetailsOpen(false)} />
      )}
    </>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-4">
      <h3 className="mb-2 text-base font-medium text-black dark:text-white">{title}</h3>
      {children}
    </section>
  );
}

function PlanDetailsModal({
  plan,
  onClose,
}: {
  plan: (typeof plans)[number];
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const details = [
    ["Restaurant:", "Casa Bella Madrid"],
    ["Location:", "Calle de Serrano, Madrid Central"],
    ["Date & Time:", plan.date],
    ["Budget:", "€25–€40 per person"],
    ["Payment:", "Split 50/50"],
  ];

  return (
    <div
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm transition-opacity duration-250 ease-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="plan-details-title"
        onMouseDown={(event) => event.stopPropagation()}
        className={`max-h-[calc(100vh-2rem)] w-full max-w-[540px] overflow-y-auto rounded-xl border border-[#ff5870] bg-white p-5 text-black shadow-2xl transition-all duration-250 ease-out dark:bg-[#050505] dark:text-white sm:p-6 ${
          visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-95 opacity-0"
        }`}
      >
        <div className="flex items-start justify-between border-b border-black/10 pb-4 dark:border-white/20">
          <div>
            <h2 id="plan-details-title" className="text-2xl font-semibold">
              {plan.title === "Dinner at a Nice Restaurant" ? "Dinner at Casa Bella Madrid" : plan.title}
            </h2>
            <p className="mt-2 text-base font-medium text-black/80 dark:text-white/90">
              {plan.category} – {plan.date} {plan.location}
            </p>
          </div>
          <button
            type="button"
            aria-label="Close plan details"
            onClick={onClose}
            className="text-2xl leading-none text-black/70 hover:text-black dark:text-white/80 dark:hover:text-white"
          >
            ×
          </button>
        </div>

        <p className="mt-5 text-sm leading-6 text-black/70 dark:text-white/80">
          Join {plan.name.replace(", 27", "")} for a relaxed and enjoyable plan in the heart of
          Madrid. Spend the evening enjoying good food, friendly conversation, and a warm,
          comfortable atmosphere. It is a great opportunity to meet someone new and create a
          memorable experience together.
        </p>

        <div className="mt-5 space-y-3 border-t border-black/10 pt-4 dark:border-white/25">
          {details.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-4 text-sm">
              <span className="flex items-center gap-2 font-medium">
                <Check size={17} className="text-[#4ed36b]" />
                {label}
              </span>
              <span className="text-right text-black/70 dark:text-white/80">{value}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            "/assets/sign-up.jpeg",
            "/assets/forgot-screen.jpeg",
            "/assets/WhatsApp Image 2026-08-10 at 3.26.41 PM (3).jpeg",
          ].map((image, index) => (
            <div key={image} className="relative h-24 overflow-hidden rounded-md sm:h-28">
              <Image src={image} alt={`Plan detail photo ${index + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function CrossfadeImage({ src, alt }: { src: string; alt: string }) {
  // Har layer ek image hai (purani + nayi). Jab src badalta hai, ek nayi layer
  // opacity 0 par mount hoti hai, phir agle frame par opacity 1 tak animate hoti hai,
  // aur purani layer (jo pehle se opacity 1 par thi) 0 tak fade ho jaati hai. Transition
  // khatam hone ke baad purani layers hata di jaati hain.
  const [layers, setLayers] = useState<{ key: number; src: string; visible: boolean }[]>([
    { key: 0, src, visible: true },
  ]);
  const nextKey = useRef(1);

  useEffect(() => {
    setLayers((prev) => {
      const last = prev[prev.length - 1];
      if (last.src === src) return prev;
      return [...prev, { key: nextKey.current++, src, visible: false }];
    });
  }, [src]);

  useEffect(() => {
    if (layers.length < 2) return;
    const frame = requestAnimationFrame(() => {
      setLayers((prev) => prev.map((layer, index) => ({ ...layer, visible: index === prev.length - 1 })));
    });
    const cleanup = window.setTimeout(() => {
      setLayers((prev) => prev.slice(-1));
    }, 320);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(cleanup);
    };
  }, [layers.length]);

  return (
    <div className="relative h-full w-full">
      {layers.map((layer) => (
        <div
          key={layer.key}
          className="absolute inset-0 transition-opacity duration-300 ease-out"
          style={{ opacity: layer.visible ? 1 : 0 }}
        >
          <Image src={layer.src} alt={alt} fill className="object-cover" />
        </div>
      ))}
    </div>
  );
}

function PlanCard({
  keyId,
  plan,
  style,
  onSkip,
  onLike,
  onInfo,
  actionsDisabled,
  infoDisabled = false,
}: {
  keyId: number;
  plan: (typeof plans)[number];
  style: CSSProperties;
  onSkip: () => void;
  onLike: () => void;
  onInfo: () => void;
  actionsDisabled: boolean;
  infoDisabled?: boolean;
}) {
  return (
    <article
      key={keyId}
      aria-label={`Discovery plan: ${plan.title}`}
      style={style}
      className="absolute left-1/2 top-1/2 h-[410px] w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#161616] text-white shadow-2xl sm:h-[430px] sm:w-72"
    >
      <div className="relative h-full">
        <Image src={plan.image} alt={plan.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute inset-x-4 bottom-4">
          <span className="rounded-full bg-[#ff6870] px-2.5 py-1.5 text-xs font-semibold text-white">
            {plan.category}
          </span>
          <h2 className="mt-3 text-base font-semibold">{plan.name}</h2>
          <p className="mt-1 text-sm text-white/90">{plan.title}</p>
          <p className="mt-2 flex items-center gap-1 text-xs text-white/75">
            <span>◷</span> {plan.date}
          </p>
          <p className="mt-1 flex items-center gap-1 text-xs text-white/75">
            <MapPin size={13} /> {plan.location}
          </p>
          <div className="mt-3 flex justify-between">
            <button
              type="button"
              aria-label="Skip plan"
              onClick={onSkip}
              onPointerDown={(event) => event.stopPropagation()}
              disabled={actionsDisabled}
              className="flex size-9 items-center justify-center rounded-full border border-white/50 text-white hover:bg-white/10 disabled:opacity-50"
            >
              <X size={15} />
            </button>
            <button
              type="button"
              aria-label="View plan details"
              onClick={onInfo}
              onPointerDown={(event) => event.stopPropagation()}
              disabled={infoDisabled}
              className="flex size-9 items-center justify-center rounded-full border border-white/50 text-white hover:bg-white/10 disabled:opacity-50"
            >
              <Info size={15} />
            </button>
            <button
              type="button"
              aria-label="Like plan"
              onClick={onLike}
              onPointerDown={(event) => event.stopPropagation()}
              disabled={actionsDisabled}
              className="flex size-9 items-center justify-center rounded-full bg-[#ff6670] text-white hover:opacity-90 disabled:opacity-50"
            >
              <Heart size={15} fill="currentColor" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function Instruction({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-black/10 pb-4 dark:border-white/20">
      <h2 className="flex items-center gap-2 text-sm font-medium">
        <span className="flex size-5 items-center justify-center rounded bg-black/10 dark:bg-white/20">{icon}</span>
        {title}
      </h2>
      <p className="mt-1 pl-7 text-xs leading-5 text-black/60 dark:text-white/60">{children}</p>
    </div>
  );
}
