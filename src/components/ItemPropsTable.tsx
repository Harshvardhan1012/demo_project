/*
  dynamic specification table for a catalog item.
*/

import { Paper, Table, TableBody, TableCell, TableRow } from '@mui/material'
import type { ItemProp } from '../types/catalog.types'
import { Text } from './ui/Text'

interface ItemPropsTableProps {
  props: ItemProp[] /* The full itemprops array from the selected CatalogItem */
  title?: string /* Optional heading rendered above the table */
}

export const ItemPropsTable = ({ props, title }: ItemPropsTableProps) => (
  <>
    {title && (
      <Text
        variant="section"
        bold
        gutterBottom>
        {title}
      </Text>
    )}
    <Paper variant="outlined">
      <Table size="small">
        <TableBody>
          {props.map((prop) => (
            <TableRow
              key={prop.label}
              sx={{ '&:last-child td': { border: 0 } }}>
              <TableCell
                sx={{
                  fontWeight: 600,
                  width: '40%',
                  bgcolor: 'grey.50',
                  color: 'text.secondary',
                }}>
                {prop.label}
              </TableCell>
              <TableCell>{prop.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  </>
)
