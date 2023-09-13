import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { getUser } from './api/user.jsx';
import Cookies from "js-cookie";
import Navbar from './components/Navbar.jsx';
import DashboardPage from './pages/DashboardPage';
import ErrorPage from './pages/ErrorPage';
import SignupPage from './pages/signupPage.jsx';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import JoinTeamPage from './pages/JoinTeamPage';
import CreateTeamPage from './pages/CreateTeamPage.jsx';
import InstallPage from './pages/InstallPage.jsx';
import SendInvitePage from './pages/SendInvitePage.jsx';
import ViewTeamsPage from './pages/ViewTeamsPage.jsx';
import { isEmptyObjectField } from './utils/helpers.jsx';

function App() {
  const [user, setUser] = useState({
    email: "",
    name: "",
    verified: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const token = Cookies.get("session-token");
      if (token !== null) {
        const userData = await getUser();

        setUser({
          email: userData.data.email,
          name: userData.data.first_name + " " + userData.data.last_name,
          verified: userData.data.verified
        });
      } else {
        if (!isEmptyObjectField(user)) {
          setUser({
            email: "",
            name: "",
            verified: "",
          });
        }
      }
    }

    checkUser();
  }, []);

  function NavbarWrapper({ userLoggedIn }) {
    return (
      <div>
        <Navbar userLoggedIn={userLoggedIn}/>
        <Outlet />
      </div>
    );
    
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavbarWrapper userLoggedIn={user} />,
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
          path: "/forgot-password",
          element: <ForgotPasswordPage />,
        },
        {
          path: "/join-team",
          element: <JoinTeamPage />,
        },
        {
          path: "/create-team",
          element: <CreateTeamPage />,
        },
        {
          path: "/view-teams",
          element: <ViewTeamsPage userLoggedIn={user}/>,
        },
        {
          path: "/install/:team_id",
          element:<InstallPage />
        },
        {
          path: "/sendInvite/:team_id",
          element: <SendInvitePage />
        }
      ],
    },
  ]);

  console.log(user);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
