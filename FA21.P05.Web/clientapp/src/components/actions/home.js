export const getMenuItems = () => {
  return fetch(`api/menu-items`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};
