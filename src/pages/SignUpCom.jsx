import React from "react";
import { useState } from "react";
import { ArrowBackIosNewOutlined } from "@mui/icons-material";

import {
  CardContent,
  Checkbox,
  TextField,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Button,
  Grid,
  Typography,
  InputLabel,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

import CustomCard from "../components/CustomCard";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useNavigate } from "react-router";
import "react-toastify/dist/ReactToastify.min.css";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import HomeIcon from "@mui/icons-material/Home";
import { notiError, notiSuccess } from "../utils/noti";

import Cookies from "js-cookie";

import { AuthAxios, BaseAxios } from "../helpers/axiosInstance";
const SignUpCom = ({ setComponent, setUserEmail }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm();

  const SignUpMutation = useMutation({
    mutationFn: async (formData) => {
      console.log(formData);
      try {
        const response = await BaseAxios({
          url: "/auth/signup/",
          method: "POST",
          data: formData,
        });

        if (response.status !== 200) {
          throw new Error(response.data.message);
        }

        console.log("response", response);
        return response.data;
      } catch (error) {
        notiError(error?.response?.data?.error);
        console.log(error?.response?.data?.error);
        throw new Error(error.response.data.error);
      }
    },
    onSuccess: (data) => {
      console.log("data", data);
      setUserEmail(data?.email);
      setButtonDisabled(false);
      setComponent("verify-signup");
      // navigate("/overview");
      // // const adminData = {
      // //   email: data?.email,
      // //   firstname: data?.firstname,
      // //   role: data?.role,
      // // };

      // localStorage.setItem("user", JSON.stringify(adminData));
      // Cookies.set("authToken", data?.tokens?.access);
      // Cookies.set("refreshToken", data?.tokens?.refresh);

      // Handle success, update state, or perform further actions
    },
    onError: (error) => {
      setButtonDisabled(false);
      notifyError(String(error));
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const onSubmit = (formData) => {
    // Handle form submission here
    console.log("formsata", formData);
    const {
      first_name,
      last_name,
      qualification,
      email,
      phone,
      password,
      gender,
      address,
    } = formData;

    const payload = {
      name: `${first_name} ${last_name}`,
      email,
      phone,
      password,
      address,
      qualification,
      gender,
      sales_experience: true,
    };

    console.log("payload", payload);

    setButtonDisabled(true);

    SignUpMutation.mutate(payload);
  };

  return (
    <div className="w-full h-full flex items-start flex-col gap-4 ">
      <span
        onClick={() => setComponent("Login")}
        className="cursor-pointer flex items-center"
      >
        <ArrowBackIosNewOutlined sx={{ fontSize: "20px" }} /> Back
      </span>

      <div>
        <CustomCard>
          <div className="w-full flex flex-col items-center justify-center">
            <p className="font-bold text-[32px] mb-3">Welcome To Sync!</p>
            <p className="font-normal text-[16px]">Enter your details.</p>

            <div className="w-full">
              <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1em",
                }}
              >
                <Grid container spacing={2}>
                  <Grid
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: ".2em",
                    }}
                    item
                    xs={12}
                  >
                    <InputLabel className="text-black_0">
                      {" "}
                      <p className="font-[500] mt-3 text-[#001533]">
                        {" "}
                        First Name{" "}
                      </p>{" "}
                    </InputLabel>
                    <TextField
                      {...register("first_name", {
                        required: "First Name is required",
                      })}
                      required
                      fullWidth
                      sx={{
                        "& .MuiInputBase-root": { borderRadius: "8px" },
                        "& .MuiInputBase-input": { padding: "12px 0" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#04c82e", // Set the desired border color here
                          },
                          "&:hover fieldset": {
                            borderColor: "#04c82e", // Set the border color on hover here
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#04c82e", // Set the border color on hover here
                          },
                        },
                      }}
                      id="first_name"
                      autoFocus
                      placeholder="Enter your first name"
                      error={Boolean(errors.first_name)}
                      helperText={errors.first_name?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonOutlineIcon />
                            <span className="bg-grey_1 ml-[.3em] w-[1px]">
                              {" "}
                              &nbsp;&nbsp;{" "}
                            </span>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: ".2em",
                    }}
                    item
                    xs={12}
                  >
                    <InputLabel className="text-black_0">
                      {" "}
                      <p className="font-[500] mt-3 text-[#001533]">
                        {" "}
                        Last Name{" "}
                      </p>{" "}
                    </InputLabel>
                    <TextField
                      {...register("last_name", {
                        required: "First Name is required",
                      })}
                      required
                      fullWidth
                      sx={{
                        "& .MuiInputBase-root": { borderRadius: "8px" },
                        "& .MuiInputBase-input": { padding: "12px 0" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#04c82e", // Set the desired border color here
                          },
                          "&:hover fieldset": {
                            borderColor: "#04c82e", // Set the border color on hover here
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#04c82e", // Set the border color on hover here
                          },
                        },
                      }}
                      id="last_name"
                      autoFocus
                      placeholder="Enter your last name"
                      error={Boolean(errors.last_name)}
                      helperText={errors.last_name?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonOutlineIcon />
                            <span className="bg-grey_1 ml-[.3em] w-[1px]">
                              {" "}
                              &nbsp;&nbsp;{" "}
                            </span>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: ".2em",
                    }}
                    item
                    xs={12}
                  >
                    <InputLabel className="text-black_0">
                      {" "}
                      <p className="font-[500] mt-3 text-[#001533]">
                        {" "}
                        Email Address{" "}
                      </p>{" "}
                    </InputLabel>
                    <TextField
                      {...register("email", {
                        required: "Email is required",
                      })}
                      required
                      fullWidth
                      sx={{
                        "& .MuiInputBase-root": { borderRadius: "8px" },
                        "& .MuiInputBase-input": { padding: "12px 0" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#04c82e", // Set the desired border color here
                          },
                          "&:hover fieldset": {
                            borderColor: "#04c82e", // Set the border color on hover here
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#04c82e", // Set the border color on hover here
                          },
                        },
                      }}
                      id="email"
                      autoFocus
                      placeholder="example@domain.com"
                      error={Boolean(errors.email)}
                      helperText={errors.email?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MailOutlineOutlinedIcon />
                            <span className="bg-grey_1 ml-[.3em] w-[1px]">
                              {" "}
                              &nbsp;&nbsp;{" "}
                            </span>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: ".2em",
                    }}
                    item
                    xs={12}
                  >
                    <FormControl sx={{ mt: "1rem", width: "100%" }}>
                      <Controller
                        name="gender"
                        control={control}
                        rules={{ required: "Gender is required" }}
                        defaultValue=""
                        render={({ field }) => (
                          <Select
                            {...field}
                            sx={{
                              "& .MuiOutlinedInput-notchedOutline": {},
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor: "#04c82e",
                                },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#04c82e",
                              },
                            }}
                            displayEmpty
                            error={!!errors.gender}
                          >
                            <MenuItem value="" disabled>
                              <Box> Select Gender</Box>
                            </MenuItem>
                            <MenuItem value="MALE">Male</MenuItem>
                            <MenuItem value="FEMALE">Female</MenuItem>

                            {/* Corrected spelling */}
                          </Select>
                        )}
                      />

                      {errors.gender && (
                        <span
                          style={{
                            color: "#DC3545",
                            fontSize: "12px",
                            marginTop: "5px",
                            marginLeft: "10px",
                          }}
                        >
                          {errors.gender.message}
                        </span>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: ".2em",
                    }}
                    item
                    xs={12}
                  >
                    <InputLabel className="text-black_0">
                      {" "}
                      <p className="font-[500] mt-3 text-[#001533]">
                        {" "}
                        Phone{" "}
                      </p>{" "}
                    </InputLabel>
                    <TextField
                      {...register("phone", {
                        required: "Phone is required",
                      })}
                      required
                      fullWidth
                      sx={{
                        "& .MuiInputBase-root": { borderRadius: "8px" },
                        "& .MuiInputBase-input": { padding: "12px 0" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#04c82e", // Set the desired border color here
                          },
                          "&:hover fieldset": {
                            borderColor: "#04c82e", // Set the border color on hover here
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#04c82e", // Set the border color on hover here
                          },
                        },
                      }}
                      id="email"
                      autoFocus
                      placeholder="Enter your phone number"
                      error={Boolean(errors.phone)}
                      helperText={errors.phone?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocalPhoneIcon />
                            <span className="bg-grey_1 ml-[.3em] w-[1px]">
                              {" "}
                              &nbsp;&nbsp;{" "}
                            </span>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: ".2em",
                    }}
                    item
                    xs={12}
                  >
                    <InputLabel className="text-black_0">
                      {" "}
                      <p className="font-[500] mt-3 text-[#001533]">
                        {" "}
                        Address{" "}
                      </p>{" "}
                    </InputLabel>
                    <TextField
                      {...register("address", {
                        required: "Address is required",
                      })}
                      required
                      fullWidth
                      sx={{
                        "& .MuiInputBase-root": { borderRadius: "8px" },
                        "& .MuiInputBase-input": { padding: "12px 0" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#04c82e", // Set the desired border color here
                          },
                          "&:hover fieldset": {
                            borderColor: "#04c82e", // Set the border color on hover here
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#04c82e", // Set the border color on hover here
                          },
                        },
                      }}
                      id="address"
                      autoFocus
                      placeholder="Enter your address"
                      error={Boolean(errors.address)}
                      helperText={errors.address?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <HomeIcon />
                            <span className="bg-grey_1 ml-[.3em] w-[1px]">
                              {" "}
                              &nbsp;&nbsp;{" "}
                            </span>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: ".2em",
                    }}
                    item
                    xs={12}
                  >
                    <InputLabel className="text-black_0">
                      {" "}
                      <p className="font-[500] mt-3 text-[#001533]">
                        {" "}
                        Qualification{" "}
                      </p>{" "}
                    </InputLabel>
                    <TextField
                      {...register("qualification", {
                        required: "Qualification is required",
                      })}
                      required
                      fullWidth
                      sx={{
                        "& .MuiInputBase-root": { borderRadius: "8px" },
                        "& .MuiInputBase-input": { padding: "12px 0" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#04c82e", // Set the desired border color here
                          },
                          "&:hover fieldset": {
                            borderColor: "#04c82e", // Set the border color on hover here
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#04c82e", // Set the border color on hover here
                          },
                        },
                      }}
                      id="address"
                      autoFocus
                      placeholder="Enter your address"
                      error={Boolean(errors.qualification)}
                      helperText={errors.qualification?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <HomeIcon />
                            <span className="bg-grey_1 ml-[.3em] w-[1px]">
                              {" "}
                              &nbsp;&nbsp;{" "}
                            </span>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: ".2em",
                    }}
                    item
                    xs={12}
                  >
                    <InputLabel className="text-black">
                      <p className=" font-[500] text-[#001533] "> Password </p>
                    </InputLabel>
                    <TextField
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must have at least 8 characters",
                        },
                      })}
                      variant="outlined"
                      required
                      fullWidth
                      sx={{
                        "& .MuiInputBase-root": { borderRadius: "8px" },
                        "& .MuiInputBase-input": { padding: "12px 0" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#04c82e", // Set the desired border color here
                          },
                          "&:hover fieldset": {
                            borderColor: "#04c82e", // Set the border color on hover here
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#04c82e", // Set the border color on hover here
                          },
                        },
                      }}
                      className="rounded-[8px]"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      error={Boolean(errors.password)}
                      helperText={errors.password?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <HttpsOutlinedIcon />
                            <span className="bg-grey_1 ml-[.3em] w-[1px]">
                              {" "}
                              &nbsp;&nbsp;{" "}
                            </span>
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOffOutlinedIcon />
                              ) : (
                                <VisibilityOutlinedIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                        "aria-label": "weight",
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                ></Grid>

                <Button
                  variant="contained"
                  type="submit"
                  disabled={buttonDisabled}
                  sx={{
                    color: "#fff",
                    background: "#02981D",
                    padding: ".6em",
                    boxShadow: "none",
                    "&:hover": {
                      background: "#02981d",
                    },
                  }}
                >
                  {buttonDisabled ? (
                    <CircularProgress size="1.2rem" sx={{ color: "white" }} />
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </CustomCard>

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
    </div>
  );
};

export default SignUpCom;
