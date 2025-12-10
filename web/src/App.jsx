import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import Root from "./Root";
import Users from "./pages/Users";
import { Login } from "./pages/Login";
import HomePage from "./pages/HomePage";
import SoilChat from "./pages/SoilChat";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "/soil-chat",
            element: <SoilChat />,
            // loader: ""
            // action: ""
          },
          {
            path: "/users",
            element: <Users />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
