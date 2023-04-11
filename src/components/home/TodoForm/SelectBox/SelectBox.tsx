import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

/**
 * select の一般化
 * items: セレクトボックスの選択肢の値のセット
 * selectValue: セレクトボックスの選択中の値
 * @param props
 * @returns
 */
export const SelectBox = (props:any) => {
  const { items, handleChange, selectValue } = props;

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '20ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <TextField
          id="standard-select-currency"
          select
          label="Select"
          value={selectValue.value}
          onChange={handleChange}
          helperText="Please select an item to add"
          variant="standard"
        >
          {items.map((v:any) => (
            <MenuItem key={v.value} value={v.value}>
              {v.label}
            </MenuItem>
          ))}
        </TextField>
    </Box>
  );
};
