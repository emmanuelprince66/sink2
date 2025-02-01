import React from "react";
import CustomCard from "./CustomCard";
import successLogo from "../assets/successLogo.svg";
import { Button } from "@mui/material";

const SuccessCom = ({ setComponent }) => {
  return (
    <>
      <CustomCard>
        <div className="w-full flex justify-center text-center flex-col gap-3">
          <div className="min-h-[20px] min-w-[20px] mx-auto">
            <img src={successLogo} alt="success-logo" className="" />
          </div>

          <p className="text-[32px] font-[600] leading-[30px] my-2">
            Password Reset Successfull
          </p>
          <p className="text-[16px] font-[400] mb-2">
            Proceed to login with your new password.
          </p>

          <Button
            onClick={() => setComponent("Login")}
            variant="contained"
            type="submit"
            // disabled={!isDirty || Object.keys(errors).length > 0}
            sx={{
              color: "#fff",
              background: "#02981D",
              padding: ".6em",
              fontFamily: "Montserrat",
              boxShadow: "none",
              "&:hover": {
                background: "#02981d",
              },
            }}
          >
            Take me to Login
          </Button>
        </div>
      </CustomCard>
    </>
  );
};

export default SuccessCom;
