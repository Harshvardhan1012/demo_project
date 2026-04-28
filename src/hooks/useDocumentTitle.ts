/*
  Sets document.title reactively.

  Format:
    - With title:    "<title> | Product Catalog"
    - Without title: "Product Catalog"

  The effect re-runs only when title changes, so navigating between pages
  updates the browser tab immediately without a full re-render.
*/

import { useEffect } from 'react';

const APP_NAME = 'Product Catalog';

/* Pass undefined or omit title to reset to the base app name */
export const useDocumentTitle = (title?: string) => {
  useEffect(() => {
    document.title = title ? `${title} | ${APP_NAME}` : APP_NAME;
  }, [title]);
};
