import React from 'react';
import { Drawer, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { ChevronLeft, ChevronRight, AccountCircle, Inbox, Star, Inventory, LibraryAddCheck, Delete, Settings } from '@mui/icons-material';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

interface CustomDrawerProps {
  open: boolean;
  handleDrawerClose: () => void;
}

export const CustomDrawer: React.FC<CustomDrawerProps> = ({ open, handleDrawerClose }) => {
  const theme = useTheme();

  const getIcon = (text: string) => {
    switch (text) {
      case 'Inbox':
        return <Inbox />;
      case "Today's":
        return <Star />;
      case 'Sometimes':
        return <Inventory />;
      case 'CompletionLog':
        return <LibraryAddCheck />;
      case 'Trash':
        return <Delete />;
      case 'Profile':
        return <AccountCircle />;
      case 'Settings':
        return <Settings />;
      default:
        return '';
    }
  }

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
        },
      }}
      variant="persistent"
      anchor="right"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {['Inbox', "Today's", 'Sometimes', 'CompletionLog'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {getIcon(text)}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Trash', 'Profile', 'Settings'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {getIcon(text)}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
