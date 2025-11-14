# SCENT - Project Status

## Overview
**SCENT** (Smart Comparison Engine for Notes & Traits) is a web application that helps users find affordable perfume alternatives and discover fragrances based on their notes and ingredients.

## ✅ Completed Tasks

### 1. Project Initialization
- ✅ Next.js 15 with TypeScript
- ✅ Porsche Design System integration
- ✅ Tailwind CSS v4 configuration
- ✅ Static export configuration for deployment

### 2. Data Collection & Processing
- ✅ Found and downloaded perfume dataset (517 fragrances)
- ✅ Extracted dataset from GitHub (perfume_designer_app repository)
- ✅ Created data processing script (`scripts/processData.mjs`)
- ✅ Processed and normalized fragrance data
- ✅ Generated `data/fragrances.json` (517 perfumes)
- ✅ Generated `data/notes.json` (498 unique notes)

### 3. Type Definitions & Utilities
- ✅ Created TypeScript interfaces (`types/fragrance.ts`)
- ✅ Implemented similarity algorithms (`utils/fragrance.ts`):
  - Jaccard similarity calculation
  - Weighted similarity (top/middle/base notes)
  - Note-based search function
  - Dupe finder algorithm

### 4. UI Foundation
- ✅ Homepage with navigation to all features
- ✅ Responsive layout with Porsche Design System components
- ✅ Project statistics display (517 fragrances, 498 notes)

## 📊 Dataset Details

### Data Fields
Each fragrance includes:
- **Basic Info**: name, brand, image, gender, description
- **Notes**: topNotes, middleNotes, baseNotes, accords
- **Ratings**: rating, votes
- **Performance**: longevity (very weak to eternal), sillage (intimate to enormous)
- **Value**: priceValue (way overpriced to great value)

### Sample Brands
Chanel, Dior, Tom Ford, Guerlain, Yves Saint Laurent, Giorgio Armani, and 200+ more

## 🎯 Features to Implement

### 1. Note-Based Search (`/search`)
**Status**: Pending
- Multi-select note picker
- Real-time search results
- Similarity percentage display
- Filters: gender, brand, rating
- Sort by similarity/rating/votes

### 2. Dupe Finder (`/dupes`)
**Status**: Pending
- Search for original fragrance
- Display similar alternatives sorted by similarity
- Side-by-side comparison view
- Price value comparison
- Show matching notes breakdown

### 3. Fragrance Explorer (`/explore`)
**Status**: Pending
- Browse all fragrances
- Interactive note pyramid visualization (D3.js)
- Hover tooltips for ingredient details
- Filter and sort options
- Detailed fragrance pages

### 4. Visualization Components
**Status**: Pending
- Note pyramid (D3.js/SVG)
- Accord wheel
- Similarity meter
- Performance charts (longevity, sillage)

## 🏗️ Architecture

```
/home/user/SCENT/
├── app/
│   ├── layout.tsx          # Root layout with PorscheDesignSystemProvider
│   ├── globals.css         # Tailwind CSS imports
│   ├── page.tsx            # Homepage
│   ├── search/             # Note-based search (TODO)
│   ├── dupes/              # Dupe finder (TODO)
│   └── explore/            # Fragrance explorer (TODO)
├── components/             # Reusable React components (TODO)
├── data/
│   ├── fragrances.json     # Processed fragrance data (517 items)
│   ├── notes.json          # All unique notes (498 items)
│   └── perfume_data_combined.json  # Raw data
├── scripts/
│   └── processData.mjs     # Data processing script
├── types/
│   └── fragrance.ts        # TypeScript interfaces
├── utils/
│   └── fragrance.ts        # Similarity algorithms & search functions
└── public/                 # Static assets
```

## 🚀 Algorithms

### Jaccard Similarity
Measures overlap between note sets:
```
similarity = |A ∩ B| / |A ∪ B|
```

### Weighted Similarity
Considers note positions:
```
score = (top_similarity × 0.3) +
        (heart_similarity × 0.5) +
        (base_similarity × 0.2)
```

## 📝 Next Steps

1. **Build Search Page** - Implement multi-select note search with results
2. **Build Dupe Finder** - Create comparison interface
3. **Build Explorer** - Add browsing and visualization
4. **Add Visual Components** - D3.js note pyramids and charts
5. **Optimize Performance** - Code splitting, lazy loading
6. **Deploy** - Static export to Vercel

## 🎨 Design System

Using **Porsche Design System v3.30.0**:
- Premium, luxury aesthetic
- Accessible (WCAG 2.2 AA compliant)
- Components: PButton, PGrid, PHeadline, PText, PModal, PSelect, etc.
- Integrates with Tailwind CSS v4

## 📦 Dependencies

### Production
- next: ^15.0.0
- react: ^19.0.0
- @porsche-design-system/components-react: ^3.30.0
- fuse.js: ^7.0.0 (fuzzy search)
- d3: ^7.9.0 (visualizations)

### Development
- typescript: ^5
- tailwindcss: ^4.1.0
- eslint: ^8

## 🎯 Timeline

**Target**: Launch within this month

**Week 1 (Current)**:
- ✅ Setup & data collection
- 🔄 Core features (search, dupes, explorer)

**Week 2-3**:
- Visual components
- Polish & optimization

**Week 4**:
- Testing & deployment

## 📄 License

Data sourced from public datasets (GitHub: sir-omoreno/perfume_designer_app)
Educational/personal use project
