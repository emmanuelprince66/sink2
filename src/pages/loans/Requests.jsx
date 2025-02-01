import React from "react";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import Lfour from "../../assets/loan/Lfour";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useState, useEffect } from "react";
import eWhite from "../../assets/loan/eWhite.svg";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Button } from "@mui/material";
import CustomModal from "../../components/CustomModal";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

import SelectDate from "../../components/SelectDate";
import tOne from "../../assets/transactions/t-1.svg";
import {
  Table,
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  FormControlLabel,
  CircularProgress,
  RadioGroup,
  Radio,
  Typography,
} from "@mui/material";
import useFetchData from "../../hooks/useFetchData";
import { loanRequestsDataUrl } from "../../api/endpoint";
import CustomPagination from "../../components/CustomPagination";
import FormattedPrice from "../../utils/FormattedPrice";
import formattedDate from "../../utils/formattedDate";

const Requests = ({ statTitle, setShowStatistics, setMemberLoanDetails }) => {
  const [openExportModal, setOpenExportModal] = useState(false);
  const handleCloseExportModal = () => setOpenExportModal(false);
  const [exportFilter, setExportFilter] = useState("Current Page"); // Default value
  const exportFilterValue = ["Current Page", "Date Range"];
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterValue, setFilterValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(0);

  const [majorFilteredData, setMajorFilteredData] = useState(null);

  // fetch data
  const apiUrl = loanRequestsDataUrl(
    currentPage,
    rowsPerPage,
    searchValue,
    filterValue
  );
  const queryKey = ["fetchLoanRequestFilterData", apiUrl];
  const { data, isLoading } = useFetchData(queryKey, apiUrl);

  const handleChange = (event) => {
    setExportFilter(event.target.value);
  };
  const totalPages = data?.pages;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleShowLoanProfile = (id) => {
    const memberLoanData = data?.results?.find((item) => item?.id === id);
    setMemberLoanDetails(memberLoanData);
    setShowStatistics("profile");
  };
  useEffect(() => {
    setFilterValue(statTitle);
    if (data) {
      const res = data?.results;
      setMajorFilteredData(res);

      // switch (statTitle) {
      //   case "overdue":
      //     setMajorFilteredData(
      //       res?.filter((item) => item?.status === "OVER-DUE")
      //     );
      //     break;
      //   case "pending":
      //     setMajorFilteredData(
      //       res?.filter((item) => item?.status === "PENDING")
      //     );
      //     break;
      //   case "approved":
      //     setMajorFilteredData(
      //       res?.filter((item) => item?.status === "APPROVED")
      //     );
      //     break;
      //   default:
      //     setMajorFilteredData([]);
      //     break;
      // }
    }
  }, [data, statTitle]);

  return (
    <div className="flex flex-col items-start gap-3 w-full mt-3">
      <div className="flex gap-3 items-center">
        <p
          className="flex items-center gap-1 cursor-pointer hover:underline"
          onClick={() => setShowStatistics("statistics")}
        >
          <Lfour color="#5E5E5E" />
          Overview
        </p>
        <ChevronRightOutlinedIcon sx={{ color: "#5E5E5E" }} />

        <p className="text-[#919191] text-[14px] capitalize">{statTitle}</p>
      </div>

      <div className="flex gap-3 items-center">
        <WestOutlinedIcon sx={{ color: "#0F172A" }} />
        <p className="font-[600] text-general text-[20px] capitalize">
          {statTitle}{" "}
        </p>
      </div>

      <div className="bg-text_white w-full border-[#E3E3E3] rounded-md p-3">
        <div className="flex  justify-between items-center w-full ">
          <div className="bg-white border-[#E3E3E3] border-[1px]  w-[40%] py-2 px-2 flex items-center gap-2 rounded-md">
            <SearchOutlinedIcon sx={{ color: "#757575" }} />
            <input
              type="text"
              placeholder="Search member , ID"
              className="bg-transparent border-none focus:outline-none outline-none  w-full"
            />
          </div>
          <div className="flex items-center gap-4 ">
            {/* <SelectDate /> */}
            <Button
              sx={{
                background: "#FAFAFA",
                borderRadius: "8px",
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

        {/* table */}
        <Box className="w-full mt-4">
          <TableContainer>
            <Table sx={{ minWidth: 100, padding: "8px" }}>
              <TableHead
                sx={{
                  background: "#F8F8F8",
                }}
              >
                <TableRow>
                  <TableCell>S/N</TableCell>
                  <TableCell> User</TableCell>
                  <TableCell>Loan Amount(N) </TableCell>
                  <TableCell>Repayment Amount(N)</TableCell>
                  <TableCell>Date Due</TableCell>
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
                ) : majorFilteredData &&
                  Array.isArray(majorFilteredData) &&
                  majorFilteredData.length > 0 ? (
                  majorFilteredData.map((item, i) => (
                    <TableRow key={item.id}>
                      <TableCell>{page * rowsPerPage + i + 1}</TableCell>
                      <TableCell>
                        <Typography
                          sx={{
                            fontWeight: "400",
                            fontSize: "16px",
                            color: "#828282",
                          }}
                        >
                          {item?.lastname} {item?.firstname}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <FormattedPrice amount={item?.amount} />
                      </TableCell>
                      <TableCell>
                        <FormattedPrice amount={item?.amount} />
                      </TableCell>
                      <TableCell>
                        {formattedDate(item?.date_approved)}
                      </TableCell>
                      <TableCell
                        sx={{
                          display: "flex",
                          gap: "5px",
                        }}
                      >
                        <Button
                          onClick={() => handleShowLoanProfile(item?.id)}
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
                          ...View More
                        </Button>
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
                          <PersonOutlineOutlinedIcon
                            sx={{ fontSize: "14px" }}
                          />
                          Profile
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

          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            nextPageLink={data?.links?.next}
            prevPageLink={data?.links?.previous}
          />
        </Box>
        {/* table ends */}
      </div>

      {/* export modal */}
      <CustomModal
        style="w-[40%]"
        open={openExportModal}
        closeModal={handleCloseExportModal}
      >
        <div className="w-full  min-h-[50vh] pt-3 flex-col items-start gap-3">
          <div className="w-full flex justify-between items-center">
            <p className="text-[20px] font-[500] text-general">
              Export Data for Overdue Repayment
            </p>
            <span className="cursor-pointer" onClick={handleCloseExportModal}>
              <ClearRoundedIcon sx={{ color: "#1E1E1E" }} />
            </span>
          </div>

          <div className="mt-5 w-full">
            <FormControl component="fieldset">
              <RadioGroup
                value={exportFilter}
                onChange={handleChange}
                sx={{ flexDirection: "column" }} // Vertical arrangement
              >
                {exportFilterValue?.map((label) => (
                  <div className="flex items-center">
                    <FormControlLabel
                      key={label}
                      value={label}
                      control={
                        <Radio
                          sx={{
                            color: "#02981D",
                            "&.Mui-checked": {
                              color: "#02981D",
                            },
                          }}
                        />
                      }
                      label={label}
                    />
                    {label === "Date Range" && <SelectDate style="w-full" />}
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
          </div>

          <div className="w-[70%] flex items-center gap-3">
            <div className="flex  justify-between w-full gap-5 mt-[5rem] items-center">
              <Button
                onClick={handleCloseExportModal}
                variant="outlined"
                sx={{
                  textTransform: "capitalize",
                  display: "flex",
                  gap: "4px",
                  width: "100%",
                  alignItems: "center",
                  color: "#02981D",
                  padding: ".6em",
                  border: "1px solid #02981D",
                  "&:hover": {
                    border: "1px solid #02981D",
                  },
                  // lineHeight: "26.4px",
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  color: "#fff",
                  width: "100%",
                  background: "#02981D",
                  padding: ".6em",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  boxShadow: "none",
                  "&:hover": {
                    background: "#02981d",
                  },
                }}
              >
                <img src={eWhite} alt="e-white" />
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </CustomModal>
      {/* export modal ends */}
    </div>
  );
};

export default Requests;
