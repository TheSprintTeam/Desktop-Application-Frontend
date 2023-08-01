import "../assets/css/LeftNavbar.css"

export default function LeftNavbar({ onChangeScreen }) {
    return (
        <>
            <nav className="left-nav">
                <ul className="left-nav-vertical">
                    <li className="left-nav-item"><a className="left-nav-link" onClick={() => onChangeScreen(1)}>Project Info</a></li>
                    <li className="left-nav-item"><a className="left-nav-link">Search Engine</a></li>
                    <li className="left-nav-item"><a className="left-nav-link">Recommendation</a></li>
                    <li className="left-nav-item"><a className="left-nav-link" onClick={() => onChangeScreen(2)}>Invitations</a></li>
                    <li className="left-nav-item"><a className="left-nav-link" onClick={() => onChangeScreen(3)}>Review</a></li>
                </ul>
                <ul className="left-nav-right-vertical"></ul>
            </nav>
        </>
    );
}