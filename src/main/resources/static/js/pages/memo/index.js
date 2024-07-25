import { auth } from "../../module/auth.js";

// 현재 해당 URL로 접근한 사용자가 로그인을 하지 않은 경우 메인 페이지로 돌려 보낸다.
if (!auth()) {
  location.href = "/";
}

// 현재 로그인한 사용자의 세션 정보를 가져온다.
const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

const containerElement = document.querySelector(".memo-container");

// 로그인한 사용자의 모든 메모 그룹에 대해서 가져온다.
fetch(`/memo/group/findAll?no=${userInfo.no}`)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((element) => {
      const $newGroupDivision = document.createElement("div");

      const $newIconDivision = document.createElement("div");
      const $newTitleDivision = document.createElement("span");

      $newIconDivision.classList.add("material-symbols-outlined");
      $newIconDivision.textContent = "folder";
      $newTitleDivision.textContent = element.title;

      $newGroupDivision.appendChild($newIconDivision);
      $newGroupDivision.appendChild($newTitleDivision);

      containerElement.appendChild($newGroupDivision);
    });
  });
