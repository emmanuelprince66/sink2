import { Button, Skeleton } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import FormattedPrice from "../../utils/FormattedPrice";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import tOne from "../../assets/transactions/t-1.svg";
import SelectDate from "../../components/SelectDate";
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
import { investmentsHistoryUrl } from "../../api/endpoint";
import useFetchData from "../../hooks/useFetchData";

const InvestmentHistory = ({ memberId }) => {
  const [apiId, setApiId] = useState("");
  const apiUrl = investmentsHistoryUrl(apiId);
  const [investHistoryFilter, setInvestHistoryFilter] = useState("all");

  const queryKey = ["fetchInvestmentsHistory", apiUrl];

  const { data, error, isLoading } = useFetchData(queryKey, apiUrl);
  console.log("history", data);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);

  console.log("sssss", data);

  useEffect(() => {
    setApiId(memberId);
  }, [memberId]);
  return (
    <div className="flex flex-col items-start gap-3 w-full">
      {isLoading || !data ? (
        <Skeleton variant="rounded" width="100%" height={100} />
      ) : (
        <div className="w-full flex-col items-start gap-2 rounded-md border-[1px] border-[#E3E3E3] p-3">
          <p className="text-general font-[500] text-[15px] ">Summary</p>

          <div className="w-full flex justify-between items-center mt-3">
            <div className="items-start flex  gap-2 flex-col">
              <p className="font-[400] text-[14px] text-[#5E5E5E]">
                Investment Cycle Count:
              </p>
              <p className="text-general font-[500] text-[20px] ">
                {data?.results?.overview?.active_investment_count}
              </p>
            </div>
            <div className="items-start flex  gap-2 flex-col">
              <p className="font-[400] text-[14px] text-[#5E5E5E]">
                All-Time Total Investment Value:
              </p>
              <p className="text-general font-[500] text-[20px] ">
                <FormattedPrice
                  amount={data?.results?.overview?.active_investment_amount}
                />
              </p>
            </div>
            <div className="items-start flex  gap-2 flex-col">
              <p className="font-[400] text-[14px] text-[#5E5E5E]">
                All-Time Total Expected ROI:
              </p>
              <p className="text-general font-[500] text-[20px] ">
                <FormattedPrice
                  amount={data?.results?.overview?.acive_investment_roi}
                />
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-3 items-center w-[80%]">
        <Button
          onClick={() => setInvestHistoryFilter("all")}
          sx={{
            background: investHistoryFilter === "all" ? "#FAFAFA" : "#fff",
            borderRadius: "8px",
            width: "100%",
            px: "15px",
            border:
              investHistoryFilter === "all"
                ? "1px solid #02981D"
                : "1px solid #5E5E5E",
            color: investHistoryFilter === "all" ? "#02981D" : "#5E5E5E",
            "&:hover": {
              backgroundColor:
                investHistoryFilter === "all" ? "#FAFAFA" : "#fff",
            },
            textTransform: "capitalize",
            fontWeight: "400",
          }}
        >
          All
        </Button>
        <Button
          onClick={() => setInvestHistoryFilter("active")}
          sx={{
            background: investHistoryFilter === "active" ? "#FAFAFA" : "#fff",
            borderRadius: "8px",
            width: "100%",
            px: "15px",
            border:
              investHistoryFilter === "active"
                ? "1px solid #02981D"
                : "1px solid #5E5E5E",
            color: investHistoryFilter === "active" ? "#02981D" : "#5E5E5E",
            "&:hover": {
              backgroundColor:
                investHistoryFilter === "active" ? "#FAFAFA" : "#fff",
            },
            textTransform: "capitalize",
            fontWeight: "400",
          }}
        >
          Active
        </Button>
        <Button
          onClick={() => setInvestHistoryFilter("due")}
          sx={{
            background: investHistoryFilter === "due" ? "#FAFAFA" : "#fff",
            borderRadius: "8px",
            width: "100%",
            px: "15px",
            border:
              investHistoryFilter === "due"
                ? "1px solid #02981D"
                : "1px solid #5E5E5E",
            color: investHistoryFilter === "due" ? "#02981D" : "#5E5E5E",
            "&:hover": {
              backgroundColor:
                investHistoryFilter === "due" ? "#FAFAFA" : "#fff",
            },
            textTransform: "capitalize",
            fontWeight: "400",
          }}
        >
          Due
        </Button>
        <Button
          onClick={() => setInvestHistoryFilter("withdrawn")}
          sx={{
            background:
              investHistoryFilter === "withdrawn" ? "#FAFAFA" : "#fff",
            borderRadius: "8px",
            width: "100%",
            px: "15px",
            border:
              investHistoryFilter === "withdrawn"
                ? "1px solid #02981D"
                : "1px solid #5E5E5E",
            color: investHistoryFilter === "withdrawn" ? "#02981D" : "#5E5E5E",
            "&:hover": {
              backgroundColor:
                investHistoryFilter === "withdrawn" ? "#FAFAFA" : "#fff",
            },
            textTransform: "capitalize",
            fontWeight: "400",
          }}
        >
          Withdrawn
        </Button>
      </div>

      <div className="w-full flex items-center flex-col justify-between mt-2 rounded-md border-[1px] border-[#E3E3E3] p-2">
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
                  <TableCell> Investment Plan</TableCell>
                  <TableCell>Investment Value(N)</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>ROI(N)</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Status</TableCell>
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
                ) : data?.results?.investments &&
                  Array.isArray(data?.results?.investments) &&
                  data?.results?.investments?.length > 0 ? (
                  data?.results?.investments?.map((item, i) => (
                    <TableRow key={i + 2}>
                      <TableCell>{page * rowsPerPage + i + 1}</TableCell>

                      <TableCell>{item?.plan}</TableCell>
                      <TableCell>{item?.amount}</TableCell>
                      <TableCell>{item?.duration}</TableCell>
                      <TableCell>{item?.roi}</TableCell>
                      <TableCell>{item?.due_date}</TableCell>

                      <TableCell>
                        <Box
                          sx={{
                            textTransform: "capitalize",
                            background:
                              item?.status.toLowerCase() === "due"
                                ? "#EBFFF3"
                                : item?.status.toLowerCase() === "active"
                                ? "#EBFFF3"
                                : item?.status.toLowerCase() === "withdrawn"
                                ? "#FBEBEC"
                                : "",
                            color:
                              item?.status.toLowerCase() === "due"
                                ? "#17A2B8"
                                : item?.status.toLowerCase() === "active"
                                ? "#1E854A"
                                : item?.status.toLowerCase() === "withdrawn"
                                ? "#E52929"
                                : "",
                            fontWeight: "500",
                            fontSize: "12px",
                            padding: "4px 8px",
                            borderRadius: "8px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "5px",
                            border: "1px solid #E0E0E0",
                          }}
                        >
                          {item?.status.toLowerCase() === "due" && (
                            <span className="w-[10px] h-[10px] rounded-full  bg-primary_green" />
                          )}
                          {item?.status.toLowerCase() === "active" && (
                            <span className="w-[10px] h-[10px] rounded-full  bg-primary_green" />
                          )}
                          {item?.status.toLowerCase() === "withdrawn" && (
                            <span className="w-[10px] h-[10px] rounded-full  bg-[#E52929]" />
                          )}

                          {item?.status.toLowerCase()}
                        </Box>
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
    </div>
  );
};

export default InvestmentHistory;
