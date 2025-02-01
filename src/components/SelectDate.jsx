import React, { useState } from "react";
import { CalendarMonthOutlined } from "@mui/icons-material";
import { DateRangePicker } from "react-date-range";
import { Box, Button } from "@mui/material";
import { useDateContext } from "../utils/DateContext";
import { format, parse } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const SelectDate = ({ style }) => {
  const { selectedDates, setSelectedDates } = useDateContext();

  const formatDate = (date) => {
    if (typeof date === "string") {
      return date;
    }
    return format(date, "yyyy-MM-dd");
  };

  const parseDate = (dateStr) => {
    return parse(dateStr, "yyyy-MM-dd", new Date());
  };

  const [dateVisible, setDateVisible] = useState(false);
  const [selectedRange, setSelectedRange] = useState({
    startDate: parseDate(selectedDates.startDate),
    endDate: parseDate(selectedDates.endDate),
    key: "selection",
    color: "#02981D",
  });

  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    setSelectedRange({
      startDate,
      endDate,
      key: "selection",
      color: "#02981D",
    });
  };

  const openDateRange = () => {
    setDateVisible(!dateVisible);
  };

  const handleDateChange = () => {
    setSelectedDates({
      startDate: formatDate(selectedRange.startDate),
      endDate: formatDate(selectedRange.endDate),
    });
    setDateVisible(false);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          marginLeft: "auto",
          justifyContent: "flex-end",
          width: "fit-content",
          gap: "1em",
          alignItems: "center",
        }}
      >
        <div className="border flex ml-auto border-grey_1 w-fit rounded-[8px]">
          <Button
            sx={{ color: "#4F4F4F" }}
            startIcon={<CalendarMonthOutlined />}
            onClick={openDateRange}
          >
            {formatDate(selectedDates.startDate)} -{" "}
            {formatDate(selectedDates.endDate)}
          </Button>
        </div>
        {dateVisible && (
          <div
            className={`absolute flex flex-col ${style} bg-white z-[2] shadow-lg p-2 rounded-[8px] top-[140px]`}
          >
            <DateRangePicker ranges={[selectedRange]} onChange={handleSelect} />
            <button
              onClick={handleDateChange}
              className="bg-primary_green hover:bg-primary_red_3 p-2 w-1/5 ml-auto rounded-[8px] text-[#fff]"
            >
              Done
            </button>
          </div>
        )}
      </Box>
    </div>
  );
};

export default SelectDate;
