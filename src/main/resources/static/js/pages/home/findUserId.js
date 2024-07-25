import { findIdInputValueCheck } from "../../module/auth.js";

// 3. 아이디 찾기 버튼을 클릭했을 경우.

// 아이디 찾기에 필요한 태그들을 가져온다.
const findInputName = document.querySelector("#findUserIdModalCenter #name"); // 아이디를 찾기 위한 이름 입력 input 태그
const msgBoxElement = document.querySelector(
  "#findUserIdModalCenter .message-box"
); // input 태그에 올바른 값을 입력하지 않았을 경우 에러 메세지 출력

document
  .querySelector("#findUserIdModalCenter #findId-btn")
  .addEventListener("click", (event) => {
    event.preventDefault();

    if (!findInputName.value) {
      msgBoxElement.textContent = "이름을 작성해주세요.";
      msgBoxElement.classList.add("error");
      findInputName.focus();
    } else {
      msgBoxElement.textContent = "";
      msgBoxElement.classList.remove("error");

      fetch(`/user/find-id?name=${findInputName.value}`, { method: "POST" })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "INVALID_NAME") {
            msgBoxElement.classList.add("error");
            msgBoxElement.textContent = "존재하지 않는 이름입니다.";
          } else {
            const $newSection = document.createElement("section");

            for (const key in data.user) {
              if (!["no", "name"].includes(key)) {
                const $newDivision = document.createElement("div");
                const $newSpanTitle = document.createElement("span");
                const $newSpanDesc = document.createElement("span");

                $newSpanTitle.textContent =
                  key === "id" ? "아이디: " : "비밀번호: ";
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
