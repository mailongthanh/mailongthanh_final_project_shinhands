const initialState = {
  theme: "light",
};

export default function themeReducer(state = initialState, action) {
  switch (action.type) {
    case "LIGHTMODE": {
      return {
        ...state,
        theme: "light",
      };
    }

    case "DARKMODE": {
      return {
        ...state,
        theme: "dark",
      };
    }

    default: {
      return state;
    }
  }
}
