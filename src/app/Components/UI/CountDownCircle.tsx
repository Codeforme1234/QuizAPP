import React, { useEffect, useState } from "react";

const CountdownBar = ({
  duration = 9,
  barWidth = 1070,
  barHeight = 4,
  className,
}: {
  duration: number;
  barWidth?: number;
  barHeight?: number;
  className?: string;
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [progressWidth, setProgressWidth] = useState(barWidth); // Start at full width

  useEffect(() => {
    if (timeLeft > 0) {
      // Set initial progress bar width based on time left
      setProgressWidth((timeLeft / duration) * barWidth);

      // Start the countdown immediately
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, duration, barWidth]);

  useEffect(() => {
    // Update progress bar width as time decreases
    setProgressWidth((timeLeft / duration) * barWidth);
  }, [timeLeft, duration, barWidth]);

  return (
    <div className={`progress_bar_container ${className}`}>
      <div
        className="progress_bar_background"
        style={{
          width: `${barWidth}px`,
          height: `${barHeight}px`,
          backgroundColor: "#ddd",
          borderRadius: "10px",
        }}
      >
        <div
          className="progress_bar_foreground"
          style={{
            width: `${progressWidth}px`,
            height: "100%",
            backgroundColor: "#ff3b3f",
            borderRadius: "10px",
            transition: "width 1s linear",
          }}
        />
      </div>
    </div>
  );
};

export default CountdownBar;
