import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App.tsx";
import { Provider } from "react-redux";
import store from "./app/store.ts";
import { Toaster } from "@/components/ui/toaster";
import { DirectionProvider } from "@radix-ui/react-direction";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DirectionProvider dir="rtl">
      <Provider store={store}>
        <App />
        <Toaster />
      </Provider>
    </DirectionProvider>
  </StrictMode>,
);
