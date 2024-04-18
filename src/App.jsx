import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ContactPage from "./pages/contact/index.jsx";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/index.jsx"
import Footer from "./components/Footer/index.jsx"
import BookPage from "./pages/book/index.jsx";
import Home from "./components/Home/index.jsx";
import './styles/reset.scss';
import RegisterPage from "./pages/register/index.jsx";
import LoginPage from "./pages/login/index.jsx";
import { callFetchAccount } from "./services/api.js";
import { useDispatch } from "react-redux";
import { doGetAccountAction } from "./redux/account/accountSlice.js";

const Layout = () => {
  return (
  <div className="layout-app">
    <Header />
    <Outlet />
    <Footer />
  </div>
  );
};

export default function App() {
  const dispatch = useDispatch();

  const getAccount = async () => {
    const res = await callFetchAccount();
    if (res && res.data) {
      dispatch(doGetAccountAction(res.data))
    }
  }
  useEffect(()=> {
    getAccount();
  }, [])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <div>LOL error not found</div>,

      children: [
        { index: true, element: <Home /> },
        {
          path: "contact",
          element: <ContactPage />,
        },
        {
          path: "book",
          element: <BookPage />,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
      errorElement: <div>LOL error not found</div>,
    },
    {
      path: "/register",
      element: <RegisterPage />,
      errorElement: <div>LOL error not found</div>,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
