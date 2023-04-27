import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { AuthForm } from "Components/Auth/AuthForm/AuthForm";

type SignupFormProps = {
  onSubmit: (email: string, password: string) => void;
};

export const SignupForm = ({ onSubmit }: SignupFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <AuthForm title="新規会員登録" onSubmit={handleSubmit}>
      <TextField
        label="メールアドレス"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label="パスワード"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" variant="contained">
        登録する
      </Button>
    </AuthForm>
  );
};
