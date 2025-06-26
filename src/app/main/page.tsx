import React from "react";
import Header from "@/components/layout/Header";
import { EventManager } from "@/components/events";
import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth0.getSession();

  if (!session) {
    return redirect("/auth/login?returnTo=/main");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Welcome, {session.user.name}!
          </h1>
          <EventManager />
        </div>
      </main>
    </div>
  );
}
