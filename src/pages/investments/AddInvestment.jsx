import React from "react";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import iOne from "../../assets/investment/i-1.svg";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
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
import { useMutation } from "@tanstack/react-query";
import { AuthAxios } from "../../helpers/axiosInstance";
import { getCookie } from "../../utils/cookieAuth";
import { convertDate } from "../../utils/timeConvert";
import { notiSuccess, notiError } from "../../utils/noti";
const AddInvestment = ({ setShowComp }) => {
  const [preview, setPreview] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const {
    handleSubmit,
    control,
    watch,
    register,
    formState: { isValid, errors },
  } = useForm({ mode: "all" });
  const selectedSubscription = watch("subscription", 3);
  const subscriptionOptions = [3, 6, 9, 12];

  const token = getCookie("authToken");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setPreview(URL.createObjectURL(file));
      setImgFile(file);
    } else {
      setPreview(null);
    }
  };
  // mutation
  const uploadNewInvestment = useMutation({
    mutationFn: async (formData) => {
      console.log(formData);
      try {
        const response = await AuthAxios({
          url: "/admin/new_investment/",
          method: "POST",
          data: formData,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status !== 201) {
          setButtonDisabled(false);

          throw new Error(response.data.message);
        }

        return response;
      } catch (error) {
        setButtonDisabled(false);

        console.log(error);
        notiError("An error occured! try again.");

        throw new Error(error.response.data.message);
      }
    },
    onSuccess: (data) => {
      notiSuccess("Investment successfully created.");

      setButtonDisabled(false);

      // Handle success, update state, or perform further actions
    },
    onError: (error) => {
      setButtonDisabled(false);

      console.log(error);
    },
  });

  // submit form

  const onFormSubmit = (data) => {
    if (!imgFile) {
      notiError("Please select a file.");
      return;
    }

    const {
      sampleName,
      subscription,
      startDate,
      endDate,
      np,
      interestRate,
      amt,
    } = data;
    const formData = new FormData();
    formData.append("image", imgFile);
    formData.append("title", sampleName);
    // formData.append("start_date", convertDate(startDate));
    // formData.append("end_date", convertDate(endDate));
    formData.append("duration", Number(subscription));
    formData.append("quota", np);
    formData.append("interest_rate", interestRate);
    formData.append("unit_share", amt);

    uploadNewInvestment.mutate(formData);
    setButtonDisabled(true);
  };

  return (
    <div className="flex items-start flex-col gap-3">
      {/*  */}
      <div className="flex items-center gap-3">
        <div
          className="flex items-center gap-1 cursor-pointer hover:underline"
          onClick={() => setShowComp("all")}
        >
          <img src={iOne} alt="i-one" />

          <p className="text-[14px]  text-[#17171]">Investments</p>
        </div>
        <ChevronRightOutlinedIcon sx={{ color: "#919191", pt: "2px" }} />
        <div className="flex items-center gap-1">
          <p className="text-[14px]  text-[#17171]">
            Create New Investment Plan
          </p>
        </div>
      </div>
      {/*  */}

      <div className="flex gap-2 items-center">
        <WestOutlinedIcon
          onClick={() => setShowComp("all")}
          sx={{ color: "#919191", pt: "2px", cursor: "pointer" }}
        />
        <p className="text-[#171717] text-[20px] font-[600]">
          Create New Investment Plan
        </p>
      </div>

      {/*  */}

      {/* form */}

      <div className="w-[60%] mx-auto p-2">
        <form onSubmit={handleSubmit(onFormSubmit)} className="w-full">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className="w-full flex flex-col items-start gap-1">
                <p className="text-[#001533] font-[500] text-[16px]">
                  BANNER
                  <sup className="text-[#DC3545]">*</sup>
                </p>

                <div className="h-full w-full">
                  {preview === "" ? (
                    <div className="w-full min-h-[13rem] rounded-md bg-[#f1f1f1]"></div>
                  ) : (
                    <img
                      src={preview}
                      alt="banner"
                      className="object-fill w-full h-full"
                    />
                  )}
                </div>

                <Box className="w-full mx-auto">
                  <p className="text-[14px] text-primary_grey my-2">
                    Upload an Image to uniquely identify this investment plan.
                  </p>
                  <TextField
                    onChange={handleImageChange}
                    type="file"
                    accept="image/*"
                    style={{ marginBottom: "20px", width: "100%", my: "10px" }}
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
                  />
                </Box>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="w-full flex flex-col items-start gap-1 my-2">
                <span className="flex items-center justify-between w-full">
                  <p className="text-[#001533] font-[500] text-[16px]">
                    INVESTMENT NAME
                    <sup className="text-[#DC3545]">*</sup>
                  </p>
                  <p className="text-[#001533] font-[500] text-[16px]">0/50</p>
                </span>

                <Controller
                  name="sampleName"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "This field is required", // Add required validation
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      placeholder="Sample Name"
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
                      error={!!errors.sampleName}
                      helperText={
                        errors.sampleName && errors.sampleName.message
                      }
                    />
                  )}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="w-full flex flex-col items-start gap-1 my-2 mb-3 ">
                <p className="text-[#001533] font-[500] text-[16px]">
                  DURATION
                  <sup className="text-[#DC3545]">*</sup>
                </p>

                <Controller
                  name="subscription"
                  control={control}
                  defaultValue={3}
                  render={({ field }) => (
                    <FormControl component="fieldset">
                      <RadioGroup
                        row
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                      >
                        {subscriptionOptions?.map((label) => (
                          <div
                            key={label}
                            className={`rounded-md border-2 px-2 mr-1 ${
                              selectedSubscription === label
                                ? "border-[#02981D]"
                                : "border-[#E6F5E8]"
                            }`}
                          >
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
                            Months
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  )}
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="w-full flex flex-col items-start gap-1">
                <span className="flex items-center justify-between w-full">
                  <p className="text-[#001533] font-[500] text-[16px]">
                    START DATE
                    <sup className="text-[#DC3545]">*</sup>
                  </p>
                </span>
                <Controller
                  name="startDate"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <div className="w-full flex justify-between items-center p-2 border-[1px] border-primary_grey hover:border-primary_green rounded-md">
                      <DatePicker
                        {...field}
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        className="w-full p-2 bg-transparent outline-none border-none  flex-2  rounded-lg text-black"
                        placeholderText="Select start date"
                      />

                      <KeyboardArrowDownRoundedIcon
                        sx={{ color: " E6F5E8", cursor: "pointer" }}
                      />
                    </div>
                  )}
                />
              </div>
            </Grid>

            <Grid item xs={6}>
              <div className="w-full flex flex-col items-start gap-1">
                <span className="flex items-center justify-between w-full">
                  <p className="text-[#001533] font-[500] text-[16px]">
                    END DATE
                    <sup className="text-[#DC3545]">*</sup>
                  </p>
                </span>
                <Controller
                  name="endDate"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <div className="w-full flex justify-between items-center p-2 border-[1px] border-primary_grey hover:border-primary_green rounded-md">
                      <DatePicker
                        {...field}
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        className="w-full p-2 bg-transparent outline-none border-none  flex-2  rounded-lg text-black"
                        placeholderText="Select end date"
                      />

                      <KeyboardArrowDownRoundedIcon
                        sx={{ color: " E6F5E8", cursor: "pointer" }}
                      />
                    </div>
                  )}
                />
              </div>
            </Grid>

            <Grid item xs={4}>
              <div className="w-full flex flex-col items-start gap-1 my-4">
                <span className="flex items-center justify-between w-full">
                  <p className="text-[#001533] font-[500] text-[16px]">
                    NO. OF UNITS
                    <sup className="text-[#DC3545]">*</sup>
                  </p>
                </span>

                <Controller
                  name="np"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "This field is required", // Add required validation
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      placeholder="300"
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
                      error={!!errors.np}
                      helperText={errors.np && errors.np.message}
                    />
                  )}
                />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="w-full flex flex-col items-start gap-1 my-4">
                <span className="flex items-center justify-between w-full">
                  <p className="text-[#001533] font-[500] text-[16px]">
                    INTEREST RATE(%)
                    <sup className="text-[#DC3545]">*</sup>
                  </p>
                </span>

                <Controller
                  name="interestRate"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "This field is required", // Add required validation
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      placeholder="300"
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
                      error={!!errors.interestRate}
                      helperText={
                        errors.interestRate && errors.interestRate.message
                      }
                    />
                  )}
                />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="w-full flex flex-col items-start gap-1 my-4">
                <span className="flex items-center justify-between w-full">
                  <p className="text-[#001533] font-[500] text-[16px]">
                    AMOUNT PER UNIT(N)
                    <sup className="text-[#DC3545]">*</sup>
                  </p>
                </span>

                <Controller
                  name="amt"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "This field is required", // Add required validation
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      placeholder="3,000"
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
                      error={!!errors.amt}
                      helperText={errors.amt && errors.amt.message}
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
                      Create New Investment Plan
                    </span>
                  )}
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default AddInvestment;
