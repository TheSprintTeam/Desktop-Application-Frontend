import { useState } from 'react';
import DashboardPage from './pages/DashboardPage';
import ErrorPage from './pages/ErrorPage';
import SignupPage from './pages/SignupPage';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from './components/Navbar.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarWrapper />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/login",
        element: <SignupPage />,
      },
    ],
  },
]);

function NavbarWrapper() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
