import { createBrowserRouter } from "react-router-dom";
import { Home } from "./routes/home/Home";
import { Root } from "./routes/root/Root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
]);
