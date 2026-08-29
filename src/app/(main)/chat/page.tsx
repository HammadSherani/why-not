"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import {
  Ban,
  BadgeCheck,
  CheckCheck,
  ChevronDown,
  Flag,
  Heart,
  Lock,
  MapPin,
  MessageCircle,
  MoreVertical,
  Paperclip,
  Phone,
  Search,
  Send,
  Share2,
  ShieldAlert,
  Smile,
  Sparkles,
  UserRound,
  Video,
} from "lucide-react";
import { myPlans } from "../plan/my-plan/data";

interface SharedPlan {
  image: string;
  title: string;
  dateTime: string;
  venueName: string;
  address: string;
  cancelled?: boolean;
}

interface TextMessage {
  id: number;
  from: "them" | "me";
  time: string;
  kind: "text";
  text: string;
}

interface PlanMessage {
  id: number;
  from: "them" | "me";
  time: string;
  kind: "plan";
  plan: SharedPlan;
}

type Message = TextMessage | PlanMessage;

interface Conversation {
  id: number;
  name: string;
  planTitle: string;
  avatarGradient: string;
  unreadCount: number;
  blocked?: boolean;
  messages: Message[];
}

const reportReasons = [
  "Harassment or bullying",
  "Inappropriate messages or photos",
  "Fake profile",
  "Spam or scam",
  "Safety concern",
  "Other",
];

const avatarGradients = [
  "from-[#ff9472] to-[#ff5870]",
  "from-[#6a5cff] to-[#3d2b9e]",
  "from-[#4ade80] to-[#0f9b6c]",
  "from-[#38bdf8] to-[#2563eb]",
  "from-[#facc15] to-[#ea580c]",
  "from-[#f472b6] to-[#9d174d]",
  "from-[#a78bfa] to-[#4c1d95]",
];

const seedMessages: Message[] = [
  { id: 1, from: "them", kind: "text", text: "Hey! I saw your plan Bali Adventure Escape and I'd love to join.", time: "10:30 AM" },
  { id: 2, from: "me", kind: "text", text: "Hi Sarah! Great to hear that. How are your travel dates looking?", time: "10:32 AM" },
  { id: 3, from: "them", kind: "text", text: "I'm flexible, thinking anytime between June 5 and June 15 works for me.", time: "10:34 AM" },
  {
    id: 4,
    from: "me",
    kind: "plan",
    time: "10:36 AM",
    plan: {
      image: "/assets/forgot-screen.jpeg",
      title: "Coffee & Catch Up",
      dateTime: "Sat, May 24, 2025, 3:00 PM",
      venueName: "Brewed Awakenings",
      address: "123 Greenway Ave, Austin, TX 78701",
    },
  },
  { id: 5, from: "them", kind: "text", text: "That itinerary sounds perfect. I'm in!", time: "10:38 AM" },
];

const initialConversations: Conversation[] = Array.from({ length: 7 }, (_, index) => ({
  id: index + 1,
  name: "Sarah Johnson",
  planTitle: "Bali Adventure Escape",
  avatarGradient: avatarGradients[index % avatarGradients.length],
  unreadCount: index === 0 ? 0 : index % 3 === 0 ? 2 : 1,
  messages: seedMessages,
}));

const decorations = [
  { top: "2%", left: "8%", size: 14, rotate: -15, opacity: 0.5, icon: Heart },
  { top: "10%", left: "88%", size: 11, rotate: 15, opacity: 0.45, icon: Sparkles },
  { top: "78%", left: "4%", size: 12, rotate: 10, opacity: 0.4, icon: Sparkles },
  { top: "86%", left: "90%", size: 13, rotate: -10, opacity: 0.45, icon: Heart },
];

function previewText(message: Message) {
  return message.kind === "text" ? message.text : `📍 Shared a plan: ${message.plan.title}`;
}

export default function ChatPage() {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedId, setSelectedId] = useState<number | null>(initialConversations[0]?.id ?? null);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [draft, setDraft] = useState("");
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [openPlanMenuId, setOpenPlanMenuId] = useState<number | null>(null);
  const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportDetails, setReportDetails] = useState("");

  const shareMenuRef = useRef<HTMLDivElement>(null);
  const planMenuRef = useRef<HTMLDivElement>(null);
  const headerMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setIsShareOpen(false);
      }
      if (planMenuRef.current && !planMenuRef.current.contains(event.target as Node)) {
        setOpenPlanMenuId(null);
      }
      if (headerMenuRef.current && !headerMenuRef.current.contains(event.target as Node)) {
        setIsHeaderMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = conversations.find((conversation) => conversation.id === selectedId) ?? null;
  const totalUnread = conversations.reduce((sum, conversation) => sum + conversation.unreadCount, 0);
  const visibleConversations =
    filter === "unread" ? conversations.filter((conversation) => conversation.unreadCount > 0) : conversations;
  const shareablePlans = myPlans.filter((plan) => plan.status === "active");

  function handleSelect(id: number) {
    setSelectedId(id);
    setConversations((current) =>
      current.map((conversation) => (conversation.id === id ? { ...conversation, unreadCount: 0 } : conversation)),
    );
  }

  function updateSelectedMessages(updater: (messages: Message[]) => Message[]) {
    if (!selected) return;
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === selected.id ? { ...conversation, messages: updater(conversation.messages) } : conversation,
      ),
    );
  }

  function handleSend(event: FormEvent) {
    event.preventDefault();
    if (!draft.trim() || !selected) return;

    const message: Message = { id: Date.now(), from: "me", kind: "text", text: draft.trim(), time: "Now" };
    updateSelectedMessages((messages) => [...messages, message]);
    setDraft("");
  }

  function handleSharePlan(plan: (typeof myPlans)[number]) {
    if (!selected) return;
    const message: Message = {
      id: Date.now(),
      from: "me",
      kind: "plan",
      time: "Now",
      plan: {
        image: plan.image,
        title: plan.title,
        dateTime: plan.date,
        venueName: plan.venue,
        address: plan.location,
      },
    };
    updateSelectedMessages((messages) => [...messages, message]);
    setIsShareOpen(false);
  }

  function handleCancelPlan(messageId: number) {
    updateSelectedMessages((messages) =>
      messages.map((message) =>
        message.kind === "plan" && message.id === messageId
          ? { ...message, plan: { ...message.plan, cancelled: true } }
          : message,
      ),
    );
    setOpenPlanMenuId(null);
    toast.success("Plan cancelled");
  }

  function openReportModal() {
    setOpenPlanMenuId(null);
    setIsHeaderMenuOpen(false);
    setReportReason("");
    setReportDetails("");
    setIsReportModalOpen(true);
  }

  function closeReportModal() {
    setIsReportModalOpen(false);
  }

  function handleSubmitReport() {
    if (!reportReason || !selected) return;
    setConversations((current) =>
      current.map((conversation) => (conversation.id === selected.id ? { ...conversation, blocked: true } : conversation)),
    );
    setIsReportModalOpen(false);
    toast.success(`${selected.name} has been reported and blocked`);
  }

  function handleUnblock() {
    if (!selected) return;
    setConversations((current) =>
      current.map((conversation) => (conversation.id === selected.id ? { ...conversation, blocked: false } : conversation)),
    );
    toast.success(`${selected.name} has been unblocked`);
  }

  function handleViewProfile() {
    setIsHeaderMenuOpen(false);
    toast(`Opening ${selected?.name ?? "user"}'s profile...`);
  }

  if (conversations.length === 0) {
    return (
      <div className="w-full px-6 pb-12 sm:px-10 lg:px-16 xl:px-24">
        <h1 className="text-3xl font-semibold">Chat</h1>

        <div className="mt-10 flex min-h-[420px] items-center justify-center rounded-xl lg:min-h-[520px]">
          <div className="flex flex-col items-center text-center">
            <div className="relative flex h-40 w-48 items-center justify-center">
              {decorations.map(({ top, left, size, rotate, opacity, icon: Icon }, index) => (
                <Icon
                  key={index}
                  size={size}
                  style={{ position: "absolute", top, left, opacity, transform: `rotate(${rotate}deg)` }}
                  className="fill-[#ff5870] text-[#ff5870]"
                />
              ))}

              <div className="absolute inset-0 rounded-[60%_40%_55%_45%/55%_45%_60%_40%] bg-black/5 dark:bg-white/[0.06]" />

              <div className="absolute left-6 top-6 flex size-16 items-center justify-center rounded-full bg-[#ff5870] text-white shadow-lg">
                <MessageCircle size={24} />
              </div>
              <div className="absolute bottom-7 right-6 flex size-11 items-center justify-center rounded-full bg-white text-[#ff5870] shadow-lg">
                <Heart size={18} fill="currentColor" />
              </div>
            </div>

            <h2 className="mt-4 text-xl font-semibold">No active chats yet</h2>
            <p className="mt-2 max-w-sm text-sm text-black/60 dark:text-white/60">
              Send a request to join a plan and start chatting once your request is accepted.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="w-full px-6 pb-12 sm:px-10 lg:px-16 xl:px-24">
      <div className="flex h-[640px] overflow-hidden rounded-xl border border-black/10 bg-white dark:border-white/10 dark:bg-[#0d0d0d]">
        <aside className="flex w-full max-w-[300px] shrink-0 flex-col border-r border-black/10 dark:border-white/10">
          <div className="p-4">
            <h2 className="text-lg font-semibold">Messages</h2>
            <label className="mt-3 flex h-10 items-center gap-2 rounded-lg border border-black/15 bg-black/[0.03] px-3 text-black/50 dark:border-white/15 dark:bg-white/5 dark:text-white/50">
              <Search size={15} />
              <input
                type="search"
                placeholder="Search"
                className="w-full bg-transparent text-sm text-black placeholder-black/40 outline-none dark:text-white dark:placeholder-white/40"
              />
            </label>

            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  filter === "all"
                    ? "bg-[#ff5870] text-white"
                    : "border border-black/15 text-black/60 hover:border-black/30 dark:border-white/15 dark:text-white/60 dark:hover:border-white/30"
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setFilter("unread")}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  filter === "unread"
                    ? "bg-[#ff5870] text-white"
                    : "border border-black/15 text-black/60 hover:border-black/30 dark:border-white/15 dark:text-white/60 dark:hover:border-white/30"
                }`}
              >
                Unread {totalUnread}
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-1 overflow-y-auto px-2 pb-2">
            {visibleConversations.map((conversation) => {
              const lastMessage = conversation.messages[conversation.messages.length - 1];
              const isActive = conversation.id === selectedId;
              return (
                <button
                  key={conversation.id}
                  type="button"
                  onClick={() => handleSelect(conversation.id)}
                  className={`flex w-full items-center gap-3 rounded-lg border p-2.5 text-left transition-colors ${
                    isActive
                      ? "border-[#ff5870] bg-[#ff5870]/5"
                      : "border-transparent hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  <InitialAvatar name={conversation.name} gradient={conversation.avatarGradient} className="size-11 shrink-0 text-sm" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex min-w-0 items-center gap-1 text-sm font-semibold">
                        <span className="truncate">{conversation.name}</span>
                        <BadgeCheck size={13} className="shrink-0 text-[#ff5870]" />
                      </span>
                      <span className="shrink-0 text-[11px] text-black/40 dark:text-white/40">{lastMessage.time}</span>
                    </div>
                    <div className="mt-0.5 flex items-center justify-between gap-2">
                      <p className="truncate text-xs text-black/50 dark:text-white/50">{previewText(lastMessage)}</p>
                      {conversation.unreadCount > 0 && (
                        <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-[#ff5870] text-[9px] font-semibold text-white">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {selected ? (
          <section className="flex flex-1 flex-col">
            <div className="flex items-center justify-between border-b border-black/10 p-4 dark:border-white/10">
              <div className="flex items-center gap-3">
                <InitialAvatar name={selected.name} gradient={selected.avatarGradient} className="size-10 text-sm" />
                <div>
                  <div className="flex items-center gap-1 text-sm font-semibold">
                    {selected.name}
                    <BadgeCheck size={13} className="text-[#ff5870]" />
                  </div>
                  <p className="text-xs text-black/50 dark:text-white/50">{selected.planTitle} · Active now</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-black/60 dark:text-white/60">
                <button type="button" aria-label="Call" className="hover:text-black dark:hover:text-white">
                  <Phone size={18} />
                </button>
                <button type="button" aria-label="Video call" className="hover:text-black dark:hover:text-white">
                  <Video size={18} />
                </button>
                <div ref={headerMenuRef} className="relative">
                  <button
                    type="button"
                    aria-label="More options"
                    onClick={() => setIsHeaderMenuOpen((open) => !open)}
                    className="hover:text-black dark:hover:text-white"
                  >
                    <MoreVertical size={18} />
                  </button>
                  {isHeaderMenuOpen && (
                    <div className="absolute right-0 top-full z-20 mt-2 w-44 overflow-hidden rounded-lg border border-black/10 bg-white py-1 text-left shadow-xl dark:border-white/15 dark:bg-[#1c1c1c]">
                      <button
                        type="button"
                        onClick={openReportModal}
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-black/80 hover:bg-black/5 dark:text-white/80 dark:hover:bg-white/5"
                      >
                        <Ban size={14} /> Block
                      </button>
                      <button
                        type="button"
                        onClick={openReportModal}
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-black/80 hover:bg-black/5 dark:text-white/80 dark:hover:bg-white/5"
                      >
                        <Flag size={14} /> Report
                      </button>
                      <button
                        type="button"
                        onClick={handleViewProfile}
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-black/80 hover:bg-black/5 dark:text-white/80 dark:hover:bg-white/5"
                      >
                        <UserRound size={14} /> View profile
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              <div className="flex justify-center">
                <span className="rounded-full bg-black/5 px-3 py-1 text-xs text-black/50 dark:bg-white/10 dark:text-white/50">
                  Today
                </span>
              </div>

              {selected.messages.map((message) => {
                const isMe = message.from === "me";
                return (
                  <div key={message.id} className={`flex items-end gap-2 ${isMe ? "justify-end" : "justify-start"}`}>
                    {!isMe && <InitialAvatar name={selected.name} gradient={selected.avatarGradient} className="size-8 shrink-0 text-xs" />}

                    {message.kind === "text" ? (
                      <div className={`flex max-w-xs flex-col sm:max-w-sm ${isMe ? "items-end" : "items-start"}`}>
                        <div
                          className={`rounded-2xl px-4 py-2.5 text-sm ${
                            isMe
                              ? "rounded-br-sm bg-gradient-to-r from-[#ff5870] to-[#ff7651] text-white"
                              : "rounded-bl-sm bg-black/5 text-black dark:bg-white/10 dark:text-white"
                          }`}
                        >
                          {message.text}
                        </div>
                        <span className="mt-1 flex items-center gap-1 text-[11px] text-black/40 dark:text-white/40">
                          {message.time}
                          {isMe && <CheckCheck size={12} className="text-[#ff5870]" />}
                        </span>
                      </div>
                    ) : (
                      <div className={`flex max-w-xs flex-col sm:max-w-sm ${isMe ? "items-end" : "items-start"}`}>
                        <p className="mb-1 flex items-center gap-1 text-[11px] text-black/40 dark:text-white/40">
                          <Lock size={11} /> Unlocked plan details
                        </p>
                        <div className="w-72 max-w-full rounded-xl border border-black/10 bg-white p-3 dark:border-white/10 dark:bg-[#151515]">
                          <div className="flex gap-3">
                            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                              <Image src={message.plan.image} alt={message.plan.title} fill className="object-cover" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-semibold">{message.plan.title}</p>
                                  <p className="text-[11px] text-black/40 dark:text-white/40">Plan Name</p>
                                </div>
                                <div ref={openPlanMenuId === message.id ? planMenuRef : undefined} className="relative shrink-0">
                                  <button
                                    type="button"
                                    aria-label="Plan options"
                                    onClick={() => setOpenPlanMenuId((current) => (current === message.id ? null : message.id))}
                                    className="text-black/40 hover:text-black dark:text-white/40 dark:hover:text-white"
                                  >
                                    <MoreVertical size={16} />
                                  </button>
                                  {openPlanMenuId === message.id && (
                                    <div className="absolute right-0 top-full z-10 mt-1 w-40 overflow-hidden rounded-lg border border-black/10 bg-white py-1 text-left shadow-xl dark:border-white/15 dark:bg-[#1c1c1c]">
                                      <button
                                        type="button"
                                        onClick={openReportModal}
                                        className="flex w-full items-center gap-2 px-3 py-2 text-xs text-black/80 hover:bg-black/5 dark:text-white/80 dark:hover:bg-white/5"
                                      >
                                        <Flag size={13} /> Report User
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleCancelPlan(message.id)}
                                        className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#ff5870] hover:bg-black/5 dark:hover:bg-white/5"
                                      >
                                        <Ban size={13} /> Cancel Plan
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 space-y-2 border-t border-black/10 pt-3 text-xs dark:border-white/10">
                            <div>
                              <p className="text-black/40 dark:text-white/40">Date/Time</p>
                              <p className="mt-0.5 font-medium">{message.plan.dateTime}</p>
                            </div>
                            <div>
                              <p className="text-black/40 dark:text-white/40">Unlocked Venue Address</p>
                              <p className="mt-0.5 flex items-start gap-1 text-black/60 dark:text-white/60">
                                <MapPin size={12} className="mt-0.5 shrink-0" />
                                {message.plan.venueName}, {message.plan.address}
                              </p>
                            </div>
                          </div>

                          {message.plan.cancelled && (
                            <p className="mt-3 rounded-md bg-[#ff5870]/10 py-1 text-center text-[11px] font-semibold text-[#ff5870]">
                              Plan cancelled
                            </p>
                          )}
                        </div>
                        <span className="mt-1 flex items-center gap-1 text-[11px] text-black/40 dark:text-white/40">
                          {message.time}
                          {isMe && <CheckCheck size={12} className="text-[#ff5870]" />}
                        </span>
                      </div>
                    )}

                    {isMe && <InitialAvatar name="You" gradient="from-[#6a5cff] to-[#3d2b9e]" className="size-8 shrink-0 text-xs" />}
                  </div>
                );
              })}
            </div>

            {selected.blocked ? (
              <div className="flex items-center justify-between gap-3 border-t border-black/10 p-4 dark:border-white/10">
                <p className="text-sm text-black/60 dark:text-white/60">You've blocked {selected.name}.</p>
                <button
                  type="button"
                  onClick={handleUnblock}
                  className="shrink-0 rounded-full border border-black/20 px-4 py-2 text-sm font-semibold text-black hover:bg-black/5 dark:border-white/25 dark:text-white dark:hover:bg-white/10"
                >
                  Unblock
                </button>
              </div>
            ) : (
            <form onSubmit={handleSend} className="flex items-center gap-3 border-t border-black/10 p-4 dark:border-white/10">
              <button type="button" aria-label="Attach file" className="text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white">
                <Paperclip size={19} />
              </button>

              <div ref={shareMenuRef} className="relative">
                <button
                  type="button"
                  aria-label="Share a plan"
                  onClick={() => setIsShareOpen((open) => !open)}
                  className="text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white"
                >
                  <Share2 size={19} />
                </button>
                {isShareOpen && (
                  <div className="absolute bottom-full left-0 z-10 mb-2 w-64 overflow-hidden rounded-lg border border-black/10 bg-white py-1 shadow-xl dark:border-white/15 dark:bg-[#1c1c1c]">
                    <p className="px-3 pb-1.5 pt-2 text-[11px] font-semibold uppercase tracking-wide text-black/40 dark:text-white/40">
                      Share a plan
                    </p>
                    {shareablePlans.length === 0 && (
                      <p className="px-3 py-2 text-xs text-black/50 dark:text-white/50">No active plans to share.</p>
                    )}
                    {shareablePlans.map((plan) => (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => handleSharePlan(plan)}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-black/80 hover:bg-black/5 dark:text-white/80 dark:hover:bg-white/5"
                      >
                        <span className="truncate">{plan.title}</span>
                        <span className="ml-auto shrink-0 text-black/40 dark:text-white/40">{plan.category}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex h-11 flex-1 items-center rounded-full border border-black/15 px-4 dark:border-white/15">
                <input
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Type a Message..."
                  className="w-full bg-transparent text-sm text-black placeholder-black/40 outline-none dark:text-white dark:placeholder-white/40"
                />
                <button type="button" aria-label="Emoji" className="text-black/40 hover:text-black dark:text-white/40 dark:hover:text-white">
                  <Smile size={18} />
                </button>
              </div>
              <button
                type="submit"
                className="flex h-11 items-center gap-2 rounded-full bg-gradient-to-r from-[#ff5870] to-[#ff7651] px-5 text-sm font-semibold text-white hover:opacity-90"
              >
                Send
                <Send size={15} />
              </button>
            </form>
            )}
          </section>
        ) : (
          <div className="flex flex-1 items-center justify-center text-sm text-black/40 dark:text-white/40">
            Select a conversation to start chatting.
          </div>
        )}
      </div>
    </div>

    {isReportModalOpen && selected && (
      <div
        role="presentation"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeReportModal();
        }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      >
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="report-title"
          onMouseDown={(event) => event.stopPropagation()}
          className="w-full max-w-md rounded-2xl border border-[#ff5870]/60 bg-white p-6 text-black shadow-2xl dark:bg-[#111] dark:text-white"
        >
          <div className="flex flex-col items-center text-center">
            <span className="flex size-12 items-center justify-center rounded-full border-2 border-[#ff5870]/50 bg-[#ff5870]/10 text-[#ff5870]">
              <ShieldAlert size={22} />
            </span>
            <h2 id="report-title" className="mt-3 text-lg font-semibold">
              Report &amp; Block User
            </h2>
            <p className="mt-1.5 text-sm text-black/60 dark:text-white/60">
              Your report helps us keep WhyNot safe and respectful for everyone. The user will be blocked immediately.
            </p>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium">Reason for reporting</label>
            <div className="relative">
              <select
                value={reportReason}
                onChange={(event) => setReportReason(event.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-black/20 bg-transparent px-3 pr-9 text-sm outline-none focus:border-[#ff6670] dark:border-white/20"
              >
                <option value="" disabled className="bg-white dark:bg-[#111]">
                  Select a reason
                </option>
                {reportReasons.map((reason) => (
                  <option key={reason} value={reason} className="bg-white dark:bg-[#111]">
                    {reason}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black/50 dark:text-white/50" size={16} />
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium">
              Additional Context <span className="font-normal text-black/40 dark:text-white/40">(Optional)</span>
            </label>
            <textarea
              value={reportDetails}
              onChange={(event) => setReportDetails(event.target.value)}
              rows={3}
              placeholder="Provide any additional details that can help us understand the situation..."
              className="w-full resize-none rounded-lg border border-black/20 bg-transparent px-3 py-2.5 text-sm outline-none placeholder-black/40 focus:border-[#ff6670] dark:border-white/20 dark:placeholder-white/40"
            />
          </div>

          <div className="mt-4 flex items-start gap-2 rounded-lg bg-[#ff5870]/10 px-3 py-2.5 text-xs text-black/70 dark:text-white/70">
            <Lock size={14} className="mt-0.5 shrink-0 text-[#ff5870]" />
            All reports are confidential. We review every report and take action that helps keep our community safe.
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={closeReportModal}
              className="h-11 rounded-md border border-black/20 text-sm font-semibold hover:bg-black/5 dark:border-white/25 dark:hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmitReport}
              disabled={!reportReason}
              className="h-11 rounded-md bg-gradient-to-r from-[#ff5870] to-[#ff7651] text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Submit Report and report user
            </button>
          </div>
        </section>
      </div>
    )}
    </>
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
