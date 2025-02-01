function formattedDate(createdAt) {
  console.log(createdAt);
  const date = new Date(createdAt);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";

  return `${month}/${day}/${year} at ${hours % 12}:${minutes
    .toString()
    .padStart(2, "0")} ${ampm}`;
}

export default formattedDate;
