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

const groupMemoList = document.querySelector(".memo-container .memo-list");
const $memoListAll = [];

// 메모 그룹을 가져오는 비동기 작업
async function fetchMemoGroups(userNo) {
  const response = await fetch(`/memo/group/findAll?no=${userNo}`);
  const data = await response.json();
  return data;
}

async function fetchMemos(groupNo) {
  const response = await fetch(`/memo/findAll?no=${groupNo}`);
  const data = await response.json();
  return data;
}

async function handleMemoGroups() {
  const data = await fetchMemoGroups(userInfo.no);

  for (const element of data) {
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

    const memos = await fetchMemos(element.groupNo);
    memos.forEach((memo) => {
      const $newMemoItemContainer = document.createElement("div");
      $newMemoItemContainer.classList.add("memo-list-item-container");

      const $newGutter = document.createElement("div");
      $newGutter.classList.add("gutter");
      const $newContent = document.createElement("div");
      $newContent.classList.add("content");

      const $newTitle = document.createElement("div");
      $newTitle.classList.add("title");
      $newTitle.textContent = memo.title;
      const $newSummary = document.createElement("div");
      $newSummary.classList.add("summary");
      const $newGroupListItem = document.createElement("div");
      $newGroupListItem.classList.add("group-list-items");

      const $newDate = document.createElement("div");
      $newDate.classList.add("date");
      const $newSnippet = document.createElement("div");
      $newSnippet.classList.add("snippet");
      $newSnippet.textContent = memo.content;

      $newSummary.appendChild($newDate);
      $newSummary.appendChild($newSnippet);

      const $newFolderIcon = document.createElement("span");
      $newFolderIcon.classList.add("material-symbols-outlined");
      $newFolderIcon.classList.add("folder-icon");
      $newFolderIcon.textContent = "folder";

      const $newGroupTitle = document.createElement("span");
      $newGroupTitle.textContent = element.title;

      $newGroupListItem.appendChild($newFolderIcon);
      $newGroupListItem.appendChild($newGroupTitle);

      $newContent.appendChild($newTitle);
      $newContent.appendChild($newSummary);
      $newContent.appendChild($newGroupListItem);

      $newMemoItemContainer.appendChild($newGutter);
      $newMemoItemContainer.appendChild($newContent);
      $newMemoItemContainer.dataset.memoNo = memo.memoNo;

      $memoListAll.push($newMemoItemContainer);
      groupMemoList.appendChild($newMemoItemContainer);
    });

    document
      .querySelectorAll(".memo-container .memo-list-item-container")[0]
      .classList.add("selected");
  }

  let seletedMemoGroup;
  let seletedMemo;

  document
    .querySelectorAll(".memo-container .memo-group-list-item-container")
    .forEach((item) => {
      if (item.children[0].classList.contains("selected")) {
        seletedMemoGroup = item;
      }

      item.addEventListener("click", async (event) => {
        if (seletedMemoGroup) {
          seletedMemoGroup.children[0].classList.remove("selected");
        }

        event.currentTarget.children[0].classList.add("selected");
        seletedMemoGroup = event.currentTarget;

        // 기존에 있던 리스트들을 삭제 시킨다.
        if (groupMemoList.children.length) groupMemoList.textContent = "";

        const groupNo = event.currentTarget.dataset.groupNo;

        if (groupNo === "0")
          $memoListAll.forEach((list) => groupMemoList.appendChild(list));
        else {
          const memos = await fetchMemos(groupNo);

          memos.forEach((memo, idx) => {
            const $newMemoItemContainer = document.createElement("div");
            $newMemoItemContainer.classList.add("memo-list-item-container");

            if (idx === 0) $newMemoItemContainer.classList.add("selected");

            const $newGutter = document.createElement("div");
            $newGutter.classList.add("gutter");
            const $newContent = document.createElement("div");
            $newContent.classList.add("content");

            const $newTitle = document.createElement("div");
            $newTitle.classList.add("title");
            $newTitle.textContent = memo.title;
            const $newSummary = document.createElement("div");
            $newSummary.classList.add("summary");

            const $newDate = document.createElement("div");
            $newDate.classList.add("date");
            const $newSnippet = document.createElement("div");
            $newSnippet.classList.add("snippet");
            $newSnippet.textContent = memo.content;

            $newSummary.appendChild($newDate);
            $newSummary.appendChild($newSnippet);

            $newContent.appendChild($newTitle);
            $newContent.appendChild($newSummary);

            $newMemoItemContainer.appendChild($newGutter);
            $newMemoItemContainer.appendChild($newContent);
            $newMemoItemContainer.dataset.memoNo = memo.memoNo;

            groupMemoList.appendChild($newMemoItemContainer);
          });

          document
            .querySelectorAll(".memo-container .memo-list-item-container")
            .forEach((memo) => {
              if (memo.classList.contains("selected")) {
                seletedMemo = memo;
              }

              memo.addEventListener("click", (event) => {
                if (seletedMemo) seletedMemo.classList.remove("selected");

                event.currentTarget.classList.add("selected");
                seletedMemo = event.currentTarget;
              });
            });
        }
      });
    });

  document
    .querySelectorAll(".memo-container .memo-list-item-container")
    .forEach((memo) => {
      if (memo.classList.contains("selected")) {
        seletedMemo = memo;
      }

      memo.addEventListener("click", (event) => {
        if (seletedMemo) seletedMemo.classList.remove("selected");

        event.currentTarget.classList.add("selected");
        seletedMemo = event.currentTarget;
      });
    });
}

handleMemoGroups();

// fetchMemoGroups(userInfo.no).then(async (data) => {
//   // 데이터 정보 : { userNo, groupNo, title }
//   await data.forEach((element) => {
//     const $newListContainer = document.createElement("div");
//     $newListContainer.classList.add("memo-group-list-item-container");

//     const $newListItemRow = document.createElement("div");
//     $newListItemRow.classList.add("memo-group-list-item-row");

//     const $newDiviser = document.createElement("div");
//     $newDiviser.classList.add("chevron");
//     const $newListSelectButton = document.createElement("div");
//     $newListSelectButton.classList.add("memo-group-title-select-button");

//     const $newFolderIcon = document.createElement("span");
//     $newFolderIcon.textContent = "folder";
//     $newFolderIcon.classList.add("material-symbols-outlined");
//     $newFolderIcon.classList.add("folder-icon");

//     const $newFolderTitle = document.createElement("span");
//     $newFolderTitle.textContent = element.title;
//     $newFolderTitle.classList.add("folder-title");

//     $newListSelectButton.appendChild($newFolderIcon);
//     $newListSelectButton.appendChild($newFolderTitle);

//     $newListItemRow.appendChild($newDiviser);
//     $newListItemRow.appendChild($newListSelectButton);

//     $newListContainer.appendChild($newListItemRow);
//     $newListContainer.dataset.groupNo = element.groupNo;

//     memoGroupContainer.appendChild($newListContainer);
//   });
// });

// console.log(
//   document.querySelectorAll(".memo-container .memo-group-list-item-container")
// );

// const memoGroupContainer = document.querySelector(
//   ".memo-container .memo-group-list"
// );

// const memoGroupItem = [
//   document.querySelector(".memo-container .memo-group-list-item-container"),
// ];
// let currentGroupItemSelected = memoGroupItem[0];

// const findAllMemo = [];
// let findGroupMemo = [];

// // 로그인한 사용자의 모든 메모 그룹에 대해서 가져온다.
// fetch(`/memo/group/findAll?no=${userInfo.no}`)
//   .then((res) => res.json())
//   .then((data) => {
//     // 데이터 정보 : { userNo, groupNo, title }

//     // 그룹 영역을 생성시킨다.
//     data.forEach((element) => {
//       const $newListContainer = document.createElement("div");
//       $newListContainer.classList.add("memo-group-list-item-container");

//       const $newListItemRow = document.createElement("div");
//       $newListItemRow.classList.add("memo-group-list-item-row");

//       const $newDiviser = document.createElement("div");
//       $newDiviser.classList.add("chevron");
//       const $newListSelectButton = document.createElement("div");
//       $newListSelectButton.classList.add("memo-group-title-select-button");

//       const $newFolderIcon = document.createElement("span");
//       $newFolderIcon.textContent = "folder";
//       $newFolderIcon.classList.add("material-symbols-outlined");
//       $newFolderIcon.classList.add("folder-icon");

//       const $newFolderTitle = document.createElement("span");
//       $newFolderTitle.textContent = element.title;
//       $newFolderTitle.classList.add("folder-title");

//       $newListSelectButton.appendChild($newFolderIcon);
//       $newListSelectButton.appendChild($newFolderTitle);

//       $newListItemRow.appendChild($newDiviser);
//       $newListItemRow.appendChild($newListSelectButton);

//       $newListContainer.appendChild($newListItemRow);
//       $newListContainer.dataset.groupNo = element.groupNo;

//       memoGroupItem.push($newListContainer);
//       memoGroupContainer.appendChild($newListContainer);
//     });

//     // 각 그룹에 해당하는 모든 메모 데이터들을 가져온다.
//     const promises = data.map((list) => {
//       return fetch(`/memo/findAll?no=${list.groupNo}`)
//         .then((res) => res.json())
//         .then((listElement) => {
//           listElement.forEach((item) => {
//             const $newMemoItemContainer = document.createElement("div");
//             $newMemoItemContainer.classList.add("memo-list-item-container");

//             const $newGutter = document.createElement("div");
//             $newGutter.classList.add("gutter");
//             const $newContent = document.createElement("div");
//             $newContent.classList.add("content");

//             const $newTitle = document.createElement("div");
//             $newTitle.classList.add("title");
//             $newTitle.textContent = item.title;
//             const $newSummary = document.createElement("div");
//             $newSummary.classList.add("summary");
//             const $newGroupListItem = document.createElement("div");
//             $newGroupListItem.classList.add("group-list-items");

//             const $newDate = document.createElement("div");
//             $newDate.classList.add("date");
//             const $newSnippet = document.createElement("div");
//             $newSnippet.classList.add("snippet");
//             $newSnippet.textContent = item.content;

//             $newSummary.appendChild($newDate);
//             $newSummary.appendChild($newSnippet);

//             const $newFolderIcon = document.createElement("span");
//             $newFolderIcon.classList.add("material-symbols-outlined");
//             $newFolderIcon.classList.add("folder-icon");
//             $newFolderIcon.textContent = "folder";

//             const $newGroupTitle = document.createElement("span");
//             $newGroupTitle.textContent = list.title;

//             $newGroupListItem.appendChild($newFolderIcon);
//             $newGroupListItem.appendChild($newGroupTitle);

//             $newContent.appendChild($newTitle);
//             $newContent.appendChild($newSummary);
//             $newContent.appendChild($newGroupListItem);

//             $newMemoItemContainer.appendChild($newGutter);
//             $newMemoItemContainer.appendChild($newContent);
//             $newMemoItemContainer.dataset.memoNo = item.memoNo;

//             findAllMemo.push($newMemoItemContainer);
//             groupMemoList.appendChild($newMemoItemContainer);
//           });
//         });
//     });

//     // 모든 fetch 요청이 완료되면 첫 번째 요소에 'selected' 클래스를 추가한다.
//     Promise.all(promises).then(() => {
//       findAllMemo[0].classList.add("selected");
//       findGroupMemo = findAllMemo;

//       console.log(findGroupMemo);
//     });

//     memoGroupItem.forEach((item) => {
//       item.addEventListener("click", (event) => {
//         if (currentGroupItemSelected) {
//           currentGroupItemSelected.children[0].classList.remove("selected");
//           currentGroupItemSelected = event.currentTarget;
//         }

//         event.currentTarget.children[0].classList.add("selected");

//         const targetGroupRow = event.currentTarget.dataset.groupNo;

//         groupMemoList.textContent = "";
//         if (findGroupMemo.length) findGroupMemo = [];

//         if (targetGroupRow === "0") {
//           findGroupMemo = findAllMemo;
//           findGroupMemo.forEach((element) =>
//             groupMemoList.appendChild(element)
//           );
//         } else {
//           fetch(`/memo/findAll?no=${targetGroupRow}`)
//             .then((res) => res.json())
//             .then((listElement) => {
//               listElement.forEach((item) => {
//                 if (findGroupMemo.length)
//                   findGroupMemo[0].classList.add("selected");

//                 const $newMemoItemContainer = document.createElement("div");
//                 $newMemoItemContainer.classList.add("memo-list-item-container");

//                 const $newGutter = document.createElement("div");
//                 $newGutter.classList.add("gutter");
//                 const $newContent = document.createElement("div");
//                 $newContent.classList.add("content");

//                 const $newTitle = document.createElement("div");
//                 $newTitle.classList.add("title");
//                 $newTitle.textContent = item.title;
//                 const $newSummary = document.createElement("div");
//                 $newSummary.classList.add("summary");

//                 const $newDate = document.createElement("div");
//                 $newDate.classList.add("date");
//                 const $newSnippet = document.createElement("div");
//                 $newSnippet.classList.add("snippet");
//                 $newSnippet.textContent = item.content;

//                 $newSummary.appendChild($newDate);
//                 $newSummary.appendChild($newSnippet);

//                 $newContent.appendChild($newTitle);
//                 $newContent.appendChild($newSummary);

//                 $newMemoItemContainer.appendChild($newGutter);
//                 $newMemoItemContainer.appendChild($newContent);
//                 $newMemoItemContainer.dataset.memoNo = item.memoNo;

//                 findGroupMemo.push($newMemoItemContainer);
//                 groupMemoList.appendChild($newMemoItemContainer);
//               });
//             });
//         }
//       });
//     });
//   });
