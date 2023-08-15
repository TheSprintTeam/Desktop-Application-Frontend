import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPen, FaAngleUp, FaAngleDown, FaDownload, FaUserPlus } from "react-icons/fa6"
import "../assets/css/Accordion.css"

export function Accordion({ title, children, onChangeScreen }) {
    const [open, setOpen] = useState(false);

    const handleEditClick = (e) => {
        e.stopPropagation();
        if (title === "Project Info") {
            onChangeScreen(1);
        } else if (title === "Invitations") {
            onChangeScreen(4);
        }
    }
    
    return (
        <div className="accordion">
            <div className="accordion-container">
                <div className="accordion-header-container" onClick={() => setOpen(!open)}>
                    <div className="accordion-left">
                        <div className="accordion-title">
                            {title}
                        </div>
                    </div>
                    <div className="accordion-right">
                        <div className="accordion-edit-icon" onClick={handleEditClick}>
                            <span className="accordion-pen"><FaPen /></span>
                            Edit
                        </div>
                        <div className="accordion-dropdown-icon">
                            {open ? <FaAngleUp /> : <FaAngleDown />}
                        </div>
                    </div>
                </div>
                <div className={`accordion-inner-container${open ? " show" : ""}`}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export function AccordionTeams({ title, children, teamId, membersList }) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    
    return (
        <div className="accordion-teams">
            <div className="accordion-container-teams">
                <div className="accordion-header-container" onClick={() => setOpen(!open)}>
                    <div className="accordion-left">
                        <div className="accordion-title">
                            {title}
                        </div>
                    </div>
                    <div className="accordion-right">
                        <div className="accordion-edit-icon install" onClick={() => navigate("/install/"+String(teamId), { state: { team_members: membersList }})}>
                            <span className="accordion-pen"><FaDownload /></span>
                            Install
                        </div>
                        <div className="accordion-edit-icon invites" onClick={() => navigate("/sendInvite/"+String(teamId),)}>
                            <span className="accordion-pen"><FaUserPlus /></span>
                            Send Invites
                        </div>
                        <div className="accordion-dropdown-icon">
                            {open ? <FaAngleUp /> : <FaAngleDown />}
                        </div>
                    </div>
                </div>
                <div className={`accordion-inner-container${open ? " show" : ""}`}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export function AccordionRecommendation({ title, children }) {
    const [open, setOpen] = useState(true);
    
    return (
        <div className="accordion recs">
            <div className="accordion-container recs">
                <div className="accordion-header-container recs" onClick={() => setOpen(!open)}>
                    <div className="accordion-left recs">
                        <div className="accordion-title recs">
                            {title}
                        </div>
                        <div className="accordion-dropdown-icon recs">
                            {open ? <FaAngleUp /> : <FaAngleDown />}
                        </div>
                    </div>
                </div>
                <div className={`accordion-inner-container${open ? " show recs" : ""}`}>
                    {children}
                </div>
            </div>
        </div>
    );
}