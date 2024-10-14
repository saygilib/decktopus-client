import "./App.css";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import SignUp from "./components/authentication/SignUp";
import SignIn from "./components/authentication/SignIn";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";
import { NotificationProvider } from "./context/NotificationContext";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

function App() {
  const auth = useAuth();
  
  useEffect(() => {
    if (auth.isAuthenticated) {
      console.log("Authenticated! Redirecting...");
    }
  }, [auth.isAuthenticated]);

  const routes = [
    {
      path: "/",
      element: auth.isAuthenticated ? <Navbar /> : <Navigate to="/signin" />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
      ],
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
  ];

  const router = createBrowserRouter(routes);

  return (
    <NotificationProvider>
      <RouterProvider router={router} />
    </NotificationProvider>
  );
}

export default App;
