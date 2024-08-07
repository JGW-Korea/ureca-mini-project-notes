import {
  auth,
  loginInputValueCheck,
  registerInputValueCheck,
} from "../../module/auth.js";

// 접속한 사용자가 현재 로그인 중이면, 메인 페이지가 아닌 메모 페이지로 이동시킨다.
if (auth()) {
  location.href = "/pages/memo/index.html";
}

// 접속한 사용자가 현재 로그인을 하지 않은 경우, 메인 페이지(로그인)를 그대로 보여준다.

// 1. 사용자가 로그인 버튼을 클릭했을 경우
document
  .querySelector(".login-container__card #login-btn")
  .addEventListener("click", (event) => {
    event.preventDefault();

    const inputId = document.querySelector(".login-container__card #id"); // 아이디 input 태그
    const inputPwd = document.querySelector(".login-container__card #password"); // 비밀번호 input 태그

    // 유효성 검사 에러 box 태그
    const mseBoxElement = document.querySelector(
      ".login-container__card .message-box"
    );

    switch (loginInputValueCheck(inputId.value, inputPwd.value)) {
      // 아이디와 비밀번호 모두 입력하지 않았을 경우
      case "inputEmptyError":
        mseBoxElement.textContent = "아이디와 비밀번호 모두 입력해주세요.";
        mseBoxElement.classList.add("error");
        inputId.focus();
        break;

      case "idEmptyError": // 아이디만 입력하지 않았을 경우
        mseBoxElement.textContent = "아이디를 입력해주세요.";
        mseBoxElement.classList.add("error");
        inputId.focus();
        break;

      case "passwordEmptyError": // 비밀번호만 입력하지 않았을 경우
        mseBoxElement.textContent = "비밀번호를 입력해주세요.";
        mseBoxElement.classList.add("error");
        inputPwd.focus();
        break;

      default: // 모두 올바르게 입력되었을 경우
        mseBoxElement.textContent = "";
        mseBoxElement.classList.remove("error");

        // fetch(Ajax)를 통해 서버와 비동기 통신을 한다.
        // 1. /user/login으로 입력된 아이디와 비밀번호를 보내서 DB에 저장된 데이터와 일치하는지 요청을 보낸다.
        // 2. 서버에서 응답받아온 데이터를 JSON 형태로 형변환 시킨다.
        // 3. 응답받은 status 상태를 통해 각 상황을 정의한다.
        fetch(`/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: inputId.value,
            password: inputPwd.value,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            // 아이디 또는 비밀번호가 일치하는 않은 경우
            if (["INVALID_ID", "INVALID_PASSWORD"].includes(data.status)) {
              data.status === "INVALID_ID"
                ? (mseBoxElement.textContent = "존재하지 않는 아이디입니다.")
                : (mseBoxElement.textContent = "비밀번호가 틀렸습니다.");
              mseBoxElement.classList.add("error");
            } else {
              // 아이디와 비밀번호가 일치한 경우
              mseBoxElement.textContent = "";
              mseBoxElement.classList.remove("error");

              // 세션 스토리지에 전달받은 userInfo를 저장시킨다.
              sessionStorage.setItem("userInfo", JSON.stringify(data.user));
              location.href = "/pages/memo/index.html";
            }
          });
    }
  });

// Bootstrap 모달창 열릴 경우 로그인 영역 숨기기
$(".modal").on("shown.bs.modal", function () {
  $(".login-container .login-container__card").css("display", "none");
});

// 모듈창 닫힐 경우 모든 input 입력값 비우기 (jQuery 버전으로 가지고 와서 jQuery 문법밖에 적용 안됨)
$(".modal").on("hidden.bs.modal", function () {
  $(".login-container .login-container__card").css("display", "block");
  $(".message-box").empty();
  $(this).find("input[type='text'], input[type='password']").val("");
});
