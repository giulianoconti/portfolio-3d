import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
  /* .then((registration) => console.log("service worker registered", registration))
    .catch((err) => console.log("service worker not registered", err)); */
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
