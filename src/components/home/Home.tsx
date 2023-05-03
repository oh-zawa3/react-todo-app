import React, { memo, useState } from 'react';
import { Box, CssBaseline, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TodoHeader } from "Components/Home/TodoHeader/TodoHeader";
import { CustomDrawer } from "Components/Home/TodoHeader/CustomDrawer";
import { TodoMain } from 'Components/Home/TodoMain/TodoMain';
import { TodoForm } from 'Components/Home/TodoForm';
import { Todo } from 'types/Todo';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export const Home = memo(() => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

    const [todoList, setTodoList] = useState<Todo[]>([])
  const addTodo = (todo: Todo) => {
    setTodoList([...todoList, todo])
  }


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <TodoHeader open={open} handleDrawerOpen={handleDrawerOpen} />
      <Main open={open}>
        <DrawerHeader />
        <Typography>
          <TodoForm onClick={(todo) => addTodo(todo)} />
          <TodoMain todoList={todoList} />
        </Typography>
      </Main>
      <CustomDrawer open={open} handleDrawerClose={handleDrawerClose} />
    </Box>
  );
})
