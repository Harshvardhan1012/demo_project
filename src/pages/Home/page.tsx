/*
  Home page — category overview.

  Renders all catalog items grouped by category.
  Clicking a card navigates to /:itemname via useNavigate —
  no prop drilling, no scroll pagination.

  groupedItems is computed at module level because data.ts is a static
  constant; there is no need to recompute it inside the component.
*/

import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from '@mui/material'
import { data } from '../../data/data'
import type { CatalogItem } from '../../types/catalog.types'
import { AppHeader } from '../../components/AppHeader'
import { CategorySection } from '../../components/CategorySection'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { HOME_PAGE_CONFIG } from './home.config'

/* Groups a flat item list into an object keyed by category string */
const groupByCategory = (items: CatalogItem[]): Record<string, CatalogItem[]> =>
  items.reduce<Record<string, CatalogItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {})

/*
  Computed once at module load — data never changes at runtime so there
  is no reason to recompute or memoize inside the component.
*/
const groupedItems = groupByCategory(data as CatalogItem[])

const HomePage = () => {
  const navigate = useNavigate()
  const { appTitle, columns, cardImageHeight, maxWidth } = HOME_PAGE_CONFIG

  /* Sets the browser tab to "Product Catalog" when this page is active */
  useDocumentTitle()

  /*
    encodeURIComponent handles item names with spaces and special characters,
    e.g. "Porsche 911 GT3" → "/Porsche%20911%20GT3".
    useNavigate is stable so this callback is created only once.
  */
  const handleSelectItem = useCallback(
    (item: CatalogItem) => navigate(`/${encodeURIComponent(item.itemname)}`),
    [navigate],
  )

  return (
    <>
      <AppHeader title={appTitle} />
      <Container
        maxWidth={maxWidth}
        sx={{ py: 4 }}>
        {Object.entries(groupedItems).map(([category, items]) => (
          <CategorySection
            key={category}
            category={category}
            items={items}
            columns={columns}
            cardImageHeight={cardImageHeight}
            onSelectItem={handleSelectItem}
          />
        ))}
      </Container>
    </>
  )
}

export default HomePage
