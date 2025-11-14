import type { Fragrance, FragranceSimilarity } from '@/types/fragrance';
import fragrancesData from '@/data/fragrances.json';
import notesData from '@/data/notes.json';

export const fragrances: Fragrance[] = fragrancesData as Fragrance[];
export const allNotes: string[] = notesData as string[];

/**
 * Calculate Jaccard similarity between two sets of notes
 */
export function calculateJaccardSimilarity(notes1: string[], notes2: string[]): number {
  if (notes1.length === 0 && notes2.length === 0) return 0;

  const set1 = new Set(notes1.map(n => n.toLowerCase()));
  const set2 = new Set(notes2.map(n => n.toLowerCase()));

  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);

  return intersection.size / union.size;
}

/**
 * Calculate weighted similarity based on note positions (top, middle, base)
 */
export function calculateWeightedSimilarity(
  fragrance1: Fragrance,
  fragrance2: Fragrance
): number {
  const topSim = calculateJaccardSimilarity(fragrance1.topNotes, fragrance2.topNotes);
  const middleSim = calculateJaccardSimilarity(fragrance1.middleNotes, fragrance2.middleNotes);
  const baseSim = calculateJaccardSimilarity(fragrance1.baseNotes, fragrance2.baseNotes);

  // Weights: top=0.3, middle=0.5, base=0.2 (heart notes are most important)
  return (topSim * 0.3) + (middleSim * 0.5) + (baseSim * 0.2);
}

/**
 * Find similar fragrances to a given fragrance
 */
export function findSimilarFragrances(
  targetFragrance: Fragrance,
  limit: number = 10
): FragranceSimilarity[] {
  const similarities: FragranceSimilarity[] = [];

  for (const fragrance of fragrances) {
    // Skip the target fragrance itself
    if (fragrance.id === targetFragrance.id) continue;

    const similarity = calculateWeightedSimilarity(targetFragrance, fragrance);

    // Find matching notes
    const matchingNotes = {
      top: targetFragrance.topNotes.filter(note =>
        fragrance.topNotes.some(n => n.toLowerCase() === note.toLowerCase())
      ),
      middle: targetFragrance.middleNotes.filter(note =>
        fragrance.middleNotes.some(n => n.toLowerCase() === note.toLowerCase())
      ),
      base: targetFragrance.baseNotes.filter(note =>
        fragrance.baseNotes.some(n => n.toLowerCase() === note.toLowerCase())
      ),
    };

    similarities.push({
      fragrance,
      similarity,
      matchingNotes,
    });
  }

  // Sort by similarity (descending) and return top results
  return similarities
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);
}

/**
 * Search fragrances by notes
 */
export function searchByNotes(
  searchNotes: string[],
  limit: number = 20
): FragranceSimilarity[] {
  const results: FragranceSimilarity[] = [];
  const searchNotesLower = searchNotes.map(n => n.toLowerCase());

  for (const fragrance of fragrances) {
    const allFragranceNotes = [
      ...fragrance.topNotes,
      ...fragrance.middleNotes,
      ...fragrance.baseNotes,
    ].map(n => n.toLowerCase());

    const similarity = calculateJaccardSimilarity(searchNotesLower, allFragranceNotes);

    // Only include if there's some similarity
    if (similarity > 0) {
      const matchingNotes = {
        top: fragrance.topNotes.filter(note =>
          searchNotesLower.includes(note.toLowerCase())
        ),
        middle: fragrance.middleNotes.filter(note =>
          searchNotesLower.includes(note.toLowerCase())
        ),
        base: fragrance.baseNotes.filter(note =>
          searchNotesLower.includes(note.toLowerCase())
        ),
      };

      results.push({
        fragrance,
        similarity,
        matchingNotes,
      });
    }
  }

  return results
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);
}

/**
 * Get all unique brands
 */
export function getAllBrands(): string[] {
  const brands = new Set(fragrances.map(f => f.brand));
  return Array.from(brands).sort();
}

/**
 * Get all unique genders
 */
export function getAllGenders(): string[] {
  const genders = new Set(fragrances.map(f => f.gender));
  return Array.from(genders).sort();
}

/**
 * Filter fragrances by various criteria
 */
export function filterFragrances(filters: {
  gender?: string[];
  brand?: string[];
  minRating?: number;
}): Fragrance[] {
  return fragrances.filter(f => {
    if (filters.gender && filters.gender.length > 0) {
      if (!filters.gender.some(g => f.gender.toLowerCase().includes(g.toLowerCase()))) {
        return false;
      }
    }

    if (filters.brand && filters.brand.length > 0) {
      if (!filters.brand.includes(f.brand)) {
        return false;
      }
    }

    if (filters.minRating && f.rating < filters.minRating) {
      return false;
    }

    return true;
  });
}
