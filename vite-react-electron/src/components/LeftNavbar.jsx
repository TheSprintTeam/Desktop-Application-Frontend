import "../assets/css/LeftNavbar.css"

export default function LeftNavbar({ screen, onChangeScreen }) {
    return (
        <>
            <nav className="left-nav">
                <ul className="left-nav-vertical">
                    <li className="left-nav-item"><a className={`left-nav-link ${(screen <= 1) ? "one " : "check "}`+`${screen<1 ? "tl " : "ts "}`+`${screen==1 ? "active" : ""}`} 
                        onClick={() => onChangeScreen(1)}>Project Info</a>
                    </li>
                    <li className="left-nav-item"><a className={`left-nav-link ${(screen <= 2) ? "two " : "check "}`+`${screen<2 ? "tl " : "ts "}`+`${screen==2 ? "active" : ""}`}
                        onClick={() => onChangeScreen(2)}
                    >Recommendation</a></li>
                    <li className="left-nav-item"><a className={`left-nav-link ${(screen <= 3) ? "three " : "check "}`+`${screen<3 ? "tl " : "ts "}`+`${screen==3 ? "active" : ""}`}
                        onClick={() => onChangeScreen(3)}>Search Engine</a>
                    </li>
                    <li className="left-nav-item"><a className={`left-nav-link ${(screen <= 4) ? "four " : "check "}`+`${screen<4 ? "tl " : "ts "}`+`${screen==4 ? "active" : ""}`} 
                        onClick={() => onChangeScreen(4)}>Invitations</a>
                    </li>
                    <li className="left-nav-item"><a className={`left-nav-link ${(screen <= 5) ? "five " : "check "}`+`${screen<5 ? "tl " : "ts "}`+`${screen==5 ? "active" : ""}`}
                        onClick={() => onChangeScreen(5)}>Review</a>
                    </li>
                </ul>
                <ul className="left-nav-right-vertical"></ul>
            </nav>
        </>
    );
}