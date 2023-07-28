import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changeUserPassword } from "../api/auth";
import SignupForm from "../components/SignupForm";
import Button from "../components/Button";
import { InputField, InputFieldPassword } from "../components/InputFields";
import "../assets/css/SignupPage.css";

import { FaArrowLeft } from "react-icons/fa6"

export default function ForgotPasswordPage() {
    const [screen, setScreen] = useState(1);
    const [passwordChange, setPasswordChange] = useState({
        "email": "",
        "oldPassword": "",
        "newPassword": "",
    })
    
    const navigate = useNavigate();

    async function passwordReset() {
        let response = await resetPassword(passwordChange.email);
    
        // handle the response here
        if (response.error) {
            console.log("error resetting password!");
        } else {
            // display that the user successfully created a team
            console.log("success resetting password");
            console.log(response.data);
            setScreen(2);
        }
    }
    
    async function changePassword() {
        let response = await changeUserPassword(passwordChange.oldPassword, passwordChange.newPassword);
    
        // handle the response here
        if (response.error) {
            console.log("error changing password!");
        } else {
            // display that the user successfully created a team
            console.log("success changing password");
            console.log(response.data);
            navigate("/login");
        }
    }

    let itemContent
    if (screen === 1) {
        itemContent = (
            <div className="signup-inner">
                <Button onClick={e => navigate("/login")} type={"button"} className={"signup-button-back"} children={
                    <div className="external-div"><span className="external-icon"><FaArrowLeft /></span>Back to Login</div>
                }/>
                <div className="signup-button-divider"></div>
                <div className="signup-inner-title">Reset your password</div>
                <div className="signup-inner-desc-container">
                    <div className="signup-inner-desc">
                        To reset your password, enter your email below and submit. You will be moved onto the next page 
                        where you will have to enter the temporary password emailed to you and create a new password.
                    </div>
                </div>
                <div className="signup-button-divider"></div>
                <div className="input-field-container">
                    <div className="input-field-title"></div>
                </div>
                <div className="input-field-container">
                    <div className="input-field-title">Email Address</div>
                    <InputField className="signup-input-field" value={passwordChange.oldPassword ? passwordChange.oldPassword : ""}
                        onChange={e => setPasswordChange({...passwordChange, oldPassword: e.target.value})}
                    />
                </div>
                <Button onClick={passwordReset} type={"button"} className={"signup-button-next"} children={"Reset Password"}/>
            </div>
        );
    } else {
        itemContent = (
            <div className="signup-inner">
                <Button onClick={e => navigate("/login")} type={"button"} className={"signup-button-back"} children={
                    <div className="external-div"><span className="external-icon"><FaArrowLeft /></span>Back to Login</div>
                }/>
                <div className="signup-button-divider"></div>
                <div className="signup-inner-title">Change your password</div>
                <div className="signup-button-divider"></div>
                <div className="input-field-container">
                    <div className="input-field-title"></div>
                </div>
                <div className="input-field-container">
                    <div className="input-field-title">Old Password</div>
                    <InputFieldPassword className="signup-input-field" value={passwordChange.email ? passwordChange.email : ""}
                        onChange={e => setPasswordChange({...passwordChange, email: e.target.value})}
                    />
                </div>
                <div className="input-field-container">
                    <div className="input-field-title">New Password</div>
                        <InputFieldPassword className="signup-input-field" value={passwordChange.newPassword ? passwordChange.newPassword : ""}
                            onChange={e => setPasswordChange({...passwordChange, newPassword: e.target.value})}
                        />
                </div>
                <Button onClick={changePassword} type={"button"} className={"signup-button-next"} children={"Change Password"}/>
            </div>
        );
    }
    
    return (
        <SignupForm children={itemContent}/>
    );
}
