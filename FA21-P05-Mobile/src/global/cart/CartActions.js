import AsyncStorage from "@react-native-async-storage/async-storage";

export const addItem = async (item) => {
  if (typeof window !== "undefined") {
    try {
      let cart = [];
      const val = await AsyncStorage.getItem('@cart')
      if (val != null) {
        cart = JSON.parse(val);
      }
      cart.push({
        ...item,
        count: 1,
      });
      cart = Array.from(new Set(cart.map((p) => p.id))).map((id) => {
        return cart.find((p) => p.id === id);
      });
      cart = JSON.stringify(cart);
      try {
        await AsyncStorage.setItem('@cart', cart);
        // try {
        //   const v = await AsyncStorage.getItem('@cart')
        //   console.log(v)
        // }
        // catch (e) {
        //   console.log(e)
        // }
      }
      catch (e) {
        alert("Could not add to your cart")
      }
    } catch (e) {
      alert('Failed to get your cart')
    }
  }
};

export const itemTotal = async () => {
  if (typeof window !== "undefined") {
    const val = await AsyncStorage.getItem('@cart')
    if (val !== null) {
      return JSON.parse(val).length;
    }
  }
  return 0;
};

export const getCartItems = async () => {
  if (typeof window !== "undefined") {
    const val = await AsyncStorage.getItem('@cart')
    if (val !== null) {
      console.log(val)
      return JSON.parse(val);
    }
  }
  return [];
};

export const updateItem = (itemId, count) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (AsyncStorage.getItem('@cart')) {
      cart = JSON.parse(AsyncStorage.getItem('@cart'));
    }
    cart.map((item, i) => {
      if (item.id === itemId) {
        return (cart[i].count = count);
      } else {
        return [];
      }
    });
    AsyncStorage.setItem('@cart', JSON.stringify(cart));
  }
};

export const removeItem = async (itemId, refresh, setRefresh) => {
  try {
    let cart = [];
    if (typeof window !== "undefined") {
      const val = await AsyncStorage.getItem('@cart')
      if (val != null) {
        cart = JSON.parse(val);
      }
      cart.map((item, i) => {
        if (item.id === itemId) {
          return cart.splice(i, 1);
        } else {
          return null;
        }
      });
      cart = JSON.stringify(cart);
      try {
        await AsyncStorage.setItem('@cart', cart).then(
          setRefresh(!refresh)
        );
      }
      catch (e) {
        alert("Could not add to your cart")
      }
    }
    return cart;
  } catch (e) {
    alert('Cart might be empty.')
  }
};

export const clearCart = () => {
  let cart = [];
  if (typeof window !== "undefined") {
    AsyncStorage.setItem('@cart', JSON.stringify(cart));
  }
}

export const createOrder = (createOrderData) => {
  console.log(createOrderData)
  return fetch(`https://selu383-fa21-p05-g03.azurewebsites.net/api/orders`, {
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