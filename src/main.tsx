import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import "react-calendar-heatmap/dist/styles.css";
import App from "./App.tsx";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 5, retryDelay: 1000 } },
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {/*<ReactQueryDevtools isIntialsOpen={false} />*/}
    </QueryClientProvider>
  </StrictMode>,
);
