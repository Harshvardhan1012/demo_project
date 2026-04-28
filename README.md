# Product Catalog

A responsive single-page React application that displays a multi-category product catalog. Items are grouped by category on the home screen and reveal full specifications on a dedicated detail view.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| UI Framework | React | 19 |
| Language | TypeScript | 6 |
| Build Tool | Vite | 8 |
| Component Library | MUI (Material UI) | 9 |
| CSS-in-JS | Emotion | 11 |

---

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Features

- **Category overview** — items grouped into labeled sections (Cars, Bikes, Phones, Computers)
- **Lazy image loading** — native `loading="lazy"` with a MUI Skeleton wave placeholder and fade-in
- **Item detail view** — clicking any card navigates to a full-spec page with a back button in content
- **Dynamic spec rendering** — `itemprops` array is iterated without any category-specific logic
- **Mobile responsive** — CSS grid breakpoints and responsive `sx` values across all components

---

## Project Structure
```
src/
├── types/
│   └── catalog.types.ts        Domain interfaces (CatalogItem, ItemProp)
│
├── data/
│   └── data.ts                 Static catalog data
│
├── components/
│   ├── ui/                     Atoms — base building blocks
│   │   ├── LazyImage.tsx       Lazy image with Skeleton placeholder and fade-in transition
│   │   └── Text.tsx            Typography wrapper with semantic variant aliases
│   │
│   ├── AppHeader.tsx           sticky AppBar
│   ├── CategoryChip.tsx        colored category badge derived from config
│   ├── ItemCard.tsx            card with image, name and spec preview
│   ├── ItemPropsTable.tsx      dynamic key/value spec table
│   └── CategorySection.tsx     category heading + responsive CSS grid of cards
│
├── pages/
│   ├── Home/
│   │   ├── home.config.ts      Grid columns, batch size, card image height, app title
│   │   └── page.tsx            Home Page
│   │
│   └── Detail/
│       ├── detail.config.ts    Image heights per breakpoint, back label, specs title
│       └── page.tsx            Full item view 
│
├── App.tsx                     Root 
├── main.tsx                    Vite entry point
└── index.css                   Minimal global reset (MUI CssBaseline handles the rest)
```
"# demo_project" 
