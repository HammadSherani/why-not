const images = [
  "/assets/sign-up.jpeg",
  "/assets/forgot-screen.jpeg",
  "/assets/WhatsApp Image 2026-08-10 at 3.26.41 PM (3).jpeg",
];

const categoryLabels = [
  "Dinner",
  "Wine",
  "Hiking",
  "Coffee",
  "Sports",
  "Music",
  "Park",
  "Travel",
  "Picnic",
  "Nightlife",
];

export interface MyPlan {
  id: string;
  image: string;
  category: string;
  status: "active" | "previous";
  title: string;
  venue: string;
  date: string;
  location: string;
  duration: string;
  description: string;
  paymentSplit: string;
  dressCode: string;
  publishedOn: string;
  organizerName: string;
  organizerAge: number;
}

export const myPlans: MyPlan[] = categoryLabels.map((label, index) => ({
  id: String(index + 1),
  image: images[index % images.length],
  category: label,
  status: index < 8 ? "active" : "previous",
  title: "Dinner at a Nice Restaurant",
  venue: "Casa Bella Madrid",
  date: "Friday, 20:30",
  location: "Madrid Central",
  duration: "2 hour",
  description:
    "Join us at Casa Bella Madrid for delicious food, great conversation, and a memorable evening together!",
  paymentSplit: "Split 50/50",
  dressCode: "Smart casual",
  publishedOn: "Published on: 4 May 2025",
  organizerName: "Sofia",
  organizerAge: 27,
}));

export function getMyPlan(id: string) {
  return myPlans.find((plan) => plan.id === id);
}
