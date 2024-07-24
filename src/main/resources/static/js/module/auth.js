export const auth = () => {
  return sessionStorage.getItem("userInfo") !== null;
};

// input 아이디, 비밀번호 유효성 검사
export const loginInputValueCheck = (id, password) => {
  if (!id && !password) {
    return "inputEmptyError";
  }

  if (!id) {
    return "idEmptyError";
  }

  if (!password) {
    return "passwordEmptyError";
  }

  if (id && password) {
    return "success";
  }
};

export const findIdInputValueCheck = (id, name) => {
  if (!id && !name) {
    return "inputEmptyError";
  }

  if (!id) {
    return "idEmptyError";
  }

  if (!name) {
    return "nameEmptyError";
  }

  if (id && name) {
    return "success";
  }
};

export const updatePasswordCheck = (password, confirmPassword) => {
  // 비밀번호 정규식 a ~ z, 0 ~ 9, 특수문자로 이루어진 8 ~ 16글자를 입력해야 한다.
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;

  if (!password && !confirmPassword) return "inputEmptyError";

  if (!password) return "passwordEmptyError";

  if (!confirmPassword) return "confimPasswordEmptyError";

  if (!passwordRegex.test(password)) return "regexNotMatchError";

  if (password !== confirmPassword) return "passwordDoNotMatchError";

  if (password && confirmPassword && password === confirmPassword) {
    return "success";
  }
};
