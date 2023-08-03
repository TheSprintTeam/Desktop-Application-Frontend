import { useNavigate, useParams } from "react-router-dom";
import { installOnTeam } from '../api/team';
import Button from "../components/Button";

export default function InstallPage() {
    const navigate = useNavigate();
    let {team_id} = useParams();


    async function handleInstall() {
        debugger;
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
        </div>
    );
}