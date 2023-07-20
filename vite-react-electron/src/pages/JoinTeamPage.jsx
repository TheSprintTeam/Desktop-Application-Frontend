import Button from "../components/Button";

export default function JoinTeamPage() {

    function handleClick() {
        console.log("button was click!");
    }

    return (
        <div className="join-team-outer">
            <h1>Join a team</h1>
            <p>Enter the access code provided in the box below</p>
            <div className="join-team-input-container">
                <input type="text" className="join-team-input-field"/>
                <Button onClick={handleClick} type={"button"} className={"button-submit"} children={"Join"}/>
            </div>
        </div>
    );
}