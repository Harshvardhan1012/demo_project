/*
  Organism — sticky app bar shared across all pages.

  Intentionally has no back-navigation logic. Navigation controls belong
  in the page that owns them (e.g. the back button lives in DetailPage's
  content area), keeping this component focused on branding only.
*/

import { AppBar, Toolbar, Box } from '@mui/material';
import { Text } from './ui/Text';

interface AppHeaderProps {
  title: string;
  subtitle?: string; /* Secondary line shown on the Home page */
}

export const AppHeader = ({ title, subtitle }: AppHeaderProps) => (
  <AppBar position="sticky" elevation={2}>
    <Toolbar>
      <Box>
        <Text
          variant="section"
          component="div"
          sx={{ color: 'inherit', lineHeight: 1.2 }}
        >
          {title}
        </Text>
        {subtitle && (
          <Text variant="caption" sx={{ opacity: 0.8, color: 'inherit' }}>
            {subtitle}
          </Text>
        )}
      </Box>
    </Toolbar>
  </AppBar>
);
