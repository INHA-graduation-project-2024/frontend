import { createBrowserRouter } from "react-router-dom";
import MainPage from "@/routes/main/MainPage";
import Layout from "@/components/layout/Layout";
import RegisterPage from "./routes/register/RegisterPage";

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
    ],
    // errorElement: <ErrorPage />, // root route에 error page 추가 가능
  },
];

const router = createBrowserRouter(routes);

export default router;
