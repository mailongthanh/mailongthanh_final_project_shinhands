export const login = () => {
  return {
    type: "LOGIN",
  };
};

export const loginSuccess = (payload) => {
  return {
    type: "LOGIN_SUCCESS",
    payload,
  };
};

export const loginFailed = (payload) => {
  return {
    type: "LOGIN_FAILED",
    payload,
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};

export const logoutSuccess = () => {
  return {
    type: "LOGOUT_SUCCESS",
  };
};

export const logoutFailed = () => {
  return {
    type: "LOGOUT_FAILED",
  };
};
