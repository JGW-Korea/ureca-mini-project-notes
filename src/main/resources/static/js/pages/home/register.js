document
  .querySelector(".register-form input[type='submit']")
  .addEventListener("click", (event) => {
    event.preventDefault();

    const inputId = document.querySelector(".register-form #id");
    const inputPassword = document.querySelector(".register-form #password");
    const inputName = document.querySelector(".register-form #name");

    if (!inputId.value && !inputPassword.value && !inputName.value) {
      console.log("Hello");
    }
  });
