import { Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import EarningsTable from "./EarningsTable";

const Earns = () => {
  const [filter, setFilter] = useState("");
  return (
    <div className="w-full flex flex-col items-start  gap-3">
      <div className="w-full flex items-center justify-between mb-3">
        <p className="font-[600] text-[20px] text-general ">Earnings</p>
      </div>

      <div className="flex w-[40%] gap-3  items-center">
        <Button
          onClick={() => setFilter("")}
          sx={{
            background: filter === "" ? "#FAFAFA" : "#fff",
            borderRadius: "8px",
            width: "100%",
            px: "15px",
            border: filter === "" ? "1px solid #3F3767" : "1px solid #C8C8C8",
            color: filter === "" ? "#3F3767" : "#C8C8C8",
            "&:hover": {
              backgroundColor: filter === "" ? "#FAFAFA" : "#fff",
            },
            textTransform: "capitalize",
            fontWeight: "400",
          }}
        >
          All Earnings
        </Button>

        <Button
          onClick={() => setFilter("referral")}
          sx={{
            background: filter === "referral" ? "#FAFAFA" : "#fff",
            borderRadius: "8px",
            width: "100%",
            px: "15px",
            border:
              filter === "referral" ? "1px solid #02981D" : "1px solid #5E5E5E",
            color: filter === "referral" ? "#02981D" : "#5E5E5E",
            "&:hover": {
              backgroundColor: filter === "referral" ? "#FAFAFA" : "#fff",
            },
            textTransform: "capitalize",
            fontWeight: "400",
          }}
        >
          Referral
        </Button>
      </div>

      <EarningsTable

      // isLoading={isLoading}
      // handleOpenModal={handleOpenModal}
      // transactionsData={transactionsData}
      // filteredTrxData={filteredTrxData}
      // page={page}
      // onPageChange={handlePageChange}
      // totalPages={totalPages}
      // rowsPerPage={rowsPerPage}
      // currentPage={currentPage}
      />

      {/* {trxFilter === "referral" && <Referrals />} */}
    </div>
  );
};

export default Earns;
