import React from "react";
import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { IconButton } from "@mui/material";
import CustomCard from "../../components/CustomCard";
import {
  Table,
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
import FormattedPrice from "../../utils/FormattedPrice";
import CustomPagination from "../../components/CustomPagination";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MemberProfile from "../members/MemberProfile";
import CustomModal from "../../components/CustomModal";
import DividendModal from "./DividendModal";
const CorporateSavings = ({
  setShowMemberProfile,
  setShowComp,
  setCurrentPage,
  showComp,
  corporativeData,
  showMemberProfile,
  currentPage,
  searchValue,
  isLoadingMembers,
  setSearchValue,
  corporativeMembers,
  isLoading,
  cop,
}) => {
  const [showCash, setShowCash] = useState(false);
  const handleClickShowCash = () => setShowCash((show) => !show);
  const [showDividend, setShowDividend] = useState(false);

  const handleClickShowDividend = () => setShowDividend((show) => !show);

  const [showDividendModal, setShowDividendModal] = useState(false);

  const closeDividendModal = () => setShowDividendModal(false);
  const handleMouseDownCash = (event) => {
    event.preventDefault();
  };
  const handleMouseDownDividend = (event) => {
    event.preventDefault();
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [memberId, setMemberId] = useState("");

  const handleOpenMemberProfile = (id) => {
    setMemberId(id);
    setShowMemberProfile((prev) => !prev);
  };

  const backSavings = () => {
    setShowMemberProfile((prev) => !prev);
  };

  const handleShowCustomersDividend = () => {
    setShowDividendModal(true);
  };
  return (
    <>
      {showMemberProfile && (
        <MemberProfile memberId={memberId} close={backSavings} type="Savings" />
      )}

      {!showMemberProfile && (
        <>
          <div className="w-full gap-4 flex-col justify-center flex items-start">
            <CustomCard style="w-full">
              <div className="flex items-center gap-8">
                <div className="flex flex-col items-start gap-3">
                  <div className="flex gap-4 items-center">
                    <p className="text-[14px]  text-[#17171]">
                      Total Cooperative Savings:
                    </p>
                    <IconButton
                      aria-label="toggle cash visibility"
                      onClick={handleClickShowCash}
                      onMouseDown={handleMouseDownCash}
                      edge="end"
                    >
                      {showCash ? (
                        <VisibilityOffOutlinedIcon
                          sx={{ color: "#3F3767", fontSize: "15px" }}
                        />
                      ) : (
                        <VisibilityOutlinedIcon
                          sx={{ color: "#3F3767", fontSize: "15px" }}
                        />
                      )}
                    </IconButton>
                  </div>
                  <p className="text-general text-[16px]">
                    {showCash ? (
                      <p>
                        {isLoading ? (
                          <CircularProgress
                            size="1rem"
                            sx={{
                              color: "#02981D",
                            }}
                          />
                        ) : (
                          <FormattedPrice
                            amount={corporativeData?.total || 0}
                          />
                        )}
                      </p>
                    ) : (
                      "***********"
                    )}
                  </p>
                </div>
                <div className="min-h-[5rem] w-[1px] bg-[#E3E3E3]"></div>

                <div className="flex flex-col items-start gap-3">
                  <div className="flex gap-4 items-center">
                    <p className="text-[14px]  text-[#17171]">
                      Active Cooperative Members:
                    </p>
                  </div>
                  <p className="text-general text-[16px]">
                    {isLoading ? (
                      <CircularProgress
                        size="1rem"
                        sx={{
                          color: "#02981D",
                        }}
                      />
                    ) : (
                      corporativeData?.count || 0
                    )}
                  </p>
                </div>
                <div className="min-h-[5rem] w-[1px] bg-[#E3E3E3]"></div>

                <div className="flex flex-col items-start gap-3">
                  <div className="flex gap-4 items-center">
                    <p className="text-[14px]  text-[#17171]">
                      Total Dividends Earned by Members (year 2023):
                    </p>
                    <IconButton
                      aria-label="toggle cash visibility"
                      onClick={handleClickShowDividend}
                      onMouseDown={handleMouseDownDividend}
                      edge="end"
                    >
                      {showCash ? (
                        <VisibilityOffOutlinedIcon
                          sx={{ color: "#3F3767", fontSize: "15px" }}
                        />
                      ) : (
                        <VisibilityOutlinedIcon
                          sx={{ color: "#3F3767", fontSize: "15px" }}
                        />
                      )}
                    </IconButton>
                  </div>
                  <p className="text-general text-[16px]">
                    {showDividend ? (
                      <p>
                        {isLoading ? (
                          <CircularProgress
                            size="1rem"
                            sx={{
                              color: "#02981D",
                            }}
                          />
                        ) : (
                          <FormattedPrice
                            amount={corporativeData?.total_dividend || 0}
                          />
                        )}
                      </p>
                    ) : (
                      "***********"
                    )}
                  </p>
                  <p
                    className="text-[#3F3767] cursor-pointer hover:underline text-[16px] "
                    onClick={handleShowCustomersDividend}
                  >
                    Pay Out Outstanding Dividends
                  </p>
                </div>
              </div>
            </CustomCard>

            {/*  */}

            <CustomCard style="w-full">
              <div className="flex flex-col items-start gap-3">
                <p className="text-general text-[16px] font-[500] ">
                  Active Cooperative Members
                </p>

                <div className="bg-white border-[#E3E3E3] border-[1px] w-[50%] py-2 px-2 flex items-center gap-2 rounded-md">
                  <SearchOutlinedIcon sx={{ color: "#757575" }} />
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search member , ID"
                    className="bg-transparent border-none focus:outline-none outline-none  w-full"
                  />
                </div>
                {/* table */}
                <Box className="w-full">
                  <TableContainer>
                    <Table sx={{ minWidth: 100, padding: "8px" }}>
                      <TableHead
                        sx={{
                          background: "#F8F8F8",
                        }}
                      >
                        <TableRow>
                          <TableCell>S/N</TableCell>
                          <TableCell> Name</TableCell>
                          <TableCell>Phone Number</TableCell>
                          <TableCell>Email Address</TableCell>
                          <TableCell>Corporate Wallet(N)</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {!corporativeMembers?.results || isLoadingMembers ? (
                          <CircularProgress
                            size="4.2rem"
                            sx={{
                              color: "#02981D",
                              marginLeft: "auto",
                              padding: "1em",
                            }}
                          />
                        ) : corporativeMembers?.results &&
                          Array.isArray(corporativeMembers?.results) &&
                          corporativeMembers?.results?.length > 0 ? (
                          corporativeMembers?.results?.map((item, i) => (
                            <TableRow key={item.id}>
                              <TableCell>
                                {page * rowsPerPage + i + 1}
                              </TableCell>
                              <TableCell>
                                <Typography
                                  sx={{
                                    fontWeight: "400",
                                    fontSize: "16px",
                                    color: "#5E5E5E",
                                  }}
                                >
                                  {item?.name}
                                </Typography>
                              </TableCell>
                              <TableCell>{item?.phone}</TableCell>
                              <TableCell>{item?.email}</TableCell>
                              <TableCell>{item?.coporative_balance}</TableCell>

                              <TableCell>
                                <Button
                                  onClick={() =>
                                    handleOpenMemberProfile(item?.id)
                                  }
                                  variant="outlined"
                                  sx={{
                                    textTransform: "capitalize",
                                    display: "flex",
                                    gap: "4px",
                                    width: "100px",
                                    alignItems: "center",
                                    color: "#3F3767",
                                    fontWeight: "400",
                                    fontSize: "10px",
                                    border: "1px solid #3F3767",
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

                  <CustomPagination
                    currentPage={currentPage}
                    totalPages={corporativeMembers?.pages}
                    onPageChange=""
                    setCurrentPage={setCurrentPage}
                    nextPageLink={corporativeMembers?.links?.next}
                    prevPageLink={corporativeMembers?.links?.previous}
                  />
                </Box>
              </div>
            </CustomCard>
          </div>
        </>
      )}

      {/* dividend modal start */}
      <CustomModal open={showDividendModal} closeModal={closeDividendModal}>
        <div className="w-full flex flex-col items-start gap-2">
          <div className="flex items-center justify-between w-full mb-3">
            <p className="text-general font-[500] text-[20px] ">
              Decline Withdrawal
            </p>

            <ClearRoundedIcon
              onClick={closeDividendModal}
              sx={{ color: "#1E1E1E", cursor: "pointer" }}
            />
          </div>

          <div className="w-full">
            <DividendModal />
          </div>
        </div>
      </CustomModal>
      {/* dividend modal end */}
    </>
  );
};

export default CorporateSavings;
