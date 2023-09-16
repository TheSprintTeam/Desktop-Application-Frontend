import { useState } from "react";

import Button from "../components/Button";
import PopupModal from "../components/PopupModal";
import { joinTeam } from "../api/team";
import "../assets/css/JoinTeamPage.css";
import { useNavigate } from "react-router-dom";

export default function JoinTeamPage() {
    const navigate = useNavigate();

    const [OTPCode, setOTPCode] = useState("");
    const [modalContent, setModalContent] = useState({
        "title": "",
        "children": "",
        "showModal": false,
    });

    async function handleClick() {
        const response = await joinTeam(OTPCode);

        // if response is error display pop up saying there was an error joining team, please try again:
        if (response.error) {
            console.log("error joining the team!");
            setModalContent({
                title: "Error",
                children: "There was an error logging in to your account, please try again. Error: " + response.error,
                showModal: true
            });
        } else {
            // display that the user successfully joined the team:
            console.log("success!");
            setModalContent({
                title: "Success",
                children: "You have successfully joined the team! Redirecting you back to the home page in 3 seconds.",
                showModal: true
            });
            navigate("/");
        }
    }

    return (
        <>
            <div className="join-team-outer">
                <h1 className="join-team-title">Join a team</h1>
                <p className="join-team-desc">Enter the access code provided in the box below</p>
                <div className="join-team-input-container">
                    <input type="text" className="join-team-input-field" onChange={e => setOTPCode(e.target.value)}/>
                    <Button onClick={handleClick} type={"button"} className={"button-submit"} children={"Join"}/>
                </div>
            </div>
            <PopupModal title={modalContent.title} open={modalContent.showModal} children={modalContent.children}
                onClose={() => setModalContent({title: "", children: "", showModal: false})} 
            />
        </>
    );
}