# 🌸 SCENT

**S**mart **C**omparison **E**ngine for **N**otes & **T**raits

A web application to find affordable perfume dupes and discover fragrances based on their notes and ingredients.

## 🎯 Problem Statement

Finding affordable alternatives to expensive perfumes is challenging. When you discover a perfume you love but can't afford, you typically:
1. Search for its notes manually
2. Try to find similar perfumes on various websites
3. Compare prices and availability across retailers

**SCENT** automates this entire process!

## ✨ Features

### 1. 🔍 Search by Notes
Enter perfume notes (e.g., "vanilla, sandalwood, bergamot") and find fragrances that match. Filter by:
- Gender (men/women/unisex)
- Brand
- Rating
- Price value

### 2. 🎭 Dupe Finder
Enter an original fragrance name and discover:
- Affordable alternatives
- Similarity percentage based on note matching
- Side-by-side note comparison
- Price value ratings

### 3. 🗺️ Fragrance Explorer
Browse and explore fragrances with:
- Interactive note pyramid visualizations
- Hoverable ingredient tooltips
- Performance metrics (longevity, sillage)
- Detailed fragrance information

## 📊 Dataset

- **517 fragrances** from top brands
- **498 unique notes** and ingredients
- Data includes: notes, ratings, longevity, sillage, price value

Brands include: Chanel, Dior, Tom Ford, Guerlain, YSL, Giorgio Armani, and 200+ more

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd SCENT

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create static export
npm run build

# The static site will be in the 'out' directory
```

## 🏗️ Tech Stack

- **Framework**: Next.js 15 (App Router, Static Export)
- **Language**: TypeScript
- **UI Library**: Porsche Design System
- **Styling**: Tailwind CSS v4
- **Visualizations**: D3.js
- **Search**: Fuse.js (fuzzy search)
- **Deployment**: Vercel (or any static hosting)

## 📁 Project Structure

```
SCENT/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Homepage
│   ├── search/            # Note-based search
│   ├── dupes/             # Dupe finder
│   └── explore/           # Fragrance explorer
├── components/            # Reusable React components
├── data/                  # Fragrance data (JSON)
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions (similarity algorithms)
└── scripts/               # Data processing scripts
```

## 🧮 Algorithms

### Jaccard Similarity
Calculates similarity between two sets of notes:
```typescript
similarity = intersection(A, B).size / union(A, B).size
```

### Weighted Similarity
Considers note positions (top, heart, base):
```typescript
score = (top × 0.3) + (heart × 0.5) + (base × 0.2)
```

Heart notes have the highest weight as they define the fragrance character.

## 🎨 Design

Built with the **Porsche Design System** for:
- Premium, luxury aesthetic (perfect for perfume market)
- Production-ready accessible components (WCAG 2.2 AA)
- Consistent brand experience
- Mobile-responsive design

## 📝 Roadmap

- [x] Project setup & data collection
- [x] Similarity algorithms
- [ ] Search by notes page
- [ ] Dupe finder page
- [ ] Fragrance explorer page
- [ ] D3.js visualizations
- [ ] Ingredient encyclopedia
- [ ] Mobile optimization
- [ ] SEO optimization
- [ ] Deployment

## 🤝 Contributing

This is an educational project. Data sourced from public datasets.

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

- Perfume data from [sir-omoreno/perfume_designer_app](https://github.com/sir-omoreno/perfume_designer_app)
- Fragrantica for original data source
- Porsche Design System for UI components

---

Made with ❤️ for perfume enthusiasts on a budget
