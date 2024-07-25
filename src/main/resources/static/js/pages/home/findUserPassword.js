import { updatePasswordCheck } from "../../module/auth.js";

let userInfo; // 비밀번호를 수정할 아이디 정보를 저장한다.
let findInputPasswordFlag = false;
let findInputPasswordConfirmFlag = false;

// 비밀번호 찾기에 필요한 태그들을 가져온다.
const findInputId = document.querySelector("#findUserPasswordModalCenter #id");

const findInputPassword = document.querySelector(
  "#findUserPasswordModalCenter #password"
);
const findInputPasswordConfirm = document.querySelector(
  "#findUserPasswordModalCenter #password-confirm"
);
const findSubmitUpdatePassword = document.querySelector(
  "#findUserPasswordModalCenter #updateUserPassword-btn"
);

const msgBoxElement = document.querySelector(
  "#findUserPasswordModalCenter .message-box"
);

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;

// 비밀번호 수정에 대한 유효성 검사를 진행한다.
findInputPassword.addEventListener("input", (event) => {
  if (passwordRegex.test(event.target.value)) {
    findInputPasswordFlag = true;
    msgBoxElement.classList.remove("error");
    msgBoxElement.textContent = "";
  } else {
    findInputPasswordFlag = false;
    msgBoxElement.classList.add("error");
    msgBoxElement.textContent =
      "수정하고 싶은 비밀번호는 최소 8자에서 16자까지, 영문자, 숫자 및 특수 문자를 포함해야 합니다.";
  }
});

// 비밀번호 확인에 대한 유효성 검사를 진행한다.
findInputPasswordConfirm.addEventListener("input", (event) => {
  if (passwordRegex.test(event.target.value)) {
    findInputPasswordConfirmFlag = true;
    msgBoxElement.classList.remove("error");
    msgBoxElement.textContent = "";
  } else {
    findInputPasswordConfirmFlag = false;
    msgBoxElement.classList.add("error");
    msgBoxElement.textContent =
      "수정하고 싶은 비밀번호는 최소 8자에서 16자까지, 영문자, 숫자 및 특수 문자를 포함해야 합니다.";
  }
});

// 비밀번호를 바꿀 아이디를 찾기 위한 로직
document
  .querySelector("#findUserPasswordModalCenter #searchUserInfo-btn")
  .addEventListener("click", (event) => {
    event.preventDefault();

    if (!findInputId.value) {
      msgBoxElement.textContent = "아이디를 입력해주세요.";
      msgBoxElement.classList.add("error");
      findInputId.focus();
    } else {
      msgBoxElement.textContent = "";
      msgBoxElement.classList.remove("error");

      fetch(`/user/find-password/compare-id?id=${findInputId.value}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "INVALID_ID") {
            msgBoxElement.textContent = "존재하지 않는 아이디입니다.";
            msgBoxElement.classList.add("error");
            findInputId.focus();
          } else {
            userInfo = data.user;
            msgBoxElement.textContent = "";
            msgBoxElement.classList.remove("error");
            findInputPassword.disabled = false;
            findInputPasswordConfirm.disabled = false;
            findSubmitUpdatePassword.disabled = false;
            findInputPassword.focus();
          }
        });
    }
  });

// 수정할 비밀번호를 입력했을 경우
document
  .querySelector("#findUserPasswordModalCenter #updateUserPassword-btn")
  .addEventListener("click", (event) => {
    event.preventDefault();

    switch (
      updatePasswordCheck(
        findInputPassword.value,
        findInputPasswordConfirm.value
      )
    ) {
      case "inputEmptyError":
        msgBoxElement.textContent = "비밀번호 입력란 모두 입력해주세요.";
        msgBoxElement.classList.add("error");
        findInputPassword.focus();
        break;

      case "passwordEmptyError":
        msgBoxElement.textContent = "새로운 비밀번호를 입력해주세요.";
        msgBoxElement.classList.add("error");
        findInputPassword.focus();
        break;

      case "confimPasswordEmptyError":
        msgBoxElement.textContent = "새로운 비밀번호 확인 부분을 입력해주세요.";
        msgBoxElement.classList.add("error");
        findInputPasswordConfirm.focus();
        break;

      case "passwordDoNotMatchError":
        msgBoxElement.textContent = "비밀번호가 일치하지 않습니다. ";
        msgBoxElement.classList.add("error");
        findInputPasswordConfirm.focus();
        break;

      default:
        msgBoxElement.textContent = "";
        msgBoxElement.classList.remove("error");
        fetch(
          `/user/find-password/update-password?password=${findInputPassword.value}&user=${userInfo.id}`,
          {
            method: "POST",
          }
        )
          .then((res) => res.text())
          .then((data) => {
            location.href = "/";
          });
    }
  });
