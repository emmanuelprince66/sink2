import React from "react";
import { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import avatar from "../assets/tobbar/avatar.png";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const TopBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const storedUserString = localStorage.getItem("user");
  const storedUser = storedUserString ? JSON.parse(storedUserString) : null;

  console.log(storedUser)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function logOut() {
    navigate("/");
    Cookies.remove("authToken");
    Cookies.remove("refreshToken");
    localStorage.clear();
  }

  return (
    <div className="w-full p-3 ">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col items-start gap-2">
          <p className="font-[500] text-primary_grey_2 text-[15px]">
            Welcome Back,
          </p>
          <p className="text-[20x] font-[600] text-general">
            {storedUser?.firstname}
            😎
          </p>
        </div>
        <div className="bg-white border-[#E3E3E3] border-[1px] w-[50%] py-2 px-2 flex items-center gap-2 rounded-md">
          <SearchOutlinedIcon sx={{ color: "#757575" }} />
          <input
            type="text"
            placeholder="Search member , ID"
            className="bg-transparent border-none focus:outline-none outline-none  w-full"
          />
        </div>

        <div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <div className="flex items-center gap-2">
              <img src={avatar} alt="avatar" />

              <div className="flex flex-col items-start">
                <p className="text-[15x] font-[600] text-general">
                  {storedUser?.firstname}
                </p>
                <p className="font-[500] text-primary_grey_2 text-[13px]">
                  {storedUser?.role ?  storedUser?.role[0] : '' }
                </p>
              </div>
              <KeyboardArrowDownRoundedIcon sx={{ color: "#757575" }} />
            </div>
          </Button>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              sx: {
                width: "220px",
              },
            }}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={logOut}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
