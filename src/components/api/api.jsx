/* eslint-disable prettier/prettier */
// import fetch from "node-fetch";
// const md5 = require("md5");
import md5 from "md5";

const url = "http://api.valantis.store:40000/";
const password = "Valantis";
const date = new Date();
const headers = {
  Accept: "application/json",
  "content-type": "application/json; charset=UTF-8",
  "X-Auth": md5(
    `${password}_${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`,
  ),
};

export function getProducts(action, params) {
  const requestData = {
    action,
    params,
  };

  return fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(requestData),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      console.log(res.status);
      return res.status;
    })
    .then((data) => {
      if (data.result) {
        return data.result;
      }
      return console.log(data);
    });
}
