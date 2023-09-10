import "../assets/css/SignupForm.css";

export default function SignupForm({ children }) {
    return (
        <div className="signup-outer">
            <h1 className="signup-title">Sprint</h1>
            <p className="signup-desc">short thing about sprint</p>
            {children}
        </div>
    );
}
