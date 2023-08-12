import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import PopupModal from "./PopupModal";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { isEmptyObjectField, mapRoleToId } from "../utils/helpers";
import { createTeam, inviteUserToTeam, sendFormData} from "../api/team";

import "../assets/css/CreateTeam.css";

export default function CreateTeam({ title, children, screen, onChangeScreen, project, invites, recsInfo}) {
    const navigate = useNavigate();

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
        let response = await createTeam( project.name, project.description, project.technologies );
        let teamId;
        if (response.error) {
            console.log("error creating team");
            setModalContent({
                title: "Error",
                children: "Unable to create team. Error: " + response.error,
                showModal: true
            });
        } else {
            console.log("success creating team");
            console.log(response);
            teamId = response.data.team.id;
            invites.users.forEach((user) => {
                inviteUserToTeam(teamId, user.email, mapRoleToId(user.userRole));
            });
            
        sendFormData(project.description, project.technologies, recsInfo.recs )
        setModalContent({
                title: "Success",
                children: "You successfully created your team. Redirecting to the dashboard in 3 seconds...",
                showModal: true
            });
            setTimeout(() => {
                navigate("/install/"+String(teamId));
                window.location.reload();
            }, 3000);
        }
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
                    { screen === 5 ?
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