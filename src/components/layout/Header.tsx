"use client";

import React from "react";
import Button from "@/components/ui/Button";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">Time Slot App</h1>
          </div>

          <div className="flex items-center space-x-4">
            <Button onClick={() => {}} variant="primary" size="md">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
