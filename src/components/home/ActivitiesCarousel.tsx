"use client";

import Image from "next/image";
import Link from "next/link";
import { Backpack, Coffee, Music2, ShoppingBasket, Trophy, UtensilsCrossed } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const activities = [
  { label: "Dinner", icon: UtensilsCrossed, image: "/assets/website-images/h-1.png" },
  { label: "Coffee", icon: Coffee, image: "/assets/website-images/h-2.png" },
  { label: "Hiking", icon: Backpack, image: "/assets/website-images/h-3.png" },
  { label: "Sports", icon: Trophy, image: "/assets/website-images/h-4.png" },
  { label: "Picnic", icon: ShoppingBasket, image: "/assets/website-images/h-5.png" },
  { label: "Nightlife", icon: Music2, image: "/assets/website-images/h-6.png" },
];

export default function ActivitiesCarousel() {
  return (
    <div className="mx-auto mt-10 max-w-6xl">
      <Swiper
        spaceBetween={20}
        slidesPerView={2.2}
        loop
        grabCursor
        breakpoints={{
          640: { slidesPerView: 3.2 },
          1024: { slidesPerView: 4.2 },
          1280: { slidesPerView: 5.2 },
        }}
        className="!pb-2"
      >
        {activities.map(({ label, icon: Icon, image }) => (
          <SwiperSlide key={label}>
            <Link href="/discover" className="group block text-left">
              <div className="aspect-square overflow-hidden rounded-2xl">
                <Image
                  src={image}
                  alt={label}
                  width={220}
                  height={220}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Icon size={18} className="text-black" />
                <span className="text-sm font-medium text-black sm:text-base">{label}</span>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
