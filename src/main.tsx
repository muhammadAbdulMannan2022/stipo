import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReactGA from "react-ga4"; // Import this
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./router/Router.tsx";
import "./utils/i18n.ts";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

// Initialize GA4
ReactGA.initialize(import.meta.env.VITE_Measurement_ID); // Use your GA4 Measurement ID

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
