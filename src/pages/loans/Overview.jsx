import React from "react";
import { useState } from "react";
import Statistics from "./Statistics";
import Requests from "./Requests";
import LoanProfile from "./LoanProfile";

const Overview = () => {
  const [showStatistics, setShowStatistics] = useState("statistics");
  const [memberLoanDetails, setMemberLoanDetails] = useState(null);

  const handleCloseShowStatatistics = (str) => setShowStatistics(str);
  const [statTitle, setStatTitle] = useState("");

  return (
    <>
      {showStatistics === "statistics" && (
        <Statistics
          setStatTitle={setStatTitle}
          handleCloseShowStatatistics={handleCloseShowStatatistics}
        />
      )}

      {showStatistics === "request" && (
        <Requests
          statTitle={statTitle}
          setShowStatistics={setShowStatistics}
          setMemberLoanDetails={setMemberLoanDetails}
        />
      )}

      {showStatistics === "profile" && (
        <LoanProfile
          setShowStatistics={setShowStatistics}
          memberLoanDetails={memberLoanDetails}
        />
      )}
    </>
  );
};

export default Overview;
