import React from "react";
import FormattedPrice from "../../utils/FormattedPrice";
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
import { useState } from "react";
const InvestmentActivityData = ({ data, isLoading }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);

  return (
    <div className="w-full">
      <div className="w-full flex-col items-start gap-2 rounded-md border-[1px] border-[#E3E3E3] p-3">
        <p className="text-general font-[500] text-[15px] ">Summary</p>

        <div className="w-full flex justify-between items-center mt-3">
          <div className="items-start flex  gap-2 flex-col">
            <p className="font-[400] text-[14px] text-[#5E5E5E]">
              Total Active Investment:
            </p>
            <p className="text-general font-[500] text-[20px] ">
              {isLoading ? (
                <CircularProgress
                  size="0.6rem"
                  sx={{
                    color: "#02981D",
                  }}
                />
              ) : (
                data?.results?.overview?.active_investment_count
              )}
            </p>
          </div>
          <div className="items-start flex  gap-2 flex-col">
            <p className="font-[400] text-[14px] text-[#5E5E5E]">
              All-Time Total Investment Value:
            </p>
            <p className="text-general font-[500] text-[20px] ">
              {isLoading ? (
                <CircularProgress
                  size="0.6rem"
                  sx={{
                    color: "#02981D",
                  }}
                />
              ) : (
                <FormattedPrice
                  amount={data?.results?.overview?.active_investment_amount}
                />
              )}
            </p>
          </div>
          <div className="items-start flex  gap-2 flex-col">
            <p className="font-[400] text-[14px] text-[#5E5E5E]">
              Total Expected ROI:
            </p>
            <p className="text-general font-[500] text-[20px] ">
              {isLoading ? (
                <CircularProgress
                  size="0.6rem"
                  sx={{
                    color: "#02981D",
                  }}
                />
              ) : (
                <FormattedPrice
                  amount={data?.results?.overview?.acive_investment_roi}
                />
              )}
            </p>
          </div>
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
                    <TableCell>{item?.duration}</TableCell>
                    <TableCell>{item?.roi}</TableCell>
                    <TableCell>{item?.due_date}</TableCell>
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
  );
};

export default InvestmentActivityData;
