import { useEffect, useRef } from "react";
import { motion, animate } from "framer-motion";
import { getBackgroundColor } from "../utils/helpers";
import "../assets/css/ProgressBar.css";

export function ProgressBar({ value, status}) {
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

export function CircleProgressBar({ completed, totalInstallations, isSelected }) {
    const radius = 35; // Adjust this to change the size of the circle
    const strokeWidth = 7 // Adjust this to change the thickness of the circle
    const viewBoxSize = radius * 2.2;
    const center = radius + strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - (completed/totalInstallations))
    const transformRotate = `rotate(-90 ${center.toString()} ${center.toString()})`

    const circleRef = useRef(null);
    useEffect(() => {
        const circle = circleRef.current;
        if (circle) {
          circle.style.transition = 'stroke-dashoffset 0.5s ease-in-out';
          circle.style.strokeDashoffset = offset;
        }
      }, [offset]);

    return (
        <svg width={viewBoxSize} height={viewBoxSize} viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}>
            <circle
                cx={center}
                cy={center}
                r={radius}
                fill="transparent"
                stroke={isSelected ? "rgba(159,122,234, 0.52)" : "rgba(138,138,142, 0.52)"}// Background stroke color
                strokeWidth={strokeWidth}
            />
            <circle
                ref={circleRef}
                cx={center}
                cy={center}
                r={radius}
                fill="transparent"
                stroke={isSelected ? "#A235D9" : "rgba(138,138,142, 1)"} // Change this to the color you prefer
                transform={transformRotate}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset="0"
            />
            <text x={center} y={center - 8} textAnchor="middle" dominantBaseline="middle" fontSize="0.875rem" fill={isSelected ? "rgba(159,122,234, 0.52)" : "rgba(138,138,142, 0.52)"}>
                Status
            </text>
            <text x={center} y={center + 8} textAnchor="middle" dominantBaseline="middle" fontSize="0.875rem" fill={isSelected ? "#A235D9" : "rgba(138,138,142, 1)"}>
                {completed} of {totalInstallations}
            </text>
        </svg>
    )
}