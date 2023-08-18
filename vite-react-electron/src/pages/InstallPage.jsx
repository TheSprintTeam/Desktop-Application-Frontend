import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { installOnTeam } from '../api/team';
import Button from "../components/Button";
import { Select } from "../components/Select";
import { FaCheck } from "react-icons/fa6";
import "../assets/css/InstallPage.css";
import ProgressBar from "../components/ProgressBar";

export default function InstallPage() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const members = state.team_members;
    let {team_id} = useParams();

    const [selectedMembers, setSelectedMembers] = useState(members);

    const handleOptionChange = (e) => {
        const userId = e.target.getAttribute("data-index");
        if (selectedMembers.some(option => option.user_id === userId)) {
            setSelectedMembers(selectedMembers.filter(option => option.user_id !== userId))
        } else {
            const selectedMember = members.find(member => member.user_id === userId);
            setSelectedMembers([...selectedMembers, selectedMember])
        }
    }
    console.log(selectedMembers);

    async function handleInstall() {
        let response = await installOnTeam(team_id);
        if (response.error) {
            console.log("error installing");
        } else {
            console.log("successfully installed");
        }
        navigate("/");
    }

    function handleLater() {
        navigate("/");
    }

    return (
        <div className="dashpage-outer">
            <h1 className="dashpage-title">Installation options</h1>
            <p className="dashpage-desc">Only start installation when all members have laptops open</p>
            <div className="dashpage-inner">
                <div className="dashpage-create">
                    <div className="dashpage-button-top"> 
                    <Button className="button-invite" onClick={handleInstall} type="submit" children={"Install Now"} />
                    </div>
                </div>
                <div className="dashpage-join">
                    <div className="dashpage-button-top"> 
                    <Button className="button-invite" onClick={handleLater} type="submit" children={"Install Later"} />
                    </div>
                </div>
            </div>
            <div className="dashpage-members-container">
                <div className="dashpage-members-title">Select the members you want to install technology for</div>
                <Select size={members.length} options={selectedMembers} onOptionsChange={setSelectedMembers} children={
                    <>
                        {members && members.map((member) => {
                            return (
                                <li key={member.user.id} data-index={member.user.id} 
                                    className={`members-item${(selectedMembers.find(o => o.user_id === member.user.id)) ? " selected" : ""}`} 
                                    onClick={e => {handleOptionChange(e)}}>
                                    <span className="members-checkbox">
                                        <span className="members-checkbox-icon"><FaCheck/></span>
                                    </span>
                                    <span class="member-item-text">{member.user.first_name+" "+member.user.last_name}</span>
                                </li>
                            )
                        })}
                    </>
                    }
                />
                <ProgressBar value={30} />
            </div>
        </div>
    );
}