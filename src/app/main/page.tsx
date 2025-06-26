import React from "react";
import Header from "@/components/layout/Header";
import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth0.getSession();

  if (!session) {
    return redirect("/auth/login?returnTo=/main");
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <h1>Welcome, {session.user.name}!</h1>
      </main>
    </div>
  );
}
