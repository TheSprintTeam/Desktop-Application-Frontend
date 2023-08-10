import { useState } from "react";
import CreateTeam from "../components/CreateTeam";
import ProjectInfo from "../components/ProjectInfo";
import ReviewCreateTeam from "../components/ReviewCreateTeam";
import LeftNavbar from "../components/LeftNavbar";
import InviteUsers from "../components/InviteUsers";
import Recommendations from "../components/Recommendations";
import SearchEngine from "../components/SearchEngine";

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
    const [screen, setScreen] = useState(1);
    const [selectedTechnologies, setSelectedTechnologies] = useState([]);

    const handleSelectedTechnologiesChange = (newSelectedTechnologies) => {
        setSelectedTechnologies(newSelectedTechnologies);
    };
    const handleProjectTechnologiesChange = (newTechnologies) => {
        setProject({ ...project, technologies: newTechnologies });
    };
    const handleChangeScreen = (newScreen) => {
        setScreen(newScreen);
    }

    const combinedTechnologies = [...project.technologies, ...selectedTechnologies];

    let titleContent;
    let itemContent;
    if (screen === 1) {
        titleContent = "Project Info";
        itemContent = (
            <ProjectInfo
                project={project}
                onProjectChange={setProject}
                selectedTechnologies={handleProjectTechnologiesChange}
            />
        );
    } else if (screen === 3) {
        titleContent = "Search Engine";
        itemContent = (
            <SearchEngine
                project={project}
                selectedTechnologies={selectedTechnologies}
                setSelectedTechnologies={handleSelectedTechnologiesChange}
            />
        );
    } else if (screen === 5) {
        titleContent = "Review";
        itemContent = (
            <ReviewCreateTeam
                project={project}
                invites={invites}
                onChangeScreen={handleChangeScreen}
                selectedTechnologies={selectedTechnologies}
            />
        );
    } 

    return (
        <>
            <LeftNavbar screen={screen} onChangeScreen={handleChangeScreen} />
            <CreateTeam
                title={titleContent}
                children={itemContent}
                screen={screen}
                onChangeScreen={handleChangeScreen}
                project={project}
                invites={invites}
            />
        </>
    );
}
