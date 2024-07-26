import { auth } from "../../module/auth.js";

// 현재 해당 URL로 접근한 사용자가 로그인을 하지 않은 경우 메인 페이지로 돌려 보낸다.
if (!auth()) {
  location.href = "/";
}

// 현재 로그인한 사용자의 세션 정보를 가져온다.
const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

const memoGroupContainer = document.querySelector(
  ".memo-container .memo-group-list"
);

const groupMemoList = document.querySelector(".memo-lists .memo-list");

// 로그인한 사용자의 모든 메모 그룹에 대해서 가져온다.
fetch(`/memo/group/findAll?no=${userInfo.no}`)
  .then((res) => res.json())
  .then((data) => {
    // 데이터 정보 : { userNo, groupNo, title }

    // 그룹 영역을 생성시킨다.
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
      $newFolderIcon.textContent = "folder";
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

      memoGroupContainer.appendChild($newListContainer);
    });

    // 각 그룹에 해당하는 모든 메모 데이터들을 가져온다.
    const promises = data.map((list, i) => {
      return fetch(`/memo/findAll?no=${list.groupNo}`)
        .then((res) => res.json())
        .then((listElement) => {
          listElement.forEach((item, j) => {
            console.log(item);
            const $newMemoItemContainer = document.createElement("div");
            $newMemoItemContainer.classList.add("memo-list-item-container");

            const $newGutter = document.createElement("div");
            $newGutter.classList.add("gutter");
            const $newContent = document.createElement("div");
            $newContent.classList.add("content");

            const $newTitle = document.createElement("div");
            $newTitle.classList.add("title");
            $newTitle.textContent = item.title;
            const $newSummary = document.createElement("div");
            $newSummary.classList.add("summary");
            const $newGroupListItem = document.createElement("div");
            $newGroupListItem.classList.add("group-list-items");

            const $newDate = document.createElement("div");
            $newDate.classList.add("date");
            const $newSnippet = document.createElement("div");
            $newSnippet.classList.add("snippet");
            $newSnippet.textContent = item.content;

            $newSummary.appendChild($newDate);
            $newSummary.appendChild($newSnippet);

            const $newFolderIcon = document.createElement("span");
            $newFolderIcon.classList.add("material-symbols-outlined");
            $newFolderIcon.classList.add("folder-icon");
            $newFolderIcon.textContent = "folder";

            const $newGroupTitle = document.createElement("span");
            $newGroupTitle.textContent = list.title;

            $newGroupListItem.appendChild($newFolderIcon);
            $newGroupListItem.appendChild($newGroupTitle);

            $newContent.appendChild($newTitle);
            $newContent.appendChild($newSummary);
            $newContent.appendChild($newGroupListItem);

            $newMemoItemContainer.appendChild($newGutter);
            $newMemoItemContainer.appendChild($newContent);
            $newMemoItemContainer.dataset.memoNo = item.memoNo;

            groupMemoList.appendChild($newMemoItemContainer);
          });
        });
    });

    // 모든 fetch 요청이 완료되면 첫 번째 요소에 'selected' 클래스를 추가한다.
    Promise.all(promises).then(() => {
      const firstItem = document.querySelector(".memo-list-item-container");
      if (firstItem) {
        firstItem.classList.add("selected");
      }
    });
  });
