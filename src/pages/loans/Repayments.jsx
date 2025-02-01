import React, { useState } from "react";
import AllLoans from "./AllLoans";
import LoanProfile from "./LoanProfile";
import { loanRequestsDataUrl } from "../../api/endpoint";
import useFetchData from "../../hooks/useFetchData";

const Repayments = () => {
  const [showLoans, setShowLoans] = useState(true);
  const [memberLoanDetails, setMemberLoanDetails] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterValue, setFilterValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(0);

  // fetch data
  const apiUrl = loanRequestsDataUrl(
    currentPage,
    rowsPerPage,
    searchValue,
    filterValue
  );
  const queryKey = ["fetchLoanRequestData", apiUrl];
  const { data, isLoading } = useFetchData(queryKey, apiUrl);

  const totalPages = data?.pages;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {showLoans && (
        <AllLoans
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          setMemberLoanDetails={setMemberLoanDetails}
          isLoading={isLoading}
          setSearchValue={setSearchValue}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          searchValue={searchValue}
          totalPages={totalPages}
          setShowLoans={setShowLoans}
          data={data || []}
          page={page}
        />
      )}
      {!showLoans && (
        <LoanProfile
          showLoans={showLoans}
          setShowLoans={setShowLoans}
          memberLoanDetails={memberLoanDetails}
        />
      )}
    </>
  );
};

export default Repayments;
