import moment from "moment";

export const formatDateNoTime = (date) => {
  return date ? moment(date).format(`YYYY-MM-DD`) : null;
};

export const formatTimestampToDate = (date) => {
  return date ? moment(date).format(`DD/MM/YYYY`) : null;
};

export const getCurrentUser = () => {
  let user = sessionStorage.getItem("current-user");
  return user ? JSON.parse(user) : undefined;
};

export const formatPrice = (number, locale = 'vi-VN', currency = "VND") => {
  return number
    ? new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
      }).format(number)
    : null;
};

export const formatNumber = (number) => {
  return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : null;
}