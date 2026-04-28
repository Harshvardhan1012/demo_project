/*
  card representing a single catalog item on the Home page.
*/

import { memo, useCallback } from 'react'
import { Card, CardActionArea, CardContent, Box } from '@mui/material'
import type { CatalogItem } from '../types/catalog.types'
import { LazyImage } from './ui/LazyImage'
import { Text } from './ui/Text'
import { CategoryChip } from './CategoryChip'

interface ItemCardProps {
  item: CatalogItem
  imageHeight?: number /* Uniform image height across the grid row */
  onClick: (item: CatalogItem) => void
}

export const ItemCard = memo(
  ({ item, imageHeight = 200, onClick }: ItemCardProps) => {
    const handleClick = useCallback(() => onClick(item), [item, onClick])

    return (
      <Card
        elevation={2}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardActionArea
          onClick={handleClick}
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
          }}>
          <LazyImage
            src={item.image}
            alt={item.itemname}
            sx={{ height: imageHeight }}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Text
              variant="title"
              bold
              gutterBottom
              noWrap>
              {item.itemname}
            </Text>
            <Box sx={{ mb: 1 }}>
              <CategoryChip category={item.category} />
            </Box>
            {item.itemprops.slice(0, 2).map((prop) => (
              <Text
                key={prop.label}
                variant="caption"
                color="text.secondary"
                sx={{ display: 'block' }}>
                {prop.label}: {prop.value}
              </Text>
            ))}
          </CardContent>
        </CardActionArea>
      </Card>
    )
  },
)

ItemCard.displayName = 'ItemCard'
