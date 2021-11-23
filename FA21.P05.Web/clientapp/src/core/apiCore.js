export const getCategories = () => {
  return fetch(`/api/menu-categories`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const readCategoryById = (categoryId) => {
  return fetch(`/api/menu-categories/${categoryId}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const getAddOnCategory = () => {
  return fetch(`/api/addon-categories`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const createCategory = (category) => {
  return fetch(`/api/menu-categories`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createProduct = (food) => {
  return fetch(`api/menu-items`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: food,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const readProduct = (itemId) => {
  return fetch(`/api/menu-items/${itemId}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};
