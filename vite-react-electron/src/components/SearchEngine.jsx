import { useState, useCallback } from "react";
import { FaTimes, FaSearch } from "react-icons/fa";
import "../assets/css/SearchEngine.css";

export default function SearchEngine({ project, onProjectChange }) {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleKeyUp = useCallback(e => {
        if (e.key === "Enter" && searchQuery.trim() !== "") {
            const updatedTechnologies = [...project.technologies, searchQuery.trim()];
            onProjectChange({ ...project, technologies: updatedTechnologies});
            setSearchQuery(""); // Clear search query after selecting
        }
    }, [searchQuery, project, onProjectChange]);

    const handleRemoveTechnology = useCallback((index) => {
        const updatedTechnologies = project.technologies.filter((_, i) => i !== index);
        onProjectChange({ ...project, technologies: updatedTechnologies});
    }, [project, onProjectChange]);

    return (
        <div className="search-engine-container">
             <div className="search-description">
                You can use the following engine to search for any missing technologies:
            </div>
            <div className="search-bar">
                <FaSearch className="search-icon" />
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search technologies..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    onKeyUp={handleKeyUp}
                />
            </div>
            <div className="selected-technologies">
                {project.technologies.map((technology, index) => (
                    <div key={index} className="selected-technology">
                        {technology}
                        <span className="technology-remove" onClick={() => handleRemoveTechnology(index)}>
                            <FaTimes />
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
