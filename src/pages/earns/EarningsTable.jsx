import React from "react";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CircularProgress from "@mui/material/CircularProgress";
import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import {
  Table,
  Box,
  TableBody,
  TableCell,
  TableContainer,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  Button,
  TableHead,
  TableRow,
  Typography,
  Divider,
} from "@mui/material";
import CustomPagination from "../../components/CustomPagination";
import ReportOutlinedIcon from "@mui/icons-material/ReportOutlined";

const EarningsTable = () => {
  return (
    <>
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
                <TableCell> Month</TableCell>
                <TableCell>Amount(N)</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default EarningsTable;
