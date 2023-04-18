import React, { memo, useCallback, useState } from "react";
import { initialTextValue } from "Components/Home/TodoForm/const";
import { TemplateButton } from "Components/Home/TodoForm/Button";
import { TextFields } from "Components/Home/TodoForm/TextField";
import { Box } from '@mui/material';


export const TodoForm = memo(() => {
  /** TextFields についての state */
  const [textValue, setTextValue]:any = useState(initialTextValue);
  /** button　押下可否についての　state
   * フォームが空の時、ボタンを押下できないようにする
   */
  const [disable, setDisable] = useState(true);


  /** TextFields の値の管理 */
  const handleChangeText = useCallback((e:any) => {
    setTextValue((textValue:any) => ({
      ...textValue,
      [e.target.name]: e.target.value,
    }))
    setDisable(e.target.value === "" ? true : false);
  }, []);

  console.log(textValue);

    /** ボタンの挙動の管理  */
  const handleClickButton = () => {
    alert(textValue);
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
          disabled={disable}
        />
      </Box>
    </>
  );
});
