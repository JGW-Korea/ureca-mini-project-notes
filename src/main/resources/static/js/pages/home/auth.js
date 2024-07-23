export const auth = () => {
  return false;
};

// input 아이디, 비밀번호 유효성 검사
export const inputCheck = (id, password) => {
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
