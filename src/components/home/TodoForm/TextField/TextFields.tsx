import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

/**
 * form の一般化
 * title: セレクトボックスで選択されている値(label)
 * textValue: formの値
 * @param props
 * @returns
 */
export const TextFields = (props:any) => {
  const { handleChange } = props;

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
        label={`ここにtodoを入力`}
        variant="outlined"
        // ↓エラー解消のため一時コメントアウト
        // value={textValue[title]}
        onChange={handleChange}
      />
    </Box>
  );
};
