import { registerInputValueCheck } from "../../module/auth.js";

// 회원가입 버튼을 눌렀을때 발생하는 이벤트
document
  .querySelector(".register-form input[type='submit']")
  .addEventListener("click", (event) => {
    event.preventDefault();

    // input 태그들을 가져온다.
    const inputId = document.querySelector(".register-form #id");
    const inputPassword = document.querySelector(".register-form #password");
    const inputName = document.querySelector(".register-form #name");
    const errorBox = document.querySelector(".register-error");

    // Switch 조건문을 통해 각 유효성 검사를 실시한다.
    switch (
      registerInputValueCheck(
        inputId.value,
        inputPassword.value,
        inputName.value
      )
    ) {
      case "inputEmptyError":
        errorBox.textContent = "입력란을 모두 작성해주세요.";
        inputName.focus();
        break;

      case "nameValueEmpty":
        errorBox.textContent = "이름을 작성해주세요.";
        inputName.focus();
        break;

      case "idValueEmpty":
        errorBox.textContent = "아이디를 작성해주세요.";
        inputId.focus();
        break;

      case "passwordValueEmpty":
        errorBox.textContent = "비밀번호를 작성해주세요.";
        inputPassword.focus();
        break;

      // 모든 유효성 검사에 걸리지 않았을 경우 회원가입을 실시한다.
      default:
        errorBox.textContent = "";

        const nameRegex = /^[가-힣A-Za-z]{3,14}$/;
        const idRegex = /^[A-Za-z0-9]{4,20}$/;
        const passwordRegex =
          /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;

        if (!nameRegex.test(inputName.value)) {
          errorBox.textContent =
            "입력하신 이름이 최소 3자에서 14자까지 한글과 영문만 포함해야 합니다.";
          inputName.focus();
        } else if (!idRegex.test(inputId.value)) {
          errorBox.textContent =
            "입력하신 아이디가 최소 4자에서 20자까지, 영문자, 숫자만 포함해야 합니다.";
          inputId.focus();
        } else if (!passwordRegex.test(inputPassword.value)) {
          errorBox.textContent =
            "입력하신 비밀번호가 최소 8자에서 16자까지, 영문자, 숫자 및 특수 문자를 포함해야 합니다.";
          inputPassword.focus();
        } else {
          fetch("/user/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: inputName.value,
              id: inputId.value,
              password: inputPassword.value,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.status === "DuplicateIdExists") {
                errorBox.textContent = "중복된 아이디가 존재합니다.";
                inputId.focus();
              } else {
                location.href = "/";
              }
            });
        }
    }
  });
