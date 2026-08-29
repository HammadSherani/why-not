import type { LucideIcon } from "lucide-react";
import Switch from "@/components/ui/Switch";

interface SettingToggleRowProps {
  icon: LucideIcon;
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function SettingToggleRow({ icon: Icon, title, description, checked, onChange }: SettingToggleRowProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-[#111]">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#ff5870]/10 text-[#ff5870]">
        <Icon size={18} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-0.5 text-xs text-black/50 dark:text-white/50">{description}</p>
      </div>
      <Switch checked={checked} onChange={onChange} ariaLabel={title} />
    </div>
  );
}
