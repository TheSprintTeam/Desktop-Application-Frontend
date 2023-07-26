import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { changePassword, loginUser } from "../api/auth";
import SignupForm from "../components/SignupForm";
import Button from "../components/Button";
import { InputField, InputFieldPassword } from "../components/InputFields";
import "../assets/css/SignupPage.css";

export default function LoginPage() {
    const [account, setAccount] = useState({
        "email": "",
        "password": "",
    });

    const navigate = useNavigate();

    async function handleClickSubmitLogin() {
        let response = await loginUser(account.email, account.password);

        // handle the response here
        // if response is error display pop up saying there was an error creating account:
        if (response.error) {
            console.log("error creating account!");
        } else {
            // display that the user successfully created a team
            console.log("success logging in!");
            setScreen(screen + 1);
        }
    }

    return (
        <>
            <SignupForm children={
                <div className="signup-inner">
                    <div className="signup-inner-title">Log in to your account</div>
                    <div className="signup-button-divider"></div>
                    <div className="input-field-container">
                        <div className="input-field-title">Email Address</div>
                        <InputField className="signup-input-field" value={account.firstname ? account.firstname : ""} 
                            onChange={e => setAccount({...account, firstname: e.target.value})}
                        />
                    </div>
                    <div className="input-field-container">
                        <div className="input-field-title">Password</div>
                        <InputFieldPassword className="signup-input-field login" value={account.password ? account.password : ""} 
                            onChange={e => setAccount({...account, password: e.target.value})}
                        />
                        <div className="input-field-bottom"><Link to="/forgot-password" className="forgot-pass">Forgot password?</Link></div>
                    </div>
                    <Button onClick={handleClickSubmitLogin} type={"button"} className={"signup-button-next"} children={"Login"}/>
                    <div className="signup-bottom-redirect">
                        <div>Don't have an account?</div>
                        <Link to="/sign-up" className="signup-bottom-link">Sign up</Link>
                    </div>
                </div>
            }
            />
        </>
    );
}