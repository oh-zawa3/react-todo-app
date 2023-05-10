import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

type TextFieldsProps = {
  title: string;
  textValue: { todo: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
/**
 * form の一般化
 * textValue: formの値
 * @param props
 * @returns
 */
export const TodoTextField = ({ title, handleChange, textValue }: TextFieldsProps) => {

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 0, width: '30ch' },
        mr: 1
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
