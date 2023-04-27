import React, { ReactNode } from "react";
import { Box } from "@mui/material";

type AuthFormProps = {
  title: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
};

export const AuthForm = ({ title, onSubmit, children }: AuthFormProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>{title}</h2>
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{
          width: "100%",
          maxWidth: "400px",
          mt: 1,
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
