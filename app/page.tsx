"use client";

import { useState } from "react";
import { PButton } from "@porsche-design-system/components-react";
import SearchByNotes from "@/components/SearchByNotes";
import DupeFinder from "@/components/DupeFinder";
import Explorer from "@/components/Explorer";

type ActiveView = "dashboard" | "search" | "dupes" | "explore";

export default function Home() {
  const [activeView, setActiveView] = useState<ActiveView>("dashboard");

  // Show expanded view based on active section
  if (activeView === "search") {
    return <SearchByNotes onBack={() => setActiveView("dashboard")} />;
  }

  if (activeView === "dupes") {
    return <DupeFinder onBack={() => setActiveView("dashboard")} />;
  }

  if (activeView === "explore") {
    return <Explorer onBack={() => setActiveView("dashboard")} />;
  }

  // Dashboard view
  return (
    <main className="min-h-screen p-4 md:p-8 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16 pt-6 md:pt-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            SCENT
          </h1>
          <p className="text-lg md:text-xl mb-2 text-gray-200">
            Smart Comparison Engine for Notes & Traits
          </p>
          <p className="text-sm md:text-base text-gray-400">
            Find affordable perfume dupes and discover fragrances by their notes
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 mb-8 md:mb-12 max-w-2xl mx-auto">
          <div className="text-center p-2 md:p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
            <div className="text-2xl md:text-4xl font-bold text-white">517</div>
            <p className="text-xs md:text-sm text-gray-300">Fragrances</p>
          </div>
          <div className="text-center p-2 md:p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
            <div className="text-2xl md:text-4xl font-bold text-white">498</div>
            <p className="text-xs md:text-sm text-gray-300">Unique Notes</p>
          </div>
          <div className="text-center p-2 md:p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
            <div className="text-2xl md:text-4xl font-bold text-white">100%</div>
            <p className="text-xs md:text-sm text-gray-300">Free</p>
          </div>
        </div>

        {/* Main Features Grid */}
        <div className="space-y-4 mb-8">
          <button
            onClick={() => setActiveView("search")}
            className="w-full p-4 md:p-8 bg-gray-800 border border-gray-700 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-750 transition-all active:scale-[0.98] md:hover:scale-[1.02] cursor-pointer text-left"
          >
            <div className="text-xl md:text-2xl font-bold mb-2 md:mb-4 text-white">
              Search by Notes
            </div>
            <p className="mb-4 md:mb-6 text-sm md:text-base text-gray-300">
              Enter perfume notes to find matching fragrances. Filter by price, brand, and more.
            </p>
            <PButton variant="primary">
              Start Searching →
            </PButton>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setActiveView("dupes")}
              className="w-full p-4 md:p-6 bg-gray-800 border border-gray-700 rounded-lg h-full shadow-lg hover:shadow-xl hover:bg-gray-750 transition-all active:scale-[0.98] md:hover:scale-[1.02] cursor-pointer text-left"
            >
              <div className="text-lg md:text-xl font-bold mb-2 md:mb-4 text-white">
                Dupe Finder
              </div>
              <p className="mb-4 md:mb-6 text-sm md:text-base text-gray-300">
                Find affordable alternatives to expensive fragrances based on note similarity.
              </p>
              <PButton variant="secondary">
                Find Dupes →
              </PButton>
            </button>

            <button
              onClick={() => setActiveView("explore")}
              className="w-full p-4 md:p-6 bg-gray-800 border border-gray-700 rounded-lg h-full shadow-lg hover:shadow-xl hover:bg-gray-750 transition-all active:scale-[0.98] md:hover:scale-[1.02] cursor-pointer text-left"
            >
              <div className="text-lg md:text-xl font-bold mb-2 md:mb-4 text-white">
                Fragrance Explorer
              </div>
              <p className="mb-4 md:mb-6 text-sm md:text-base text-gray-300">
                Explore perfumes visually with interactive note pyramids and ingredient details.
              </p>
              <PButton variant="secondary">
                Explore →
              </PButton>
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="text-center mt-16 pb-12">
          <p className="text-sm text-gray-400">
            Discover your perfect scent without breaking the bank
          </p>
        </div>
      </div>
    </main>
  );
}
