import React, { useEffect } from "react";
import { useState } from "react";
import ParticipantsSavings from "./ParticipantsSavings";
import TargetSavings from "./TargetSavings";
import CorporateSavings from "./CorporateSavings";
import { Button } from "@mui/material";
import useFetchData from "../../hooks/useFetchData";
import { corporativeDataUrl, corporativeMembersUrl } from "../../api/endpoint";

const Savings = () => {
  const [showComp, setShowComp] = useState("corporate");
  const [event, setEvent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  const [showMemberProfile, setShowMemberProfile] = useState(false);
  // fetch card details
  const apiUrl = corporativeDataUrl();

  const getCorporateMembersUrl = corporativeMembersUrl(
    searchValue,
    currentPage
  );

  const queryKey = ["fetchCorporativeData", apiUrl];
  const queryKeyTwo = [
    "fetchCorporativeMembers",
    getCorporateMembersUrl,
    currentPage,
  ];

  const {
    data: corporativeData,
    error,
    isLoading,
  } = useFetchData(queryKey, apiUrl);

  console.log("curr", currentPage);

  const {
    data: corporativeMembers,
    error: membersError,
    isLoading: isLoadingMembers,
  } = useFetchData(queryKeyTwo, getCorporateMembersUrl);

  // fetch card details end

  const handleShowParticipants = (link) => {
    setEvent(link);
    setShowComp("participants");
  };

  const handleLimitChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to page 1 when limit changes
  };

  return (
    <>
      {showComp !== "participants" && !showMemberProfile && (
        <div className="mb-4">
          <p className="font-[600] text-[20px] text-general mb-4">Savings</p>

          <div className="flex w-1/2 gap-3  items-center">
            <Button
              onClick={() => setShowComp("corporate")}
              sx={{
                background: showComp === "corporate" ? "#FAFAFA" : "#fff",
                borderRadius: "8px",
                width: "100%",
                px: "15px",
                border:
                  showComp === "corporate"
                    ? "1px solid #3F3767"
                    : "1px solid #C8C8C8",
                color: showComp === "corporate" ? "#3F3767" : "#C8C8C8",
                "&:hover": {
                  backgroundColor:
                    showComp === "corporate" ? "#FAFAFA" : "#fff",
                },
                textTransform: "capitalize",
                fontWeight: "400",
              }}
            >
              Cooperative Savings
            </Button>
            <Button
              onClick={() => setShowComp("personal")}
              sx={{
                background: showComp === "active" ? "#FAFAFA" : "#fff",
                borderRadius: "8px",
                width: "100%",
                px: "15px",
                border:
                  showComp === "active"
                    ? "1px solid #02981D"
                    : "1px solid #5E5E5E",
                color: showComp === "active" ? "#02981D" : "#5E5E5E",
                "&:hover": {
                  backgroundColor: showComp === "active" ? "#FAFAFA" : "#fff",
                },
                textTransform: "capitalize",
                fontWeight: "400",
              }}
            >
              Personal Savings
            </Button>
          </div>

          {/*  */}
        </div>
      )}
      {showComp === "corporate" && (
        <CorporateSavings
          isLoading={isLoading}
          setShowMemberProfile={setShowMemberProfile}
          showMemberProfile={showMemberProfile}
          corporativeData={corporativeData}
          setCurrentPage={setCurrentPage}
          setShowComp={setShowComp}
          showComp={showComp}
          corporativeMembers={corporativeMembers || {}}
          isLoadingMembers={isLoadingMembers}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          currentPage={currentPage}
        />
      )}
      {showComp === "participants" && (
        <ParticipantsSavings event={event} setShowComp={setShowComp} />
      )}
      {showComp === "personal" && (
        <TargetSavings handleShowParticipants={handleShowParticipants} />
      )}
    </>
  );
};

export default Savings;
