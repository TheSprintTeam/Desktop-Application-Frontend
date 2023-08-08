import React, { useState } from "react";
import { FaTimes, FaSearch } from "react-icons/fa";
import "../assets/css/SearchEngine.css";

export default function SearchEngine({ project, onProjectChange }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTechnologies, setSelectedTechnologies] = useState([]);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleKeyUp = (e) => {
        if (e.key === "Enter" && searchQuery.trim() !== "") {
            setSelectedTechnologies([...selectedTechnologies, searchQuery.trim()]);
            setSearchQuery(""); // Clear search query after selecting
        }
    };

    const handleRemoveTechnology = (index) => {
        const updatedTechnologies = selectedTechnologies.filter((_, i) => i !== index);
        setSelectedTechnologies(updatedTechnologies);
    };

    const updatedProject = { ...project, technologies: selectedTechnologies };

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
