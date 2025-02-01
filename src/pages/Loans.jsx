import React from "react";
import { Button } from "@mui/material";
import { useState } from "react";
import MainIcon from "../assets/loan/MainIcon";
import Lfour from "../assets/loan/Lfour";

import SelectDate from "../components/SelectDate";

import Overview from "./loans/Overview";
import Repayments from "./loans/Repayments";

const Loans = () => {
  const [showOverview, setShowOverview] = useState(true);

  return (
    <div className="flex w-full items-start flex-col gap-3">
      <div className="flex justify-between items-center w-full">
        <div className="w-[70%] flex items-center gap-3">
          <Button
            onClick={() => setShowOverview(true)}
            variant="outline"
            sx={{
              color: "#fff",
              background: "transparent",
              color: showOverview ? "#02981d" : "#5E5E5E",
              border: showOverview ? "1px solid #02981D" : "1px solid #5E5E5E",
              display: "flex",
              fontWeight: "600",
              padding: ".5em",
              px: ".9em",
              alignItems: "center",
              gap: "10px",
              boxShadow: "none",
              "&:hover": {
                background: "transparent",
              },
            }}
          >
            <MainIcon color={showOverview ? "#02981D" : "#5E5E5E"} />
            Overview
          </Button>
          <Button
            onClick={() => setShowOverview(false)}
            variant="outline"
            sx={{
              color: "#fff",
              background: "transparent",
              color: !showOverview ? "#02981d" : "#5E5E5E",
              border: !showOverview ? "1px solid #02981D" : "1px solid #5E5E5E",
              display: "flex",
              fontWeight: "600",
              padding: ".5em",
              px: ".9em",
              alignItems: "center",
              gap: "10px",
              boxShadow: "none",
              "&:hover": {
                background: "transparent",
              },
            }}
          >
            <Lfour color={!showOverview ? "#02981D" : "#5E5E5E"} />
            Loan Requests
          </Button>
        </div>
        {showOverview && <SelectDate />}
      </div>

      {showOverview && <Overview />}
      {!showOverview && <Repayments />}
    </div>
  );
};

export default Loans;
