export const formatDate = () => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const fomatedDate = `${day}/${month}/${year}`;

  return fomatedDate;
};
