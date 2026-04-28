/*
  Root component — defines the two application routes.

  /            →  Home page (category overview)
  /:itemname   →  Detail page (full item view, survives refresh)
  *            →  Redirects to / for any unknown path

  Both pages are lazy-loaded so the Detail bundle is not fetched until
  the user clicks an item, reducing initial parse time.
*/

import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import {
  CssBaseline,
  ThemeProvider,
  createTheme
} from '@mui/material'
import { PageLoader } from './components/ui/PageLoader'
import { ErrorBoundary } from './components/ErrorBoundary'

/*
  React.lazy splits each page into its own chunk.
  The Home chunk loads immediately on first render; the Detail chunk is
  fetched only on the first item click.
*/
const HomePage = lazy(() => import('./pages/Home/page'))
const DetailPage = lazy(() => import('./pages/Detail/page'))

/* Global MUI theme — borderRadius and background applied to all MUI components */
const theme = createTheme({
  palette: {
    background: { default: '#f5f5f5' },
  },
  shape: { borderRadius: 8 },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />
            <Route
              path="/:itemname"
              element={<DetailPage />}
            />
            <Route
              path="*"
              element={
                <Navigate
                  to="/"
                  replace
                />
              }
            />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default App
