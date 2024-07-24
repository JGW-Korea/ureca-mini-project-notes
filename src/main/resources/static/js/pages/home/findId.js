import { findIdInputValueCheck } from "../../module/auth.js";

// 2. 아이디 찾기 버튼을 클릭했을 경우.
document
  .querySelector(".name-check #name-check-btn")
  .addEventListener("click", (event) => {
    event.preventDefault();

    const inputId = document.querySelector(".name-check #id"); // 아이디를 찾기 위한 이름 입력 input 태그
    const inputName = document.querySelector(".name-check #name"); // 아이디를 찾기 위한 이름 입력 input 태그
    const errorMsgElement = document.querySelector(".name--error"); // input 태그에 올바른 값을 입력하지 않았을 경우 에러 메세지 출력

    switch (findIdInputValueCheck(inputId.value, inputName.value)) {
      case "inputEmptyError":
        errorMsgElement.textContent = "아이디와 이름 모두 입력해주세요.";
        inputId.focus();
        break;

      case "idEmptyError": // 아이디만 입력하지 않았을 경우
        errorMsgElement.textContent = "아이디를 입력해주세요.";
        inputId.focus();
        break;

      case "nameEmptyError": // 비밀번호만 입력하지 않았을 경우
        errorMsgElement.textContent = "이름을 입력해주세요.";
        inputName.focus();
        break;

      default: // 모두 올바르게 입력되었을 경우
        errorMsgElement.textContent = "";

        fetch("/user/find-id", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: inputId.value,
            name: inputName.value,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (["INVALID_ID_AND_NAME", "INVALID_NAME"].includes(data.status)) {
              data.status === "INVALID_ID"
                ? (errorMsgElement.textContent = "존재하지 않는 아이디입니다.")
                : (errorMsgElement.textContent = "잘못된 이름을 작성했습니다.");
            } else {
              const $newSection = document.createElement("section");
              const $newUl = document.createElement("ul");

              $newSection.appendChild($newUl);
              console.log(data);
              for (const key in data.user) {
                if (key !== "no") {
                  const $el = document.createElement("li");
                  $el.textContent = `${key} : ${data.user[key]}`;
                  $newUl.appendChild($el);
                }
              }

              document.querySelector("body").appendChild($newSection);
            }
          });
    }
  });