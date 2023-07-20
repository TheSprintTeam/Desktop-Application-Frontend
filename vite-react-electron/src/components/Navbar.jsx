import { NavLink } from "react-router-dom";
import "../assets/css/Navbar.css";

export default function Navbar() {
    return (
        <nav>
            <ul className="navbar-left">
                <li><NavLink to={"/"} className="sprint-icon">&lt;&#47;&gt;</NavLink></li>
                <li><NavLink to={"tbd"}>Link 2</NavLink></li>
                <li><NavLink to={"tbd"}>Link 3</NavLink></li>
            </ul>
            <div className="navbar-right">
                <NavLink to={"/login"}>Login</NavLink>
                {/*<img src="/profile-icon.png" alt="Profile Icon" />*/}
            </div>
        </nav>
    )
}