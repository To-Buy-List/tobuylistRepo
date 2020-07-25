export default {
  //to get all of the items
  getItems: () => {
    return fetch("user/items").then((response) => {
      //passport sends 401 error if you are unauthorized
      if (response.status != 401) {
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
};