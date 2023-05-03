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

export type Props = {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoMain: React.FC<Props> = ({ todoList, setTodoList }) => {
  const [checked, setChecked] = useState<Todo[]>([]);

  const handleToggle = (value: Todo) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleEdit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, value: Todo) => {
    event.stopPropagation();
    console.log(`Editing: ${value.text}`);
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, value: Todo) => {
    event.stopPropagation();
    const newTodoList = todoList.filter(todo => todo !== value);
    setTodoList(newTodoList);
  };

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {todoList.map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={`${value.text}_${value.deadline}`}
            secondaryAction={
              <>
                <IconButton edge="end" aria-label="edit" onClick={(event) => handleEdit(event, value)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={(event) => handleDelete(event, value)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.text} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
