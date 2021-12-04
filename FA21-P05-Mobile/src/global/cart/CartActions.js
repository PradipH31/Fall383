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
      console.log(cart)
      cart = JSON.stringify(cart);
      try {
        await AsyncStorage.setItem('@cart', cart).then(console.log('aa'));
        try {
          const v = await AsyncStorage.getItem('@cart')
          console.log(v)
        }
        catch (e) {
          console.log(e)
        }
      }
      catch (e) {
        alert("Could not add to your cart")
      }
    } catch (e) {
      console.log(e)
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

export const removeItem = (itemId) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (AsyncStorage.getItem('@cart')) {
      cart = JSON.parse(AsyncStorage.getItem('@cart'));
    }
    cart.map((item, i) => {
      if (item.id === itemId) {
        return cart.splice(i, 1);
      } else {
        return null;
      }
    });
    AsyncStorage.setItem('@cart', JSON.stringify(cart));
  }
  return cart;
};

export const clearCart = () => {
  let cart = [];
  if (typeof window !== "undefined") {
    AsyncStorage.setItem('@cart', JSON.stringify(cart));
  }
}