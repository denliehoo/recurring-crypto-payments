import { useSubcriptionDetail } from '@checkout/store';
import { TagRounded } from '@mui/icons-material';
import { Typography, Divider, Box, IconButton } from '@mui/material';
import { formatDate } from '@core/utils';
import type { FC } from 'react';

const InvoiceHistory: FC = () => {
  const details = useSubcriptionDetail((state) => state.details);
  const { invoices = [] } = details || {};
  return (
    <>
      <Typography component="h1" variant="h5" sx={{ mt: 3 }}>
        Invoice History
      </Typography>
      <Divider />
      <Box sx={{ mt: 1 }}>
        {invoices.length ? (
          <Box>You have no invoices </Box>
        ) : (
          invoices.map((i) => (
            <Box>
              {formatDate(i.date)}
              <IconButton>
                <a href={i.hash} target="_blank" rel="noreferrer">
                  <TagRounded />
                </a>
              </IconButton>
              {i.amount / 10 ** 6} {i.token} {i.status}
            </Box>
          ))
        )}
      </Box>
    </>
  );
};

export default InvoiceHistory;
