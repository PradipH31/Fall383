export const signin = (user) => {
  return fetch(`api/authentication/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signup = (user) => {
  return fetch(`api/authentication/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const authenticate = (data, next) => {
  if (typeof window !== undefined) {
    const userInfo = JSON.stringify(data);
    localStorage.setItem("jwt", userInfo);
    next();
  }
};

export const signput = (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("jwt");
    next();
    return fetch(`api/authentication/logout`, {
      method: "GET",
    })
      .then((res) => {
        console.log("Successfully signed out", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
