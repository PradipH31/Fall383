export const getCategories = () => {
  return fetch(`api/menu-categories`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};
