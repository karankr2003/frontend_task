// src/index.js
import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import { createRoot } from "react-dom/client";

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }
  const { worker } = await import("./mocks/browser");
  return worker.start();
}

enableMocking().then(() => {
  const root = createRoot(document.getElementById("root"));
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
