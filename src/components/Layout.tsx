import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { PhotonField } from "./PhotonField";
import type { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" className="relative min-h-screen bg-emerald-radial text-[var(--ink)]">
      <PhotonField />
      <div className="relative z-10">
        <Nav />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}