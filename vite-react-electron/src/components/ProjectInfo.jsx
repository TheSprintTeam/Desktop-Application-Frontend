import { useState, useCallback } from "react"
import { InputField } from "./InputFields"
import { FaXmark } from "react-icons/fa6"
import "../assets/css/ProjectInfo.css"
import "../assets/css/Button.css"

export default function ProjectInfo({ project, onProjectChange }) {
    const [technology, setTechnology] = useState("");

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        onProjectChange({ ...project, [name]: value });
    }, [project, onProjectChange]);

    const handleKeyUp = useCallback((e) => {
        if (e.key === "Enter" && technology.trim() !== "") {
            const updatedTechnologies = [...project.technologies, technology.trim()];
            onProjectChange({ ...project, technologies: updatedTechnologies });
            setTechnology("");
        }
    }, [technology, project, onProjectChange]);

    const removeElement = useCallback((index) => {
        const newTechnologies = project.technologies.filter((_, i) => i !== index);
        onProjectChange({ ...project, technologies: newTechnologies });
    }, [project, onProjectChange]);

    console.log(project);

    return (
        <>
            <div className="create-input-field-container">
                <div className="create-input-field-title">Name</div>
                <InputField
                    name="name"
                    className="create-team-field"
                    autoFocus={true}
                    value={project.name ? project.name : ""}
                    onChange={handleInputChange}
                />
            </div>
            <div className="create-input-field-container">
                <div className="create-input-field-title">Project Description</div>
                <textarea
                    name="description"
                    className="project-info-textarea"
                    autoFocus={true}
                    value={project.description ? project.description : ""}
                    placeholder="Here, describe the project you want to work on and include as much detail as possible."
                    onChange={handleInputChange}
                />
            </div>
            <div className={`create-input-field-container ${(project.technologies.length > 0) ? "active" : ""}`}>
                <div className="create-input-field-title">Current Technologies in use</div>
                <InputField
                    name="technology"
                    className="create-team-field"
                    autoFocus={true}
                    value={technology ? technology : ""}
                    placeholder="Select or add your own option"
                    onChange={(e) => setTechnology(e.target.value)}
                    onKeyUp={handleKeyUp}
                />
            </div>
            {project.technologies &&
                <div className="technologies-container">
                    {project.technologies.map((item, index) => (
                        <div key={index} className="technology">
                            <div className="technology-icon-wrapper">
                                {item}
                                <span className="technology-remove" onClick={() => removeElement(index)}>
                                    <FaXmark />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            }
            <div className="create-input-field-container">
                <div className="create-input-field-title">Time Frame</div>
                <InputField
                    name="timeframe"
                    className="create-team-field"
                    autoFocus={true}
                    value={project.timeframe ? project.timeframe : ""}
                    placeholder="Select or add your own option"
                    onChange={handleInputChange}
                />
            </div>
        </>
    );
}
