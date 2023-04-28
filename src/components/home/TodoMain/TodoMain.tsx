import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Todo } from 'types/Todo';
import { ThemeProvider, createTheme } from '@mui/material/styles';

type TodoListItemProps = {
  todo: Todo;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

const TodoListItem: React.FC<TodoListItemProps> = ({ todo, onToggle, onEdit, onDelete }) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const theme = createTheme();

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onDelete();
    }, 2000);
  };

  return (
    <ThemeProvider theme={theme}>
      <ListItem
        disablePadding
        sx={{
          display: todo.isDone && isRemoving ? 'none' : 'flex',
          textDecoration: todo.isDone ? 'line-through' : 'none',
          transition: 'all 2s ease',
        }}
      >
        <ListItemButton role={undefined} onClick={onToggle} dense>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={todo.isDone}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': `checkbox-list-label-${todo.id}` }}
            />
          </ListItemIcon>
          <ListItemText id={`checkbox-list-label-${todo.id}`} primary={todo.text} />
        </ListItemButton>
        <IconButton edge="end" aria-label="edit" onClick={onEdit}>
          <EditIcon />
        </IconButton>
        <IconButton edge="end" aria-label="delete" onClick={handleRemove}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
    </ThemeProvider>
  );
};

type TodoMainProps = {
  todoList: Todo[];
  onToggle: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

export const TodoMain: React.FC<TodoMainProps> = ({ todoList, onToggle, onEdit, onDelete }) => {
  const handleToggle = (id: number) => {
    onToggle(id);
  };

  const handleEdit = (id: number) => {
    onEdit(id);
  };

  const handleDelete = (id: number) => {
    onDelete(id);
  };

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {todoList.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onToggle={() => handleToggle(todo.id)}
          onEdit={() => handleEdit(todo.id)}
          onDelete={() => handleDelete(todo.id)}
        />
      ))}
    </List>
  );
};
