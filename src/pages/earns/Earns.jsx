import { Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import EarningsTable from "./EarningsTable";
import { earningsUrl } from "../../api/endpoint";
import useFetchData from "../../hooks/useFetchData";
import Referrals from "../transactions/Referrals";
import ReferralTable from "../transactions/ReferralTable";

const Earns = () => {
  const [filter, setFilter] = useState("");
  const apiUrl = earningsUrl();
  const queryKey = ["fetchEarningsData", apiUrl];
  const { data, error, isLoading } = useFetchData(queryKey, apiUrl);

  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const totalPages = 10;

  console.log("earnings", data);
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

      {filter === "" && (
        <EarningsTable
          isLoading={isLoading}
          // handleOpenModal={handleOpenModal}
          data={data}
          // filteredTrxData={filteredTrxData}
          page={page}
          // onPageChange={handlePageChange}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
        />
      )}

      {filter === "referral" && (
        <ReferralTable
          page={page}
          isLoading={isLoading}
          data={data}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default Earns;
