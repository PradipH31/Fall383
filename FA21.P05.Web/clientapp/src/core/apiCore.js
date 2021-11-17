export const getCategories = () => {
  return fetch(`api/menu-categories`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const createCategory = (category) => {
  return fetch(`api/menu-categories`, {
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
