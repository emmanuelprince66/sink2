import { Button, Grid, Skeleton } from "@mui/material";
import React from "react";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CustomCard from "../../components/CustomCard";
import CustomInvestmentCard from "../../components/CustomInvestmentCard";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import InvestmentDetails from "./InvestmentDetails";
const AllInvestments = ({
  setShowComp,
  setFilterValue,
  investmentPlans,
  filterValue,
  investmentListLoading,
}) => {
  console.log("fil", filterValue);
  const [showDetails, setShowDetails] = useState(false);
  const [investmentById, setInvestmentById] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShowDetails = (id) => {
    const investById = investmentPlans?.find((item) => item?.id === id);
    setInvestmentById(investById);
    setShowDetails(true);
    setShowComp("details");
  };

  return (
    <>
      {!showDetails && (
        <>
          <div className="w-full flex flex-col gap-3 items-start mt-4">
            <div className=" w-[100%] mx-auto ">
              <div className="flex gap-4 w-1/2   justify-start">
                <Button
                  onClick={() => setFilterValue("")}
                  sx={{
                    background: filterValue === "" ? "#FAFAFA" : "#fff",
                    borderRadius: "8px",
                    width: "100%",
                    px: "15px",
                    border:
                      filterValue === ""
                        ? "1px solid #02981D"
                        : "1px solid #5E5E5E",
                    color: filterValue === "" ? "#02981D" : "#5E5E5E",
                    "&:hover": {
                      backgroundColor: filterValue === "" ? "#FAFAFA" : "#fff",
                    },
                    textTransform: "capitalize",
                    fontWeight: "400",
                  }}
                >
                  All Investment Plans
                </Button>
                <Button
                  onClick={() => setFilterValue("Active")}
                  sx={{
                    background: filterValue === "Active" ? "#FAFAFA" : "#fff",
                    borderRadius: "8px",
                    width: "50%",
                    px: "15px",
                    border:
                      filterValue === "Active"
                        ? "1px solid #02981D"
                        : "1px solid #5E5E5E",
                    color: filterValue === "Active" ? "#02981D" : "#5E5E5E",
                    "&:hover": {
                      backgroundColor:
                        filterValue === "Active" ? "#FAFAFA" : "#fff",
                    },
                    textTransform: "capitalize",
                    fontWeight: "400",
                  }}
                >
                  Available
                </Button>
                <Button
                  onClick={() => setFilterValue("Sold")}
                  sx={{
                    background: filterValue === "Sold" ? "#FAFAFA" : "#fff",
                    borderRadius: "8px",
                    width: "50%",
                    px: "15px",
                    border:
                      filterValue === "Sold"
                        ? "1px solid #02981D"
                        : "1px solid #5E5E5E",
                    color: filterValue === "Sold" ? "#02981D" : "#5E5E5E",
                    "&:hover": {
                      backgroundColor:
                        filterValue === "Sold" ? "#FAFAFA" : "#fff",
                    },
                    textTransform: "capitalize",
                    fontWeight: "400",
                  }}
                >
                  Sold Out
                </Button>
              </div>
            </div>

            {/*  */}
            <div className="  mr-auto ">
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{
                  display: "flex",
                  background: "transparent",
                  alignItems: "center",
                  fontSize: "14px",
                  color: "#171717",
                  gap: "5px",
                  textTransform: "capitalize",
                }}
              >
                Newest First
                <KeyboardArrowDownRoundedIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                PaperProps={{
                  style: {
                    width: 200, // set the width to 300px
                  },
                }}
              >
                <MenuItem
                  onClick={handleClose}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "space-between",
                    fontWeight: "500",
                    color: "#1E1E1E",
                  }}
                >
                  <p className="text-general text-[14px]">Newest first</p>

                  <CheckRoundedIcon
                    sx={{
                      color: "#02981D",
                      fontSize: "14px",
                    }}
                  />
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "space-between",
                    fontWeight: "500",
                    color: "#1E1E1E",
                  }}
                >
                  <p className="text-general text-[14px]">Oldest first</p>

                  <CheckRoundedIcon
                    sx={{
                      color: "#02981D",
                      fontSize: "14px",
                    }}
                  />
                </MenuItem>
              </Menu>
            </div>

            {/*  */}

            <div className="flex flex-wrap gap-4  w-[100%] mx-auto ">
              {investmentListLoading ? (
                <Skeleton variant="rounded" width="35%" height={250} />
              ) : (
                investmentPlans &&
                Array.isArray(investmentPlans) &&
                investmentPlans?.map((item) => (
                  <CustomInvestmentCard
                    handleShowDetails={handleShowDetails}
                    item={item}
                    key={item?.id}
                  />
                ))
              )}

              <div className="cursor-pointer"></div>
            </div>

            <div className="w-[70%] mx-auto items-center justify-between mt-5 flex">
              <Button
                sx={{
                  background: "transparent",
                  borderRadius: "8px",
                  width: "100px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: "15px",
                  border: "1px solid #5E5E5E",
                  color: "#5E5E5E",
                  "&:hover": {
                    backgroundColor: "#FAFAFA",
                  },
                  textTransform: "capitalize",
                  fontWeight: "400",
                }}
              >
                <KeyboardBackspaceRoundedIcon />
                Back
              </Button>
              <Button
                sx={{
                  background: "transparent",
                  borderRadius: "8px",
                  width: "100px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: "15px",
                  border: "1px solid #5E5E5E",
                  color: "#5E5E5E",
                  "&:hover": {
                    backgroundColor: "#FAFAFA",
                  },
                  textTransform: "capitalize",
                  fontWeight: "400",
                }}
              >
                Next
                <EastRoundedIcon />
              </Button>
            </div>
          </div>
        </>
      )}
      {showDetails && (
        <InvestmentDetails
          setShowDetails={setShowDetails}
          investmentById={investmentById}
          setShowComp={setShowComp}
        />
      )}
    </>
  );
};

export default AllInvestments;
