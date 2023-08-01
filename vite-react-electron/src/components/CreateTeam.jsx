import { useState } from "react";
import Button from "./Button";
import PopupModal from "./PopupModal";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { isEmptyObjectField } from "../utils/helpers";
import "../assets/css/CreateTeam.css";
import {createTeam, inviteUserToTeam} from "..api/team.jsx"
export default function CreateTeam({ title, children, screen, onChangeScreen, project, invites }) {
    
    const [modalContent, setModalContent] = useState({
        "title": "",
        "children": "",
        "showModal": false,
    });

    const handleNextClick = () => {
        if (screen === 1 && isEmptyObjectField(project)) {
            setModalContent({
                title: "Error",
                children: "Please fill in all the fields.",
                showModal: true
            });
        } else {
            onChangeScreen(screen + 1);
        }
    }

    const handleBackClick = () => {
        onChangeScreen(screen - 1);
    }

    const handleSubmitClick = async () => {
        // handles submitting to backend
        const formData = {
            "technologies" : project.technologies,
            "description" : project.description
        };

        let team_id = await createTeam(project.name, formData );
        invites.forEach((user) => {
            inviteUserToTeam(team_id, user.email, user.userRole)
        });
    }
    
    return (
        <>
            <div className="create-team-container">
                <h1 className="create-team-title">{title}</h1>
                {children}
                <div className="create-team-footer">
                    <Button onClick={handleBackClick} type={"button"} className={"create-button-backnext"} disabled={screen === 1} children={
                        <div className="external-div-create-left"><span className="external-icon-create"><FaArrowLeft /></span>Back</div>
                    }/>
                    { screen === 3 ?
                    <Button onClick={handleSubmitClick} type={"button"} className={"create-button-backnext"} children={
                        <div className="external-div-create-right">Submit<span className="external-icon-create"><FaArrowRight /></span></div>
                    }/> : 
                    <Button onClick={handleNextClick} type={"button"} className={"create-button-backnext"} children={
                        <div className="external-div-create-right">Next<span className="external-icon-create"><FaArrowRight /></span></div>
                    }/>
                    }
                </div>
            </div>
            <PopupModal title={modalContent.title} open={modalContent.showModal} children={modalContent.children}
                onClose={() => setModalContent({title: "", children: "", showModal: false})} 
            />
        </>
    );
}