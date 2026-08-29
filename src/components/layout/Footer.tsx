import Image from "next/image";
import Link from "next/link";

const footerColumns = [
  {
    title: "Discover",
    links: [
      { label: "Discover Plans", href: "/discover" },
      { label: "Create a Plan", href: "/plan/create-my-plan" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Featured Activities", href: "#" },
      { label: "Popular Meetups", href: "#" },
      { label: "Community Stories", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Contact Support", href: "#" },
      { label: "Safety Center", href: "#" },
      { label: "Community Guidelines", href: "#" },
      { label: "Report a User", href: "#" },
      { label: "Manage Account", href: "/profile" },
    ],
  },
  {
    title: "Activities",
    links: [
      { label: "Dinner Meetups", href: "/discover" },
      { label: "Coffee Plans", href: "/discover" },
      { label: "Hiking", href: "/discover" },
      { label: "Sports", href: "/discover" },
      { label: "Travel", href: "/discover" },
      { label: "Live Events", href: "/discover" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "About WhyNot", href: "#" },
      { label: "Our Community", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Partners", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "FAQs", href: "#" },
    ],
  },
];

const bottomLinks = [
  { label: "Privacy Policy", href: "/profile/privacy" },
  { label: "Terms", href: "/profile/legal" },
  { label: "Terms of Service", href: "/profile/legal" },
  { label: "Cookie Policy", href: "#" },
  { label: "Support", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-black px-5 py-14 text-white sm:px-8 sm:py-16 lg:px-12 xl:px-20">
      <div className="mx-auto max-w-6xl text-center">
        <Image src="/assets/logo.png" alt="WhyNot" width={90} height={58} className="mx-auto h-auto w-16" />

        <h2 className="mt-6 text-2xl font-bold sm:text-3xl">Turn Plans Into Real Experiences</h2>

        <p className="mx-auto mt-3 max-w-xl text-sm text-white/60">
          Join a community where shared interests become real meetups, meaningful connections, and unforgettable
          memories.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 text-left sm:grid-cols-4">
          {footerColumns.map(({ title, links }) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white">{title}</h3>
              <ul className="mt-4 space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-white/60 hover:text-white">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-[#ff5870]/40" />

        <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-white/50">&copy;WhyNot 2026, All Rights Reserved</p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            {bottomLinks.map(({ label, href }) => (
              <Link key={label} href={href} className="text-xs text-white/60 hover:text-white">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
