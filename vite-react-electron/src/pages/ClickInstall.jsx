import {useNavigate, useParams} from "react-router-dom";
import "../assets/css/DashboardPage.css";
import {installOnTeam} from '../api/team'
import '../assets/css/Button.css'
export default function ClickInstall() {
    const navigate = useNavigate();
   // let {team_id} = useParams();


    function handleInstall() {
        //installOnTeam(team_id);
        window.location.href = '/'

    }

    function handleLater() {
        window.location.href = '/'
    }
    const ButtonStyle = { "background-color" : "#550080", color: "white"}

    return (
        <div className="dashpage-outer">
            <h1 className="dashpage-title">Installation options</h1>
            <p className="dashpage-desc">Only start installation when all members have laptops open</p>
            <div className="dashpage-inner">
                <div className="dashpage-create">
                    <div className="dashpage-button-top"> 
                    <button onClick={handleInstall} type="submit" style = {ButtonStyle} >Install now</button>
                    </div>
                </div>
                <div className="dashpage-join">
                    <div className="dashpage-button-top"> 
                    <button onClick={handleLater} type="submit" style={ButtonStyle}>Install later</button>
                    </div>
                </div>
            </div>
        </div>
    );
}