import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the pandas-format JSON
const rawData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/perfume_data_combined.json'), 'utf-8')
);

// Convert to array of objects
const fragrances = [];
const keys = Object.keys(rawData.name || {});

keys.forEach(key => {
  const fragrance = {
    id: key,
    name: rawData.name?.[key] || '',
    brand: rawData.company?.[key] || '',
    image: rawData.image?.[key] || '',
    gender: rawData.for_gender?.[key] || rawData.gender_vote?.[key] || 'unisex',
    rating: parseFloat(rawData.rating?.[key]) || 0,
    votes: parseInt(rawData.number_votes?.[key]) || 0,
    accords: parseNotes(rawData['main accords']?.[key]),
    description: rawData.description?.[key] || '',
    topNotes: parseNotes(rawData['top notes']?.[key]),
    middleNotes: parseNotes(rawData['middle notes']?.[key]),
    baseNotes: parseNotes(rawData['base notes']?.[key]),
    longevity: rawData.longevity?.[key] || '',
    sillage: rawData.sillage?.[key] || '',
    priceValue: rawData['price value']?.[key] || '',
  };

  // Only add if it has at least a name
  if (fragrance.name) {
    fragrances.push(fragrance);
  }
});

// Helper function to parse notes (handles different formats)
function parseNotes(notesStr) {
  if (!notesStr) return [];
  if (typeof notesStr === 'string') {
    // Remove brackets, split by comma, clean up
    return notesStr
      .replace(/[\[\]'\"]/g, '')
      .split(',')
      .map(note => note.trim())
      .filter(note => note.length > 0);
  }
  if (Array.isArray(notesStr)) {
    return notesStr;
  }
  return [];
}

// Create a combined notes list for all unique notes
const allNotes = new Set();
fragrances.forEach(f => {
  [...f.topNotes, ...f.middleNotes, ...f.baseNotes, ...f.accords].forEach(note => {
    if (note) allNotes.add(note.toLowerCase());
  });
});

// Write processed data
fs.writeFileSync(
  path.join(__dirname, '../data/fragrances.json'),
  JSON.stringify(fragrances, null, 2)
);

// Write notes list
fs.writeFileSync(
  path.join(__dirname, '../data/notes.json'),
  JSON.stringify(Array.from(allNotes).sort(), null, 2)
);

console.log(`✅ Processed ${fragrances.length} fragrances`);
console.log(`✅ Found ${allNotes.size} unique notes`);
console.log('✅ Data saved to:');
console.log('   - data/fragrances.json');
console.log('   - data/notes.json');
