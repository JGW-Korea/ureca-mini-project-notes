import { registerInputValueCheck } from "../../module/auth.js";

// 메인 페이지(회원가입)에 대한 JavaScript 코드

// input 태그들을 가져온다.
const registerInputName = document.querySelector("#registerModalCenter #name");
const registerInputId = document.querySelector("#registerModalCenter #id");
const registerInputPassword = document.querySelector(
  "#registerModalCenter #password"
);
const errorMsgElement = document.querySelector(
  "#registerModalCenter .error-message-box"
);

let registerInputNameFlag = false;
let registerInputIdFlag = false;
let registerInputPasswordFlag = false;

// 각 입력값에 대한 유효성 검사
const nameRegex = /^[가-힣A-Za-z]{3,14}$/;
const idRegex = /^[A-Za-z0-9]{4,20}$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;

// 이름 input 태그에 포커스를 잃었을 경우
registerInputName.addEventListener("input", (event) => {
  if (nameRegex.test(event.target.value)) {
    registerInputNameFlag = true;
    errorMsgElement.textContent = "";
  } else {
    registerInputNameFlag = false;
    errorMsgElement.textContent =
      "입력하신 이름이 최소 3자에서 14자까지 한글, 영문 단어만 포함해야 합니다.";
  }
});

// 아이디 input 태그에 포커스를 잃었을 경우
registerInputId.addEventListener("input", (event) => {
  if (idRegex.test(event.target.value)) {
    registerInputIdFlag = true;
    errorMsgElement.textContent = "";
  } else {
    registerInputIdFlag = false;
    errorMsgElement.textContent =
      "입력하신 아이디가 최소 4자에서 20자까지, 영문자, 숫자만 포함해야 합니다.";
  }
});

// 비밀번호 input 태그에 포커스를 잃었을 경우
registerInputPassword.addEventListener("input", (event) => {
  if (passwordRegex.test(event.target.value)) {
    registerInputPasswordFlag = true;
    errorMsgElement.textContent = "";
  } else {
    registerInputPasswordFlag = false;
    errorMsgElement.textContent =
      "입력하신 비밀번호가 최소 8자에서 16자까지, 영문자, 숫자 및 특수 문자를 포함해야 합니다.";
  }
});

// 2. 회원가입 버튼을 눌렀을경우
document
  .querySelector("#registerModalCenter #register-btn")
  .addEventListener("click", (event) => {
    event.preventDefault();

    // 회원가입 input 태그에 입력한 값들에 대해 유효성 검사를 진행한다.
    switch (
      registerInputValueCheck(
        registerInputId.value,
        registerInputPassword.value,
        registerInputName.value
      )
    ) {
      // 모든 input 태그에 입력값이 들어가 있지 않은 경우
      case "inputEmptyError":
        errorMsgElement.textContent = "입력란을 모두 작성해주세요.";
        registerInputName.focus();
        break;

      // 이름 input 태그에 입력값이 들어가 있지 않은 경우
      case "nameValueEmpty":
        errorMsgElement.textContent = "이름을 작성해주세요.";
        registerInputName.focus();
        break;

      // 아이디 input 태그에 입력값이 들어가 있지 않은 경우
      case "idValueEmpty":
        errorMsgElement.textContent = "아이디를 작성해주세요.";
        registerInputId.focus();
        break;

      // 비밀번호 input 태그에 입력값이 들어가 있지 않은 경우
      case "passwordValueEmpty":
        errorMsgElement.textContent = "비밀번호를 작성해주세요.";
        registerInputPassword.focus();
        break;

      // 모든 input 태그에 올바른 값이 들어와 있는 경우
      default:
        errorMsgElement.textContent = "";

        if (nameRegex && idRegex && passwordRegex) {
          fetch("/user/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: registerInputName.value,
              id: registerInputId.value,
              password: registerInputPassword.value,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.status === "DuplicateIdExists") {
                errorMsgElement.textContent = "중복된 아이디가 존재합니다.";
                registerInputId.focus();
              } else {
                location.href = "/";
              }
            });
        }
    }
  });
