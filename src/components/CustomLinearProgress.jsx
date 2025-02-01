import React, { useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";

const CustomLinearProgress = ({ startDate, endDate }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const now = new Date(); // Adjust this date for desired progress

    const totalDuration = end - start;
    const elapsedTime = now - start;
    let calculatedProgress = elapsedTime / totalDuration;

    // Clamp the progress between 0 and 1
    calculatedProgress = Math.max(0, Math.min(calculatedProgress, 1));

    setProgress(calculatedProgress);
  }, []);

  return (
    <>
      <div className="w-full">
        <div
          className="mb-4"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <p className="text-[14px] font-[500]  text-general">
            Savings Progress:
          </p>
          <span className="text-[14px] font-[500]  text-general">
            {Math.round(progress * 100)}%
          </span>
        </div>
        <LinearProgress
          sx={{
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#3F3767",
            },
          }}
          variant="determinate"
          value={progress * 100}
        />
        <div
          className="mt-3"
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span className="text-[14px] font-[500]  text-general">
            Start Date: 11/02/2024
          </span>
          <span className="text-[14px] font-[500]  text-general">
            End Date: 11/09/2024
          </span>
        </div>
      </div>
    </>
  );
};

export default CustomLinearProgress;
