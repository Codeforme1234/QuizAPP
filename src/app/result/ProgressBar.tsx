import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ArrowGauge = ({ percentage }: { percentage: number }) => {
  // Calculate arrow rotation based on percentage (0 to 180 degrees)
  const arrowRotation = (percentage / 100) * 180;

  return (
    <div style={{ width: 200, height: 200, position: "relative" }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          pathColor: percentage > 50 ? "green" : "red", // Adjust color based on value
          textColor: "#000",
          trailColor: "#d6d6d6",
        })}
      />
      <div />
      {/* Arrow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "2px",
          height: "40%",
          backgroundColor: "black",
          transformOrigin: "bottom center",
          transform: `rotate(${arrowRotation}deg) translate(-50%, -100%)`,
        }}
      />
    </div>
  );
};

export default ArrowGauge;
