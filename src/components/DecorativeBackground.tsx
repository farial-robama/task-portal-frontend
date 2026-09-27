import { Leaf } from "lucide-react";

export function DecorativeBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Top-left */}
      <div className="absolute -left-10 -top-10 h-36 w-36 rounded-[40%] bg-accent" />

      {/* Bottom-left */}
      <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-accent-soft blur-2xl" />

      {/* Bottom-right */}
      <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-status-completed/10 blur-2xl" />
      <div className="absolute bottom-8 right-10 flex -rotate-12 gap-1.5 text-accent/70">
        <Leaf size={40} />
        <Leaf size={30} className="mt-6" />
        <Leaf size={22} className="mt-12" />
      </div>
    </div>
  );
}