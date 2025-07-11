import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { Provider } from "react-redux";
// import { configureStore } from "@reduxjs/toolkit";
import { store } from "./redux/Store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
