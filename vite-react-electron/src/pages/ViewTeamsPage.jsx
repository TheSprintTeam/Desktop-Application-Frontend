import { useState, useEffect } from "react";
import { getUserTeams } from '../api/user'
import { AccordionTeams } from "../components/Accordion";
import { mapUserIdToObject, mapRoleIdToName } from "../utils/helpers";
import "../assets/css/ViewTeamsPages.css";

export default function ViewTeams({ userLoggedIn }) {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const checkTeams = async () => {
            let response = await getUserTeams();
            if (response.error) {
                console.log("User is in no Teams!");
            } else {
                console.log("User is in teams");

                const teamsData = response.data;

                // get all team_lead IDs
                const teamLeadIds = Array.from(new Set(teamsData.map(team => team.team_lead)));

                // get all member user IDs
                const memberUserIds = Array.from(new Set(
                    teamsData
                        .flatMap(team => team.members)
                        .map(members => members.user_id)
                ));

                const allUserIds = Array.from(new Set([...teamLeadIds, ...memberUserIds]));

                // make get requests to get team lead data
                const userPromises = allUserIds.map(userId => mapUserIdToObject(userId));
                const userResponses = await Promise.all(userPromises);
                const userData = userResponses.map(response => response.data);
                const teamsDataUsers = teamsData.map(team => ({
                    ...team,
                    team_lead: userData.find(user => user.id === team.team_lead),
                    members: team.members.map(member => ({
                        ...member,
                        user: userData.find(user => user.id === member.user_id)
                    }))
                }));
                
                // make get requests to get member data

                setTeams(teamsDataUsers);
            }
        }
    
        checkTeams();
    }, []);

    console.log(teams);
    return (
        <div className="teams-dashboard">
            <h1 className="teams-dashboard-title">View your teams</h1>
            {teams ? 
                <div className="teams-dashboard-inner">
                    {teams.map((team) => {
                        return (
                            <div className="team-accordion-container" key={team.id}>
                                <AccordionTeams title={team.name} teamId={team.id} children={
                                    <>
                                        <div className="top-container-desc">{team.description}</div>
                                        <table>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Role</th>
                                            </tr>
                                            <tr>
                                                <td>{team.team_lead.first_name+" "+team.team_lead.last_name}</td>
                                                <td>{team.team_lead.email}</td>
                                                <td>Team Lead</td>
                                            </tr>
                                            {team.members && team.members.map((member) => {
                                                return (
                                                    <tr key={member.user_id}>
                                                        <td>{member.user.first_name+" "+member.user.last_name}</td>
                                                        <td>{member.email}</td>
                                                        <td>{mapRoleIdToName(member.role)}</td>
                                                    </tr>
                                                );
                                            })}
                                        </table>
                                    </>
                                } />
                            </div>
                        );
                    })}
                </div>
            :
                <div className="teams-dashboard-inner">
                    "You are in no teams"
                </div>
            }
            
        </div>
    );
}