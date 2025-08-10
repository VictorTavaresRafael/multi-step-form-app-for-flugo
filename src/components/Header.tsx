import React from 'react';
import { Avatar, Box } from '@mui/material';

export function Header() {
  return (
    <Box component="header" borderBottom={1} borderColor="divider" bgcolor="background.paper" px={{ xs: 1, sm: 2, md: 3 }} py={{ xs: 1, sm: 2 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" flexDirection={{ xs: 'column', sm: 'row' }}>
        <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 2 }} mb={{ xs: 1, sm: 0 }}>
          <img src="src/assets/images/logo.png" alt="Flugo" style={{ width: '100px', maxWidth: '100%', height: 'auto' }} />
        </Box>
        <Avatar
          sx={{
            display: { xs: 'none', sm: 'flex' },
            bgcolor: 'green',
            color: '#fff',
            width: { xs: 28, sm: 32 },
            height: { xs: 28, sm: 32 },
            fontSize: { xs: 16, sm: 18 }
          }}
        >
          👤
        </Avatar>
      </Box>
    </Box>
  );
}