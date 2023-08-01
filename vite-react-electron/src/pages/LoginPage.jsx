import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../api/auth";
import SignupForm from "../components/SignupForm";
import Button from "../components/Button";
import PopupModal from "../components/PopupModal";
import { InputField, InputFieldPassword } from "../components/InputFields";
import { isEmpty } from "../utils/helpers";
import "../assets/css/SignupPage.css";

export default function LoginPage() {
    const accountInfo = {
        "email": "",
        "password": "",
    }
    const [account, setAccount] = useState(accountInfo);
    const [showError, setShowError] = useState({ ...accountInfo});
    const [modalContent, setModalContent] = useState({
        "title": "",
        "children": "",
        "showModal": false,
    });

    async function handleClickSubmitLogin() {
        let response = await loginUser(account.email, account.password);

        // handle the response here
        // if response is error display pop up saying there was an error creating account:
        if (response.error) {
            console.log("error logging in to account!");
            setModalContent({
                title: "Error",
                children: "There was an error logging in to your account, please try again. Error: " + response.error,
                showModal: true
            });
        } else {
            // display that the user successfully created a team
            console.log("success logging in!");
            setModalContent({
                title: "Success",
                children: "You have successfully logged in to your account! Redirecting you back to the home page in 3 seconds.",
                showModal: true
            });
            // redirect to home page
        }
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setAccount((prevInputs) => ({ ...prevInputs, [name]: value}))
        
        // set error if input is not filled
        setShowError((prevErrors) => ({ ...prevErrors, [name]: isEmpty(value)}))
    }

    return (
        <>
            <SignupForm children={
                <div className="signup-inner">
                    <div className="signup-inner-title">Log in to your account</div>
                    <div className="signup-button-divider"></div>
                    <div className="input-field-container">
                        <div className="input-field-title">Email Address</div>
                        <InputField name="email" className="signup-input-field" value={account.email ? account.email: ""} 
                            type="email" onChange={handleInputChange}
                        />
                        {showError.email && <div className="input-error">Email address is required</div>}
                    </div>
                    <div className="input-field-container">
                        <div className="input-field-title">Password</div>
                        <InputFieldPassword className="signup-input-field login" value={account.password ? account.password : ""} 
                            onChange={handleInputChange}
                        />
                        {showError.password && <div className="input-error-login">Password must be at least 8 characters</div>}
                        <div className="input-field-bottom"><Link to="/forgot-password" className="forgot-pass">Forgot password?</Link></div>
                    </div>
                    <Button type={"button"} className={"signup-button-next"} children={"Login"}
                        onClick={() => (account.email && account.password) ? handleClickSubmitLogin : setModalContent({
                            title: "Error",
                            children: "Please fill in all the fields before submitting.",
                            showModal: true
                        })} 
                    />
                    <div className="signup-bottom-redirect">
                        <div>Don't have an account?</div>
                        <Link to="/sign-up" className="signup-bottom-link">Sign up</Link>
                    </div>
                </div>
            } />
            <PopupModal title={modalContent.title} open={modalContent.showModal} children={modalContent.children}
                onClose={() => setModalContent({title: "", children: "", showModal: false})} 
            />
        </>
    );
}