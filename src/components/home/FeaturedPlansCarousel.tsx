"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, CreditCard, Heart, MapPin, User, UtensilsCrossed } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const plans = [
  {
    badge: "Dinner Night",
    title: "Dinner Night",
    image: "/assets/website-images/c-1.png",
    location: "Madrid Central",
    time: "Friday 8:00 PM",
    host: "Hosted by Sofia, 27",
    payment: "Split 50/50",
  },
  {
    badge: "Hiking",
    title: "Hiking Adventure",
    image: "/assets/website-images/c-2.png",
    location: "Sierra de Guadarrama",
    time: "Saturday 9:00 AM",
    host: "Hosted by: Daniel, 28",
    payment: "Split 50/50",
  },
  {
    badge: "Coffee Meetup",
    title: "Coffee Meetup",
    image: "/assets/website-images/c-3.png",
    location: "Barcelona Centre",
    time: "Saturday 10:00 AM",
    host: "Hosted by: Lucia, 26",
    payment: "Split 50/50",
  },
];

export default function FeaturedPlansCarousel() {
  return (
    <div className="mx-auto mt-10 max-w-6xl">
      <Swiper
        spaceBetween={20}
        slidesPerView={1.15}
        loop
        grabCursor
        breakpoints={{
          640: { slidesPerView: 1.7 },
          1024: { slidesPerView: 2.25 },
          1280: { slidesPerView: 3.25 },
        }}
        className="!pb-2"
      >
        {[...plans, ...plans].map(({ badge, title, image, location, time, host, payment }, index) => (
          <SwiperSlide key={`${title}-${index}`}>
            <div className="overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-1 ring-black/5">
              <div className="relative aspect-[4/3]">
                <Image src={image} alt={title} fill className="object-cover" />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  <UtensilsCrossed size={13} />
                  {badge}
                </span>
                <button
                  type="button"
                  aria-label="Save plan"
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-black hover:bg-white"
                >
                  <Heart size={15} />
                </button>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-black">{title}</h3>

                <div className="mt-3 space-y-1.5 text-sm text-black/60">
                  <div className="flex items-center gap-2">
                    <MapPin size={15} />
                    {location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={15} />
                    {time}
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={15} />
                    {host}
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard size={15} />
                    Payment: {payment}
                  </div>
                </div>

                <Link
                  href="/discover"
                  className="mt-4 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff5870] to-[#ff7651] py-3 text-sm font-semibold text-white"
                >
                  Join for Free
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
