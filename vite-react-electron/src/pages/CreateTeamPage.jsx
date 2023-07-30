import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser, verifyUser } from "../api/auth";
import CreateTeam from "../components/CreateTeam";
import Button from "../components/Button";
import PopupModal from "../components/PopupModal";
import { InputField, InputFieldPassword } from "../components/InputFields";
import { isEmpty } from "../utils/helpers";
import "../assets/css/SignupPage.css";

import { FaArrowLeft } from "react-icons/fa6"
import ProjectInfo from "../components/ProjectInfo";

export default function CreateTeamPage() {
    const projectInfo = {
        "description": "",
        "technologies": [],
        "timeframe": "",
    }
    const [screen, setScreen] = useState(1);
    //const [showError, setShowError] = useState({ ...accountInfo});
    const [modalContent, setModalContent] = useState({
        "title": "",
        "children": "",
        "showModal": false,
    });
    const [project, setProject] = useState(projectInfo);

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

    }

    console.log(modalContent.showModal);

    let titleContent
    let itemContent
    if (screen === 1) {
        titleContent = "Project Info"
        itemContent = (<ProjectInfo project={project} onProjectChange={setProject} />);
    } else if (screen === 2) {
        itemContent = (<div/>);
    } else if (screen === 3) {
        itemContent = (<div/>);
    }

    return (
        <>
            <CreateTeam title={titleContent} children={itemContent}/>
            <PopupModal title={modalContent.title} open={modalContent.showModal} children={modalContent.children}
                onClose={() => setModalContent({title: "", children: "", showModal: false})} 
            />
        </>
    );
}