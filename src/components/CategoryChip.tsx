/*
  category badge shown on item cards and the detail page.
*/

import { Chip } from '@mui/material'

interface CategoryChipProps {
  category: string
  size?: 'small' | 'medium' /* small on cards, medium on the detail page */
}

export const CategoryChip = ({
  category,
  size = 'small',
}: CategoryChipProps) => {
  return (
    <Chip
      label={category}
      size={size}
    />
  )
}
