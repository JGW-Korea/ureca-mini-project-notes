import { findIdInputValueCheck } from "../../module/auth.js";

// 3. 아이디 찾기 버튼을 클릭했을 경우.

// 아이디 찾기에 필요한 태그들을 가져온다.
const findInputName = document.querySelector("#findUserIdModalCenter #name"); // 아이디를 찾기 위한 이름 입력 input 태그
const findInputId = document.querySelector("#findUserIdModalCenter #id"); // 아이디를 찾기 위한 이름 입력 input 태그
const msgBoxElement = document.querySelector(
  "#findUserIdModalCenter .message-box"
); // input 태그에 올바른 값을 입력하지 않았을 경우 에러 메세지 출력

document
  .querySelector("#findUserIdModalCenter #findId-btn")
  .addEventListener("click", (event) => {
    event.preventDefault();

    switch (findIdInputValueCheck(findInputId.value, findInputName.value)) {
      case "inputEmptyError":
        msgBoxElement.textContent = "입력란을 모두 작성해주세요.";
        msgBoxElement.classList.add("error");
        findInputId.focus();
        break;

      case "nameEmptyError": // 비밀번호만 입력하지 않았을 경우
        msgBoxElement.textContent = "이름을 작성해주세요.";
        msgBoxElement.classList.add("error");
        findInputName.focus();
        break;

      case "idEmptyError": // 아이디만 입력하지 않았을 경우
        msgBoxElement.textContent = "아이디를 작성해주세요.";
        msgBoxElement.classList.add("error");
        findInputId.focus();
        break;

      default: // 모두 올바르게 입력되었을 경우
        msgBoxElement.textContent = "";
        msgBoxElement.classList.remove("error");

        fetch("/user/find-id", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: findInputId.value,
            name: findInputName.value,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (["INVALID_ID_AND_NAME", "INVALID_NAME"].includes(data.status)) {
              msgBoxElement.classList.add("error");
              data.status === "INVALID_ID"
                ? (msgBoxElement.textContent = "존재하지 않는 아이디입니다.")
                : (msgBoxElement.textContent = "잘못된 이름을 작성했습니다.");
            } else {
              const $newSection = document.createElement("section");
              const $newHeader = document.createElement("h3");
              $newHeader.textContent = `${data.user.name} 사용자님의 정보`;
              $newSection.appendChild($newHeader);

              for (const key in data.user) {
                if (!["no", "name"].includes(key)) {
                  const $newDivision = document.createElement("div");
                  const $newSpanTitle = document.createElement("span");
                  const $newSpanDesc = document.createElement("span");

                  $newSpanTitle.textContent = key === "id" ? "id" : "password";
                  $newSpanDesc.textContent = data.user[key];

                  $newDivision.appendChild($newSpanTitle);
                  $newDivision.appendChild($newSpanDesc);
                  $newSection.appendChild($newDivision);
                }
              }

              msgBoxElement.appendChild($newSection);
            }
          });
    }
  });
