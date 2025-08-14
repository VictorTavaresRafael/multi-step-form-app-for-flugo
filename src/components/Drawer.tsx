import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useMediaQuery, Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GroupsIcon from '@mui/icons-material/Groups';
const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [open] = React.useState(!isMobile);

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <img src="/logo.png" width="100px" alt="Logo" />
                </DrawerHeader>
                <List>
                    {['Colaboradores', 'Fornecedores', 'Clientes'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                disabled={text === 'Fornecedores' || text === 'Clientes'}
                                sx={[
                                    { minHeight: 48, px: 2.5 },
                                    open ? { justifyContent: 'initial' } : { justifyContent: 'center' },
                                ]}
                            >
                                <ListItemIcon
                                    sx={[
                                        { minWidth: 0, justifyContent: 'center' },
                                        open ? { mr: 3 } : { mr: 'auto' },
                                    ]}
                                >
                                    <GroupsIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={text}
                                    sx={[open ? { opacity: 1 } : { opacity: 0 }]}
                                />
                                <ChevronRightIcon />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}