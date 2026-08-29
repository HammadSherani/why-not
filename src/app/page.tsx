import Image from "next/image";
import Link from "next/link";
import ActivitiesCarousel from "@/components/home/ActivitiesCarousel";
import FeaturedPlansCarousel from "@/components/home/FeaturedPlansCarousel";
import Footer from "@/components/layout/Footer";
import {
  ArrowUpRight,
  CalendarHeart,
  CalendarRange,
  Compass,
  HeartHandshake,
  LockKeyhole,
  MapPin,
  Route,
  Shield,
  Sparkles,
  User,
  Workflow,
  Zap,
} from "lucide-react";

const navLinks = [
  { label: "Why Not?", href: "/" },
  { label: "Discover", href: "/discover" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Community", href: "#community" },
  { label: "Contact", href: "#contact" },
];

const steps = [
  {
    step: "Step 1",
    title: "Discover",
    description:
      "Browse exciting plans created by local people from coffee dates and dinners to hiking and weekend adventures.",
    image: "/assets/website-images/d-1.png",
  },
  {
    step: "Step 2",
    title: "Match",
    description: "Request to join a plan. Once the organizer accepts your request, you're officially matched.",
    image: "/assets/website-images/d-2.png",
  },
  {
    step: "Step 3",
    title: "Meet",
    description: "Start chatting instantly, get the meeting details, and enjoy your real-life experience together.",
    image: "/assets/website-images/d-3.png",
  },
];

const whyChooseFeatures = [
  {
    number: 1,
    icon: CalendarHeart,
    title: "Real Plans Real Connections",
    description:
      "Why Not? turns spontaneous plans into meaningful real life connections through a platform built around trust privacy and mutual choice.",
  },
  {
    number: 2,
    icon: LockKeyhole,
    title: "Privacy in Your Control",
    description:
      "Your exact venue and personal meeting details remain hidden until the organizer accepts your request and a match is confirmed.",
  },
  {
    number: 3,
    icon: HeartHandshake,
    title: "Verified & Mutual Matching",
    description:
      "Verified profiles and a two-way approval process ensure that both people feel comfortable before a private conversation begins.",
  },
  {
    number: 4,
    icon: Route,
    title: "Simple from Plan to Meetup",
    description:
      "Discover a plan request to join, get matched and start chatting all through a simple clean and easy to use experience.",
  },
];

const communityStats = [
  { value: "5,000+", label: "Active Member", description: "Amazing people join daily." },
  { value: "1,200+", label: "Plans Created", description: "Coffee meetups and adventures." },
  { value: "8500+", label: "Successful Matches", description: "Meaningful connections that last" },
  { value: "95%", label: "Positive Experiences", description: "Safe fun positive experiences." },
];

const highlights = [
  {
    icon: Zap,
    title: "Spontaneus Plans",
    description: "Discover and join exciting plans at the last minute.",
  },
  {
    icon: User,
    title: "Meet Real People",
    description: "Connect with like minded people around you.",
  },
  {
    icon: MapPin,
    title: "Local & Relevant",
    description: "Find plans happening near you, right now.",
  },
  {
    icon: Shield,
    title: "Safe & Trusted",
    description: "Verified users and secure community environment..",
  },
];

export default function Home() {
  return (
    <>
      <div className="relative isolate flex min-h-screen flex-col overflow-hidden bg-[#0b0620] text-white">
        <Image
          src="/assets/website-images/01.png"
          alt="Friends watching the sunset over the city skyline"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0620] via-[#0b0620]/70 to-transparent" />

          <div className="relative z-10 flex flex-1 flex-col">
            <header className="flex items-center justify-between gap-4 px-5 py-5 sm:px-8 sm:py-6 lg:px-12 xl:px-20">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/assets/logo.png" alt="WhyNot" width={72} height={46} className="h-auto w-[52px]" />
              </Link>

              <nav className="hidden items-center gap-6 text-xs text-white/80 lg:flex">
                {navLinks.map(({ label, href }, index) => (
                  <Link
                    key={label}
                    href={href}
                    className={index === 0 ? "font-semibold text-[#ff5870]" : "hover:text-white"}
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-2.5">
                <Link
                  href="/auth/login"
                  className="rounded-full border border-white/40 px-4 py-2 text-xs font-medium text-white hover:bg-white/10"
                >
                  Login
                </Link>
                <Link
                  href="/auth/sign-up"
                  className="rounded-full bg-gradient-to-r from-[#ff5870] to-[#ff7651] px-4 py-2 text-xs font-semibold text-white"
                >
                  Sign Up
                </Link>
              </div>
            </header>

            <main className="flex flex-1 flex-col justify-center px-5 sm:px-8 lg:px-12 xl:px-20">
              <p className="flex items-center gap-1.5 text-xs font-medium text-white/80">
                <Zap size={13} className="text-white" />
                Plan less. Live more
              </p>

              <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Why plan tomorrow?
                <br />
                Live today.
              </h1>

              <p className="mt-5 max-w-xl text-sm text-white/75 sm:text-base">
                Why Not? helps you find last minute plans spontaneous events and exciting people around you. Stop
                overthinking Start living.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/auth/sign-up"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff5870] to-[#ff7651] px-5 py-2.5 text-xs font-semibold text-white"
                >
                  Join for Free
                  <ArrowUpRight size={14} />
                </Link>
                <Link
                  href="/discover"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2.5 text-xs font-semibold text-white hover:bg-white/10"
                >
                  Explore Events
                </Link>
              </div>
            </main>

            <section className="border-t border-white/10 bg-black/30 backdrop-blur-sm">
              <div className="grid grid-cols-1 gap-6 px-5 py-6 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-12 xl:px-20">
                {highlights.map(({ icon: Icon, title, description }) => (
                  <div key={title} className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff5870]/30 to-[#ff7651]/30 text-[#ff7651]">
                      <Icon size={16} />
                    </span>
                    <div>
                      <h3 className="text-xs font-semibold text-white">{title}</h3>
                      <p className="mt-1 text-[11px] text-white/65">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

      <section className="bg-white px-5 py-16 text-center sm:px-8 sm:py-20 lg:px-12 xl:px-20">
        <div className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-pink-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#ff5870]">
          <Workflow size={14} />
          How It Works
        </div>

        <h2 className="mt-4 text-3xl font-bold text-black sm:text-4xl">Meet New People in Just 3 Steps</h2>

        <p className="mx-auto mt-3 max-w-xl text-sm text-black/60 sm:text-base">
          Simple safe and fun discover exciting plans meet genuine people and start building meaningful real life
          connections today.
        </p>

        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
          {steps.map(({ step, title, description, image }) => (
            <div key={step} className="overflow-hidden rounded-3xl bg-gray-50">
              <div className="flex items-center justify-center bg-gradient-to-br from-[#f3ecfb] to-[#fdeef6] p-6">
                <Image
                  src={image}
                  alt={title}
                  width={368}
                  height={230}
                  className="h-auto w-full max-w-[280px] object-contain"
                />
              </div>
              <div className="p-6">
                <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-medium text-black/70 shadow-sm">
                  {step}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-black">{title}</h3>
                <p className="mt-2 text-sm text-black/60">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="overflow-hidden bg-gradient-to-br from-[#fdf1ee] via-[#fdf4f2] to-[#eef0fb] px-5 py-16 text-center sm:px-8 sm:py-20 lg:px-12 xl:px-20">
        <div className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#ff5870] shadow-sm">
          <Sparkles size={14} />
          Why Choose WhyNot?
        </div>

        <h2 className="mt-4 text-3xl font-bold text-black sm:text-4xl">More Than Just Another Social App</h2>

        <p className="mx-auto mt-3 max-w-xl text-sm text-black/60 sm:text-base">
          Why Not? turns spontaneous plans into meaningful real life connections through a platform built around
          trust privacy and mutual choice.
        </p>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 items-center gap-6 text-left lg:grid-cols-3">
          <div className="flex flex-col gap-6">
            {[whyChooseFeatures[0], whyChooseFeatures[2]].map(({ number, icon: Icon, title, description }) => (
              <div key={number} className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-pink-50 text-[#ff5870]">
                    <Icon size={16} />
                  </span>
                  <h3 className="text-base font-semibold text-black">
                    {number}. {title}
                  </h3>
                </div>
                <p className="mt-3 text-sm text-black/60">{description}</p>
              </div>
            ))}
          </div>

          <div className="order-first lg:order-none">
            <Image
              src="/assets/website-images/f-1.png"
              alt="Friends enjoying coffee together at sunset"
              width={1180}
              height={886}
              className="h-auto w-full rounded-3xl object-cover shadow-xl"
            />
          </div>

          <div className="flex flex-col gap-6">
            {[whyChooseFeatures[1], whyChooseFeatures[3]].map(({ number, icon: Icon, title, description }) => (
              <div key={number} className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-pink-50 text-[#ff5870]">
                    <Icon size={16} />
                  </span>
                  <h3 className="text-base font-semibold text-black">
                    {number}. {title}
                  </h3>
                </div>
                <p className="mt-3 text-sm text-black/60">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <Link
          href="/discover"
          className="mx-auto mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff5870] to-[#ff7651] px-6 py-3 text-sm font-semibold text-white"
        >
          Start Exploring Plans
          <ArrowUpRight size={16} />
        </Link>
      </section>

      <section className="bg-[#f1eefa] px-5 py-16 text-center sm:px-8 sm:py-20 lg:px-12 xl:px-20">
        <div className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#ff5870] shadow-sm">
          <Compass size={14} />
          Explore Activities
        </div>

        <h2 className="mt-4 text-3xl font-bold text-black sm:text-4xl">Find a Plan for Today</h2>

        <p className="mx-auto mt-3 max-w-xl text-sm text-black/60 sm:text-base">
          Explore spontaneous activities happening around Madrid and join the one that matches your mood.
        </p>

        <ActivitiesCarousel />
      </section>

      <section className="bg-white px-5 py-16 text-center sm:px-8 sm:py-20 lg:px-12 xl:px-20">
        <div className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-pink-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#ff5870]">
          <CalendarRange size={14} />
          Featured Plans
        </div>

        <h2 className="mt-4 text-3xl font-bold text-black sm:text-4xl">Discover What&apos;s Happening Today</h2>

        <p className="mx-auto mt-3 max-w-xl text-sm text-black/60 sm:text-base">
          Explore exciting plans created by our community and join activities that match your interests.
        </p>

        <FeaturedPlansCarousel />
      </section>

      <section className="bg-[#fdf1ee] px-5 py-16 text-center sm:px-8 sm:py-20 lg:px-12 xl:px-20">
        <div className="mx-auto inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[#ff5870]">
          <User size={14} />
          Our Community
        </div>

        <h2 className="mt-4 text-3xl font-bold text-black sm:text-4xl">Trusted by People Who Love Real Experiences</h2>

        <p className="mx-auto mt-3 max-w-2xl text-sm text-black/60 sm:text-base">
          A growing community built around real plans, genuine connections, meaningful experiences, and unforgettable
          memories that continue to last.
        </p>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-y-10 lg:grid-cols-4">
          {communityStats.map(({ value, label, description }) => (
            <div key={label}>
              <p className="text-4xl font-bold text-black sm:text-5xl">{value}</p>
              <p className="mx-auto mt-2 inline-block border-b-2 border-[#ff5870] pb-2 text-sm font-semibold text-black">
                {label}
              </p>
              <p className="mt-2 text-sm text-black/60">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
