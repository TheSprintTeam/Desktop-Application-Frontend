import { useState } from "react";

import Button from "../components/Button";
import "../assets/css/JoinTeamPage.css";
import { joinTeam } from "../api/team";

export default function JoinTeamPage() {
    let [OTPCode, setOTPCode] = useState("");

    async function handleClick() {
        const response = await joinTeam(OTPCode);

        // if response is error display pop up saying there was an error joining team, please try again:
        if (response.error) {
            console.log("error joining the team!");
        } else {
            // display that the user successfully joined the team:
            console.log("success!");
        }
    }

    function handleChange(e) {
        setOTPCode(e.target.value);
    }

    return (
        <div className="join-team-outer">
            <h1 className="join-team-title">Join a team</h1>
            <p className="join-team-desc">Enter the access code provided in the box below</p>
            <div className="join-team-input-container">
                <input type="text" className="join-team-input-field" onChange={handleChange}/>
                <Button onClick={handleClick} type={"button"} className={"button-submit"} children={"Join"}/>
            </div>
        </div>
    );
}