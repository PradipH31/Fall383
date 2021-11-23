export const addItem = (item, next) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
      ...item,
      count: 1,
    });
    cart = Array.from(new Set(cart.map((p) => p.id))).map((id) => {
      return cart.find((p) => p.id === id);
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const itemTotal = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart")).length;
    }
  }
  return 0;
};

export const getCartItems = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
  return [];
};

export const updateItem = (itemId, count) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((item, i) => {
      if (item.id === itemId) {
        return (cart[i].count = count);
      } else {
        return [];
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const removeItem = (itemId) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((item, i) => {
      if (item.id === itemId) {
        return cart.splice(i, 1);
      } else {
        return null;
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
};
