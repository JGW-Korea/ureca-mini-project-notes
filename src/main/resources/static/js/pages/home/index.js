import { auth } from "./auth.js";

if (auth()) {
  console.log("Hello");
}

document.querySelector("#asd").addEventListener("click", (event) => {
  event.preventDefault();

  console.log("hello");

  fetch("/auth/login-check")
    .then((res) => res.text())
    .then((data) => console.log(data));
});
