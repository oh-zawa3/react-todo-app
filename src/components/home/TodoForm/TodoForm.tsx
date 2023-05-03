import React, { memo, useCallback, useState } from "react";
import { initialTextValue } from "Components/Home/TodoForm/const";
import { TemplateButton } from "Components/Home/TodoForm/Button";
import { TextFields } from "Components/Home/TodoForm/TextField";
import { Box } from '@mui/material';
import { Todo } from "types/Todo";
import { v4 as uuidv4 } from 'uuid';



type TodoFormProps = {
  onClick: (todo: Todo) => void;
}

export const TodoForm = memo((props: TodoFormProps) => {
  const { onClick } = props;
  /** TextFields についての state */
  const [textValue, setTextValue] = useState(initialTextValue);

  /** TextFields の値の管理 */
  const handleChangeText = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue((textValue) => ({
      ...textValue,
      [e.target.name]: e.target.value,
    }))
  }, []);

  console.log(textValue);

  /** ボタンの挙動の管理  */
  const handleClickButton = () => {
    const newTodo: Todo = {
      id: uuidv4(),
      text: textValue.todo,
      isCompleted: false,
      deadline: null,
      isSometimes: false,
      isDeleted: false,
    };
    onClick(newTodo);
    setTextValue(initialTextValue);
  };


  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <TextFields
          title="todo"
          textValue={textValue}
          handleChange={handleChangeText}
        />
        <TemplateButton
          title="todo"
          outputValue={textValue}
          handleClick={handleClickButton}
          disabled={textValue.todo === ""}
        />
      </Box>
    </>
  );
});
