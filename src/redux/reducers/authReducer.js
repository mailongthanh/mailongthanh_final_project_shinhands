const initialState = {
  isLoading: false,
  accessToken: "",
  userId: "",
  err: "",
  username: "",
  isAdmin: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "LOGIN_SUCCESS": {
      return {
        ...state,
        isLoading: false,
        accessToken: action.payload.accessToken,
        userId: action.payload.userId,
        username: action.payload.username,
        isAdmin: action.payload.isAdmin,
        err: false,
      };
    }

    case "LOGIN_ERROR": {
      return {
        ...state,
        isLoading: false,
        err: false,
      };
    }

    case "LOGOUT": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "LOGOUT_ERROR": {
      return {
        ...state,
        isLoading: false,
        err: true,
      };
    }

    case "LOGOUT_SUCCESS": {
      return {
        ...state,
        isLoading: false,
        accessToken: "",
        userId: "",
        username: "",
        isAdmin: false,
        err: false,
      };
    }

    default: {
      return state;
    }
  }
}
