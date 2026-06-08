import { Nav } from "./Nav";
import { Footer } from "./Footer";
import type { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" className="min-h-screen bg-[var(--canvas)] text-[var(--ink)]">
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}