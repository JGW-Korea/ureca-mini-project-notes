document.querySelector("#logout-btn").addEventListener("click", () => {
  fetch("/user/logout", {
    method: "POST",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "Logout_Success") {
        sessionStorage.removeItem("userInfo");
        location.href = "/";
      }
    });
});
