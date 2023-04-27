import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          MyApp
        </Typography>
        <Link to="/login" style={{ color: "white", marginRight: "16px" }}>
          ログイン
        </Link>
        <Link to="/signup" style={{ color: "white" }}>
          新規会員登録
        </Link>
      </Toolbar>
    </AppBar>
  );
};
