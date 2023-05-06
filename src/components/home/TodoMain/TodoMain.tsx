import React, { useState, useMemo } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import { Todo } from 'types/Todo';

export type Props = {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  filter: string;
  currentFilterName: string;
};

const isToday = (date: Date | null | undefined) => {
  const targetDate = date ? new Date(date) : new Date();
  const today = new Date();
  return (
    targetDate.getDate() === today.getDate() &&
    targetDate.getMonth() === today.getMonth() &&
    targetDate.getFullYear() === today.getFullYear()
  );
};

const isSometimes = (date: Date | null | undefined) => {
  const targetDate = date ? new Date(date) : new Date();
  const today = new Date();
  const oneWeekLater = new Date(today.setDate(today.getDate() + 7));
  return targetDate >= today && targetDate <= oneWeekLater;
};

export const TodoMain: React.FC<Props> = ({ todoList, setTodoList, filter }) => {
  // ここでフィルタリングを行う
  const filteredTodoList = useMemo(() => {
    switch (filter) {
      case "Today's":
        return todoList.filter(
          (todo) => todo.deadline && isToday(todo.deadline)
        );
      case 'Sometimes':
        return todoList.filter(
          (todo) => todo.deadline && isSometimes(todo.deadline)
        );
      case 'CompletionLog':
        return todoList.filter((todo) => todo.isCompleted);
      case 'Trash':
        return todoList.filter((todo) => todo.isDeleted);
      default:
        return todoList.filter(
          (todo) => !todo.isCompleted && !todo.isDeleted
        );
    }
  }, [filter, todoList]);

  let filterName = '';
  switch (filter) {
    case "Today's":
      filterName = "Today's";
      break;
    case 'Sometimes':
      filterName = 'Sometimes';
      break;
    case 'CompletionLog':
      filterName = 'CompletionLog';
      break;
    case 'Trash':
      filterName = 'Trash';
      break;
    default:
      filterName = 'Inbox';
      break;
  }

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

    // 1秒後にisCompletedをtrueに切り替える
    setTimeout(() => {
      const index = todoList.findIndex(todo => todo === value);
      if (index >= 0) {
        const newTodoList = [...todoList];
        newTodoList[index].isCompleted = true;
        setTodoList(newTodoList);
      }
    }, 1000);
  };

  const handleEdit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, value: Todo) => {
    event.stopPropagation();
    console.log(`Editing: ${value.text}`);
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, value: Todo) => {
    event.stopPropagation();
    const newTodoList = [...todoList];
    const index = newTodoList.findIndex(todo => todo === value);
    if (index >= 0) {
      newTodoList[index].isDeleted = !newTodoList[index].isDeleted; // isDeletedを切り替える
      setTodoList(newTodoList);
    }
  };

  return (
    <>
      <Typography variant="h6">{filterName}</Typography>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {filteredTodoList.map((value) => {
          const labelId = `checkbox-list-label-${value.id ?? ''}`;

          return (
            <ListItem
              key={value.id}
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
                {value.isCompleted ? null : (
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                )}
                <ListItemText id={labelId} primary={value.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
