import { Loader2 } from "lucide-react";

export function PageLoader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <Loader2 className="w-10 h-10 text-lime-400 animate-spin mb-4" />
      <p className="text-zinc-400 text-sm animate-pulse">Loading...</p>
    </div>
  );
}
