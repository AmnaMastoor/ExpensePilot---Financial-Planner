import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="249183357469-l0n79q3nueqc28ijs1o47k0bpll5t2bu.apps.googleusercontent.com">
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            backgroundColor: "var(--bg-color)",
            color: "var(--text-color)",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
    </GoogleOAuthProvider>
  </React.StrictMode>
);