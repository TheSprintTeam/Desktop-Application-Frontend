import { useState } from "react";
import CreateTeam from "../components/CreateTeam";
import {SendInvites} from "../components/SendInvites"
import ProjectInfo from "../components/ProjectInfo";
import ReviewCreateTeam from "../components/ReviewCreateTeam";
import LeftNavbar from "../components/LeftNavbar";
import InviteUsers from "../components/InviteUsers";

export default function CreateTeamPage() {
    const projectInfo = {
        "name": "",
        "description": "",
        "technologies": [],
        "timeframe": "",
    }
    const invitesInfo = {
        users: []
    }

    const [project, setProject] = useState(projectInfo);
    const [invites, setInvites] = useState(invitesInfo);
    const [screen, setScreen] = useState(1);

    const handleChangeScreen = (newScreen) => {
        setScreen(newScreen);
    }

    let titleContent
    let itemContent
    if (screen === 1) {
        titleContent = "Project Info"
        itemContent = (<ProjectInfo project={project} onProjectChange={setProject}/>);
    } else if (screen === 2) {
      titleContent = "Invitations"
      //itemContent = (<SendInvites invites={invites} onInvitesChange={onFormChange}/>);
      itemContent = (<InviteUsers invites={invites} onInvitesChange={setInvites}/>);
    } else if (screen === 3) {
        titleContent = "Review"
        itemContent = (<ReviewCreateTeam project={project} invites = {invites} onChangeScreen={handleChangeScreen}/>);
    } 
    return (
        <>
            <LeftNavbar screen={screen} onChangeScreen={handleChangeScreen}/>
            <CreateTeam title={titleContent} children={itemContent} screen={screen} onChangeScreen={handleChangeScreen}
                project={project} invites={invites}
            />
        </>
    );
}