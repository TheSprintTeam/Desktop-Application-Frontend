import ReactDom from "react-dom"
import Button from "./Button"
import {FaXmark} from "react-icons/fa6"
import "../assets/css/PopupModal.css"
import "../assets/css/Button.css"

export default function PopupModal({ open, title, children, onClose }) {
    if (!open) return null

    return ReactDom.createPortal(
        <>
            <div className="popup-modal-overlay">
                <div className="popup-modal-container">
                    <div className="popup-modal-header">
                        <div className="popup-modal-title">{title}</div>
                        <Button className="modal-exit" onClick={onClose} children={<FaXmark />} />
                    </div>
                    <div className="popup-modal-children">
                        {children}
                    </div>
                </div>
            </div>
        </>,
        document.getElementById("portal")
    )
}