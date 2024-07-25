import { auth } from "../../module/auth.js";

// 현재 해당 URL로 접근한 사용자가 로그인을 하지 않은 경우 메인 페이지로 돌려 보낸다.
if (!auth()) {
  location.href = "/";
}

document.querySelector("#logout-btn").addEventListener("click", () => {
  fetch("/user/logout", {
    method: "POST",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "Logout_Success") {
        sessionStorage.removeItem("userInfo");
        location.href = "/";
      }
    });
});
