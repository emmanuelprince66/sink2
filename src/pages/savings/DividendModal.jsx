import React from "react";

import sThree from "../../assets/savings/s-34.svg";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import { usersPendingDividendUrl } from "../../api/endpoint";
import { AuthAxios } from "../../helpers/axiosInstance";
import {
  Table,
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Button,
  TableRow,
  CircularProgress,
  Checkbox,
  Paper,
  Grid,
  Container,
  TextField,
  TablePagination,
  ToggleButtonGroup,
  ToggleButton,
  Card,
  Typography,
  Modal,
} from "@mui/material";
import CustomPagination from "../../components/CustomPagination";
import { ToastContainer } from "react-toastify";
import { notiSuccess } from "../../utils/noti";
const DividendModal = () => {
  const [searchValue, setSearchValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [diviLoading, setDiviLoading] = useState(false);

  const [checkedItems, setCheckedItems] = useState([]);

  console.log("checked", checkedItems);

  const handleCheckboxChange = (itemId) => {
    setCheckedItems(
      (prev) =>
        prev.includes(itemId)
          ? prev.filter((id) => id !== itemId) // Remove item if already checked
          : [...prev, itemId] // Add item if not checked
    );
  };

  const handleProceedToPay = async () => {
    try {
      setDiviLoading(true);
      const payload = { indices: checkedItems };
      console.log("payload", payload);
      const response = await AuthAxios.post("admin/pay_dividends/", payload);
      notiSuccess(response?.data?.message);
      setCheckedItems([]);
    } catch (error) {
      console.error("Error while posting data:", error);
      setDiviLoading(false);
      // Handle error (e.g., show an error message)
    } finally {
      setDiviLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const apiUrlName = usersPendingDividendUrl(
    currentPage,
    rowsPerPage,
    searchValue
  );
  const queryKeyName = ["usersWithPendingUrl", apiUrlName];

  const {
    data: usersPendindDividend,
    error,
    isLoading: userPdLoading,
  } = useFetchData(queryKeyName, apiUrlName);

  const totalPages = usersPendindDividend?.pages;
  console.log("hello", usersPendindDividend);

  return (
    <div className="w-full flex items-center justify-center gap-4 flex-col">
      <img src={sThree} alt="q---ass" />

      <p className="text-general font-[600] text-[24px]">
        Sure to Payout All Pending Dividends?
      </p>
      <p className="text-[#5E5E5E] font-normal text-[16px]">
        Checked members will be automatically credited. You cannot undo this.
      </p>

      <div className=" border border-primary_grey rounded-md p-3 w-full flex items-start flex-col gap-3">
        <p className="text-general font-[500] text-[16px]">Active Members</p>

        <div className="bg-white border-[#E3E3E3] border-[1px] w-full py-2 px-2 flex items-center gap-2 rounded-md">
          <SearchOutlinedIcon sx={{ color: "#757575" }} />
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            placeholder="Search member , ID"
            className="bg-transparent border-none focus:outline-none outline-none  w-full"
          />
        </div>

        {/* Table */}

        <Box className="w-full">
          <TableContainer>
            <Table sx={{ minWidth: 100, padding: "8px" }}>
              <TableHead
                sx={{
                  background: "#F8F8F8",
                }}
              >
                <TableRow>
                  <TableCell></TableCell> {/* Checkbox column */}
                  <TableCell>S/N</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Outstanding Dividends(N)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!usersPendindDividend?.results || userPdLoading ? (
                  <CircularProgress
                    size="4.2rem"
                    sx={{
                      color: "#02981D",
                      marginLeft: "auto",
                      padding: "1em",
                    }}
                  />
                ) : usersPendindDividend?.results?.length > 0 ? (
                  usersPendindDividend?.results.map((item, i) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Checkbox
                          checked={checkedItems.includes(item.id)}
                          onChange={() => handleCheckboxChange(item.id)}
                          sx={{
                            color: "#02981D", // Unchecked color
                            "&.Mui-checked": {
                              color: "#02981D", // Checked color
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell>{page * rowsPerPage + i + 1}</TableCell>
                      <TableCell>
                        <Typography
                          sx={{
                            fontWeight: "400",
                            fontSize: "16px",
                            color: "#828282",
                          }}
                        >
                          {item?.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{
                            fontWeight: "400",
                            fontSize: "16px",
                            color: "#828282",
                          }}
                        >
                          {item?.amount}
                        </Typography>
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

          {/* Proceed and Cancel buttons */}
          <div className="flex justify-end w-[60%] ml-auto gap-5 mt-4 items-center">
            <Button
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
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              onClick={handleProceedToPay}
              disabled={checkedItems?.length === 0} // Disable if no items selected
              sx={{
                color: "#fff",
                width: "100%",
                background: "#02981D",
                padding: ".6em",
                boxShadow: "none",
                "&:hover": {
                  background: "#02981d",
                },
              }}
            >
              {diviLoading ? (
                <CircularProgress size="1.2rem" sx={{ color: "white" }} />
              ) : (
                "Proceed to Pay"
              )}
            </Button>
          </div>
        </Box>
        {/* Table */}

        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          nextPageLink={usersPendindDividend?.links?.next}
          prevPageLink={usersPendindDividend?.links?.previous}
        />
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
    </div>
  );
};

export default DividendModal;
