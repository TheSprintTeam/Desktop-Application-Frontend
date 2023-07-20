import { useState } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from './components/Navbar.jsx';
import DashboardPage from './pages/DashboardPage';
import ErrorPage from './pages/ErrorPage';
import SignupPage from './pages/SignupPage';
import JoinTeamPage from './pages/JoinTeamPage';

function NavbarWrapper() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

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
        path: "/join-team",
        element: <JoinTeamPage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
