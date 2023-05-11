import React, { useState, useMemo } from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { IconButton, Typography, TextField, Pagination, Box } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
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
  const [checked, setChecked] = useState<Todo[]>([]);
  const [editingItem, setEditingItem] = useState<Todo | null>(null); // 編集中のアイテム
  const [editText, setEditText] = useState<string>(''); // 編集中のテキスト
  const [page, setPage] = useState(1);
  const todosPerPage = 10;

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

  // フィルタリング後のTodoリストをページごとに分割
  const pagedTodoList = useMemo(() => {
    const startIndex = (page - 1) * todosPerPage;
    const endIndex = startIndex + todosPerPage;
    return filteredTodoList.slice(startIndex, endIndex);
  }, [filteredTodoList, page, todosPerPage]);

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

  const handleToggle = (value: Todo) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  // editモードでなければ、チェックボックスをトグルする
    if (!editingItem) {
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
        const index = todoList.findIndex((todo) => todo === value);
        if (index >= 0) {
          const newTodoList = [...todoList];
          newTodoList[index].isCompleted = true;
          setTodoList(newTodoList);
        }
      }, 1000);
    }
  };

  const handleEdit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, value: Todo) => {
    event.stopPropagation();
    if (!editingItem) {
      setEditingItem(value);
      setEditText(value.text);
    }
  };

  const handleSave = () => {
    if (editingItem) {
      const newTodoList = [...todoList];
      const index = newTodoList.findIndex(todo => todo === editingItem);
      if (index >= 0) {
        newTodoList[index].text = editText;
        setTodoList(newTodoList);
        setEditingItem(null);
        setEditText('');
      }
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setEditText('');
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
        {pagedTodoList.map((value) => {
          const labelId = `checkbox-list-label-${value.id ?? ''}`;

          return (
            <ListItem
              key={value.id}
              secondaryAction={
                <>
                  {editingItem === value ? (
                    <>
                      <IconButton edge="end" aria-label="save" onClick={handleSave}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="cancel" onClick={handleCancel}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton edge="end" aria-label="edit" onClick={(event) => handleEdit(event, value)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" onClick={(event) => handleDelete(event, value)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </>
              }
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
                {editingItem === value ? (
                  <TextField
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onClick={(event) => event.stopPropagation()} // ここでクリックを停止する
                  />
                ) : (
                  <ListItemText id={labelId} primary={value.text} />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
        <Pagination count={Math.ceil(filteredTodoList.length / todosPerPage)} page={page} onChange={(event, value) => setPage(value)} />
      </Box>
    </>
  );
};
