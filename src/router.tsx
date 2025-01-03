import { createBrowserRouter } from "react-router-dom";
import MainPage from "@/routes/main/MainPage";
import Layout from "@/components/layout/Layout";
import RegisterPage from "./routes/register/RegisterPage";
import PassiveDetectionPage from "./routes/passive/PassiveDetectionPage";
import RecognitionPage from "./routes/recognition/RecognitionPage";
import WelcomePage from "./routes/welcome/WelcomePage";
import ActiveDetectionPage from "./routes/active/ActiveDetectionPage";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <MainPage />,
        index: true,
      },
      {
        path: "register",
        element: <RegisterPage />,
        index: true,
      },
      {
        path: "passive",
        element: <PassiveDetectionPage />,
        index: true,
      },
      {
        path: "recognition",
        element: <RecognitionPage />,
        index: true,
      },
      {
        path: "welcome",
        element: <WelcomePage />,
        index: true,
      },
      {
        path: "active",
        element: <ActiveDetectionPage />,
        index: true,
      },
    ],
    // errorElement: <ErrorPage />, // root route에 error page 추가 가능
  },
];

const router = createBrowserRouter(routes);

export default router;
