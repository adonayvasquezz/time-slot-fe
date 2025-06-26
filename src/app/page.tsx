import React from "react";
import Header from "@/components/layout/Header";
import Hero from "@/components/home/MainFold";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <Hero />
      </main>
    </div>
  );
}
