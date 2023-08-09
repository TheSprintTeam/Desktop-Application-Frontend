import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser, verifyUser } from "../api/auth";
import SignupForm from "../components/SignupForm";
import Button from "../components/Button";
import PopupModal from "../components/PopupModal";
import { InputField, InputFieldPassword } from "../components/InputFields";
import { isEmpty } from "../utils/helpers";
import "../assets/css/SignupPage.css";

import { FaGoogle, FaMicrosoft, FaArrowLeft } from "react-icons/fa6"

export default function SignupPage() {

    const navigate = useNavigate();

    const accountInfo = {
        "email": "",
        "firstname": "",
        "lastname": "",
        "password": "",
    }
    const [screen, setScreen] = useState(1);
    const [OTPCode, setOTPCode] = useState("");
    const [account, setAccount] = useState(accountInfo);
    const [showError, setShowError] = useState({ ...accountInfo});
    const [modalContent, setModalContent] = useState({
        "title": "",
        "children": "",
        "showModal": false,
    });
    
    async function handleClickGoogle(e) {
        e.preventDefault();
        window.open("http://127.0.0.1:8000/google-signin");
    }

    function handleClickMicrosoft() {

    }

    function handleClickBack() {
        setScreen(screen - 1);
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setAccount((prevInputs) => ({ ...prevInputs, [name]: value}))
        
        // set error if input is not filled
        setShowError((prevErrors) => ({ ...prevErrors, [name]: isEmpty(value)}))
    }

    async function handleClickSubmit() {
        let response = await createUser(account.email, account.password, account.firstname, account.lastname);

        // handle the response here
        // if response is error display pop up saying there was an error creating account:
        if (response.error) {
            console.log("error creating account!");
            setModalContent({
                title: "Error",
                children: "There was an error creating your account, please try again. Error: " + response.error,
                showModal: true
            });
        } else {
            // display that the user successfully created a team
            console.log("success creating an account!");
            setScreen(screen + 1);
        }
    }

    async function handleClickVerify() {
        let response = await verifyUser(OTPCode);
        console.log(response);

        // handle the response here
        if (response.error) {
            console.log("error verifying account!");
            setModalContent({
                title: "Error",
                children: "There was an error verifying your account, please try again. Error: " + response.error,
                showModal: true
            });
        } else {
            // display that the user successfully created a team
            console.log("success verifying account");
            console.log(response.data);
            setModalContent({
                title: "Success",
                children: "You have successfully verified your account and can start using Sprint! Redirecting you back to the home page in 3 seconds.",
                showModal: true
            });
            navigate("/");
        }
    }

    console.log(modalContent.showModal);

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
                    <InputField name="email" className="signup-input-field" autoFocus={true} value={account.email ? account.email : ""}
                        type="email" onChange={handleInputChange}
                    />
                    {showError.email && <div className="input-error">Email address is required</div>}
                </div>
                <Button onClick={() => account.email ? setScreen(screen + 1) : undefined} type={"button"} className={"signup-button-next"} children={"Continue"}/>
                <div className="signup-bottom">
                    <div>Already have an account?</div>
                    <div><Link to="/login" className="login-click">Login</Link></div>
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
                    <InputField name="firstname" className="signup-input-field" value={account.firstname ? account.firstname : ""}
                        onChange={handleInputChange}
                    />
                    {showError.firstname && <div className="input-error">First name is required</div>}
                </div>
                <div className="input-field-container">
                    <div className="input-field-title">Last Name</div>
                    <InputField name="lastname" className="signup-input-field" value={account.lastname ? account.lastname : ""}
                        onChange={handleInputChange}
                    />
                    {showError.lastname && <div className="input-error">Last name is required</div>}
                </div>
                <div className="input-field-container">
                    <div className="input-field-title">Password</div>
                    <InputFieldPassword className={"signup-input-field"} value={account.password ? account.password : ""} 
                        onChange={handleInputChange}
                    />
                    {showError.password && <div className="input-error">Password must be at least 8 characters</div>}
                </div>
                <Button type="submit" className="signup-button-next" children={"Create Account"}
                    onClick={handleClickSubmit}
                />
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
                <Button type={"button"} className={"signup-button-next"} children={"Verify"}
                    onClick={handleClickVerify} 
                />
            </div>
        );
    }

    return (
        <>
            <SignupForm children={itemContent} />
            <PopupModal title={modalContent.title} open={modalContent.showModal} children={modalContent.children}
                onClose={() => setModalContent({title: "", children: "", showModal: false})} 
            />
        </>
    );
}