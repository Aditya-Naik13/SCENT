"use client";

import { useState, useMemo } from "react";
import { PHeadline, PText, PButton, PTextFieldWrapper } from "@porsche-design-system/components-react";
import { searchByNotes, allNotes } from "@/utils/fragrance";
import type { FragranceSimilarity } from "@/types/fragrance";
import FragranceCard from "./FragranceCard";

interface SearchByNotesProps {
  onBack: () => void;
}

export default function SearchByNotes({ onBack }: SearchByNotesProps) {
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<FragranceSimilarity[]>([]);

  // Filter notes based on search query
  const filteredNotes = useMemo(() => {
    if (!searchQuery) return allNotes.slice(0, 20);
    return allNotes
      .filter(note => note.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 20);
  }, [searchQuery]);

  const handleNoteSelect = (note: string) => {
    if (!selectedNotes.includes(note)) {
      setSelectedNotes([...selectedNotes, note]);
    }
  };

  const handleNoteRemove = (note: string) => {
    setSelectedNotes(selectedNotes.filter(n => n !== note));
  };

  const handleSearch = () => {
    if (selectedNotes.length > 0) {
      const searchResults = searchByNotes(selectedNotes, 20);
      setResults(searchResults);
    }
  };

  const handleClear = () => {
    setSelectedNotes([]);
    setResults([]);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8 gap-4">
          <div>
            <div className="text-2xl md:text-3xl font-bold mb-2">
              Search by Notes
            </div>
            <PText className="text-sm md:text-base">Find fragrances by selecting notes you love</PText>
          </div>
          <PButton variant="tertiary" icon="arrow-head-left" onClick={onBack} className="self-start md:self-auto">
            Back
          </PButton>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Left Column - Note Selection */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <PHeadline variant="headline-4" className="mb-4">
                Select Notes
              </PHeadline>

              {/* Note Search */}
              <div className="mb-4">
                <PTextFieldWrapper label="Search notes">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g., vanilla, bergamot..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </PTextFieldWrapper>
              </div>

              {/* Selected Notes */}
              {selectedNotes.length > 0 && (
                <div className="mb-4">
                  <PText size="small" className="mb-2 font-semibold">
                    Selected ({selectedNotes.length}):
                  </PText>
                  <div className="flex flex-wrap gap-2">
                    {selectedNotes.map(note => (
                      <button
                        key={note}
                        onClick={() => handleNoteRemove(note)}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
                      >
                        {note} ×
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Notes */}
              <div className="mb-4">
                <PText size="small" className="mb-2 font-semibold">
                  Available Notes:
                </PText>
                <div className="max-h-96 overflow-y-auto space-y-1">
                  {filteredNotes.map(note => (
                    <button
                      key={note}
                      onClick={() => handleNoteSelect(note)}
                      disabled={selectedNotes.includes(note)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedNotes.includes(note)
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {note}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <PButton
                  variant="primary"
                  className="w-full"
                  onClick={handleSearch}
                  disabled={selectedNotes.length === 0}
                >
                  Search ({selectedNotes.length} notes)
                </PButton>
                <PButton
                  variant="tertiary"
                  className="w-full"
                  onClick={handleClear}
                >
                  Clear All
                </PButton>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2">
            {results.length > 0 ? (
              <div>
                <div className="mb-4">
                  <PHeadline variant="headline-4" className="mb-2">
                    Found {results.length} matches
                  </PHeadline>
                  <PText size="small">
                    Sorted by similarity to your selected notes
                  </PText>
                </div>
                <div className="space-y-4">
                  {results.map(({ fragrance, similarity, matchingNotes }) => (
                    <FragranceCard
                      key={fragrance.id}
                      fragrance={fragrance}
                      similarity={similarity}
                      matchingNotes={matchingNotes}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <PHeadline variant="headline-4" className="mb-4">
                  Select notes to start searching
                </PHeadline>
                <PText>
                  Choose one or more notes from the left panel to find fragrances that match your preferences
                </PText>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
