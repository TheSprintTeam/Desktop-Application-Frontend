import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { getUser } from './api/user.jsx';
import Navbar from './components/Navbar.jsx';
import DashboardPage from './pages/DashboardPage';
import ErrorPage from './pages/ErrorPage';
import SignupPage from './pages/signupPage.jsx';
import LoginPage from './pages/LoginPage';
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
        path: "/sign-up",
        element: <SignupPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/join-team",
        element: <JoinTeamPage />,
      },
    ],
  },
]);

function App() {
  const [user, setUser] = useState({
    email: "",
    role_id: "",
    verified: "",
  });

  useEffect(() => {
    const checkUser = async () => {
      const token = Cookies.get("token");
      if (token !== null) {
        const userData = await getUser();

        setUser({
          email: userData.data.email,
          role_id: userData.data.role_id,
          verified: userData.data.verified
        });
      }
    }

    checkUser();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
