import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  Avatar,
  Grid,
} from '@mui/material';
export default function HeaderAvatar() {
  return (
    <Grid size={12} sx={{ p: 2, display: 'flex', justifyContent: 'end' }}>
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
        <AccountCircleIcon style={{ width: 20, height: 20 }} />
      </Avatar>
    </Grid>
  );
}