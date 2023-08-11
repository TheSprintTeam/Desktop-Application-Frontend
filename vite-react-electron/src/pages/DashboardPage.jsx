import {useNavigate} from "react-router-dom";
import Button from "../components/Button";
import imageleft from "../assets/images/imageleft.svg"
import imageleftcircle from "../assets/images/imageleftcircle.png"
import "../assets/css/DashboardPage.css";

import { FaPlus, FaPeopleGroup } from "react-icons/fa6"

export default function DashboardPage() {
    const navigate = useNavigate();

    function handleClickCreate() {
        navigate("/create-team");
    }

    function handleClickJoin() {
        navigate("/join-team");
    }

    return (
        <div className="dashpage-outer">
            {/* <img src={imageleft} alt="Left Image" className="dashpage-image-left" />
            <img src={imageleftcircle} alt="left image circle" className="dashpage-image-left-circle" /> */}
            <h1 className="dashpage-title">Welcome to Sprint!</h1>
            <p className="dashpage-desc">To make the most of Sprint, you must either create a team or join a team.</p>
            <div className="dashpage-inner">
                <div className="dashpage-create">
                    <div className="dashpage-button-top">Create a Team</div>
                    <Button onClick={handleClickCreate} type={"submit"} className={"button-welcome"} children={<FaPlus />}/>
                </div>
                <div className="dashpage-join">
                    <div className="dashpage-button-top">Join a Team</div>
                    <Button onClick={handleClickJoin} type={"submit"} className={"button-welcome"} children={<FaPeopleGroup />}/>
                </div>
            </div>
        </div>
    );
}