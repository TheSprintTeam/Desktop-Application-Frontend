import { Accordion } from "./Accordion"
import React, { useEffect, useState } from "react";

export default function ReviewCreateTeam({ project , invites, selectedTechnologies, onChangeScreen}) {
    const [combinedTechnologies, setCombinedTechnologies] = useState([]);

    // Recalculate combinedTechnologies when project or selectedTechnologies change
    useEffect(() => {
        const newCombinedTechnologies = [...project.technologies, ...selectedTechnologies];
        setCombinedTechnologies(newCombinedTechnologies);
    }, [project.technologies, selectedTechnologies]);


    return (
        <>
            <Accordion title="Project Info" onChangeScreen={onChangeScreen} children={
                <>
                    <div className="accordion-key-value-container">
                        <div className="accordion-key">Name</div>
                        <div className="accordion-value">{project.name}</div>
                    </div>
                    <div className="accordion-key-value-container">
                        <div className="accordion-key">Description</div>
                        <div className="accordion-value">{project.description}</div>
                    </div>
                    <div className="accordion-key-value-container">
                        <div className="accordion-key">Technologies</div>
                        <div className="accordion-value">{combinedTechnologies.map((tech, index) => {
                            if (combinedTechnologies.length - 1 === index) {
                                return (<span key={index}>{tech}</span>);
                            } else {
                                return (<span key={index}>{tech}, </span>);
                            }
                            })}</div>
                    </div>
                    <div className="accordion-key-value-container">
                        <div className="accordion-key">Time Frame</div>
                        <div className="accordion-value">{project.timeframe}</div>
                    </div>
                </>
            }/>
            <Accordion title="Invitations" onChangeScreen={onChangeScreen} children={
                <div className="accordion-invite-container">
                    <table className="invitations-table">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                        {invites.users.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.userRole}</td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
            }/>
        </>
    )
}