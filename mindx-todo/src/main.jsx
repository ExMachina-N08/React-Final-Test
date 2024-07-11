import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/css/index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Active from "./Modals/Active.jsx";
import Completed from "./Modals/Completed.jsx";
import All from "./Modals/All.jsx";
import TodoProvider from "./context/TodoContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TodoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="all" element={<All />} />
            <Route path="active" element={<Active />} />
            <Route path="completed" element={<Completed />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TodoProvider>
  </React.StrictMode>
);
