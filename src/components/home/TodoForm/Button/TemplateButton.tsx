import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export const TemplateButton = (props:any) => {
  const { disabled, handleClick, title } = props;

  return (
    <Stack spacing={2} direction="row">
      <Button
        variant="contained"
        disabled={disabled}
        name={title}
        onClick={handleClick}
        // buttonName={buttonName}
      >
        追加
      </Button>
    </Stack>
  );
}
