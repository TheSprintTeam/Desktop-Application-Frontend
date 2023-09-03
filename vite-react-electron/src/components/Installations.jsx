import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircleProgressBar, ProgressBar } from "../components/ProgressBar";
import { FaSistrix, FaSliders } from "react-icons/fa6";
import { getBackgroundColor, mapRoleIdToName } from "../utils/helpers";
import "../assets/css/Installations.css";

// TODO:
// component that shows the team manager installation side of things
    // - left sidebar for the manager (pass in members and show the progress for each of them)
    // - single component for the view installation progress (pass in technologies and the progress for each)

export function InstallationsManager({ team_lead, members }) {
    const [selectedMember, setSelectedMember] = useState({user: team_lead});
    const [query, setQuery] = useState("");

    const handleMemberSelect = (member) => {
        setSelectedMember(member);
    }
    const allMembers = [{user: team_lead}, ...members];
    console.log(allMembers);

    return (
        <div className="installation-manager-container">
            <div className="installation-left-container">
                <div className="searchbox-container">
                    <input className="searchbox-members" type="text" placeholder="Search for a team member" 
                        onChange={e => setQuery(e.target.value)}
                    />
                    <div className="searchbox-icon"><FaSistrix /></div>
                </div>
                <div className="members-dropdown-container-installation">
                    <ul className="members-dropdown-items-installation">
                        {allMembers && allMembers.filter(member=>(member.user.first_name.toLowerCase()+member.user.last_name.toLowerCase()).includes(query)).map((member) => {
                            return (
                                <li key={member.user.id} data-index={member.user.id} 
                                    className={`members-item-installations ${selectedMember.user.id === member.user.id ? "selected" : ""}`}
                                    onClick={() => {handleMemberSelect(member)}}>
                                    <span className="members-progress">
                                        <CircleProgressBar completed={1} totalInstallations={3} isSelected={selectedMember.user.id===member.user.id}/>
                                    </span>
                                    <div className="member-right">
                                        <div class="member-item-text">{member.user.first_name+" "+member.user.last_name}</div>
                                        <div className="member-item-role">
                                            {member.role ? mapRoleIdToName(member.role) : "Team Lead"}
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <InstallationsUser member={selectedMember}/>
        </div>
    )
}

export function InstallationsUser({ member }) {
    const progressInstallations = [
        {
            name: "NPM",
            percentage: 100,
            status: "Completed"
        },
        {
            name: "Python",
            percentage: 76,
            status: "Pending"
        },
        {
            name: "MySQL",
            percentage: 75,
            status: "Failed"
        }
    ];

    return (
        <div className="installation-right-container">
            <div className="installation-title">{member.user.first_name+" "+member.user.last_name}</div>
            <div className="installation-member-status-container">
                <div className="live-installation-header">
                    <div className="live-installation-title">Live Installation Status</div>
                    <div className="live-installation-filter"><span className="installation-filter-icon"><FaSliders /></span>Filter</div>
                </div>
                <div className="live-installation-body">
                    <table className="live-installation-table">
                        <colgroup>
                            <col style={{ width: "15%" }} />
                            <col style={{ width: "20%" }} />
                            <col style={{ width: "45%" }} />
                        </colgroup>
                        <tr className="live-installation-table-header">
                            <th>No.</th>
                            <th>Name</th>
                            <th>Percentage</th>
                            <th>Status</th>
                        </tr>
                        {progressInstallations && progressInstallations.map((installation, index) => {
                            return (
                                <tr key={index + 1}>
                                    <td>{index + 1}</td>
                                    <td>{installation.name}</td>
                                    <td><ProgressBar value={installation.percentage} status={installation.status} /></td>
                                    <td>
                                        <div className="installation-status-container">
                                            <span className="installation-circle-outer" style={{ border: "1px solid " + getBackgroundColor(installation.percentage, installation.status) }}>
                                                <span className="installation-circle-inner" style={{ backgroundColor: getBackgroundColor(installation.percentage, installation.status) }} />
                                            </span>
                                            <div className="installation-status-text">{installation.status}</div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </table>
                </div>
            </div>
        </div>
    )
}