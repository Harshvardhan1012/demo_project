/*
  Detail page — full product view, resolved from the URL parameter /:itemname.

  The item is looked up in data.ts on every render using the decoded URL param,
  so refreshing the page always shows the correct item without any external state.
  An unrecognised itemname redirects to / rather than showing a broken page.

  Back navigation is placed inside the page content (not the AppBar) so the
  header stays clean and the action is contextually close to the content it exits.
*/

import { useCallback, useMemo } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { Box, Button, Container, Divider } from '@mui/material'
import { data } from '../../data/data'
import type { CatalogItem } from '../../types/catalog.types'
import { AppHeader } from '../../components/AppHeader'
import { CategoryChip } from '../../components/CategoryChip'
import { ItemPropsTable } from '../../components/ItemPropsTable'
import { LazyImage } from '../../components/ui/LazyImage'
import { Text } from '../../components/ui/Text'
import { DETAIL_PAGE_CONFIG } from './detail.config'

const DetailPage = () => {
  /* rawItemname is the encoded path segment, e.g. "Kia%20Sonet" */
  const { itemname: rawItemname } = useParams<{ itemname: string }>()
  const navigate = useNavigate()

  const { backLabel, imageHeight, maxWidth, showDivider, specsTitle } =
    DETAIL_PAGE_CONFIG

  /*
    Decode the URL param and find the matching item.
    This runs on every param change, including on page refresh,
    so the item is always resolved from the URL alone — no shared state needed.
  */
  const item = useMemo<CatalogItem | null>(() => {
    const name = decodeURIComponent(rawItemname ?? '')
    return (data as CatalogItem[]).find((i) => i.itemname === name) ?? null
  }, [rawItemname])

  /* Declared before the conditional return to satisfy the Rules of Hooks */
  const handleBack = useCallback(() => navigate('/'), [navigate])

  /*
    Called before the conditional return so hooks run in a consistent order.
    item?.itemname is undefined when the param doesn't match any item,
    which makes the hook fall back to the base "Product Catalog" title
    for the brief moment before the <Navigate> redirect fires.
  */
  useDocumentTitle(item?.itemname)

  /* Unknown itemname — redirect to home rather than rendering a broken page */
  if (!item)
    return (
      <Navigate
        to="/"
        replace
      />
    )

  return (
    <>
      <AppHeader title={item.itemname} />

      <Box
        sx={{
          position: 'sticky',
          top: { xs: 56, sm: 64 },
          zIndex: 10,
          bgcolor: 'background.default',
          borderBottom: 1,
          borderColor: 'divider',
          px: { xs: 2, sm: 3 },
          py: 0.75,
        }}>
        <Button
          onClick={handleBack}
          sx={{ textTransform: 'none', fontWeight: 500 }}>
          {backLabel}
        </Button>
      </Box>

      <Container
        maxWidth={maxWidth}
        sx={{ py: { xs: 2, md: 4 } }}>
        {/* imageHeight is a responsive object from config — passed directly to sx */}
        <LazyImage
          src={item.image}
          alt={item.itemname}
          sx={{ height: imageHeight, borderRadius: 2, mb: 3 }}
        />

        {/* flexWrap:wrap lets the chip drop below the title on very small screens */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
            mb: 2,
          }}>
          {/* Font size scales down on mobile to prevent horizontal overflow */}
          <Text
            variant="heading"
            bold
            sx={{ fontSize: { xs: '1.5rem', sm: '1.875rem', md: '2.125rem' } }}>
            {item.itemname}
          </Text>
          <CategoryChip
            category={item.category}
            size="medium"
          />
        </Box>

        {showDivider && <Divider sx={{ mb: 3 }} />}
        <ItemPropsTable
          props={item.itemprops}
          title={specsTitle}
        />
      </Container>
    </>
  )
}

export default DetailPage
