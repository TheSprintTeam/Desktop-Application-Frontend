import { useCallback } from "react";
import Button from "./Button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import "../assets/css/CreateTeam.css";

export default function CreateTeam({ title, children, screen, onChangeScreen }) {
    
    const handleNextClick = () => {
        onChangeScreen(screen + 1);
    }

    const handleBackClick = () => {
        onChangeScreen(screen - 1);
    }

    
    return (
        <div className="create-team-container">
            <h1 className="create-team-title">{title}</h1>
            {children}
            <div className="create-team-footer">
                <Button onClick={handleBackClick} type={"button"} className={"create-button-backnext"} disabled={screen === 1} children={
                    <div className="external-div-create-left"><span className="external-icon-create"><FaArrowLeft /></span>Back</div>
                }/>
                <Button onClick={handleNextClick} type={"button"} className={"create-button-backnext"} children={
                    <div className="external-div-create-right">Next<span className="external-icon-create"><FaArrowRight /></span></div>
                }/>
            </div>
        </div>
    );
}