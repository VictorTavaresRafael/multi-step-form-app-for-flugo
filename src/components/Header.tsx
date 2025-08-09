import React from 'react';
import { Avatar, Box } from '@mui/material';

export function Header() {
  return (
    <Box component="header" borderBottom={1} borderColor="divider" bgcolor="background.paper" px={3} py={2}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" gap={2}>
          <img src="src/assets/images/logo.png" alt="Flugo" width={120} />
        </Box>
        <Avatar sx={{ bgcolor: 'green', color: '#fff', width: 32, height: 32, fontSize: 18 }}>👤</Avatar>
      </Box>
    </Box>
  );
}