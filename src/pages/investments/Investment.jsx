import React from "react";
import { useState } from "react";
import SelectDate from "../../components/SelectDate";
import { useDateContext } from "../../utils/DateContext";
import CustomCard from "../../components/CustomCard";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "../../utils/cookieAuth";
import { AuthAxios } from "../../helpers/axiosInstance";
import { CircularProgress, Divider } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { IconButton } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Button } from "@mui/material";
import AllInvestments from "./AllInvestments";
import InvestmentDetails from "./InvestmentDetails";
import AddInvestment from "./AddInvestment";
import FormattedPrice from "../../utils/FormattedPrice";
import { investmentListDataUrl } from "../../api/endpoint";
import useFetchData from "../../hooks/useFetchData";
import { ToastContainer } from "react-toastify";

const Investment = () => {
  const [showComp, setShowComp] = useState("all");
  const { selectedDates } = useDateContext();

  console.log(selectedDates?.startDate, selectedDates?.endDate);
  const [filterValue, setFilterValue] = useState("");

  console.log("original", filterValue);

  const token = getCookie("authToken");
  const [showCash, setShowCash] = useState(false);
  const handleClickShowCash = () => setShowCash((show) => !show);
  const handleMouseDownCash = (event) => {
    event.preventDefault();
  };

  const apiUrl = investmentListDataUrl(filterValue, selectedDates);
  const queryKey = ["fetchInvestmentListData", apiUrl];

  // fetch investment data for card

  const {
    data: investmentListData,
    error: investmentListError,
    isLoading: investmentListLoading,
  } = useFetchData(queryKey, apiUrl);

  console.log("name", investmentListData);

  //

  return (
    <>
      <div className="w-full flex-col gap-3 items-start">
        {showComp === "all" && (
          <>
            <div className="flex justify-between items-center">
              <p className="font-[600] text-[20px] text-general ">Investment</p>
              {showComp !== "add" && (
                <>
                  <div className="gap-5 flex items-center">
                    <SelectDate />

                    <Button
                      onClick={() => setShowComp("add")}
                      variant="contained"
                      sx={{
                        color: "#fff",
                        background: "#02981D",
                        display: "flex",
                        alignItem: "center",
                        gap: "5px",
                        padding: ".6em",
                        fontFamily: "Montserrat",
                        boxShadow: "none",
                        "&:hover": {
                          background: "#02981d",
                        },
                      }}
                    >
                      <AddRoundedIcon />
                      New Investment Plan
                    </Button>
                  </div>
                </>
              )}
            </div>

            <CustomCard style="w-full ">
              <div className="flex items-center gap-8 justify-between mt-5">
                <div className="flex flex-col items-start gap-3 border border-primary_grey w-full p-3 rounded-md">
                  <div className="flex gap-4 items-center">
                    <p className="text-[14px] font-bold  text-[#17171]">
                      Total Amount Invested By Members:
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-3">
                    <p className="text-primary_grey text-[14px]">All - Time:</p>
                    <p className="text-general text-[16px]">
                      {investmentListLoading || !investmentListData ? (
                        <CircularProgress
                          sx={{
                            color: "#02981D",
                          }}
                          size="1rem"
                        />
                      ) : (
                        <FormattedPrice
                          amount={investmentListData?.total_investments}
                        />
                      )}
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-3">
                    <p className="text-primary_grey text-[14px]">By Filter:</p>
                    <p className="text-general text-[16px]">
                      <p>
                        {investmentListLoading || !investmentListData ? (
                          <CircularProgress
                            sx={{
                              color: "#02981D",
                            }}
                            size="1rem"
                          />
                        ) : (
                          <FormattedPrice
                            amount={investmentListData?.total_by_filter}
                          />
                        )}
                      </p>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-3 border border-primary_grey  p-3 w-full rounded-md">
                  <div className="flex gap-4 items-center">
                    <p className="text-[14px] font-bold text-[#17171]">
                      Total Number Of Investors :
                    </p>
                  </div>

                  <div className="flex flex-col items-start gap-3">
                    <p className="text-primary_grey text-[14px]">All - Time:</p>
                    <p className="text-general text-[16px]">
                      {investmentListLoading || !investmentListData ? (
                        <CircularProgress
                          sx={{
                            color: "#02981D",
                          }}
                          size="1rem"
                        />
                      ) : (
                        investmentListData?.count_of_investors
                      )}
                    </p>
                  </div>

                  <div className="flex flex-col items-start gap-3">
                    <p className="text-primary_grey text-[14px]">By Filter:</p>
                    <p className="text-general text-[16px]">
                      {investmentListLoading || !investmentListData ? (
                        <CircularProgress
                          sx={{
                            color: "#02981D",
                          }}
                          size="1rem"
                        />
                      ) : (
                        investmentListData?.count_by_filter
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-center gap-3 border border-primary_grey p-3 w-full rounded-md h-[10rem] ">
                  <div className="flex gap-4 items-center">
                    <p className="text-[14px] font-bold text-[#17171]">
                      Active Investments :
                    </p>
                  </div>

                  <div className="flex flex-col items-start gap-3">
                    <p className="text-general text-[16px]">
                      {investmentListLoading || !investmentListData ? (
                        <CircularProgress
                          sx={{
                            color: "#02981D",
                          }}
                          size="1rem"
                        />
                      ) : (
                        investmentListData?.active_investments
                      )}
                    </p>
                  </div>
                </div>
              </div>
              {/* second div child */}

              <div className="flex items-center gap-8 justify-between mt-6">
                <div className="flex flex-col items-start gap-3 border border-primary_grey w-full p-3 rounded-md">
                  <div className="flex gap-4 items-center">
                    <p className="text-[14px] font-bold  text-[#17171]">
                      Total Upcoming Payouts:
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-3">
                    <p className="text-primary_grey text-[14px]">This Month:</p>
                    <p className="text-general text-[16px]">
                      {investmentListLoading || !investmentListData ? (
                        <CircularProgress
                          sx={{
                            color: "#02981D",
                          }}
                          size="1rem"
                        />
                      ) : (
                        <FormattedPrice
                          amount={
                            investmentListData?.upcoming_payout_this_month
                          }
                        />
                      )}
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-3">
                    <p className="text-primary_grey text-[14px]">Today:</p>
                    <p className="text-general text-[16px]">
                      <p>
                        {investmentListLoading || !investmentListData ? (
                          <CircularProgress
                            sx={{
                              color: "#02981D",
                            }}
                            size="1rem"
                          />
                        ) : (
                          <FormattedPrice
                            amount={investmentListData?.upcoming_payout_today}
                          />
                        )}
                      </p>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-center gap-3 border border-primary_grey p-3 w-full rounded-md h-[10rem] ">
                  <div className="flex gap-4 items-center">
                    <p className="text-[14px] font-bold text-[#17171]">
                      Total Interest :
                    </p>
                  </div>

                  <div className="flex flex-col items-start gap-3">
                    <p className="text-general text-[16px]">
                      {investmentListLoading || !investmentListData ? (
                        <CircularProgress
                          sx={{
                            color: "#02981D",
                          }}
                          size="1rem"
                        />
                      ) : (
                        investmentListData?.total_interest
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-3 border border-primary_grey p-3 w-full rounded-md">
                  <div className="flex gap-4 items-center">
                    <p className="text-[14px] font-bold text-[#17171]">
                      Cancelled Investments :
                    </p>
                  </div>

                  <div className="flex w-[70%]  mr-auto justify-between items-center">
                    <div className="flex flex-col items-start gap-3">
                      <p className="text-primary_grey text-[14px]">
                        All - Time:
                      </p>
                      <p className="text-general text-[16px]">
                        {investmentListLoading || !investmentListData ? (
                          <CircularProgress
                            sx={{
                              color: "#02981D",
                            }}
                            size="1rem"
                          />
                        ) : (
                          investmentListData?.cancelled_investment_count
                        )}
                      </p>
                    </div>

                    <Divider
                      sx={{
                        minHeight: "35px",
                        backgroundColor: "grey",
                        width: "1px",
                      }}
                    />

                    <div className="flex flex-col items-start gap-3">
                      <p className="text-primary_grey text-[14px]">
                        Total (By Filter):
                      </p>
                      <p className="text-general text-[16px]">
                        {investmentListLoading || !investmentListData ? (
                          <CircularProgress
                            sx={{
                              color: "#02981D",
                            }}
                            size="1rem"
                          />
                        ) : (
                          investmentListData?.cancelled_investment_filter_count
                        )}
                      </p>
                    </div>
                  </div>

                  {/* second */}
                  <div className="flex w-[70%]  mr-auto justify-between items-center">
                    <div className="flex flex-col items-start gap-3">
                      <p className="text-primary_grey text-[14px]">
                        Penalty(All-time):
                      </p>
                      <p className="text-general text-[16px]">
                        {investmentListLoading || !investmentListData ? (
                          <CircularProgress
                            sx={{
                              color: "#02981D",
                            }}
                            size="1rem"
                          />
                        ) : (
                          investmentListData?.cancelled_investment_penalties
                        )}
                      </p>
                    </div>

                    <Divider
                      sx={{
                        minHeight: "35px",
                        backgroundColor: "grey",
                        width: "1px",
                      }}
                    />

                    <div className="flex flex-col items-start gap-3">
                      <p className="text-primary_grey text-[14px]">
                        Penalty (By Filter):
                      </p>
                      <p className="text-general text-[16px]">
                        {investmentListLoading || !investmentListData ? (
                          <CircularProgress
                            sx={{
                              color: "#02981D",
                            }}
                            size="1rem"
                          />
                        ) : (
                          investmentListData?.cancelled_investment_filter_penalty
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CustomCard>
          </>
        )}

        {showComp === "all" || showComp === "details" ? (
          <AllInvestments
            investmentPlans={investmentListData?.plans || []}
            setShowComp={setShowComp}
            setFilterValue={setFilterValue}
            investmentListLoading={investmentListLoading}
            filterValue={filterValue}
          />
        ) : null}

        {showComp === "add" && <AddInvestment setShowComp={setShowComp} />}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Investment;
