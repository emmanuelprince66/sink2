import React from "react";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

const LoanCustomCardContent = ({
  textOne,
  textTwo,
  textThree,
  icon,
  status,
  handleOpenRequest,
}) => {
  return (
    <div className="w-full flex flex-col items-start gap-3 p-0">
      <div className="flex gap-2 items-center">
        <img src={icon} alt="icon" />
        <p className="font-[500] text-[11px] text-general ">{textOne}</p>
      </div>

      <div className="flex flex-col items-start gap-2">
        <p className="text-[14px] text-primary_grey_2">All-time:</p>
        <p className="font-[600] text-[24px] text-general">{textTwo}</p>
      </div>
      <div className="flex flex-col items-start gap-2">
        <p className="text-[14px] text-primary_grey_2">By filter:</p>
        <p className="font-[600] text-[24px] text-general">{textThree}</p>
      </div>

      {status !== undefined && (
        <p
          className="flex gap-2 items-center text-[#02981D] text-[12px] font-[500] cursor-pointer capitalize"
          onClick={() => handleOpenRequest(status)}
        >
          View {status} {status === "overdue" ? "Repayments" : "Requests"}
          <ChevronRightOutlinedIcon sx={{ fontSize: "16px" }} />
        </p>
      )}
    </div>
  );
};

export default LoanCustomCardContent;
