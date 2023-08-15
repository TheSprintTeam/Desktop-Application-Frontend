import { useState, useCallback } from "react";
import { FaAngleDown, FaXmark } from "react-icons/fa6";
import "../assets/css/Select.css";
import Button from "./Button";

export function Select({ children, size, options, onOptionsChange }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleRemoveOption = useCallback((e, userId) => {
        e.stopPropagation();
        const newOptions = options.filter(option => option.user_id !== userId);
        onOptionsChange(newOptions);
    }, [options, onOptionsChange])
    
    return (
        <>
        <div className={`select-btn${isOpen ? " show" : ""}`} onClick={() => setIsOpen(prev => !prev)}>
            <span className="select-btn-text">
            {options && (options.length === size) ? <div>All Members Currently Selected</div> : 
                <div className="select-button-container">
                    {options && options.map((option) => {
                        return (
                            <Button className="select-button" onClick={(e) => handleRemoveOption(e, option.user_id)} children={
                                <div className="technology-icon-wrapper">{option.user.first_name+" "+option.user.last_name}
                                    <span className="technology-remove"><FaXmark /></span>
                                </div>
                            }/>
                        )
                    })}
                </div>
            }
            {(options.length === 0) && <div>No Members Currently Selected</div>}
            </span>
            <span className="select-btn-arrow-dwn"><FaAngleDown/></span>
        </div>
        <ul className={`select-list-items${isOpen ? " show" : ""}`}>
            {children}
        </ul>
        </>
    )

}