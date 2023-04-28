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
import { styled } from '@mui/material/styles';
import { Todo } from 'types/Todo';

export type Props = {
  todoList: Todo[];
}

const StyledListItem = styled(ListItem)(({ theme, isDone }: { theme: any; isDone: boolean }) => ({
  display: isDone ? 'none' : 'flex',
  '&.isDone': {
    textDecoration: 'line-through',
    '& .MuiListItemIcon-root': {
      opacity: 0.5,
    },
  },
}));

const StyledListItemText = styled(ListItemText)({
  overflowWrap: 'break-word',
});

export const TodoMain: React.FC<Props> = ({ todoList }) => {
  const [checkedIds, setCheckedIds] = useState<number[]>([]);

  const handleToggle = (id: number) => () => {
    setCheckedIds((prevIds) => [...prevIds, id]);
    setTimeout(() => {
      setCheckedIds((prevIds) => prevIds.filter((value) => value !== id));
    }, 2000);
  };

  const handleEdit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, value: Todo) => {
    event.stopPropagation();
    console.log(`Editing: ${value.text}`);
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, value: Todo) => {
    event.stopPropagation();
    console.log(`Deleting: ${value.text}`);
  };

  const filteredTodoList = todoList.filter((todo) => !checkedIds.includes(todo.id));

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {filteredTodoList.map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <StyledListItem
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
            isDone={checkedIds.includes(value.id)}
            className={checkedIds.includes(value.id) ? 'isDone' : ''}
          >
            <ListItemButton role={undefined} onClick={handleToggle(value.id)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checkedIds.indexOf(value.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <StyledListItemText id={labelId} primary={value.text} />
            </ListItemButton>
          </StyledListItem>
        );
      })}
    </List>
  );
};
