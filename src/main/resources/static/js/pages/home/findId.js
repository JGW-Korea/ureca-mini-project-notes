// 2. 아이디 찾기 버튼을 클릭했을 경우.
document
  .querySelector(".name-check #name-check-btn")
  .addEventListener("click", (event) => {
    event.preventDefault();

    const inputName = document.querySelector(".name-check #name"); // 아이디를 찾기 위한 이름 입력 input 태그
    const errorMsgElement = document.querySelector(".name--error"); // input 태그에 올바른 값을 입력하지 않았을 경우 에러 메세지 출력

    // 이름을 입력하지 않았을 경우
    if (!inputName.value) {
      errorMsgElement.textContent = "이름을 입력해주세요.";
    } else {
      // 이름을 입력한 경우
      errorMsgElement.textContent = "";

      fetch(`/user/find-id?name=${inputName.value}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  });
