import { createRoot } from "react-dom/client";
import "./reset.css";
import "./library.css";

import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./Providers/UserProvider.jsx";

createRoot(document.getElementById("root")).render(
  <UserProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserProvider>
);
