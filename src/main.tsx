import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { router } from "./routes.tsx";
import { Toaster } from "@/components/ui/sonner";
import { Provider } from "react-redux";
import { store } from "./lib/redux/store.ts";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <StrictMode>
        <RouterProvider router={router} />
        <Toaster />
      </StrictMode>
    </Provider>
  </QueryClientProvider>,
);
