/*
  semantic typography wrapper around MUI Typography.

  Maps human-readable variant names to MUI variant strings so callsites
  express intent ("heading", "caption") rather than implementation ("h4", "caption").
  Centralising the map here means changing a visual scale level requires one edit.
*/

import type { ElementType } from 'react';
import { Typography } from '@mui/material';
import type { TypographyProps } from '@mui/material';

/*
  Semantic names exposed to consumers.
  Maps: heading→h4, subheading→h5, section→h6, title→subtitle1,
        body→body1, secondary→body2, caption→caption
*/
type TextVariant =
  | 'heading'     /* h4 — page-level titles */
  | 'subheading'  /* h5 — category section headers */
  | 'section'     /* h6 — sub-section and card group titles */
  | 'title'       /* subtitle1 — card item names */
  | 'body'        /* body1 — general paragraph text */
  | 'secondary'   /* body2 — supporting / meta text */
  | 'caption';    /* caption — small labels and spec previews */

/* Internal mapping — update here when the visual scale changes */
const VARIANT_MAP: Record<TextVariant, TypographyProps['variant']> = {
  heading: 'h4',
  subheading: 'h5',
  section: 'h6',
  title: 'subtitle1',
  body: 'body1',
  secondary: 'body2',
  caption: 'caption',
};

interface TextProps extends Omit<TypographyProps, 'variant'> {
  variant?: TextVariant;
  bold?: boolean;          /* Shorthand for fontWeight:700; sx.fontWeight overrides this */
  component?: ElementType; /* Override the rendered HTML element (e.g. "div", "span") */
}

/* bold is destructured so it is not forwarded to the DOM as an unknown attribute */
export const Text = ({ variant = 'body', bold, sx, ...props }: TextProps) => (
  <Typography
    variant={VARIANT_MAP[variant]}
    sx={{ fontWeight: bold ? 700 : undefined, ...sx }}
    {...props}
  />
);
