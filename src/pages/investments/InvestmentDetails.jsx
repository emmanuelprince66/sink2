import React, { useEffect } from "react";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import iOne from "../../assets/investment/i-1.svg";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useState } from "react";
import banner from "../../assets/investment/banner.png";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import CustomCard from "../../components/CustomCard";
import { AuthAxios } from "../../helpers/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { getCookie } from "../../utils/cookieAuth";
import { notiError, notiSuccess } from "../../utils/noti";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import {
  Grid,
  IconButton,
  TextField,
  Switch,
  Box,
  CircularProgress,
  InputAdornment,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  Skeleton,
} from "@mui/material";
import { parseISO } from "date-fns";
import { convertDate } from "../../utils/timeConvert";
import InvestmentTable from "./InvestmentTable";
import useFetchData from "../../hooks/useFetchData";
import { investmentsDetailsUrl } from "../../api/endpoint";
import FormattedPrice from "../../utils/FormattedPrice";
const InvestmentDetails = ({ investmentById, setShowDetails, setShowComp }) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isDirty },
  } = useForm();
  const token = getCookie("authToken");
  const [name, setName] = useState("");
  const [interest, setInterest] = useState("");
  const [investId, setInvestId] = useState("");
  const [quota, setQuota] = useState(null);
  const [image, setImage] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [unitShare, setUnitShare] = useState(null);
  const [userInvest, setUserInvest] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [apiId, setApiId] = useState(null);
  const [subVal, setSubVal] = useState(null);
  const [showInvestmentDetails, setShowInvestmentDetails] = useState(true);

  const [nameErr, setNameErr] = useState(false);
  const [interestErr, setInterestErr] = useState(false);
  const [quotaErr, setQuotaErr] = useState(false);
  const [unitShareErr, setUnitShareErr] = useState(false);
  const [userInvestErr, setUserInvestErr] = useState(false);

  const [selectedSubscription, setSelectedSubscription] = useState(subVal); // default value
  const subscriptionOptions = [3, 6, 9, 12];

  console.log(selectedSubscription);

  const [showCash, setShowCash] = useState(false);
  const handleClickShowCash = () => setShowCash((show) => !show);
  const validateName = (name) => {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(name);
  };
  const validateNumber = (input) => {
    const regex = /^[0-9]+$/;
    return regex.test(input);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameErr(!validateName(value));
  };
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };
  const handleQuotaChange = (event) => {
    setQuota(event.target.value);
    setQuotaErr(!validateNumber(value));
  };
  const handleUnitShareChange = (event) => {
    setUnitShare(event.target.value);
    setUnitShareErr(!validateNumber(value));
  };
  const handleUserInvestmentChange = (event) => {
    setUserInvest(event.target.value);
    setUserInvestErr(!validateNumber(value));
  };

  const handleMouseDownCash = (event) => {
    event.preventDefault();
  };

  const handleBack = () => {
    setShowDetails(false);
    setShowComp("all");
  };

  // fetch investment detalis
  const apiUrl = investmentsDetailsUrl(apiId);
  const queryKey = ["fetchInvestmentDetails", apiUrl];
  const {
    data: investmentDetails,
    error,
    isLoading,
  } = useFetchData(queryKey, apiUrl);

  const handleRadioChange = (event) => {
    setSubVal(event.target.value);
  };
  // mutation
  const updateInvestmentData = useMutation({
    mutationFn: async (formData) => {
      console.log(formData);
      try {
        const response = await AuthAxios({
          url: `/admin/update_investment/${apiId}`,
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
      notiSuccess("Investment successfully updated.");

      setButtonDisabled(false);

      // Handle success, update state, or perform further actions
    },
    onError: (error) => {
      setButtonDisabled(false);

      console.log(error);
    },
  });

  console.log("emmaid", investmentById);

  const handleFormSubmit = () => {
    if (
      name !== "" ||
      quota !== null ||
      unitShare !== null ||
      userInvest !== null ||
      startDate !== null ||
      endDate !== null
    ) {
      const formData = new FormData();
      // formData.append("image", imgFile);
      formData.append("title", name);
      formData.append("start_date", convertDate(startDate));
      formData.append("end_date", convertDate(endDate));
      formData.append("duration", Number(subVal));
      formData.append("quota", quota);
      formData.append("interest_rate", userInvest);
      formData.append("unit_share", unitShare);

      updateInvestmentData.mutate(formData);
      setButtonDisabled(true);
    } else {
      notiError("Please fill all fields.");
    }
  };
  useEffect(() => {
    setName(investmentDetails?.title || "");
    setQuota(investmentDetails?.quota || 0);
    setImage(investmentDetails?.image || "");
    setSubVal(investmentDetails?.duration);
    setStartDate(
      investmentDetails?.start_date
        ? parseISO(investmentDetails?.start_date)
        : null
    );
    setEndDate(
      investmentDetails?.end_date ? parseISO(investmentDetails?.end_date) : null
    );
    setUnitShare(investmentDetails?.unit_share || 0);
    setUserInvest(investmentDetails?.user_investments_count || 0);
  }, [investmentDetails]);

  useEffect(() => {
    setApiId(investmentById?.id);
  }, [investmentById]);

  return (
    <div className="flex items-start flex-col gap-3">
      {/*  */}
      <div className="flex items-center gap-3">
        <div
          className="flex items-center gap-1 cursor-pointer hover:underline"
          onClick={handleBack}
        >
          <img src={iOne} alt="i-one" />

          <p className="text-[14px]  text-[#17171]">Investments</p>
        </div>
        <ChevronRightOutlinedIcon sx={{ color: "#919191", pt: "2px" }} />
        <div className="flex items-center gap-1">
          <p className="text-[14px]  text-[#17171]">{investmentById?.name}</p>
        </div>
      </div>
      {/*  */}

      <div className="flex gap-2 items-center">
        <WestOutlinedIcon sx={{ color: "#919191", pt: "2px" }} />
        <p className="text-[#171717] text-[20px] font-[600]">
          {investmentById?.name}
        </p>
      </div>

      {/*  */}

      <div className="flex w-full h-full">
        <Grid container spacing={2}>
          <Grid item xs={2.4}>
            <div className="h-full w-full bg-text_white flex-col items-start gap-2 rounded-md border-[1px] border-[#E3E3E3] ">
              <div
                onClick={() => setShowInvestmentDetails(true)}
                className={`${
                  showInvestmentDetails ? "bg-[#EFFFF1] " : "bg-transparent"
                } mt-4 cursor-pointer rounded-[8px] py-[10px] pl-[16px] flex w-full justify-between items-center`}
              >
                <p
                  className={`${
                    showInvestmentDetails ? "text-[#02981D]" : "text-[#5E5E5E]"
                  } text-[14px] font-[500]`}
                >
                  Investment Details
                </p>
                {showInvestmentDetails && (
                  <div className="h-[24px] rounded-[8px] bg-[#02981D] w-[6px]"></div>
                )}
              </div>
              <div
                onClick={() => setShowInvestmentDetails(false)}
                className={`${
                  !showInvestmentDetails ? "bg-[#EFFFF1] " : "bg-transparent"
                } mt-4 cursor-pointer rounded-[8px] py-[10px] pl-[16px] flex w-full justify-between items-center`}
              >
                <p
                  className={`${
                    !showInvestmentDetails ? "text-[#02981D]" : "text-[#5E5E5E]"
                  } text-[14px] font-[500]`}
                >
                  Investors
                </p>
                {!showInvestmentDetails && (
                  <div className="h-[24px] rounded-[8px] bg-[#02981D] w-[6px]"></div>
                )}
              </div>
            </div>
          </Grid>

          <Grid item xs={9.6}>
            {showInvestmentDetails ? (
              <>
                {isLoading ? (
                  <Skeleton variant="rounded" width="100%" height={150} />
                ) : (
                  <CustomCard style="w-full">
                    <p className="text-[15px] font-bold  text-[#17171]">
                      Summary
                    </p>
                    <div className="flex items-center gap-8">
                      <div className="flex flex-col items-start gap-3">
                        <div className="flex gap-4 items-center">
                          <p className="text-[14px]  text-[#17171]">
                            Total amount invested in this plan:
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
                              <FormattedPrice
                                amount={investmentDetails?.amount_invested || 0}
                              />
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
                            Total Number of investors:
                          </p>
                        </div>
                        <p className="text-general text-[16px]">
                          {investmentDetails?.investor_count || 0}
                        </p>
                      </div>
                      <div className="min-h-[5rem] w-[1px] bg-[#E3E3E3]"></div>

                      <div className="flex flex-col items-start gap-3">
                        <div className="flex gap-4 items-center">
                          <p className="text-[14px]  text-[#17171]">
                            Number of Days left:
                          </p>
                        </div>
                        <p className="text-general text-[16px]">
                          {investmentDetails?.days_left}
                        </p>
                      </div>
                    </div>
                  </CustomCard>
                )}

                {/* form */}

                {isLoading ? (
                  <CircularProgress
                    size="4.2rem"
                    sx={{
                      color: "#02981D",
                      marginLeft: "auto",
                      padding: "1em",
                    }}
                  />
                ) : (
                  <div className="w-[60%] mx-auto p-2">
                    <form action="" className="w-full">
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <div className="w-full flex flex-col items-start gap-1">
                            <p className="text-[#001533] font-[500] text-[16px]">
                              BANNER
                              <sup className="text-[#DC3545]">*</sup>
                            </p>

                            <div className="h-full w-full">
                              <img
                                src={investmentDetails?.image || banner}
                                alt="banner"
                                className="object-fill w-full h-full"
                              />
                            </div>

                            <Box className="w-full mx-auto">
                              <p className="text-[14px] text-primary_grey my-2">
                                Upload an Image to uniquely identify this
                                investment plan.
                              </p>
                              <TextField
                                // onChange={handleImageChange}
                                type="file"
                                accept="image/*"
                                style={{
                                  marginBottom: "20px",
                                  width: "100%",
                                  my: "10px",
                                }}
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
                                PLAY NAME
                                <sup className="text-[#DC3545]">*</sup>
                              </p>
                              <p className="text-[#001533] font-[500] text-[16px]">
                                0/50
                              </p>
                            </span>

                            <TextField
                              value={name}
                              onChange={handleNameChange}
                              placeholder="Sample Name"
                              sx={{
                                width: "100%",
                                marginTop: "16px",
                                "& .MuiOutlinedInput-root": {
                                  "& input": {
                                    backgroundColor: "#E3E3E3", // Background color of the input
                                    color: "#ACACAC", // Font color of the input
                                    borderRadius: "10px", // Border radius of the input
                                  },
                                  "& fieldset": {
                                    borderRadius: "10px",
                                    border: "none",
                                  },
                                  "&:hover fieldset": {},
                                  "&.Mui-focused fieldset": {
                                    border: "none",
                                  },
                                },
                              }}
                            />
                            {nameErr && (
                              <FormHelperText error>
                                Sample name can only contain letters
                              </FormHelperText>
                            )}
                          </div>
                        </Grid>
                        <Grid item xs={12}>
                          <div className="w-full flex flex-col items-start gap-1 my-2 mb-3 ">
                            <p className="text-[#001533] font-[500] text-[16px]">
                              DURATION
                              <sup className="text-[#DC3545]">*</sup>
                            </p>
                            {subVal && (
                              <FormControl component="fieldset">
                                <RadioGroup
                                  row
                                  value={subVal}
                                  onChange={handleRadioChange}
                                >
                                  {subscriptionOptions.map((label) => (
                                    <div
                                      key={label}
                                      className={`rounded-md border-2 px-2 mr-1 ${
                                        selectedSubscription ===
                                        label.toString()
                                          ? "border-[#02981D]"
                                          : "border-[#E6F5E8]"
                                      }`}
                                    >
                                      <FormControlLabel
                                        value={label.toString()}
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
                                        label={`${label} Months`}
                                      />
                                    </div>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                            )}
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

                            <div className="w-full flex justify-between items-center p-2 border-[1px] border-primary_grey hover:border-primary_green rounded-md">
                              <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                className="w-full p-2 bg-transparent outline-none border-none  flex-2  rounded-lg text-black"
                                placeholderText="Select start date"
                              />

                              <KeyboardArrowDownRoundedIcon
                                sx={{ color: " E6F5E8", cursor: "pointer" }}
                              />
                            </div>
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
                            <div className="w-full flex justify-between items-center p-2 border-[1px] border-primary_grey hover:border-primary_green rounded-md">
                              <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                className="w-full p-2 bg-transparent outline-none border-none  flex-2  rounded-lg text-black"
                                placeholderText="Select start date"
                              />

                              <KeyboardArrowDownRoundedIcon
                                sx={{ color: " E6F5E8", cursor: "pointer" }}
                              />
                            </div>
                          </div>
                        </Grid>

                        <Grid item xs={4}>
                          <div className="w-full flex flex-col items-start gap-1 my-4">
                            <span className="flex items-center justify-between w-full">
                              <p className="text-[#001533] font-[500] text-[16px]">
                                {/* NO. OF PARTICIPANTS */}
                                Quota
                                <sup className="text-[#DC3545]">*</sup>
                              </p>
                            </span>

                            <TextField
                              value={quota}
                              onChange={handleQuotaChange}
                              placeholder="300"
                              sx={{
                                width: "100%",
                                marginTop: "16px",
                                "& .MuiOutlinedInput-root": {
                                  "& input": {
                                    backgroundColor: "#E3E3E3", // Background color of the input
                                    color: "#ACACAC", // Font color of the input
                                    borderRadius: "10px", // Border radius of the input
                                  },
                                  "& fieldset": {
                                    borderRadius: "10px",
                                    border: "none",
                                  },
                                  "&:hover fieldset": {},
                                  "&.Mui-focused fieldset": {
                                    border: "none",
                                  },
                                },
                              }}
                            />
                            {quotaErr && (
                              <FormHelperText error>
                                Participant can only contain Numbers
                              </FormHelperText>
                            )}
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

                            <TextField
                              value={userInvest}
                              onChange={handleUserInvestmentChange}
                              placeholder="12"
                              sx={{
                                width: "100%",
                                marginTop: "16px",
                                "& .MuiOutlinedInput-root": {
                                  "& input": {
                                    backgroundColor: "#E3E3E3", // Background color of the input
                                    color: "#ACACAC", // Font color of the input
                                    borderRadius: "10px", // Border radius of the input
                                  },
                                  "& fieldset": {
                                    borderRadius: "10px",
                                    border: "none",
                                  },
                                  "&:hover fieldset": {},
                                  "&.Mui-focused fieldset": {
                                    border: "none",
                                  },
                                },
                              }}
                            />
                            {userInvestErr && (
                              <FormHelperText error>
                                Interest rate can only contain Numbers
                              </FormHelperText>
                            )}
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

                            <TextField
                              value={unitShare}
                              onChange={handleUnitShareChange}
                              placeholder="12"
                              sx={{
                                width: "100%",
                                marginTop: "16px",
                                "& .MuiOutlinedInput-root": {
                                  "& input": {
                                    backgroundColor: "#E3E3E3", // Background color of the input
                                    color: "#ACACAC", // Font color of the input
                                    borderRadius: "10px", // Border radius of the input
                                  },
                                  "& fieldset": {
                                    borderRadius: "10px",
                                    border: "none",
                                  },
                                  "&:hover fieldset": {},
                                  "&.Mui-focused fieldset": {
                                    border: "none",
                                  },
                                },
                              }}
                            />
                            {unitShareErr && (
                              <FormHelperText error>
                                Interest rate can only contain Numbers
                              </FormHelperText>
                            )}
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
                              variant="outline"
                              sx={{
                                color: "#fff",
                                background: "transparent",
                                color: "#02981d",
                                border: "1px solid grey",
                                padding: ".9em",
                                boxShadow: "none",
                                "&:hover": {
                                  background: "transparent",
                                },
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              disabled={buttonDisabled}
                              onClick={handleFormSubmit}
                              variant="contained"
                              sx={{
                                color: "#fff",
                                minWidth: "9rem",
                                background: "#02981D",
                                padding: ".9em",
                                boxShadow: "none",
                                "&:hover": {
                                  background: "#02981d",
                                },
                              }}
                            >
                              {buttonDisabled ? (
                                <CircularProgress
                                  size="1.2rem"
                                  sx={{ color: "white" }}
                                />
                              ) : (
                                "Save Changes"
                              )}
                            </Button>
                          </div>
                        </Grid>
                      </Grid>
                    </form>
                  </div>
                )}
              </>
            ) : (
              <InvestmentTable apiId={apiId} />
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default InvestmentDetails;
