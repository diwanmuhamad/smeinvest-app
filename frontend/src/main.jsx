import React from "react";
import ReactDOM from "react-dom/client";
import CasaApp from "./CasaApp";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CasaApp />
    </BrowserRouter>
  </React.StrictMode>
);
