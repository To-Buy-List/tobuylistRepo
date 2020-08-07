export default {
  signin: (user) => {
    return fetch("/user/signin", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else return { isAuthenticated: false, user: { username: "" } };
    });
  },
  signup: (user) => {
    return fetch("/user/signup", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  },
  signout: () => {
    return fetch("user/signout")
      .then((res) => res.json())
      .then((data) => data);
  },
  //to sync backend with frontend
  isAuthenticated: () => {
    //if you are not authenticated passport automatically send 401 err
    return fetch("user/authenticated").then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else return { isAuthenticated: false, user: { username: "" } };
    });
  },
};

//this file contain fetch requests  to our endpoints >> to seperate concerns
//to avoid storing everything within our component
