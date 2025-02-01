import React from "react";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import FormattedPrice from "../../utils/FormattedPrice";
import SelectDate from "../../components/SelectDate";
import { useState, useEffect } from "react";
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
import useFetchData from "../../hooks/useFetchData";
import { useDateContext } from "../../utils/DateContext";
import { corporativeBreakdownUrl } from "../../api/endpoint";
import CustomPagination from "../../components/CustomPagination";
import formattedDate from "../../utils/formattedDate";

const CorporativeSavingsModal = ({ close, memberId }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [apiId, setApiId] = useState("");
  const { selectedDates } = useDateContext();
  const [currentPage, setCurrentPage] = useState(1);

  console.log("excuse", apiId);

  const apiUrl = corporativeBreakdownUrl(apiId, selectedDates);
  const queryKey = ["fetchCorporativeSavings", apiUrl];

  const { data, error, isLoading } = useFetchData(queryKey, apiUrl);

  console.log("coop", data);

  const totalPages = data?.pages;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    setApiId(memberId);
  }, [memberId]);

  return (
    <div className="w-full flex flex-col items-start gap-3">
      <div className="flex items-center justify-between w-full mb-3">
        <p className="text-general font-[500] text-[20px] ">
          Corporative Savings Breakdown
        </p>

        <ClearRoundedIcon
          sx={{ color: "#1E1E1E", cursor: "pointer" }}
          onClick={close}
        />
      </div>
      <div className="flex items-center justify-between w-full mb-3">
        <div className="flex gap-1 items-center">
          <p className="font-[400] text-[14px] text-primary_grey_2">
            Total Cooperative Savings:
          </p>
          <p className="font-[600] text-[20px] text-general">
            {isLoading ? (
              <CircularProgress
                size="0.6rem"
                sx={{
                  color: "#02981D",
                }}
              />
            ) : (
              <FormattedPrice amount={data?.total} />
            )}
          </p>
        </div>

        <SelectDate />
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
                <TableCell>S/N</TableCell>
                <TableCell> Date & Time</TableCell>
                <TableCell>Amount Saved(N)</TableCell>
                <TableCell>Balance(N)</TableCell>
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
              ) : data &&
                Array.isArray(data?.results) &&
                data?.results?.length > 0 ? (
                data?.results?.map((item, i) => (
                  <TableRow key={i + 2}>
                    <TableCell>{page * rowsPerPage + i + 1}</TableCell>
                    <TableCell>{formattedDate(item?.created_at)}</TableCell>
                    <TableCell>{item?.amount}</TableCell>
                    <TableCell>{item?.balance}</TableCell>
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
      {/* Table */}
    </div>
  );
};

export default CorporativeSavingsModal;
