import moment from "moment";

export const formatDateNoTime = (date) => {
  return date ? moment(date).format(`YYYY-MM-DD`) : null;
};

export const formatTimestampToDate = (date) => {
  return date ? moment(date).format(`DD/MM/YYYY`) : null;
};
