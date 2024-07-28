import { updateUserInfoValueCheck } from "../../module/auth.js";

const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
const userName = document.querySelector("#updateUserInfoModalCenter #name");
const userId = document.querySelector("#updateUserInfoModalCenter #id");
const userPassword = document.querySelector(
  "#updateUserInfoModalCenter #password"
);
const userPasswordConfirm = document.querySelector(
  "#updateUserInfoModalCenter #password-confirm"
);

// 각 입력값에 대한 유효성 검사
const nameRegex = /^[가-힣A-Za-z]{3,14}$/;
const idRegex = /^[A-Za-z0-9]{4,20}$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;

// 유효성 검사에 통과되었는지 판단 여부
let updateInputNameFlag = false;
let updateInputIdFlag = false;
let updateInputPasswordFlag = false;
let updateInputPasswordConfirmFlag = false;

const msgBoxElement = document.querySelector(
  " #updateUserInfoModalCenter .message-box"
);

// 회원정보 수정 버튼을 클릭했을 경우
document
  .querySelector("header .updateUserInfoModal")
  .addEventListener("click", () => {
    // 아이디와 이름 input 폼에 기본값을 명시한다.
    userName.value = userInfo.name;
    userId.value = userInfo.id;
  });

// 사용자의 이름 input 태그가 포커스를 잃을 경우
userName.addEventListener("input", (event) => {
  if (nameRegex.test(event.target.value)) {
    updateInputNameFlag = true;
    msgBoxElement.textContent = "";
    msgBoxElement.classList.remove("error");
  } else {
    updateInputNameFlag = false;
    msgBoxElement.textContent =
      "입력하신 이름이 최소 3자에서 14자까지 한글, 영문 단어만 포함해야 합니다.";

    msgBoxElement.classList.add("error");
  }
});

// 사용자의 아이디 input 태그에 포커스를 잃었을 경우
userId.addEventListener("input", (event) => {
  if (idRegex.test(event.target.value)) {
    updateInputIdFlag = true;
    msgBoxElement.textContent = "";
    msgBoxElement.classList.remove("error");
  } else {
    updateInputIdFlag = false;
    msgBoxElement.textContent =
      "입력하신 아이디가 최소 4자에서 20자까지, 영문자, 숫자만 포함해야 합니다.";
    msgBoxElement.classList.add("error");
  }
});

// 사용자의 비밀번호 input 태그에 포커스를 잃었을 경우
userPassword.addEventListener("input", (event) => {
  if (passwordRegex.test(event.target.value)) {
    updateInputPasswordFlag = true;
    msgBoxElement.textContent = "";
    msgBoxElement.classList.remove("error");
  } else {
    updateInputPasswordFlag = false;
    msgBoxElement.textContent =
      "입력하신 비밀번호가 최소 8자에서 16자까지, 영문자, 숫자 및 특수 문자를 포함해야 합니다.";
    msgBoxElement.classList.add("error");
  }
});

// 사용자의 비밀번호 확인 input 태그에 포커스를 잃었을 경우
userPasswordConfirm.addEventListener("input", (event) => {
  if (passwordRegex.test(event.target.value)) {
    updateInputPasswordConfirmFlag = true;
    msgBoxElement.textContent = "";
    msgBoxElement.classList.remove("error");
  } else {
    updateInputPasswordConfirmFlag = false;
    msgBoxElement.textContent =
      "입력하신 비밀번호가 최소 8자에서 16자까지, 영문자, 숫자 및 특수 문자를 포함해야 합니다.";
    msgBoxElement.classList.add("error");
  }
});

// 회원정보 수정 버튼 클릭했을 경우
document
  .querySelector("#updateUserInfoModalCenter #updateUserInfo-btn")
  .addEventListener("click", (event) => {
    event.preventDefault();
  });
