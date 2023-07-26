import "../assets/css/Button.css";

export default function Button({ onClick, type, className, children}) {
    return (
        <button 
            onClick={onClick}
            type={type}
            className={className}
            autoFocus={false}
        >
            {children}
        </button>
    );
}