export default {
  //to create an item
  postWallet: (username, money) => {
    return fetch("user/wallet", {
      method: "post",
      body: JSON.stringify(username, money),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((response) => {
      // you have to be authenticated to post an Item
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
    });
  },
  //to get the wallet data
  getWallet: () => {
    return fetch("user/walletMoney").then((response) => {
      //passport sends 401 error if you are unauthorized
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
    });
  },
};
