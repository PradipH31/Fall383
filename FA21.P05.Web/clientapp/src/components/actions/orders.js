import { clearCart } from "../../core/helpers/cartHelper";

export const createOrder = (
  createOrderData
) => {
  return fetch(`api/orders`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ "orderItems": createOrderData }),
  })
    .then((res) => {
      clearCart();
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const listOrder = (
  orderId
  //token
) => {
  return fetch(`api/orders/${orderId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const cancelOrder = (orderId, status) => {
  return fetch(`api/orders/${orderId}/cancel`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ orderId, status }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const startOrder = (orderId, status) => {
  return fetch(`api/orders/${orderId}/start`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ orderId, status }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};
