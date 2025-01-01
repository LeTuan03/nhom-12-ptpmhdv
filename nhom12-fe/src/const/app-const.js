export const appConst = {
  CODE: {
    SUCCEED: 200,
  },
  ROLE: {
    SUPPER_ADMIN: { name: "ROLE_SUPER_ADMIN", code: 0 },
    ADMIN: { name: "ROLE_ADMIN", code: 1 },
    USER: { name: "ROLE_USER", code: 2 },
  },
  LIST_ROLE: [
    { name: "ROLE_SUPER_ADMIN", code: 0 },
    { name: "ROLE_ADMIN", code: 1 },
    { name: "ROLE_USER", code: 2 },
  ],
  LIST_STATUS_ROOM_BOOKING: [
    { name: "Còn trống", code: 0 },
    { name: "Đá hết", code: 1 },
  ],
  STATUS_ROOM_BOOKING: {
    EMPTY: { name: "Còn trống", code: 0 },
    SOLD: { name: "Đá hết", code: 1 },
  },
  LIST_STATUS_ORDER_BOOKING: [
    { name: "Tạo mới", code: 0 },
    { name: "Đã thanh toán", code: 1 },
    { name: "Hủy đặt chỗ", code: 2 },
    { name: "Chờ xác nhận", code: 3 },
    { name: "Đã xác nhận", code: 4 },
  ],
  STATUS_ORDER_BOOKING: {
    NEW: { name: "Tạo mới", code: 0 },
    SOLD: { name: "Đã thanh toán", code: 1 },
    CANCEL: { name: "Hủy đặt chỗ", code: 2 },
    WAIT: { name: "Chờ xác nhận", code: 3 },
    CONFIRM: { name: "Đã xác nhận", code: 4 },
  },
};
