import { useState } from "react";
import { FaPen, FaAngleUp, FaAngleDown } from "react-icons/fa6"
import "../assets/css/Accordion.css"

export default function Accordion({ title, children }) {
    const [open, setOpen] = useState(false);

    const handleEditClick = (e) => {
        e.stopPropagation();
    }
    
    return (
        <div className="accordion">
            <div className="accordion-container">
                <div className="accordion-header-container" onClick={() => setOpen(!open)}>
                    <div className="accordion-left">
                        <div className="accordion-title">
                            {title}
                        </div>
                    </div>
                    <div className="accordion-right">
                        <div className="accordion-edit-icon" onClick={handleEditClick}>
                            <span className="accordion-pen"><FaPen /></span>
                            Edit
                        </div>
                        <div className="accordion-dropdown-icon">
                            {open ? <FaAngleUp /> : <FaAngleDown />}
                        </div>
                    </div>
                </div>
                <div className={`accordion-inner-container${open ? " show" : ""}`}>
                    {children}
                </div>
            </div>
        </div>

    )
}