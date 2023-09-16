import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import PopupModal from "./PopupModal";
import { logoutUser } from "../api/auth";
import "../assets/css/Navbar.css";

export default function Navbar({ userLoggedIn }) {
    
    const navigate = useNavigate();
    
    const [modalContent, setModalContent] = useState({
        "title": "",
        "children": "",
        "showModal": false,
    });
    
    async function handleLogout() {
        let response = await logoutUser();
        console.log(response);
        if (response.error) {
            console.log("Error logging out.");
            setModalContent({
                title: "Error",
                children: "There was an error logging out of your account, please try again. Error: " + response.error,
                showModal: true
            });
        } else {
            console.log("Success logging out.");
            setModalContent({
                title: "Success",
                children: "You have successfully logged out of your account! Redirecting you back to the login screen in 3 seconds.",
                showModal: true
            });
            setTimeout(() => {
                navigate("/login");
                window.location.reload();
            }, 3000);
        }
    }
    
    return (
        <>
            <nav className="top-nav">
                <ul className="navbar-left">
                    <li><NavLink to={"/"} className="sprint-icon">&lt;&#47;&gt;</NavLink></li>
                    <li><NavLink to={"/view-teams"}>Teams</NavLink></li>
                    {/*<li><NavLink to={"tbd"}>Link 3</NavLink></li>*/}
                </ul>
                <div className="navbar-right">
                    {userLoggedIn.name ? 
                    <a onClick={handleLogout}>Log out</a> : <NavLink to={"/sign-up"}>Login</NavLink>
                    }
                    {/*<img src="/profile-icon.png" alt="Profile Icon" />*/}
                </div>
            </nav>
            <PopupModal title={modalContent.title} open={modalContent.showModal} children={modalContent.children}
                onClose={() => setModalContent({title: "", children: "", showModal: false})} 
            />
        </>
    )
}