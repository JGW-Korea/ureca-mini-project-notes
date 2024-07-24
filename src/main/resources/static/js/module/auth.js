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
