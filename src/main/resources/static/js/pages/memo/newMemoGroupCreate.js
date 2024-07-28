const title = document.querySelector("#createNewMemoGroupCenter #title");
const msgBoxElement = document.querySelector(
  "#createNewMemoGroupCenter .message-box"
);

const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

// 새로운 메모 그룹 생성 완료
document
  .querySelector("#createNewMemoGroupCenter #create-btn")
  .addEventListener("click", (event) => {
    event.preventDefault();

    if (!title.value) {
      msgBoxElement.textContent = "그룹 이름을 입력해주세요.";
      msgBoxElement.classList.add("error");
    } else if (["모든 메모", "모든메모"].includes(title.value)) {
      msgBoxElement.textContent = "모든 메모 그룹 이름을 명시할 수 없습니다.";
      msgBoxElement.classList.add("error");
    } else {
      msgBoxElement.textContent = "";
      msgBoxElement.classList.remove("error");

      fetch("/memo/group/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userNo: userInfo.no,
          title: title.value,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "DuplicateTitleExists") {
            msgBoxElement.textContent =
              "중복된 그룹명을 가진 그룹이 존재합니다.";
            msgBoxElement.classList.add("error");
          } else {
            location.reload();
          }
        });
    }
  });
