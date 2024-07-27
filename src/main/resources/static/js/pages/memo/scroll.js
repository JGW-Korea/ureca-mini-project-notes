const memoContentElement = document.querySelector(
  ".memo-list-contents .ql-editor"
);

memoContentElement.classList.add("scroll-event");

const scrollEventElements = document.querySelectorAll(
  ".memo-list-contents .scroll-event"
);

scrollEventElements.forEach((element) => {
  element.addEventListener("scroll", (event) => {
    element.classList.add("show-scrollbar");

    setTimeout(() => {
      element.classList.remove("show-scrollbar");
    }, 2000); // 1000ms = 1초
  });
});
