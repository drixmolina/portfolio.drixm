
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter } from "react-router";
import App from "./app/App.tsx";
import "./styles/index.css";

const isLocalPreview = ["localhost", "127.0.0.1"].includes(
  window.location.hostname,
);

createRoot(document.getElementById("root")!).render(
  <>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {isLocalPreview ? null : <Analytics />}
  </>,
);
