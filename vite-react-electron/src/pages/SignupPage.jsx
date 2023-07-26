import { useState } from "react";
import { Link } from "react-router-dom";
import { createUser, verifyUser } from "../api/auth";
import SignupForm from "../components/SignupForm";
import Button from "../components/Button";
import { InputField, InputFieldPassword } from "../components/InputFields";
import "../assets/css/SignupPage.css";

import { FaGoogle, FaMicrosoft, FaArrowLeft } from "react-icons/fa6"

export default function SignupPage() {
    const [screen, setScreen] = useState(1);
    const [OTPCode, setOTPCode] = useState("");
    const [account, setAccount] = useState({
        "email": "",
        "firstname": "",
        "lastname": "",
        "password": "",
    });
    
    async function handleClickGoogle(e) {
        e.preventDefault();
        window.open("http://127.0.0.1:8000/google-signin")
    }

    function handleClickMicrosoft() {

    }

    function handleClickBack() {
        setScreen(screen - 1);
    }

    async function handleClickSubmit() {
        let response = await createUser(account.email, account.password, account.firstname, account.lastname);

        // handle the response here
        // if response is error display pop up saying there was an error creating account:
        if (response.error) {
            console.log("error creating account!");
        } else {
            // display that the user successfully created a team
            console.log("success creating an account!");
            setScreen(screen + 1);
        }
    }

    async function handleClickVerify() {
        let response = await verifyUser(OTPCode);

        // handle the response here
        if (response.error) {
            console.log("error verifying account!");
        } else {
            // display that the user successfully created a team
            console.log("success verifying account");
            console.log(response.data);
        }
    }

    let itemContent
    if (screen === 1) {
        itemContent = (
            <div className="signup-inner">
                <div className="signup-inner-title">Create your account</div>
                <div className="signup-button-divider"></div>
                <Button onClick={handleClickGoogle} type={"button"} className={"button-external"} children={
                    <div className="external-provider"><span className="external-icon"><FaGoogle/></span>Sign up with Google</div>
                }/>
                <div className="signup-button-divider"></div>
                <Button onClick={handleClickMicrosoft} type={"button"} className={"button-external"} children={
                    <div className="external-provider"><span className="external-icon"><FaMicrosoft/></span>Sign up with Microsoft</div>
                }/>
                <div className="divider-container">
                    <div className="line">
                        <div className="line-or">OR</div>
                    </div>
                </div>
                <div className="input-field-container">
                    <div className="input-field-title">Email Address</div>
                    <InputField className="signup-input-field" autoFocus={true} value={account.email ? account.email : ""}
                        onChange={e => setAccount({...account, email: e.target.value})}
                    />
                </div>
                <Button onClick={e => setScreen(screen + 1)} type={"button"} className={"signup-button-next"} children={"Continue"}/>
                <div className="signup-bottom">
                    <div>Already have an account?</div>
                    <div className="login-click"><Link to="/login">Login</Link></div>
                </div>
            </div>
        );
    } else if (screen === 2) {
        itemContent = (
            <div className="signup-inner">
                <Button onClick={handleClickBack} type={"button"} className={"signup-button-back"} children={
                    <div className="external-div"><span className="external-icon"><FaArrowLeft /></span>Back</div>
                }/>
                <div className="signup-button-divider"></div>
                <div className="input-field-container">
                    <div className="input-field-title">First Name</div>
                    <InputField className="signup-input-field" value={account.firstname ? account.firstname : ""}
                        onChange={e => setAccount({...account, firstname: e.target.value})}
                    />
                </div>
                <div className="input-field-container">
                    <div className="input-field-title">Last Name</div>
                    <InputField className="signup-input-field" value={account.lastname ? account.lastname : ""}
                        onChange={e => setAccount({...account, lastname: e.target.value})}
                    />
                </div>
                <div className="input-field-container">
                    <div className="input-field-title">Password</div>
                    <InputFieldPassword className={"signup-input-field"} value={account.password ? account.password : ""} 
                        onChange={e => setAccount({...account, password: e.target.value})}
                    />
                </div>
                <Button onClick={handleClickSubmit} type={"submit"} className={"signup-button-next"} children={"Create Account"}/>
            </div>
        );
    } else if (screen === 3) {
        itemContent = (
            <div className="signup-inner">
                <Button onClick={handleClickBack} type={"button"} className={"signup-button-back"} children={
                    <div className="external-div"><span className="external-icon"><FaArrowLeft /></span>Back</div>
                }/>
                <div className="signup-button-divider"></div>
                <div className="input-field-container">
                    <div className="input-field-title">Enter your one time passcode</div>
                    <InputField className="signup-input-field" value={OTPCode ? OTPCode : ""} onChange={e => setOTPCode(e.target.value)}/>
                </div>
                <Button onClick={handleClickVerify} type={"button"} className={"signup-button-next"} children={"Verify"}/>
            </div>
        );
    }

    return (
        <>
            <SignupForm children={itemContent} />
        </>
    );
}