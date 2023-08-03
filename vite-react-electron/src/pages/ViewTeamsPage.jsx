import {useNavigate} from "react-router-dom";
import "../assets/css/DashboardPage.css";
import {getUserTeams} from '../api/user'
import '../assets/css/Button.css'
import '../assets/css/Accordion'
import InstallPage from "../components/InstallPage";
import SendInvites from "../components/SendInvites";

export default function ViewTeams() {
    const teams = getUserTeams();
    const navigate = useNavigate();

    return (
        <table>
            <div className="accordion-invite-container">
                    <table>
                        <tr>
                            <th>Project</th>
                            <th>Description</th>
                            <th>Role</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {teams.map((team, index) => {
                            return (
                                <tr key={index}>
                                    <td>{team.name}</td>
                                    <td></td>
                                    <td>{team.description}</td>
                                    <td><button onClick={navigate('/install/'+String(team._id))}>Install</button></td>
                                    <td><button onClick={navigate('/sendInvite/' + String(team._id))}>Send Invites</button></td>
                                </tr>
                            )
                        })}
                    </table>
                </div>


        </table>
    );
}