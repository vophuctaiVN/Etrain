import crypto from "crypto";
import React from "react";
import ReactDOM from "react-dom";

export const DOMAIN = "http://etrain.ddns.net:5000";
export const USER_IMAGE_DOMAIN = "http://etrain.ddns.net:5000/userImage";

export default async function getWord(keyword) {
  let dataget = { sentences: null, youtubeinfo: null };
  await window
    .TraCauQuery({
      keyword,
    })
    .then((response) => {
      dataget = response;
    })
    .catch((error) => console.log(error));
  return dataget;
}

export function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getRandomProducts(products) {
  if (products) {
    if (0 === products.length) return [];
    const randIndexs = [];
    const randProducts = [];
    const numberOfIndexs = getRndInteger(4, 6);
    for (let index = 0; index < numberOfIndexs; index++) {
      let rndIndex = getRndInteger(0, products.length - 1);
      while (0 <= randIndexs.indexOf(rndIndex))
        rndIndex = getRndInteger(0, products.length - 1);
      randIndexs.push(rndIndex);
      randProducts.push(products[rndIndex]);
    }
    return randProducts;
  } else return [];
}

export function showAlert(message, detail) {
  const value = (
    <>
      <strong class="text-danger">{message}</strong> {detail}
    </>
  );
  const alert = document.getElementById("alert");
  ReactDOM.render(value, alert);
  alert.classList.remove("d-none");
  setTimeout(() => alert.classList.add("d-none"), 4000);
}

export function hashToSHA1(string) {
  const shaEncoder = crypto.createHash("sha1");
  shaEncoder.update(string);
  const sha1String = shaEncoder.digest("hex");
  return sha1String;
}

export function getCookiesValue(key) {
  var equalities = document.cookie.split("; ");
  for (var i = 0; i < equalities.length; i++) {
    if (!equalities[i]) continue;
    var splitted = equalities[i].split("=");
    if (splitted.length !== 2) continue;
    if (decodeURIComponent(splitted[0]) === key)
      if (splitted[1]) return decodeURIComponent(splitted[1]);
  }
  return null;
}

export function setCookiesValue(key, value) {
  if (!key) return;
  var cookieValue = encodeURIComponent(key) + "=";
  if (value) cookieValue = cookieValue + encodeURIComponent(value);
  document.cookie = cookieValue + "; path=/";
}

export async function getUserInfo() {
  const queryObj = {
    userid: getCookiesValue("userID"),
  };
  let userInfo;
  await window
    .UserInfo_Query(queryObj)
    .then((result) => (userInfo = result.json.result.items[0]))
    .catch((error) => console.log(error));
  return userInfo;
}

export async function isLogin() {
  let isLogin = false;
  await window
    .AccountAPIsService_CheckAuth(getCookiesValue("authToken"))
    .then(() => (isLogin = true))
    .catch((error) => (isLogin = false));
  return isLogin;
}
