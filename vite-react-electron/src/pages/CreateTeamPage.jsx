import { useState, useEffect } from "react";
import CreateTeam from "../components/CreateTeam";
import ProjectInfo from "../components/ProjectInfo";
import ReviewCreateTeam from "../components/ReviewCreateTeam";
import LeftNavbar from "../components/LeftNavbar";
import InviteUsers from "../components/InviteUsers";
import Recommendations from "../components/Recommendations";
import SearchEngine from "../components/SearchEngine";
import { recEngTeam } from '../api/team';

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
    const recsInfo = {
        recs: [],
        acceptedRecs: []
    }

    const [project, setProject] = useState(projectInfo);
    const [invites, setInvites] = useState(invitesInfo);
    const [recommendations, setRecommendations] = useState(recsInfo);
    const [previousDescription, setPreviousDescription] = useState(null);
    const [screen, setScreen] = useState(1);

    useEffect(() => {
        if (screen === 2 && project.description !== previousDescription) {
            const getRecommendations = async () => {
                let response = await recEngTeam(project.description);
                console.log(response);
                if (response.error) {
                    console.log("error fetching data")
                } else {
                    setRecommendations((prevRecs) => ({ ...prevRecs, recs: response.data.body.recommendations}));
                }
            }

            getRecommendations();
            setPreviousDescription(project.description);
        }
    }, [screen, project.description, previousDescription])

    const handleChangeScreen = (newScreen) => {
        setScreen(newScreen);
    }

    let titleContent
    let itemContent
    if (screen === 1) {
        titleContent = "Project Info"
        itemContent = (<ProjectInfo project={project} onProjectChange={setProject}/>);
    } else if (screen === 2) {
        titleContent = "Recommendations"
        itemContent = (<Recommendations project={project} onProjectChange={setProject} recommendations={recommendations} onRecommendationsChange={setRecommendations} />);
    } else if (screen === 3) {
        titleContent = "Search Engine"
        itemContent = (<SearchEngine project={project} onProjectChange={setProject} />);
    } else if (screen === 4) {
      titleContent = "Invitations"
      //itemContent = (<SendInvites invites={invites} onInvitesChange={onFormChange}/>);
      itemContent = (<InviteUsers invites={invites} onInvitesChange={setInvites}/>);
    } else if (screen === 5) {
        titleContent = "Review"
        itemContent = (<ReviewCreateTeam project={project} invites={invites} recs={recommendations} onChangeScreen={handleChangeScreen}/>);
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