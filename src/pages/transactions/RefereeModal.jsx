import React from "react";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Button } from "@mui/material";
import formattedDate from "../../utils/formattedDate";

const RefereeModal = ({ closeRefereeModal, refereeData }) => {

  return (
    <div className="w-full flex flex-col items-start gap-2">
      <div className="flex items-center justify-between w-full mb-3">
        <p className="text-general font-[500] text-[20px] ">
          {refereeData?.lastname} {refereeData?.firstname} Referees (
          {refereeData?.referal_count})
        </p>

        <ClearRoundedIcon
          onClick={closeRefereeModal}
          sx={{ color: "#1E1E1E", cursor: "pointer" }}
        />
      </div>

      <div className="bg-white border-[#E3E3E3] border-[1px] w-[100%] py-2 px-2 flex items-center gap-2 rounded-md">
        <SearchOutlinedIcon sx={{ color: "#757575" }} />
        <input
          type="text"
          placeholder="Search....."
          className="bg-transparent border-none focus:outline-none outline-none  w-full"
        />
      </div>

      <div className="w-full mt-4">
        {refereeData.referees && refereeData.referees.length > 0 ? (
          refereeData.referees.map((referee, index) => (
            <div
              key={index}
              className="w-full flex flex-col mb-2 items-start gap-2 border-[1px] border-[#E3E3E3] rounded-md"
            >
              <div className="flex gap-2 p-2 items-center justify-between w-full">
                <div className="flex gap-3 items-center">
                  <img src={referee.imageUrl} alt={referee.name} />{" "}
                  {/* Assuming referee object has an `imageUrl` field */}
                  <div className="flex flex-col items-start gap-2">
                    <p className="text-general font-[600] text-[14px]">
                      {referee.lastname} {referee?.firstname}
                    </p>
                    <p className="font-[400] text-primary_grey_2 text-[12px]">
                      {formattedDate(referee?.created_at)}
                    </p>{" "}
                    {/* Assuming referee object has a `timestamp` field */}
                  </div>
                </div>
                <Button
                  sx={{
                    background: "#FAFAFA",
                    borderRadius: "8px",
                    width: "30%",
                    px: "15px",
                    border: "1px solid #C8C8C8",
                    color: "#02981D",
                    "&:hover": {
                      backgroundColor: "#FAFAFA",
                    },
                    textTransform: "capitalize",
                    fontWeight: "600",
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  Go to Profile
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full flex flex-col items-start gap-2">
            <p className="text-center text-primary_grey_2 text-[14px]">
              No referees available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RefereeModal;
