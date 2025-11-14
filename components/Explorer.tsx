"use client";

import { useState, useMemo } from "react";
import { PHeadline, PText, PButton, PTextFieldWrapper } from "@porsche-design-system/components-react";
import { fragrances, getAllBrands, getAllGenders } from "@/utils/fragrance";
import type { Fragrance } from "@/types/fragrance";
import FragranceCard from "./FragranceCard";

interface ExplorerProps {
  onBack: () => void;
}

export default function Explorer({ onBack }: ExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGender, setSelectedGender] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"rating" | "name" | "votes">("rating");
  const [selectedFragrance, setSelectedFragrance] = useState<Fragrance | null>(null);

  const brands = useMemo(() => getAllBrands(), []);
  const genders = useMemo(() => getAllGenders(), []);

  // Filter and sort fragrances
  const displayedFragrances = useMemo(() => {
    let filtered = fragrances.filter(f => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !f.name.toLowerCase().includes(query) &&
          !f.brand.toLowerCase().includes(query) &&
          !f.topNotes.some(n => n.toLowerCase().includes(query)) &&
          !f.middleNotes.some(n => n.toLowerCase().includes(query)) &&
          !f.baseNotes.some(n => n.toLowerCase().includes(query))
        ) {
          return false;
        }
      }

      // Gender filter
      if (selectedGender !== "all") {
        if (!f.gender.toLowerCase().includes(selectedGender.toLowerCase())) {
          return false;
        }
      }

      // Brand filter
      if (selectedBrand !== "all") {
        if (f.brand !== selectedBrand) {
          return false;
        }
      }

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "votes":
          return b.votes - a.votes;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered.slice(0, 50); // Limit to 50 for performance
  }, [searchQuery, selectedGender, selectedBrand, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedGender("all");
    setSelectedBrand("all");
    setSortBy("rating");
  };

  if (selectedFragrance) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <PHeadline variant="headline-2">Fragrance Details</PHeadline>
            <PButton variant="tertiary" onClick={() => setSelectedFragrance(null)}>
              Back to Explorer
            </PButton>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Image */}
              <div className="md:col-span-1">
                <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  {selectedFragrance.image ? (
                    <img
                      src={selectedFragrance.image}
                      alt={selectedFragrance.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <PHeadline variant="headline-3" className="mb-2">
                    {selectedFragrance.name}
                  </PHeadline>
                  <PText size="large" className="text-gray-600">
                    {selectedFragrance.brand}
                  </PText>
                </div>

                {/* Rating & Stats */}
                <div className="flex gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-yellow-500 text-xl">★</span>
                      <span className="text-2xl font-bold">{selectedFragrance.rating.toFixed(1)}</span>
                    </div>
                    <PText size="small" className="text-gray-600">
                      {selectedFragrance.votes} votes
                    </PText>
                  </div>
                  <div className="border-l pl-6">
                    <PText size="small" className="text-gray-600 mb-1">
                      Gender
                    </PText>
                    <PText className="capitalize">{selectedFragrance.gender}</PText>
                  </div>
                </div>

                {/* Description */}
                {selectedFragrance.description && (
                  <div>
                    <PText className="text-gray-700 leading-relaxed">
                      {selectedFragrance.description.split('.')[0]}.
                    </PText>
                  </div>
                )}

                {/* Notes */}
                <div className="space-y-4">
                  <PHeadline variant="headline-5">Fragrance Notes</PHeadline>

                  {selectedFragrance.topNotes.length > 0 && (
                    <div>
                      <PText size="small" className="font-semibold mb-2">
                        Top Notes
                      </PText>
                      <div className="flex flex-wrap gap-2">
                        {selectedFragrance.topNotes.map((note, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedFragrance.middleNotes.length > 0 && (
                    <div>
                      <PText size="small" className="font-semibold mb-2">
                        Middle Notes (Heart)
                      </PText>
                      <div className="flex flex-wrap gap-2">
                        {selectedFragrance.middleNotes.map((note, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedFragrance.baseNotes.length > 0 && (
                    <div>
                      <PText size="small" className="font-semibold mb-2">
                        Base Notes
                      </PText>
                      <div className="flex flex-wrap gap-2">
                        {selectedFragrance.baseNotes.map((note, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Performance Metrics */}
                {(selectedFragrance.longevity || selectedFragrance.sillage) && (
                  <div className="grid grid-cols-2 gap-4">
                    {selectedFragrance.longevity && Object.keys(selectedFragrance.longevity).length > 0 && (
                      <div>
                        <PText size="small" className="font-semibold mb-2">
                          Longevity
                        </PText>
                        <div className="space-y-1">
                          {Object.entries(selectedFragrance.longevity)
                            .sort(([, a], [, b]) => (b as number) - (a as number))
                            .slice(0, 3)
                            .map(([key, value]) => (
                              <div key={key} className="flex justify-between text-sm">
                                <span className="capitalize">{key}</span>
                                <span className="text-gray-600">{value}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                    {selectedFragrance.sillage && Object.keys(selectedFragrance.sillage).length > 0 && (
                      <div>
                        <PText size="small" className="font-semibold mb-2">
                          Sillage
                        </PText>
                        <div className="space-y-1">
                          {Object.entries(selectedFragrance.sillage)
                            .sort(([, a], [, b]) => (b as number) - (a as number))
                            .slice(0, 3)
                            .map(([key, value]) => (
                              <div key={key} className="flex justify-between text-sm">
                                <span className="capitalize">{key}</span>
                                <span className="text-gray-600">{value}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <PHeadline variant="headline-2" className="mb-2">
              Fragrance Explorer
            </PHeadline>
            <PText>Browse and discover {fragrances.length} fragrances</PText>
          </div>
          <PButton variant="tertiary" icon="arrow-head-left" onClick={onBack}>
            Back to Dashboard
          </PButton>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <PHeadline variant="headline-5">Filters</PHeadline>

              {/* Search */}
              <div>
                <PTextFieldWrapper label="Search">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Name or note..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </PTextFieldWrapper>
              </div>

              {/* Gender */}
              <div>
                <PText size="small" className="font-semibold mb-2">
                  Gender
                </PText>
                <select
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All</option>
                  <option value="women">Women</option>
                  <option value="men">Men</option>
                  <option value="unisex">Unisex</option>
                </select>
              </div>

              {/* Brand */}
              <div>
                <PText size="small" className="font-semibold mb-2">
                  Brand
                </PText>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 max-h-40"
                >
                  <option value="all">All Brands</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <PText size="small" className="font-semibold mb-2">
                  Sort by
                </PText>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="votes">Most Popular</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>

              <PButton variant="tertiary" className="w-full" onClick={handleClearFilters}>
                Clear Filters
              </PButton>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="mb-4">
              <PText size="small" className="text-gray-600">
                Showing {displayedFragrances.length} of {fragrances.length} fragrances
              </PText>
            </div>

            <div className="space-y-4">
              {displayedFragrances.map(fragrance => (
                <div
                  key={fragrance.id}
                  onClick={() => setSelectedFragrance(fragrance)}
                  className="cursor-pointer"
                >
                  <FragranceCard fragrance={fragrance} />
                </div>
              ))}
            </div>

            {displayedFragrances.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <PHeadline variant="headline-4" className="mb-4">
                  No fragrances found
                </PHeadline>
                <PText>Try adjusting your filters or search query</PText>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
