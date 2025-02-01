import { useContext, useState, createContext } from "react";

// Helper function to format date as YYYY-MM-DD
const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-based, add 1
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const DateContext = createContext();

export const DateProvider = ({ children }) => {
  const [selectedDates, setSelectedDates] = useState({
    startDate: formatDate(new Date()),
    endDate: formatDate(new Date()),
  });

  return (
    <DateContext.Provider value={{ selectedDates, setSelectedDates }}>
      {children}
    </DateContext.Provider>
  );
};

export const useDateContext = () => useContext(DateContext);
