/*
   a labeled section grouping all items from one category.
*/

import { memo } from 'react'
import { Box, Divider } from '@mui/material'
import type { CatalogItem } from '../types/catalog.types'
import type { ColumnConfig } from '../pages/Home/home.config'
import { ItemCard } from './ItemCard'
import { Text } from './ui/Text'

interface CategorySectionProps {
  category: string
  items: CatalogItem[]
  columns: ColumnConfig /* Grid breakpoints from HOME_PAGE_CONFIG */
  cardImageHeight: number /* Uniform image height applied to every card in this section */
  onSelectItem: (item: CatalogItem) => void
}

export const CategorySection = memo(
  ({
    category,
    items,
    columns,
    cardImageHeight,
    onSelectItem,
  }: CategorySectionProps) => {
    return (
      <Box
        component="section"
        sx={{ mb: { xs: 4, md: 6 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Text
            variant="subheading"
            bold>
            {category}
          </Text>
          <Text
            variant="secondary"
            color="text.secondary">
            ({items.length} {items.length === 1 ? 'item' : 'items'})
          </Text>
        </Box>
        <Divider sx={{ mb: 3, borderBottomWidth: 3, width: 60 }} />
        <Box
          sx={{
            display: 'grid',
            gap: { xs: 2, md: 3 },
            gridTemplateColumns: {
              xs: `repeat(${columns.xs}, 1fr)`,
              sm: `repeat(${columns.sm}, 1fr)`,
              md: `repeat(${columns.md}, 1fr)`,
              lg: `repeat(${columns.lg}, 1fr)`,
            },
          }}>
          {items.map((item) => (
            <ItemCard
              key={item.itemname}
              item={item}
              imageHeight={cardImageHeight}
              onClick={onSelectItem}
            />
          ))}
        </Box>
      </Box>
    )
  },
)

CategorySection.displayName = 'CategorySection'
