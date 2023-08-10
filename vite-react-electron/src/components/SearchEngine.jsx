import React, { useState } from "react";
import { FaTimes, FaSearch } from "react-icons/fa";
import "../assets/css/SearchEngine.css";

export default function SearchEngine({ project, onProjectChange, selectedTechnologies, setSelectedTechnologies }) {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleKeyUp = (e) => {
        if (e.key === "Enter" && searchQuery.trim() !== "") {
            const updatedTechnologies = [...selectedTechnologies, searchQuery.trim()];
            setSelectedTechnologies(updatedTechnologies);

            // Update project's technologies when selectedTechnologies change
            const updatedProject = { ...project, technologies: updatedTechnologies };
            onProjectChange(updatedProject);

            setSearchQuery(""); // Clear search query after selecting
        }
    };

    const handleRemoveTechnology = (index) => {
        const updatedTechnologies = selectedTechnologies.filter((_, i) => i !== index);
        setSelectedTechnologies(updatedTechnologies);

        // Update project's technologies when selectedTechnologies change
        const updatedProject = { ...project, technologies: updatedTechnologies };
        onProjectChange(updatedProject);
    };

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
                {selectedTechnologies.map((technology, index) => (
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
