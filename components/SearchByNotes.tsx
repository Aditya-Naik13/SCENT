"use client";

import { useState, useMemo } from "react";
import { PButton, PTextFieldWrapper } from "@porsche-design-system/components-react";
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">
              Search by Notes
            </h2>
            <p className="text-sm md:text-base text-gray-300">Find fragrances by selecting notes you love</p>
          </div>
          <PButton variant="tertiary" icon="arrow-head-left" onClick={onBack} className="self-start md:self-auto">
            Back
          </PButton>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Left Column - Note Selection */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
              <h3 className="text-xl font-bold mb-4 text-white">
                Select Notes
              </h3>

              {/* Note Search */}
              <div className="mb-4">
                <PTextFieldWrapper label="Search notes">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g., vanilla, bergamot..."
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </PTextFieldWrapper>
              </div>

              {/* Selected Notes */}
              {selectedNotes.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm mb-2 font-semibold text-gray-200">
                    Selected ({selectedNotes.length}):
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedNotes.map(note => (
                      <button
                        key={note}
                        onClick={() => handleNoteRemove(note)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-colors"
                      >
                        {note} ×
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Notes */}
              <div className="mb-4">
                <p className="text-sm mb-2 font-semibold text-gray-200">
                  Available Notes:
                </p>
                <div className="max-h-96 overflow-y-auto space-y-1">
                  {filteredNotes.map(note => (
                    <button
                      key={note}
                      onClick={() => handleNoteSelect(note)}
                      disabled={selectedNotes.includes(note)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedNotes.includes(note)
                          ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                          : 'text-gray-200 hover:bg-gray-700'
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
                  <h3 className="text-xl font-bold mb-2 text-white">
                    Found {results.length} matches
                  </h3>
                  <p className="text-sm text-gray-300">
                    Sorted by similarity to your selected notes
                  </p>
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
              <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-12 text-center">
                <h3 className="text-xl font-bold mb-4 text-white">
                  Select notes to start searching
                </h3>
                <p className="text-gray-300">
                  Choose one or more notes from the left panel to find fragrances that match your preferences
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
