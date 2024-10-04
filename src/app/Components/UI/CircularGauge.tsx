import React, { useRef, useEffect } from "react";
import { gaugeChart } from "gauge-chart";

const SemiCircleGauge = ({ percentage }: { percentage: number }) => {
  const chart = useRef<any>(null);  // Set type to 'any' for chart reference
  const gaugeInstance = useRef<any>(null); // Separate ref to store the instance

  useEffect(() => {
    if (chart.current && !gaugeInstance.current) {
      let gaugeOptions = {
        hasNeedle: true,
        needleColor: "#1E1E28",
        needleUpdateSpeed: 1000,
        arcColors: ["#ff3b3f", "#ffd033", "#44b77b"], // Gauge colors
        arcDelimiters: [30, 60, 100],  // Set delimiters at different percentage marks
        centralLabel: " ", // Optional: Customize central label if needed
      };

      // Initialize the gauge chart and store the instance
      gaugeInstance.current = gaugeChart(chart.current, 230, gaugeOptions);
    }

    // Update the needle based on percentage value
    if (gaugeInstance.current) {
      gaugeInstance.current.updateNeedle(percentage);
    }
  }, [percentage]); // Ensure the needle only updates when 'percentage' changes

  return (
    <div className="result_meter_round">
      <div className="result_meter_round2">
        <div className="result_meter_round3">
          <div className="result_meter" ref={chart}></div>
          <div className="result_meter_round4">
            <div className="result_meter_round5">{percentage}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SemiCircleGauge;
