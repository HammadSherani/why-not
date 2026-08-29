import { Check } from "lucide-react";
import Link from "next/link";

export default function ProfileSetupCompletePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050505]">
      <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden rounded-3xl bg-[#030303] px-6 py-10">
        <svg
          aria-hidden="true"
          viewBox="0 0 1600 900"
          preserveAspectRatio="none"
          className="absolute inset-0 size-full opacity-70"
        >
          <g fill="none" stroke="#1d1d1d" strokeWidth="2">
            <path d="M-50 90C250 10 320 280 650 150S1120 60 1650 180" />
            <path d="M-50 115C250 35 320 305 650 175S1120 85 1650 205" />
            <path d="M-50 140C250 60 320 330 650 200S1120 110 1650 230" />
            <path d="M-50 165C250 85 320 355 650 225S1120 135 1650 255" />
            <path d="M-50 190C250 110 320 380 650 250S1120 160 1650 280" />
            <path d="M-50 720C260 590 420 860 760 690S1200 540 1650 690" />
            <path d="M-50 745C260 615 420 885 760 715S1200 565 1650 715" />
            <path d="M-50 770C260 640 420 910 760 740S1200 590 1650 740" />
            <path d="M-50 795C260 665 420 935 760 765S1200 615 1650 765" />
            <path d="M-50 820C260 690 420 960 760 790S1200 640 1650 790" />
            <path d="M1180 -50C1040 180 1380 280 1190 500S1120 860 1210 950" />
            <path d="M1210 -50C1070 180 1410 280 1220 500S1150 860 1240 950" />
            <path d="M1240 -50C1100 180 1440 280 1250 500S1180 860 1270 950" />
          </g>
        </svg>

        <div className="relative z-10 flex max-w-xl flex-col items-center text-center">
          <div className="relative mb-6 flex size-20 items-center justify-center">
            <div
              className="absolute size-20 bg-[#ff5870]"
              style={{ clipPath: "polygon(35% 0, 65% 0, 65% 22%, 87% 10%, 100% 35%, 78% 48%, 100% 61%, 87% 87%, 65% 75%, 65% 100%, 35% 100%, 35% 75%, 13% 87%, 0 61%, 22% 48%, 0 35%, 13% 10%, 35% 22%)" }}
            />
            <Check size={38} className="relative text-white" strokeWidth={2.5} />
          </div>

          <h1 className="text-4xl font-semibold text-white sm:text-5xl">Thank You</h1>
          <p className="mt-5 max-w-lg text-sm leading-6 text-white/75">
            Meet new people through real plans, shared moments, and genuine connections. From
            coffee dates to weekend adventures, Why Not? helps you turn conversations into
            unforgettable experiences.
          </p>

          <Link
            href="/discover"
            className="mt-8 flex h-12 w-full max-w-sm items-center justify-center rounded-md bg-gradient-to-r from-[#ff5870] to-[#ff7651] text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Find your plan
          </Link>
        </div>
      </div>
    </main>
  );
}
