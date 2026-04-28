/*
  Static configuration for the Detail page.

  imageHeight is a responsive object so the hero image scales gracefully
  across breakpoints without the component needing to hardcode pixel values.
*/

export const DETAIL_PAGE_CONFIG = {
  backLabel: '← Back to Catalog',
  imageHeight: { xs: 220, sm: 320, md: 420 } as const, /* image height per breakpoint */
  maxWidth: 'md' as const,
  showDivider: true,  /* Divider between the item header and the spec table */
  specsTitle: 'Specifications',
};
