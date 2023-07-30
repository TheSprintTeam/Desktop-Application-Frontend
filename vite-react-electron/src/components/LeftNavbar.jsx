import { NavLink } from "react-router-dom"
import "../assets/css/LeftNavbar.css"

export default function LeftNavbar() {
    return (
        <nav className="left-nav">
            <ul className="left-nav-vertical">
                <li className="left-nav-item"><a to="/create-team/project-info" className="left-nav-link">Project Info</a></li>
                <li className="left-nav-item"><a to="/create-team/search-engine" className="left-nav-link">Search Engine</a></li>
                <li className="left-nav-item"><a to="/create-team/recommendation" className="left-nav-link">Recommendation</a></li>
                <li className="left-nav-item"><a to="/create-team/invitations" className="left-nav-link">Invitations</a></li>
                <li className="left-nav-item"><a to="/create-team/review" className="left-nav-link">Review</a></li>
            </ul>
        </nav>
    );
}