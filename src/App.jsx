import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ContactPage from "./pages/contact/index.jsx";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/index.jsx";
import Footer from "./components/Footer/index.jsx";
import BookPage from "./pages/book/index.jsx";
import Home from "./components/Home/index.jsx";
import "./styles/reset.scss";
import RegisterPage from "./pages/register/index.jsx";
import LoginPage from "./pages/login/index.jsx";
import { callFetchAccount } from "./services/api.js";
import { useDispatch, useSelector } from "react-redux";
import { doGetAccountAction } from "./redux/account/accountSlice.js";
import Loading from "./components/Loading/index.jsx";
import NotFound from "./components/NotFound/index.jsx";
import AdminPage from "./pages/admin/index.jsx";
import ProtectedRound from "./components/ProtectedRoute/index.jsx";
import LayoutAdmin from "./components/Admin/LayoutAdmin.jsx";

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
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  const getAccount = async () => {
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/register"
    )
      return;
    const res = await callFetchAccount();
    if (res && res.data) {
      dispatch(doGetAccountAction(res.data));
    }
  };
  useEffect(() => {
    getAccount();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,

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
      path: "/admin",
      element: <LayoutAdmin />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: 
          <ProtectedRound>
            <AdminPage />
          </ProtectedRound>
        },
        {
          path: "user",
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
      element: <LoginPage />
    },
    {
      path: "/register",
      element: <RegisterPage />
    },
  ]);

  return (
    <>
      {isAuthenticated === true ||
      window.location.pathname === "/login" ||
      window.location.pathname === "/register" ||
      window.location.pathname === "/" ? (
        <RouterProvider router={router} />
      ) : (
        <Loading />
      )}
    </>
  );
}
