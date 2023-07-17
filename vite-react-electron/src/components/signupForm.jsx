import "../assets/css/signupForm.css";

export default function SignupForm() {
    return (
        <>
            <div className="sprint">Sprint</div>
                <div className="short-thing-about-sprint">short thing about sprint</div>
                <div className="the-border">
                    <div className="ButtonBase">
                    <div className="WidthStructure">
                        <div className="HeightStructure">
                        <div className="ButtonBody">
                            <div className="sign-up-with-google">Sign up with Google</div>
                        </div>
                        </div>
                        <div className="Minwidth">
                        <div className="Content" />
                        </div>
                    </div>
                    </div>
                    <div className="ButtonBase">
                    <div className="WidthStructure">
                        <div className="HeightStructure">
                        <div className="ButtonBody">
                            <div className="sign-up-with-google">Sign up with Microsoft</div>
                        </div>
                        </div>
                        <div className="Minwidth">
                        <div className="Content" />
                        </div>
                    </div>
                    </div>
                    <div className="Line1" />
                    <div className="OR">OR</div>
                    <div className="Line2" />
                    <div className="InputOutlineFieldtextDefault">
                    <div className="InputFieldtext">
                        <input
                        type="text"
                        className="TextHere"
                        placeholder="Enter your email"
                        />
                        <div className="Minwidth1">
                        <div className="Content1" />
                        </div>
                    </div>
                    </div>
                    <div className="ButtonBase1">
                    <div className="WidthStructure1">
                        <div className="HeightStructure1">
                        <div className="ButtonBody1">
                            <div className="ContinueButton">Continue</div>
                        </div>
                        </div>
                        <div className="Minwidth2">
                        <div className="Content2" />
                        </div>
                    </div>
                    </div>
                <div className="already-have-an-account">Already have an account?</div>
                <a href="login.html" className="loginlink">
                Login
                </a>
            </div>
            </>
    );
}