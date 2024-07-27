import { auth } from "../../module/auth.js";
import { setContent } from "./quill.js";

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
const memoContents = {}; // 각 메모 번호에 맞는 desc 내용을 저장하는 객체

// 메모 그룹을 가져오는 비동기 작업
async function fetchMemoGroups(userNo) {
  const response = await fetch(`/memo/group/findAll?no=${userNo}`);
  const data = await response.json();
  return data;
}

// 각 메모 그룹에 속한 메모장들을 가져오는 비동기 작업
async function fetchMemos(groupNo) {
  const response = await fetch(`/memo/findAll?no=${groupNo}`);
  const data = await response.json();
  return data;
}

async function handleMemoGroups() {
  const data = await fetchMemoGroups(userInfo.no); // 서버에서 사용자가 만든 메모 그룹을 가져온다.

  // 서버에서 가져온 메모 그룹들을 요소로 변환시킨다.
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

    // 첫 번째 메모 그룹은 모든 메모 그룹이기 때문에 모든 메모의 정보들을 가져온다.
    const memos = await fetchMemos(element.groupNo);

    // 가져온 모든 메모장들을 요소로 변환시킨 후 HTML 문서에 적용시킨다.
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

      memoContents[memo.memoNo] = memo.content;
    });
  }

  // 가장 먼저 가져온 메모장을 자동으로 선택한다.
  const memoList = document.querySelector(
    ".memo-container .memo-list-item-container"
  );

  memoList.classList.add("selected");
  setContent(memoContents[memoList.dataset.memoNo], memoList.dataset.memoNo);

  let seletedMemoGroup; // 선택한 메모 그룹에 대한 정보
  let seletedMemo; // 선택한 메모 그룹에 속한 메모장들에 대한 정보

  // 메모 그룹을 선택할 경우 발생하는 이벤트
  document
    .querySelectorAll(".memo-container .memo-group-list-item-container")
    .forEach((item) => {
      // 기존에 선택된 메모 그룹의 정보를 가져온다.
      if (item.children[0].classList.contains("selected")) {
        seletedMemoGroup = item;
      }

      // 특정 그룹을 클릭 했을 때 발생하는 이벤트
      item.addEventListener("click", async (event) => {
        // 기존에 선택된 메모 그룹에서 selected 클래스 속성 값을 제거한다.
        if (seletedMemoGroup) {
          seletedMemoGroup.children[0].classList.remove("selected");
        }

        // 클릭한 메모 그룹에 selected 클래스 속성 값을 추가하고, 선택한 메모 그룹에 대한 정보를 현재 영역으로 수정한다.
        event.currentTarget.children[0].classList.add("selected");
        seletedMemoGroup = event.currentTarget;

        // 기존에 있던 리스트들을 삭제 시킨다.
        if (groupMemoList.children.length) groupMemoList.textContent = "";

        // 선택한 그룹의 data-group-no 번호를 가져온다. (Memo Table의 외래키이기 때문)
        const groupNo = event.currentTarget.dataset.groupNo;

        if (groupNo === "0") {
          $memoListAll.forEach((list) => groupMemoList.appendChild(list));
          setContent(
            memoContents[$memoListAll[0].dataset.memoNo],
            memoList.dataset.memoNo
          );
        } else {
          const memos = await fetchMemos(groupNo);

          memos.forEach((memo, idx) => {
            const $newMemoItemContainer = document.createElement("div");
            $newMemoItemContainer.classList.add("memo-list-item-container");

            if (idx === 0) {
              $newMemoItemContainer.classList.add("selected");
              setContent(memoContents[memo.memoNo], memo.memoNo);
            }

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

                setContent(
                  memoContents[event.currentTarget.dataset.memoNo],
                  event.currentTarget.dataset.memoNo
                );
              });

              memo.addEventListener;
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

        setContent(
          memoContents[event.currentTarget.dataset.memoNo],
          event.currentTarget.dataset.memoNo
        );
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
