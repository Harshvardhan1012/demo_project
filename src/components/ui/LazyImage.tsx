/*
  Atom — lazy-loaded image with a Skeleton wave placeholder.

  Wrapped with React.memo so re-renders of a parent that do not change src,
  alt, objectFit, or sx do not re-run the fade-in logic.

  The container is position:relative + overflow:hidden so the absolute
  Skeleton fills exactly the same box as the image. The caller must set
  a height via the sx prop — without it the Skeleton collapses to zero.

  The image starts at opacity:0 and fades in on the native onLoad event,
  preventing a flash of broken layout when the browser defers loading.
*/

import { memo, useCallback, useState } from 'react';
import { Box, Skeleton } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';

interface LazyImageProps {
  src: string;
  alt: string;
  objectFit?: 'cover' | 'contain' | 'fill';
  sx?: SxProps<Theme>; /* Must include a height for the Skeleton to be visible */
}

export const LazyImage = memo(({ src, alt, objectFit = 'cover', sx }: LazyImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const handleLoad = useCallback(() => setLoaded(true), []);
  const handleError = useCallback(() => { setLoaded(true); setErrored(true); }, []);

  return (
    <Box sx={{ position: 'relative', width: '100%', overflow: 'hidden', ...sx }}>
      {!loaded && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ position: 'absolute', inset: 0, height: '100%', transform: 'none' }}
        />
      )}
      {errored ? (
        /* Broken-image placeholder — keeps layout intact when the URL fails */
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'action.hover',
            color: 'text.disabled',
            fontSize: '0.75rem',
            userSelect: 'none',
          }}>
          {alt}
        </Box>
      ) : (
        <Box
          component="img"
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={handleLoad}
          onError={handleError}
          sx={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit,
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}
    </Box>
  );
});

LazyImage.displayName = 'LazyImage';
