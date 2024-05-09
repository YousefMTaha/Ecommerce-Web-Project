/*
 *********************************** ALL SYSTEM CONSTANTS ***********************************
 */

export const userRoles = {
  User: "User",
  Admin: "Admin",
  Seller: "Seller",
};

export const userStatus = {
  Online: "Online",
  Offline: "Offline",
  Blocked: "Blocked",
};

export const reqDataForms = {
  body: "body",
  parmas: "params",
  query: "query",
};

export const uniqueFields = {
  id: "_id",
  name: "name",
  email: "email",
  categoryId: "categoryId",
  subcategoryId: "subcategoryId",
  brandId: "brandId",
  userId: "userId",
  productId: "productId",
  couponId: "couponId",
  couponCode: "code",
  category: "category",
};

export const orderStatus = {
  chipping: "chipping",
  watting_for_payment: "waiting for payment",
  canceled: "canceled",
  refunded: "refunded",
};

export const paymentMehods = {
  cash: "Cash",
  card: "Card",
};

export const fileValidation = {
  image: ["image/jpeg", "image/png", "image/gif"],
  file: ["application/pdf", "application/msword"],
  video: ["video/mp4"],
};
