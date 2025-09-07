import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#313475",
          // colorBorder: "#313475",
          borderRadius: 4,
          controlOutlineWidth: 0,
          controlBoxShadow: "none",
          controlHeight: 48,
          controlBorderWidth: "10px",
        },
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>
);
