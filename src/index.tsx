import React from "react";
import ReactDOM from "react-dom/client";
import { TodoAppContainer } from "container";

// ReactDOM.render は現在サポートされていないため React 18 での書き方である .createRoot を使うこと
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<TodoAppContainer />);
