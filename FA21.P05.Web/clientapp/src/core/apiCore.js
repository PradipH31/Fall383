export const getMenuItems = (sortBy) => {
  return fetch(`api/menu-items?sortBy=${sortBy}&order=desc&limit=6`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const getCategories = () => {
  return fetch(`api/categories`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};
