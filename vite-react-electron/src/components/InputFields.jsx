import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6"
import "../assets/css/InputField.css";

export function InputField({ type, name, className, value, placeholder, autoFocus, onChange}) {

    return (
        <input
            type={type ? type : "text"}
            name={name}
            className={className}
            value={value}
            placeholder={placeholder ? placeholder : ""}
            autoFocus={autoFocus ? autoFocus : false}
            onChange={onChange}
        />
    );
}

export function InputFieldPassword({ className, value, onChange }) {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <div className="password-wrapper">
            <input 
            type={passwordVisible ? "text" : "password"}
            name="password"
            className={className}
            value={value}
            onChange={onChange}
            />
            <i className="password-visibility" onClick={e => setPasswordVisible(!passwordVisible)}>{passwordVisible ? <FaEye /> : <FaEyeSlash />}</i>
        </div>
    );
}