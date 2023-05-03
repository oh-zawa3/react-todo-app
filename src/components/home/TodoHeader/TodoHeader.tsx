import React from 'react';
import { AppBarProps as MuiAppBarProps, AppBar as MuiAppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Menu } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const AppBar = styled(MuiAppBar)<AppBarProps>`
  ${({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    }),
  })}
`;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

interface TodoHeaderProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

export const TodoHeader = ({ open, handleDrawerOpen }: TodoHeaderProps) => {
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <Typography variant="h5" noWrap component="div"  sx={{ display: { xs: 'none', sm: 'block' } }} >
          Todo
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="クイック検索"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <Box sx={{ flexGrow: 1 }}  />
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerOpen}
          sx={{ ...(open && { display: 'none' }) }}
        >
          <Menu />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
