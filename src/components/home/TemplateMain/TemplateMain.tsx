import { useState } from 'react';
import { IconButton, ListItem, ListItemIcon, Checkbox, ListItemText, TextField, ListItemSecondaryAction, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Todo } from 'types/Todo';

type Props = {
  todo: Todo;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, title: string) => void;
};

export const TemplateMain: React.FC<Props> = ({ todo, deleteTodo, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(todo.text);

  const handleSaveClick = () => {
    setIsEditing(false);
    updateTodo(todo.id, currentTitle);
  }

  return (
    <ListItem alignItems="flex-start">
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={todo.isDone}
          disableRipple
        />
      </ListItemIcon>
      {isEditing ?
        <div>
          <TextField
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
            margin="dense"
            fullWidth
          />
          <Button onClick={handleSaveClick} color="primary" variant="contained">
            Save
          </Button>
        </div>
        :
        <div onClick={() => setIsEditing(true)}>
          <ListItemText
            primary={todo.text}
            secondary={todo.isDone ? 'Completed' : 'Incomplete'}
          />
        </div>
      }
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(todo.id)}>
          <DeleteIcon />
        </IconButton>
        {!isEditing &&
          <IconButton edge="end" aria-label="edit" onClick={() => setIsEditing(true)}>
            <EditIcon />
          </IconButton>
        }
      </ListItemSecondaryAction>
    </ListItem>
  );
};
