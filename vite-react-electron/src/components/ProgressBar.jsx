import { useEffect, useRef } from "react";
import { motion, animate } from "framer-motion";
import { getBackgroundColor } from "../utils/helpers";
import "../assets/css/ProgressBar.css";

export default function ProgressBar({ value, status}) {
    const progressTextRef = useRef(null);
    useEffect(() => {
        const progressText = progressTextRef.current?.textContent;
        if (progressText !== null) {
            animate(parseInt(progressText), value, {
                duration: 2,
                onUpdate : (currentVal) => {
                    progressTextRef.current.textContext = currentVal.toFixed(0)
                }
            });
        }
    }, [value])

    return (
        <div className="progress-bar-container">
            <div className="progress-bar">
                <motion.div 
                className="bar"
                animate={{
                    width: `${value}%`
                }}
                transition={{
                    duration: 2
                }}
                />
            </div>
            <div className="progress-bar-text-container" style={{color: getBackgroundColor(value, status)}}>
                <p ref={progressTextRef}>{value}</p>
                <p>%</p>
            </div>
        </div>
    )
}