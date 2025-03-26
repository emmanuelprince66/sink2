import React from "react";
import { useForm, Controller } from "react-hook-form";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { useMutation } from "@tanstack/react-query";
import { AuthAxios } from "../../helpers/axiosInstance";
import { getCookie } from "../../utils/cookieAuth";
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

const AddBank = () => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const onFormSubmit = (data) => {
    //   if (!imgFile) {
    //     notiError("Please select a file.");
    //     return;
    //   }
    //   const {
    //     sampleName,
    //     subscription,
    //     startDate,
    //     endDate,
    //     np,
    //     interestRate,
    //     amt,
    //   } = data;
    //   const formData = new FormData();
    //   formData.append("image", imgFile);
    //   formData.append("title", sampleName);
    //   // formData.append("start_date", convertDate(startDate));
    //   // formData.append("end_date", convertDate(endDate));
    //   formData.append("Account Number", Number(subscription));
    //   formData.append("quota", np);
    //   formData.append("interest_rate", interestRate);
    //   formData.append("unit_share", amt);
    //   uploadNewInvestment.mutate(formData);
    //   setButtonDisabled(true);
  };

  const {
    handleSubmit,
    control,
    watch,
    register,
    formState: { isValid, errors },
  } = useForm({ mode: "all" });
  return (
    <div className="w-[40%] mx-auto border-gray-100 p-8 border rounded-lg">
      <p className=" font-[500] text-[20px] text-general mb-4">Add Bank Info</p>
      <form onSubmit={handleSubmit(onFormSubmit)} className="w-full">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className="w-full flex flex-col items-start gap-1 my-2">
              <span className="flex items-center justify-between w-full">
                <p className="text-[#001533] font-[500] text-[16px]">
                  Bank Name
                  <sup className="text-[#DC3545]">*</sup>
                </p>
              </span>

              <Controller
                name="bankName"
                control={control}
                defaultValue=""
                rules={{
                  required: "This field is required", // Add required validation
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Bank Name"
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
                    error={!!errors.bankName}
                    helperText={errors.bankName && errors.bankName.message}
                  />
                )}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="w-full flex flex-col items-start gap-1 my-2 mb-3 ">
              <p className="text-[#001533] font-[500] text-[16px]">
                Account Number
                <sup className="text-[#DC3545]">*</sup>
              </p>

              <Controller
                name="accountNumber"
                control={control}
                defaultValue=""
                rules={{
                  required: "This field is required", // Add required validation
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Account Number"
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
                    error={!!errors.accountNumber}
                    helperText={
                      errors.accountNumber && errors.accountNumber.message
                    }
                  />
                )}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="w-full flex flex-col items-start gap-1 my-2 mb-3 ">
              <p className="text-[#001533] font-[500] text-[16px]">
                Account Name
                <sup className="text-[#DC3545]">*</sup>
              </p>

              <Controller
                name="accountName"
                control={control}
                defaultValue=""
                rules={{
                  required: "This field is required", // Add required validation
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Account Name"
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
                    error={!!errors.accountName}
                    helperText={
                      errors.accountName && errors.accountName.message
                    }
                  />
                )}
              />
            </div>
          </Grid>

          {/* <Grid item xs={12}>
                  <div className="flex items-center justify-between">
                    <p className="text-general text-[16px] ">
                      Set this plan as sold out
                    </p>
    
                    <Switch
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "#fff",
                          // "&:hover": {
                          //   backgroundColor: alpha(
                          //     pink[600],
                          //     theme.palette.action.hoverOpacity
                          //   ),
                          // },
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                          backgroundColor: "#02981D",
                        },
                      }}
                      defaultChecked
                      color="default"
                    />
                  </div>
                </Grid> */}
          <Grid item xs={12}>
            <div className="flex items-center gap-4 w-full justify-end mt-4">
              <Button
                disabled={buttonDisabled}
                type="submit"
                variant="contained"
                sx={{
                  color: "#fff",
                  minWidth: "20rem",
                  background: "#02981D",
                  padding: ".9em",
                  boxShadow: "none",
                  "&:hover": {
                    background: "#02981d",
                  },
                }}
              >
                {buttonDisabled ? (
                  <CircularProgress size="1.2rem" sx={{ color: "white" }} />
                ) : (
                  <span className="w-full">
                    <AddRoundedIcon />
                    Add Bank
                  </span>
                )}
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddBank;
