import { auth } from "../../module/auth.js";

// 현재 해당 URL로 접근한 사용자가 로그인을 하지 않은 경우 메인 페이지로 돌려 보낸다.
if (!auth()) {
  location.href = "/";
}

// 현재 로그인한 사용자의 세션 정보를 가져온다.
const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

const containerElement = document.querySelector(
  ".memo-container .memo-group-list"
);

// // 로그인한 사용자의 모든 메모 그룹에 대해서 가져온다.
fetch(`/memo/group/findAll?no=${userInfo.no}`)
  .then((res) => res.json())
  .then((data) => {
    // 각 그룹에 해당하는 모든 메모 데이터들을 가져온다.

    // 데이터 정보 : { userNo, groupNo, title }
    data.forEach((element) => {
      const $newListContainer = document.createElement("div");
      $newListContainer.classList.add("memo-group-list-item-container");

      const $newListItemRow = document.createElement("div");
      $newListItemRow.classList.add("memo-group-list-item-row");

      const $newDiviser = document.createElement("div");
      $newDiviser.classList.add("chevron");
      const $newListSelectButton = document.createElement("div");
      $newListSelectButton.classList.add("memo-group-title-select-button");

      const $newFolderIcon = document.createElement("span");
      $newFolderIcon.textContent = "folder_open";
      $newFolderIcon.classList.add("material-symbols-outlined");
      $newFolderIcon.classList.add("folder-icon");

      const $newFolderTitle = document.createElement("span");
      $newFolderTitle.textContent = element.title;
      $newFolderTitle.classList.add("folder-title");

      $newListSelectButton.appendChild($newFolderIcon);
      $newListSelectButton.appendChild($newFolderTitle);

      $newListItemRow.appendChild($newDiviser);
      $newListItemRow.appendChild($newListSelectButton);

      $newListContainer.appendChild($newListItemRow);
      $newListContainer.dataset.groupNo = element.groupNo;

      containerElement.appendChild($newListContainer);
    });
  });
