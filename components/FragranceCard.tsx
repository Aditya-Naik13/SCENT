"use client";

import React from "react";
import type { Fragrance } from "@/types/fragrance";
import Image from "next/image";

interface FragranceCardProps {
  fragrance: Fragrance;
  similarity?: number;
  matchingNotes?: {
    top: string[];
    middle: string[];
    base: string[];
  };
  showDetails?: boolean;
}

export default function FragranceCard({
  fragrance,
  similarity,
  matchingNotes,
  showDetails = false,
}: FragranceCardProps) {
  const allMatchingNotes = matchingNotes
    ? [...matchingNotes.top, ...matchingNotes.middle, ...matchingNotes.base]
    : [];

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg hover:shadow-xl border border-gray-700 transition-shadow p-6 flex gap-6">
      {/* Image */}
      <div className="flex-shrink-0">
        <div className="w-32 h-32 bg-gray-700 rounded-lg overflow-hidden relative">
          {fragrance.image ? (
            <img
              src={fragrance.image}
              alt={fragrance.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="mb-1 truncate text-xl font-bold text-white">
              {fragrance.name}
            </h3>
            <p className="text-gray-300 text-sm">
              {fragrance.brand}
            </p>
          </div>
          {similarity !== undefined && (
            <div className="ml-4 flex-shrink-0">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {Math.round(similarity * 100)}%
                </div>
                <p className="text-gray-400 text-sm">
                  Match
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Rating & Gender */}
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <p className="text-gray-200 text-sm">{fragrance.rating.toFixed(1)}</p>
            <p className="text-gray-400 text-sm">
              ({fragrance.votes} votes)
            </p>
          </div>
          <p className="text-gray-300 capitalize text-sm">
            {fragrance.gender}
          </p>
        </div>

        {/* Matching Notes */}
        {allMatchingNotes.length > 0 && (
          <div className="mb-3">
            <p className="font-semibold mb-1 text-gray-200 text-sm">
              Matching notes:
            </p>
            <div className="flex flex-wrap gap-1">
              {allMatchingNotes.slice(0, 10).map((note, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-green-900 text-green-200 rounded text-xs"
                >
                  {note}
                </span>
              ))}
              {allMatchingNotes.length > 10 && (
                <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                  +{allMatchingNotes.length - 10} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Notes Breakdown */}
        {showDetails && (
          <div className="space-y-2">
            {fragrance.topNotes.length > 0 && (
              <div>
                <p className="font-semibold text-gray-200 text-sm">
                  Top: <span className="font-normal text-gray-300">{fragrance.topNotes.join(", ")}</span>
                </p>
              </div>
            )}
            {fragrance.middleNotes.length > 0 && (
              <div>
                <p className="font-semibold text-gray-200 text-sm">
                  Middle: <span className="font-normal text-gray-300">{fragrance.middleNotes.join(", ")}</span>
                </p>
              </div>
            )}
            {fragrance.baseNotes.length > 0 && (
              <div>
                <p className="font-semibold text-gray-200 text-sm">
                  Base: <span className="font-normal text-gray-300">{fragrance.baseNotes.join(", ")}</span>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
