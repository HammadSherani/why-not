import Header from "@/components/layout/Header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-black dark:bg-black dark:text-white">
      <Header />
      {children}
    </div>
  );
}
