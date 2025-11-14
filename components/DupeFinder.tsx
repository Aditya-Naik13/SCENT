"use client";

import { useState, useMemo } from "react";
import { PHeadline, PText, PButton, PTextFieldWrapper } from "@porsche-design-system/components-react";
import { fragrances, findSimilarFragrances } from "@/utils/fragrance";
import type { Fragrance, FragranceSimilarity } from "@/types/fragrance";
import FragranceCard from "./FragranceCard";

interface DupeFinderProps {
  onBack: () => void;
}

export default function DupeFinder({ onBack }: DupeFinderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFragrance, setSelectedFragrance] = useState<Fragrance | null>(null);
  const [dupes, setDupes] = useState<FragranceSimilarity[]>([]);

  // Filter fragrances based on search query
  const filteredFragrances = useMemo(() => {
    if (!searchQuery) return [];
    const query = searchQuery.toLowerCase();
    return fragrances
      .filter(f =>
        f.name.toLowerCase().includes(query) ||
        f.brand.toLowerCase().includes(query)
      )
      .slice(0, 10);
  }, [searchQuery]);

  const handleSelectFragrance = (fragrance: Fragrance) => {
    setSelectedFragrance(fragrance);
    setSearchQuery("");

    // Find similar fragrances
    const similar = findSimilarFragrances(fragrance, 15);
    setDupes(similar);
  };

  const handleClear = () => {
    setSelectedFragrance(null);
    setDupes([]);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8 gap-4">
          <div>
            <div className="text-2xl md:text-3xl font-bold mb-2 text-white">
              Dupe Finder
            </div>
            <PText className="text-sm md:text-base text-gray-300">Find affordable alternatives to expensive fragrances</PText>
          </div>
          <PButton variant="tertiary" icon="arrow-head-left" onClick={onBack} className="self-start md:self-auto">
            Back
          </PButton>
        </div>

        {/* Search Section */}
        {!selectedFragrance ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-8">
              <PHeadline variant="headline-4" className="mb-4 text-white">
                Search for a fragrance
              </PHeadline>

              <div className="relative">
                <PTextFieldWrapper label="Fragrance name or brand">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g., Creed Aventus, Chanel No 5..."
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                </PTextFieldWrapper>

                {/* Search Results Dropdown */}
                {filteredFragrances.length > 0 && (
                  <div className="absolute z-10 w-full mt-2 bg-gray-700 border border-gray-600 rounded-lg shadow-lg max-h-96 overflow-y-auto">
                    {filteredFragrances.map(fragrance => (
                      <button
                        key={fragrance.id}
                        onClick={() => handleSelectFragrance(fragrance)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-600 transition-colors border-b border-gray-600 last:border-b-0"
                      >
                        <div className="font-semibold text-white">{fragrance.name}</div>
                        <div className="text-sm text-gray-300">{fragrance.brand}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {searchQuery && filteredFragrances.length === 0 && (
                <PText size="small" className="mt-2 text-gray-400">
                  No fragrances found. Try a different search term.
                </PText>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Original Fragrance */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <PHeadline variant="headline-4" className="text-white">Original Fragrance</PHeadline>
                <PButton variant="tertiary" onClick={handleClear}>
                  Search Different
                </PButton>
              </div>
              <FragranceCard fragrance={selectedFragrance} showDetails />
            </div>

            {/* Dupes */}
            {dupes.length > 0 && (
              <div>
                <div className="mb-4">
                  <PHeadline variant="headline-4" className="mb-2 text-white">
                    Found {dupes.length} Similar Fragrances
                  </PHeadline>
                  <PText size="small" className="text-gray-300">
                    Sorted by similarity based on note composition
                  </PText>
                </div>

                <div className="space-y-4">
                  {dupes.map(({ fragrance, similarity, matchingNotes }, index) => (
                    <div key={fragrance.id} className="relative">
                      {/* Rank Badge */}
                      <div className="absolute -left-4 top-6 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm z-10">
                        {index + 1}
                      </div>
                      <FragranceCard
                        fragrance={fragrance}
                        similarity={similarity}
                        matchingNotes={matchingNotes}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
