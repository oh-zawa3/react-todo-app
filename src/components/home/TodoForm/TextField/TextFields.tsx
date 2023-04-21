import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { TextFieldsProps } from "types/Todo";

/**
 * form の一般化
 * title: セレクトボックスで選択されている値(label)
 * textValue: formの値
 * @param props
 * @returns
 */
export const TextFields = ({ title, handleChange, textValue }: TextFieldsProps) => {

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '30ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        name="todo"
        label={`ここに${title}を入力`}
        variant="outlined"
        value={textValue.todo}
        onChange={handleChange}
      />
    </Box>
  );
};
