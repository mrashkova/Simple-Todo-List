export const formatTodaysDate = () => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const fomatedDate = `${day}/${month}/${year}`;

  return fomatedDate;
};

export const formatExpiredDate = () => {
  const expired = new Date("November 28, 2023 14:00:00");
  const day = expired.getDate();
  const month = expired.getMonth() + 1;
  const year = expired.getFullYear();

  const fomatedDate = `${day}/${month}/${year}`;

  return fomatedDate;
};
