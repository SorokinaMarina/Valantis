import md5 from "md5";

const url = "https://api.valantis.store:41000/";
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

      return res.status;
    })
    .then((data) => {
      if (data.result) {
        return data.result;
      }

      return data;
    });
}
