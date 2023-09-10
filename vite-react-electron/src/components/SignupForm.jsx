import "../assets/css/SignupForm.css";

export default function SignupForm({ children }) {
    return (
        <div className="signup-outer">
            <h1 className="signup-title">Sprint</h1>
            <p className="signup-desc">An app that automates the installation of technologies for your team</p>
            {children}
        </div>
    );
}
