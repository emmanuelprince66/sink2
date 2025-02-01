import React from "react";
import { useMutation } from "@tanstack/react-query";
import { AuthAxios } from "../../helpers/axiosInstance";
import { getCookie } from "../../utils/cookieAuth";
import { notiSuccess, notiError } from "../../utils/noti";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import {
  Grid,
  IconButton,
  TextField,
  Switch,
  Box,
  InputAdornment,
  CircularProgress,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
const DeclineModal = ({ declineId, closeDeclineReqModal, refetch }) => {
  const {
    handleSubmit,
    control,
    watch,
    register,
    formState: { isValid, errors },
  } = useForm({ mode: "all" });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const selectedReason = watch("subscription", "Reason one");

  const [oreason, setOreason] = useState("");
  const [charCount, setCharCount] = useState(0);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setOreason(inputValue);
    setCharCount(inputValue.length);

    // Limit input to 50 characters
    if (inputValue.length > 50) {
      setOreason(inputValue.slice(0, 50));
      setCharCount(50);
    }
  };
  const selectedReasonOptions = [
    "Reason one",
    "Reason two",
    "Reason three",
    "Reason four",
  ];

  const token = getCookie("authToken");

  // mutation
  const uploadDeclineReason = useMutation({
    mutationFn: async (formData) => {
      console.log(formData);
      try {
        const response = await AuthAxios({
          url: `/admin/reject_withdrawal/${declineId}/`,
          method: "POST",
          data: formData,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        return response;
      } catch (error) {
        setButtonDisabled(false);
        notiError(error.response.data.message);
        closeDeclineReqModal();
        throw new Error(error.response.data.message);
      }
    },
    onSuccess: (data) => {
      notiSuccess("Withdrawal successfull declined");
      refetch();
      setButtonDisabled(false);
      closeDeclineReqModal();
      // Handle success, update state, or perform further actions
    },
    onError: (error) => {
      setButtonDisabled(false);
      notiError(error);
      closeDeclineReqModal();
    },
  });
  const onFormSubmit = (data) => {
    const payload = {
      reason: data?.reason === "" ? oreason : data?.reason,
    };

    if (payload?.reason === "") {
      notiError("Fill in all fields.");
    } else {
      setButtonDisabled(true);
      uploadDeclineReason.mutate(payload);
    }
  };
  return (
    <div className="w-full flex-col items-start gap-3">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className="w-full flex flex-col items-start gap-1 my-2 mb-3 ">
              <p className="text-[#001533] font-[500] text-[16px]">
                Reason for Widthdrawal
              </p>

              <Controller
                name="reason"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    >
                      <div className="flex flex-col items-start gap-3">
                        {selectedReasonOptions?.map((label) => (
                          <div key={label} className={` px-2 mr-1 `}>
                            <FormControlLabel
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
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="w-full flex flex-col items-start gap-1 my-2">
              <span className="flex items-center justify-between w-full mb-3">
                <p className="text-[#001533] font-[500] text-[16px]">
                  others (enter reason for decline)
                  <sup className="text-[#DC3545]">*</sup>
                </p>
                <p className="text-[#001533] font-[500] text-[16px]">
                  {charCount}/50
                </p>
              </span>

              <TextField
                value={oreason}
                onChange={handleInputChange}
                placeholder="Type...."
                multiline
                rows={4}
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: "10px",
                    },
                    "&:hover fieldset": {
                      borderColor: "#015B11",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#015B11",
                    },
                  },
                }}
                error={charCount > 50}
                helperText={
                  charCount > 50 ? "Maximum 50 characters allowed" : ""
                }
              />
            </div>
          </Grid>

          <Grid item xs={12}>
            <div className="flex items-center gap-4 w-full  mt-4">
              <Button
                variant="outlined"
                sx={{
                  color: "#02981d",
                  width: "100%",
                  padding: ".9em",
                  boxShadow: "none",
                }}
              >
                Cancel
              </Button>
              <Button
                disabled={buttonDisabled}
                type="submit"
                variant="contained"
                sx={{
                  color: "#fff",
                  width: "100%",
                  background: "#DC3545",
                  padding: ".9em",
                  boxShadow: "none",
                  "&:hover": {
                    background: "#DC3545",
                  },
                }}
              >
                {buttonDisabled ? (
                  <CircularProgress size="1.2rem" sx={{ color: "white" }} />
                ) : (
                  <span className="w-full">Decline Withdrawal</span>
                )}
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default DeclineModal;
