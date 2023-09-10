import "../assets/css/Button.css";

export default function Button({ onClick, type, className, disabled, children}) {
    return (
        <button 
            onClick={onClick}
            type={type}
            className={className}
            autoFocus={false}
            disabled={disabled}
        >
            {children}
        </button>
    );
}