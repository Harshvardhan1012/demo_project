/*
  Core domain types shared across the entire app.
  All components and pages depend on these interfaces —
  a change here propagates to every consumer.
*/

/* A single specification entry displayed in the detail view */
export interface ItemProp {
  label: string; /* Display label, e.g. "Engine" */
  value: string; /* Display value, e.g. "1.2L Kappa" */
}

/* Represents one product in the catalog, sourced from data.ts */
export interface CatalogItem {
  itemname: string;      /* we consider each itemname to be unique for simplicity */
  category: string;      /* Used to group items on the Home page */
  image: string;         /* URL passed directly to LazyImage */
  itemprops: ItemProp[]; /* Spec list — length and keys vary per category */
}
