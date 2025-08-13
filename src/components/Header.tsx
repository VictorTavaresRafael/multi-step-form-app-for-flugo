import React from 'react';
import { Box } from '@mui/material';

export default function Header() {
  return (
    <Box component="header" borderBottom={1} borderColor="divider" bgcolor="background.paper" px={{ xs: 1, sm: 2, md: 3 }} py={{ xs: 1, sm: 2 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" flexDirection={{ xs: 'column', sm: 'row' }}>
        <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 2 }} mb={{ xs: 1, sm: 0 }}>
          <img src="src/assets/images/logo.png" alt="Flugo" style={{ width: '100px', maxWidth: '100%', height: 'auto' }} />
        </Box>
      </Box>
    </Box>
  );
}