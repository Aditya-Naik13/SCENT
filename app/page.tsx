"use client";

import { useState } from "react";
import { PHeadline, PText, PButton, PGrid, PGridItem } from "@porsche-design-system/components-react";
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
    <main className="min-h-screen p-4 md:p-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16 pt-6 md:pt-12">
          <PHeadline variant="headline-1" className="mb-4">
            SCENT
          </PHeadline>
          <PText size="large" className="mb-2">
            Smart Comparison Engine for Notes & Traits
          </PText>
          <PText className="text-sm md:text-base">
            Find affordable perfume dupes and discover fragrances by their notes
          </PText>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 mb-8 md:mb-12 max-w-2xl mx-auto">
          <div className="text-center p-2 md:p-4 bg-white rounded-lg shadow-sm">
            <div className="text-2xl md:text-4xl font-bold">517</div>
            <PText size="small" className="text-xs md:text-sm">Fragrances</PText>
          </div>
          <div className="text-center p-2 md:p-4 bg-white rounded-lg shadow-sm">
            <div className="text-2xl md:text-4xl font-bold">498</div>
            <PText size="small" className="text-xs md:text-sm">Unique Notes</PText>
          </div>
          <div className="text-center p-2 md:p-4 bg-white rounded-lg shadow-sm">
            <div className="text-2xl md:text-4xl font-bold">100%</div>
            <PText size="small" className="text-xs md:text-sm">Free</PText>
          </div>
        </div>

        {/* Main Features Grid */}
        <div className="space-y-4 mb-8">
          <button
            onClick={() => setActiveView("search")}
            className="w-full p-4 md:p-8 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-[0.98] md:hover:scale-[1.02] cursor-pointer text-left"
          >
            <div className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
              Search by Notes
            </div>
            <PText className="mb-4 md:mb-6 text-sm md:text-base">
              Enter perfume notes to find matching fragrances. Filter by price, brand, and more.
            </PText>
            <PButton variant="primary">
              Start Searching →
            </PButton>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setActiveView("dupes")}
              className="w-full p-4 md:p-6 bg-white border border-gray-200 rounded-lg h-full shadow-sm hover:shadow-md transition-all active:scale-[0.98] md:hover:scale-[1.02] cursor-pointer text-left"
            >
              <div className="text-lg md:text-xl font-bold mb-2 md:mb-4">
                Dupe Finder
              </div>
              <PText className="mb-4 md:mb-6 text-sm md:text-base">
                Find affordable alternatives to expensive fragrances based on note similarity.
              </PText>
              <PButton variant="secondary">
                Find Dupes →
              </PButton>
            </button>

            <button
              onClick={() => setActiveView("explore")}
              className="w-full p-4 md:p-6 bg-white border border-gray-200 rounded-lg h-full shadow-sm hover:shadow-md transition-all active:scale-[0.98] md:hover:scale-[1.02] cursor-pointer text-left"
            >
              <div className="text-lg md:text-xl font-bold mb-2 md:mb-4">
                Fragrance Explorer
              </div>
              <PText className="mb-4 md:mb-6 text-sm md:text-base">
                Explore perfumes visually with interactive note pyramids and ingredient details.
              </PText>
              <PButton variant="secondary">
                Explore →
              </PButton>
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="text-center mt-16 pb-12">
          <PText size="small">
            Discover your perfect scent without breaking the bank
          </PText>
        </div>
      </div>
    </main>
  );
}
