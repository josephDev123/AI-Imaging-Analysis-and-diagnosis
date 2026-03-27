import { createBrowserRouter } from "react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { HomePage } from "@/pages/Home/HomePage";
import { UploadScreenPage } from "@/pages/upload/UploadScreenPage";
import { AnalysisResultPage } from "@/pages/AnalysisResults/AnalysisResultPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "upload",
        element: <UploadScreenPage />,
      },
      {
        path: "results",
        element: <AnalysisResultPage />,
      },
    ],
  },
]);
