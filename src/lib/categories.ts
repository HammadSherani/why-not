import {
  Coffee,
  Dumbbell,
  MoonStar,
  Music2,
  Plane,
  Trees,
  Utensils,
  Wine,
  type LucideIcon,
} from "lucide-react";

export interface Category {
  label: string;
  icon: LucideIcon;
}

export const categories: Category[] = [
  { label: "Dinner", icon: Utensils },
  { label: "Coffee", icon: Coffee },
  { label: "Hiking", icon: Trees },
  { label: "Wine", icon: Wine },
  { label: "Sports", icon: Dumbbell },
  { label: "Music", icon: Music2 },
  { label: "Park", icon: Trees },
  { label: "Travel", icon: Plane },
  { label: "Picnic", icon: Utensils },
  { label: "Nightlife", icon: MoonStar },
];
