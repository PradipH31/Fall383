export const getMenuItems = () => {
  return fetch(`api/menu-items`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const createMenuItems = (token, item) => {
  return fetch(`api/menu-items`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: item,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const getMenuItem = (itemId) => {
  return fetch(`api/menu-items/${itemId}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateMenuItem = (itemId, token, item) => {
  return fetch(`api/menu-items/${itemId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: item,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const deleteMenuItem = (itemId, token) => {
  return fetch(`api/menu-items/${itemId}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const getSpecialItems = () => {
  return fetch(`api/menu-items/specials`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};
