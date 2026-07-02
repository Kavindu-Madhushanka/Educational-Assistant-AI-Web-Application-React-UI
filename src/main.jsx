import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import React from "react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
