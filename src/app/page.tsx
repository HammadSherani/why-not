export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-50 px-6 text-center font-sans dark:bg-black">
      <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
        Next.js + TypeScript + Prisma + MongoDB
      </h1>
      <p className="max-w-md text-zinc-600 dark:text-zinc-400">
        Production-grade starter is ready. Set <code className="font-mono">DATABASE_URL</code> in{" "}
        <code className="font-mono">.env</code>, then try{" "}
        <code className="font-mono">/api/health</code> and{" "}
        <code className="font-mono">/api/users</code>.
      </p>
    </div>
  );
}
