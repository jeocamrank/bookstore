import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/register/index.jsx";

const Layout = () => {
  return (
    <>main page</>
  );
};

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <div>LOL error not found</div>,
    },
    {
      path: "/login",
      element: <LoginPage />,
      errorElement: <div>LOL error not found</div>,
    },
  ]);
  
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
