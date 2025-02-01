import React from "react";
import success from "../assets/transactions/success-icon.png";
import { Button } from "@mui/material";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

const CustomSuccessModal = ({ close, textOne }) => {
  return (
    <div className="w-full flex flex-col gap-3 items-end">
      <ClearRoundedIcon
        onClick={close}
        sx={{ color: "#1E1E1E", cursor: "pointer" }}
      />

      <div className="flex flex-col w-[60%] mx-auto items-center justify-center gap-2 text-center">
        <img src={success} alt="success" className="object-fit" />
        <p className="font-[600] text-[24px] text-primary mt-3">Successfull</p>
        <p className=" text-[16px] text-primary_grey_2 mt-2">{textOne}</p>

        <Button
          onClick={close}
          variant="contained"
          type="submit"
          sx={{
            color: "#fff",
            width: "80%",
            background: "#02981D",
            padding: ".6em",
            boxShadow: "none",
            "&:hover": {
              background: "#02981d",
            },
          }}
        >
          Okay
        </Button>
      </div>
    </div>
  );
};

export default CustomSuccessModal;
