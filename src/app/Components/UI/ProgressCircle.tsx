import React, { useState } from "react";

const ProgressCircle = ({ current, total }: { current: number; total: number }) => {
  const circleWidth = 105;
  const radius = 40;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * ((current * 100) / total)) / 100;

  return (
    <div className="">
      <svg
        width={circleWidth}
        height={circleWidth}
        viewBox={"0 0 ${circleWidth} ${circleWidth}"}
      >
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="10px"
          r={radius}
          className="progress_circle_background"
        />
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="10px"
          r={radius}
          className="progress_circle_progress"
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
          }}
          transform={` rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
        />
        <text
          x="40%"
          y="50%"
          dy="0.3em"
          textAnchor="middle"
          className="progress_circle_current_step"
        >
          {current}
        </text>

        <text
          x="60%"
          y="57%"
          dy="0.3em"
          textAnchor="middle"
          className="progress_circle_counter"
        >
          {"/" + total}
        </text>
      </svg>
    </div>
  );
};

export default ProgressCircle;
