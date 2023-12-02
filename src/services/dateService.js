export const formatTodaysDate = () => {
  const today = new Date();
  return formatDate(today);
};

export const formatExpiredDate = () => {
  const expired = new Date("November 28, 2023 14:00:00");
  return formatDate(expired);
};

export const formatDate = (date) => {
  if (typeof date === "string") {
    // If the input is a string, parse it into a Date object
    date = new Date(date);
  }

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};
