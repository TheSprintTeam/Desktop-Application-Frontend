import { useState } from 'react';
import DashboardPage from './pages/DashboardPage';
import ErrorPage from './pages/ErrorPage';
import SignupPage from './pages/signupPage';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from './components/Navbar.jsx';
import Desktop2 from '../views/desktop2';
import Desktop5 from '../views/desktop5';
import Desktop6 from '../views/desktop6';
import Desktop8 from '../views/desktop8';
import Desktop9 from '../views/desktop9';
import Desktop10 from '../views/desktop10';

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
      {
        path: "/team-create-1",
        element: <Desktop2 />,
      },
      {
        path: "/team-create-2",
        element: <Desktop5 />,
      },
      {
        path: "/team-create-3",
        element: <Desktop6 />,
      },
      {
        path: "/team-create-4",
        element: <Desktop8 />,
      },
      {
        path: "/team-create-5",
        element: <Desktop9 />,
      },
      {
        path: "/team-create-6",
        element: <Desktop10 />,
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
