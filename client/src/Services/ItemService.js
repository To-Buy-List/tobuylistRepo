export default {
  //to get all of the items
  getItems: () => {
    return fetch("user/items").then((response) => {
      //passport sends 401 error if you are unauthorized
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
    });
  },
  //to create an item
  postItem: (item) => {
    return fetch("user/item", {
      method: "post",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      // you have to be authenticated to post an Item
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
    });
  },
  //to delete an item
  deleteItem: (id) => {
    return fetch("user/deleteItem", {
      method: "POST",
      body: JSON.stringify({ id: id }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      // you have to be authenticated to post an Item
      if (response.status !== 401) {
        return response.json();
      } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
    });
  },
  //to update bought field to true
  postBought: (id) => {
    return fetch("user/listBought", {
      method: "post",
      body: JSON.stringify({ _id: id }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      // you have to be authenticated to post an Item
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
    });
  },
  //to update reminder field with a date and time
  postReminder: (id, newReminder) => {
    return fetch("user/reminder", {
      method: "post",
      body: JSON.stringify({ _id: id, reminder: newReminder }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      // you have to be authenticated to post an Item
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
    });
  },
};
