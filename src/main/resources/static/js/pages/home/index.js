import { auth, inputCheck } from "./auth.js";

// 접속한 사용자가 현재 로그인 중이면, 메인 페이지가 아닌 메모 페이지로 이동시킨다.
if (auth()) {
  console.log("Hello");
}

// 접속한 사용자가 현재 로그인을 하지 않은 경우, 메인 페이지(로그인)를 그대로 보여준다.

// 1. 사용자가 로그인 버튼을 클릭했을 경우
document
  .querySelector(".login-container__card #login-btn")
  .addEventListener("click", (event) => {
    event.preventDefault();

    const inputId = document.querySelector(".login-container__card #id"); // 아이디 input 태그
    const inputPwd = document.querySelector(".login-container__card #password"); // 비밀번호 input 태그

    // 유효성 검사 에러 box 태그
    const errorMsgElement = document.querySelector(
      ".login-container__card .login-container__card--error"
    );

    switch (inputCheck(inputId.value, inputPwd.value)) {
      // 아이디와 비밀번호 모두 입력하지 않았을 경우
      case "inputEmptyError":
        errorMsgElement.textContent = "아이디와 비밀번호 모두 입력해주세요.";
        inputId.focus();
        break;

      case "idEmptyError": // 아이디만 입력하지 않았을 경우
        errorMsgElement.textContent = "아이디를 입력해주세요.";
        inputId.focus();
        break;

      case "passwordEmptyError": // 비밀번호만 입력하지 않았을 경우
        errorMsgElement.textContent = "비밀번호를 입력해주세요.";
        inputPwd.focus();
        break;

      default: // 모두 올바르게 입력되었을 경우
        errorMsgElement.textContent = "";
    }
  });
