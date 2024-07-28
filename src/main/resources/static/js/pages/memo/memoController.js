const memoTitle = document.querySelector("#createNewMemoCenter #memoTitle");
const memoMsgBoxElement = document.querySelector(
  "#createNewMemoCenter .message-box"
);
// console.log(userInfo);

// 모든 메모 그룹 선택할 경우 메모장 선택 못하게 막기
document
  .querySelector(".memo-header-content .material-symbols-outlined:first-child")
  .addEventListener("click", (event) => {
    const selectedNumber = document.querySelector(
      ".memo-container .memo-group-list-item-row.selected"
    ).parentElement.dataset.groupNo;

    if (selectedNumber === "0") {
      event.currentTarget.dataset.target = "";
      alert("메모 그룹을 선택하고 메모장을 생성해주세요");
    } else {
      event.currentTarget.dataset.target = "#createNewMemoCenter";
    }
  });

// 메모 그룹 선택 이후 새로운 메모장 생성할 경우 발생하는 이벤트
document
  .querySelector("#createNewMemoCenter #create-memo-btn")
  .addEventListener("click", async (event) => {
    event.preventDefault();

    const selectedNumber = document.querySelector(
      ".memo-container .memo-group-list-item-row.selected"
    ).parentElement.dataset.groupNo;

    if (!memoTitle.value) {
      memoMsgBoxElement.textContent = "메모 이름을 입력해주세요.";
      memoMsgBoxElement.classList.add("error");
    } else {
      memoMsgBoxElement.textContent = "";
      memoMsgBoxElement.classList.remove("error");

      await fetch("/memo/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupNo: selectedNumber,
          title: memoTitle.value,
          content: '{"ops":[]}',
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "DuplicateTitleExists") {
            memoMsgBoxElement.textContent = "중복된 메모장이 존재합니다.";
            memoMsgBoxElement.classList.add("error");
          } else {
            memoMsgBoxElement.textContent = "";
            memoMsgBoxElement.classList.remove("error");

            location.reload();
          }
        });
    }
  });

// 메모 그룹 선택 이후 삭제 버튼을 누르는 경우
document
  .querySelector(".memo-header-content #deleteMemo")
  .addEventListener("click", () => {
    const currentSelectedMemo = document.querySelector(
      ".memo-list-contents .memo-list .memo-list-item-container.selected"
    );

    fetch("/memo/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupNo: currentSelectedMemo.dataset.groupNo,
        memoNo: currentSelectedMemo.dataset.memoNo,
      }),
    })
      .then((res) => res.text())
      .then((data) => {
        if (Number(data) > 0) location.reload();
      });
  });
