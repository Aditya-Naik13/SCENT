"use client";

import Link from "next/link";
import { PHeadline, PText, PButton, PGrid, PGridItem } from "@porsche-design-system/components-react";

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 pt-12">
          <PHeadline variant="headline-1" className="mb-4">
            SCENT
          </PHeadline>
          <PText size="large" className="mb-2">
            Smart Comparison Engine for Notes & Traits
          </PText>
          <PText>
            Find affordable perfume dupes and discover fragrances by their notes
          </PText>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto">
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <PHeadline variant="headline-2">517</PHeadline>
            <PText size="small">Fragrances</PText>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <PHeadline variant="headline-2">498</PHeadline>
            <PText size="small">Unique Notes</PText>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <PHeadline variant="headline-2">100%</PHeadline>
            <PText size="small">Free</PText>
          </div>
        </div>

        {/* Main Features Grid */}
        <PGrid className="mb-12">
          <PGridItem size={12} className="mb-4">
            <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <PHeadline variant="headline-3" className="mb-4">
                Search by Notes
              </PHeadline>
              <PText className="mb-6">
                Enter perfume notes to find matching fragrances. Filter by price, brand, and more.
              </PText>
              <Link href="/search">
                <PButton variant="primary">
                  Start Searching
                </PButton>
              </Link>
            </div>
          </PGridItem>

          <PGridItem size={6}>
            <div className="p-6 bg-white border border-gray-200 rounded-lg h-full shadow-sm hover:shadow-md transition-shadow">
              <PHeadline variant="headline-4" className="mb-4">
                Dupe Finder
              </PHeadline>
              <PText className="mb-6">
                Find affordable alternatives to expensive fragrances based on note similarity.
              </PText>
              <Link href="/dupes">
                <PButton variant="secondary">
                  Find Dupes
                </PButton>
              </Link>
            </div>
          </PGridItem>

          <PGridItem size={6}>
            <div className="p-6 bg-white border border-gray-200 rounded-lg h-full shadow-sm hover:shadow-md transition-shadow">
              <PHeadline variant="headline-4" className="mb-4">
                Fragrance Explorer
              </PHeadline>
              <PText className="mb-6">
                Explore perfumes visually with interactive note pyramids and ingredient details.
              </PText>
              <Link href="/explore">
                <PButton variant="secondary">
                  Explore
                </PButton>
              </Link>
            </div>
          </PGridItem>
        </PGrid>

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
