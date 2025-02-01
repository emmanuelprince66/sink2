import React from "react";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { useState } from "react";
import { Grid } from "@mui/material";
import SavingsOverviewModalData from "./SavingsOverviewModalData";
import BreakdownModalData from "./BreakdownModalData";
import InterestModalData from "./InterestModalData";

const ParticipantModalData = ({
  participantModalQuery,
  participantId,
  title,
  modalLoading,
  close,
}) => {
  const [show, setShow] = useState("overview");

  console.log("cacacacca", participantModalQuery?.id);
  return (
    <div className="flex flex-col items-start gap-3 w-full ">
      <div className="w-full">
        <div className="w-full flex items-center justify-between">
          <p className="text-general font-[500] text-[20px] ">
            Personal Savings Details
          </p>

          <ClearRoundedIcon
            sx={{ color: "#1E1E1E", cursor: "pointer" }}
            onClick={close}
          />
        </div>

        <div className="flex w-full h-full mt-3">
          <Grid container spacing={2}>
            <Grid item xs={3.2}>
              <div className="h-[80vh] w-full  flex-col items-start gap-2 rounded-md border-[1px] border-[#E3E3E3] ">
                <div
                  onClick={() => setShow("overview")}
                  className={`${
                    show === "overview" ? "bg-[#EFFFF1] " : "bg-text_white"
                  } mt-4 cursor-pointer rounded-[8px] py-[10px] pl-[16px] flex w-full justify-between items-center`}
                >
                  <p
                    className={`${
                      show === "overview" ? "text-[#02981D]" : "text-[#5E5E5E]"
                    } text-[14px] font-[500]`}
                  >
                    Savings Overview
                  </p>
                  {show === "overview" && (
                    <div className="h-[24px] rounded-[8px] bg-[#02981D] w-[6px]"></div>
                  )}
                </div>
                <div
                  onClick={() => setShow("break")}
                  className={`${
                    show === "break" ? "bg-[#EFFFF1] " : "bg-text_white"
                  } mt-4 cursor-pointer rounded-[8px] py-[10px] pl-[16px] flex w-full justify-between items-center`}
                >
                  <p
                    className={`${
                      show === "break" ? "text-[#02981D]" : "text-[#5E5E5E]"
                    } text-[14px] font-[500]`}
                  >
                    Breakdown
                  </p>
                  {show === "break" && (
                    <div className="h-[24px] rounded-[8px] bg-[#02981D] w-[6px]"></div>
                  )}
                </div>
                <div
                  onClick={() => setShow("interest")}
                  className={`${
                    show === "interest" ? "bg-[#EFFFF1] " : "bg-text_white"
                  } mt-4 cursor-pointer rounded-[8px] py-[10px] pl-[16px] flex w-full justify-between items-center`}
                >
                  <p
                    className={`${
                      show === "interest" ? "text-[#02981D]" : "text-[#5E5E5E]"
                    } text-[14px] font-[500]`}
                  >
                    Interest
                  </p>
                  {show === "interest" && (
                    <div className="h-[24px] rounded-[8px] bg-[#02981D] w-[6px]"></div>
                  )}
                </div>
              </div>
            </Grid>
            <Grid item xs={8.8}>
              <div className="max-h-full w-full">
                {show === "overview" && (
                  <SavingsOverviewModalData
                    title={title}
                    modalLoading={modalLoading}
                    participantModalQuery={participantModalQuery}
                  />
                )}
                {show === "break" && (
                  <BreakdownModalData userId={participantId} />
                )}
                {show === "interest" && (
                  <InterestModalData userId={participantId} />
                )}
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default ParticipantModalData;
