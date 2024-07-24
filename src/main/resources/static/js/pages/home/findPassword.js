import { updatePasswordCheck } from "../../../js/module/auth.js";

let userInfo; // 비밀번호를 바꾸기 위해서는 Where절이 필요하기 때문에 User의 정보를 가져와야 한다.

// 비밀번호를 바꿀 아이디를 찾기 위한 로직
document
  .querySelector(".id-check [type='submit']")
  .addEventListener("click", (event) => {
    event.preventDefault();

    const inputId = document.querySelector(".id-check #id");

    const errorMsgElement = document.querySelector(".id-error-box");

    if (!inputId.value) {
      errorMsgElement.textContent = "찾고자 하는 아이디를 입력해주세요.";
    } else {
      errorMsgElement.textContent = "";

      fetch(`/user/find-password/compare-id?id=${inputId.value}`, {
        method: "POST",
      })
        .then((res) => res.text())
        .then((data) => {
          const check = Number(data);
          userInfo = inputId.value;

          if (check <= 0) {
            errorMsgElement.textContent = "존재하지 않는 아이디입니다.";
          } else {
            errorMsgElement.textContent = "";

            const passwordUpdateForm =
              document.querySelector(".password-update");
            passwordUpdateForm.querySelector("#password").disabled = false;
            passwordUpdateForm.querySelector("#password").focus();
            passwordUpdateForm.querySelector(
              "#password-confirm"
            ).disabled = false;
          }
        });
    }
  });

// 수정할 비밀번호를 입력했을 경우
document
  .querySelector(".password-update [type='submit']")
  .addEventListener("click", (event) => {
    event.preventDefault();

    const updatePassword = document.querySelector(".password-update #password");
    const updatePasswordConfirm = document.querySelector(
      ".password-update #password-confirm"
    );

    const errorMsgElement = document.querySelector(
      ".password-update-error-box"
    );

    switch (
      updatePasswordCheck(updatePassword.value, updatePasswordConfirm.value)
    ) {
      case "inputEmptyError":
        errorMsgElement.textContent = "비밀번호 입력창 모두 입력해주세요.";
        updatePassword.focus();
        break;

      case "passwordEmptyError":
        errorMsgElement.textContent = "수정하고 싶은 비밀번호를 입력해주세요.";
        updatePassword.focus();
        break;

      case "regexNotMatchError":
        errorMsgElement.textContent =
          "비밀번호는 최소 8자에서 16자까지, 영문자, 숫자 및 특수 문자를 포함해야 합니다.";
        updatePassword.focus();
        break;

      case "confimPasswordEmptyError":
        errorMsgElement.textContent = "비밀번호 확인란을 입력해주세요.";
        updatePasswordConfirm.focus();
        break;

      case "passwordDoNotMatchError":
        errorMsgElement.textContent = "동일한 비밀번호를 입력해야 합니다.";
        updatePasswordConfirm.focus();
        break;

      default:
        errorMsgElement.textContent = "";

        fetch(
          `/user/find-password/update-password?password=${updatePassword.value}&user=${userInfo}`,
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
