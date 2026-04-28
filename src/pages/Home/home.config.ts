/*
  Static configuration for the Home page.

  columns         — card grid density at each MUI breakpoint.
  cardImageHeight — uniform height applied to every card image so grid
                    rows align regardless of category.
*/

/* Column count per MUI responsive breakpoint */
export interface ColumnConfig {
  xs: number;
  sm: number;
  md: number;
  lg: number;
}

export const HOME_PAGE_CONFIG = {
  appTitle: 'Product List',
  columns: { xs: 1, sm: 2, md: 3, lg: 4 } satisfies ColumnConfig,
  cardImageHeight: 200,    /* px — uniform across all cards in every section */
  maxWidth: 'xl' as const, /* MUI Container maxWidth breakpoint */
};
