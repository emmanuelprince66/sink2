import React from "react";
import { useState, useEffect } from "react";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import {
  Table,
  Button,
  Box,
  TableBody,
  TableCell,
  TableContainer,
  CircularProgress,
  TableHead,
  TableRow,
  Divider,
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
  Skeleton,
} from "@mui/material";
import { AuthAxios } from "../../helpers/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "../../utils/cookieAuth";
import FormattedPrice from "../../utils/FormattedPrice";
import { useNavigate } from "react-router-dom";
import { useToast } from "react-toastify";
import CustomModal from "../../components/CustomModal";
import ParticipantModalData from "./ParticipantModalData";
const ParticipantsSavings = ({ event, setShowComp }) => {
  const [apiId, setApiId] = useState("");
  const { title, link, id, img } = event;
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterValue, setFilterValue] = useState("");

  const [participantId, setParticipantId] = useState("");

  const navigate = useNavigate();
  const [showParticipantModal, setShowParticipantModal] = useState(false);
  const closeParticipantModal = () => setShowParticipantModal(false);

  const token = getCookie("authToken");

  const apiUrl = `/admin/savings/${apiId}/`;
  const getParticipantModalUrl = `/admin/single_savings/${participantId}/`;

  const handleShowParticipantModal = (id) => {
    setShowParticipantModal(true);
    setParticipantId(id);
  };

  //

  const fetchParticipantModalData = async (url) => {
    try {
      const response = await AuthAxios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch customer data");
    }
  };

  const {
    data: participantModalQuery,
    error: modalError,
    isLoading: modalLoading,
  } = useQuery({
    queryKey: ["fetchParticipantModalData", getParticipantModalUrl],
    queryFn: () => fetchParticipantModalData(getParticipantModalUrl),
    keepPreviousData: true,
    staleTime: 5000, // Cache data for 5 seconds
  });

  useEffect(() => {
    fetchParticipantModalData();
  }, [participantId]);

  useEffect(() => {
    setApiId(id);
  }, [id]);

  const fetchSavingsParticipants = async (url) => {
    try {
      const response = await AuthAxios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch customer data");
    }
  };
  const {
    data: participantsData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["fetchSavingsParticipants", apiUrl],
    queryFn: () => fetchSavingsParticipants(apiUrl),
    keepPreviousData: true,
    staleTime: 5000, // Cache data for 5 seconds
  });

  // useEffect(() => {

  // }, [id]);

  return (
    <div className="flex w-full flex-col items-start gap-4">
      <div className="flex gap-3 items-center mb-3">
        <div
          className="flex gap-1 items-center cursor-pointer"
          onClick={() => {
            setShowComp("corporate");
          }}
        >
          <img src="" alt="" />
          <p className="text-general text-[14px] hover:underline">Savings</p>
        </div>
        <ChevronRightOutlinedIcon
          sx={{ color: "#3F3767", fontSize: "16px", mt: "1px" }}
        />
        <div
          className="flex gap-1 items-center cursor-pointer"
          onClick={() => {
            setShowComp("personal");
          }}
        >
          <img src="" alt="" />
          <p className="text-general text-[14px] hover:underline">
            Personal Savings
          </p>
        </div>

        <ChevronRightOutlinedIcon
          sx={{ color: "#3F3767", fontSize: "16px", mt: "1px" }}
        />

        <div className="flex gap-1 items-center">
          <img src="" alt="link" />
          <p className="text-general text-[14px]">{title}</p>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <p className="text-general text-[20px] font-[600]">{title}</p>
      </div>

      <div className="w-full">
        <Box className="w-full">
          <TableContainer sx={{ background: "white" }}>
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
                  <TableCell>Amount Saved(N)</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!participantsData || isLoading ? (
                  <CircularProgress
                    size="4.2rem"
                    sx={{
                      color: "#02981D",
                      marginLeft: "auto",
                      padding: "1em",
                    }}
                  />
                ) : participantsData &&
                  Array.isArray(participantsData?.results) &&
                  participantsData?.results?.length > 0 ? (
                  participantsData?.results?.map((item, i) => (
                    <TableRow key={item.id}>
                      <TableCell>{i + 1}</TableCell>
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
                          {item?.phone}
                        </Typography>
                      </TableCell>
                      <TableCell>{item?.email}</TableCell>
                      <TableCell>
                        <FormattedPrice amount={item?.saved} />
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleShowParticipantModal(item?.id)}
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
        </Box>
      </div>

      {/* partucipant modal start */}
      <CustomModal open={showParticipantModal}>
        <ParticipantModalData
          close={closeParticipantModal}
          modalLoading={modalLoading}
          title={title}
          participantModalQuery={participantModalQuery}
          participantId={participantId}
        />
      </CustomModal>
      {/* partucipant modal end */}
    </div>
  );
};

export default ParticipantsSavings;
