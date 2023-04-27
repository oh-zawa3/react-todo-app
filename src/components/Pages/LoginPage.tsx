import React from "react";
import { Container } from "@mui/material";
import { LoginForm } from "Components/Auth/AuthForm/LoginForm";
import { Header } from "Components/Auth/Layout/Header";

export const LoginPage = () => {
  const handleSubmit = (email: string, password: string) => {
    // ログイン処理
  };

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: "16px" }}>
        <LoginForm onSubmit={handleSubmit} />
      </Container>
    </>
  );
};
