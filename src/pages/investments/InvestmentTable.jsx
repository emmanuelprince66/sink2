import { Button, duration } from "@mui/material";
import tOne from "../../assets/transactions/t-1.svg";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SelectDate from "../../components/SelectDate";
import React, { useState } from "react";
import {
  Table,
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  CircularProgress,
  TextField,
  TablePagination,
  ToggleButtonGroup,
  ToggleButton,
  Card,
  Modal,
} from "@mui/material";
import { investmentInvestorUrl } from "../../api/endpoint";
import useFetchData from "../../hooks/useFetchData";

const InvestmentTable = ({ apiId }) => {
  const [investmentFilter, setInvestmentFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  // fetch investor detalis
  const apiUrl = investmentInvestorUrl(apiId);
  const queryKey = ["fetchInvestorData", apiUrl];
  const {
    data: investmentInvestor,
    error,
    isLoading,
  } = useFetchData(queryKey, apiUrl);

  const totalPages = investmentInvestor?.pages;
  console.log("sorry", investmentInvestor);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  console.log(apiId);

  return (
    <div className="w-full flex flex-col gap-3 h-full">
      {/* filter */}
      <div className="flex w-[50%] gap-3  items-center">
        <Button
          onClick={() => setInvestmentFilter("all")}
          sx={{
            background: investmentFilter === "all" ? "#FAFAFA" : "#fff",
            borderRadius: "8px",
            width: "100%",
            px: "15px",
            border:
              investmentFilter === "all"
                ? "1px solid #3F3767"
                : "1px solid #C8C8C8",
            color: investmentFilter === "all" ? "#3F3767" : "#C8C8C8",
            "&:hover": {
              backgroundColor: investmentFilter === "all" ? "#FAFAFA" : "#fff",
            },
            textTransform: "capitalize",
            fontWeight: "400",
          }}
        >
          All
        </Button>
        <Button
          onClick={() => setInvestmentFilter("active")}
          sx={{
            background: investmentFilter === "active" ? "#FAFAFA" : "#fff",
            borderRadius: "8px",
            width: "100%",
            px: "15px",
            border:
              investmentFilter === "active"
                ? "1px solid #02981D"
                : "1px solid #5E5E5E",
            color: investmentFilter === "active" ? "#02981D" : "#5E5E5E",
            "&:hover": {
              backgroundColor:
                investmentFilter === "active" ? "#FAFAFA" : "#fff",
            },
            textTransform: "capitalize",
            fontWeight: "400",
          }}
        >
          Active
        </Button>
        <Button
          onClick={() => setInvestmentFilter("due")}
          sx={{
            background: investmentFilter === "due" ? "#FAFAFA" : "#fff",
            borderRadius: "8px",
            width: "100%",
            px: "15px",
            border:
              investmentFilter === "due"
                ? "1px solid #02981D"
                : "1px solid #5E5E5E",
            color: investmentFilter === "due" ? "#02981D" : "#5E5E5E",
            "&:hover": {
              backgroundColor: investmentFilter === "due" ? "#FAFAFA" : "#fff",
            },
            textTransform: "capitalize",
            fontWeight: "400",
          }}
        >
          Due
        </Button>
        <Button
          onClick={() => setInvestmentFilter("withdrawn")}
          sx={{
            background: investmentFilter === "withdrawn" ? "#FAFAFA" : "#fff",
            borderRadius: "8px",
            width: "100%",
            px: "15px",
            border:
              investmentFilter === "withdrawn"
                ? "1px solid #02981D"
                : "1px solid #5E5E5E",
            color: investmentFilter === "withdrawn" ? "#02981D" : "#5E5E5E",
            "&:hover": {
              backgroundColor:
                investmentFilter === "withdrawn" ? "#FAFAFA" : "#fff",
            },
            textTransform: "capitalize",
            fontWeight: "400",
          }}
        >
          Withdrawn
        </Button>
      </div>
      {/* filter end */}

      {/* second */}

      <div className="w-full flex items-center bg-text_white flex-col justify-between mt-2 rounded-md border-[1px] border-[#E3E3E3] p-4">
        <div className="flex justify-between  items-center w-full">
          <div className="bg-white border-[#E3E3E3] border-[1px] w-[40%] py-2 px-2 flex items-center gap-2 rounded-md">
            <SearchOutlinedIcon sx={{ color: "#757575" }} />
            <input
              // value={searchValue}
              // onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              placeholder="Search member , ID"
              className="bg-transparent border-none focus:outline-none outline-none  w-full"
            />
          </div>

          <div className="flex gap-4 items-center ">
            <SelectDate />
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
              <img src={tOne} alt="export-icn" />
              Export
            </Button>
          </div>
        </div>

        {/* Table */}

        <Box className="w-full mt-3">
          <TableContainer>
            <Table sx={{ minWidth: 100, padding: "8px" }}>
              <TableHead
                sx={{
                  background: "#F8F8F8",
                }}
              >
                <TableRow>
                  <TableCell>S/N</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Investment Value(N)</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>ROI(N)</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <CircularProgress
                    size="4.2rem"
                    sx={{
                      color: "#02981D",
                      marginLeft: "auto",
                      padding: "1em",
                    }}
                  />
                ) : investmentInvestor ? (
                  investmentInvestor?.results?.map((item, i) => (
                    <TableRow key={i + 2}>
                      <TableCell>{page * rowsPerPage + i + 1}</TableCell>
                      <TableCell>{item?.name}</TableCell>
                      <TableCell>{item?.amount}</TableCell>
                      <TableCell>{item?.due_date}</TableCell>
                      <TableCell>{item?.roi}</TableCell>
                      <TableCell>{item?.date}</TableCell>
                      <TableCell>
                        <span className="w-[10px] h-[10px] rounded-full  bg-primary_green" />

                        {item?.status}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          sx={{
                            textTransform: "capitalize",
                            display: "flex",
                            gap: "4px",
                            width: "100px",
                            alignItems: "center",
                            color: "#02981d",
                            fontWeight: "400",
                            fontSize: "10px",
                            border: "1px solid #02981d",
                            "&:hover": {
                              backgroundColor: "#fafafa",
                              border: "1px solid #E0E0E0",
                            },
                            // lineHeight: "26.4px",
                          }}
                        >
                          View More
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="7">No data found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* <CustomPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        nextPageLink={transactionsData?.links?.next}
                        prevPageLink={transactionsData?.links?.previous}
                    /> */}
        </Box>
        {/* Table */}
      </div>
      {/* second  end*/}
    </div>
  );
};

export default InvestmentTable;
