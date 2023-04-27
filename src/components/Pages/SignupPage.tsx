import React from "react";
import { Container } from "@mui/material";
import { SignupForm } from "Components/Auth/AuthForm/SingupForm";
import { Header } from "Components/Auth/Layout/Header";

export const SignupPage = () => {
  const handleSubmit = (email: string, password: string) => {
    // 新規会員登録処理
  };

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: "16px" }}>
        <SignupForm onSubmit={handleSubmit} />
      </Container>
    </>
  );
};
