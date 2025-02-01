import { format } from "date-fns";

export const convertDate = (dateStr) => {
  // Format Date object into "yyyy-MM-dd" format
  return format(dateStr, "yyyy-MM-dd");
};
