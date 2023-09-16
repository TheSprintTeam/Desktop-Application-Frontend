import { useState, useCallback } from "react";
import { FaTimes, FaSearch } from "react-icons/fa";
import "../assets/css/SearchEngine.css";

const availableTechnologies = [
  "React",
  "Vue.js",
  "Angular",
  "Node.js",
  "JavaScript",
  "HTML",
  "CSS",
  "PyTorch",
  // Add more technologies as needed
];

export default function SearchEngine({ project, onProjectChange }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSuggestions([]);
      setSelectedSuggestionIndex(-1);
    } else {
      const matchingTechnologies = availableTechnologies.filter((tech) =>
        tech.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(matchingTechnologies);
      setSelectedSuggestionIndex(-1);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (!project.technologies.includes(suggestion)) {
      const updatedTechnologies = [...project.technologies, suggestion];
      onProjectChange({ ...project, technologies: updatedTechnologies });
    }
    setSearchQuery("");
    setSuggestions([]);
    setSelectedSuggestionIndex(-1);
  };

  const handleKeyUp = useCallback(
    (e) => {
      if (e.key === "Enter" && searchQuery.trim() !== "") {
        if (selectedSuggestionIndex !== -1) {
          handleSuggestionClick(suggestions[selectedSuggestionIndex]);
        } else {
          const closestSuggestion = suggestions.reduce((prev, curr) =>
            prev.toLowerCase().startsWith(searchQuery.toLowerCase())
              ? prev
              : curr.toLowerCase().startsWith(searchQuery.toLowerCase())
              ? curr
              : prev
          );
          handleSuggestionClick(closestSuggestion);
        }
      }
    },
    [searchQuery, project, onProjectChange, suggestions, selectedSuggestionIndex]
  );

  const handleRemoveTechnology = useCallback(
    (index) => {
      const updatedTechnologies = project.technologies.filter(
        (_, i) => i !== index
      );
      onProjectChange({
        ...project,
        technologies: updatedTechnologies,
      });
    },
    [project, onProjectChange]
  );

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
      {suggestions.length > 0 && (
        <div className="suggestion-list">
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion}
              className={`suggestion-item ${
                index === selectedSuggestionIndex ? "highlighted" : ""
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
              onMouseEnter={() => setSelectedSuggestionIndex(index)}
              onMouseLeave={() => setSelectedSuggestionIndex(-1)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
      <div className="selected-technologies">
        {project.technologies.map((technology, index) => (
          <div key={index} className="selected-technology">
            {technology}
            <span
              className="technology-remove"
              onClick={() => handleRemoveTechnology(index)}
            >
              <FaTimes />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
