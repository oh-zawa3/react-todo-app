import React, { memo, useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { TodoHeader } from "Components/Home/TodoHeader/TodoHeader";
import { CustomDrawer } from "Components/Home/TodoHeader/CustomDrawer";
import { TodoMain } from 'Components/Home/TodoMain/TodoMain';
import { TodoForm } from 'Components/Home/TodoForm';
import { Todo } from 'types/Todo';


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
      <CustomDrawer open={open} handleDrawerClose={handleDrawerClose} />
      <TodoForm onClick={addTodo} />
      <TodoMain todoList={todoList} />

    </Box>
  );
});
