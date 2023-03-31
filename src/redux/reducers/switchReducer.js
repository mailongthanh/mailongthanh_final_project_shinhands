const initialState = {
  key: "2",
};

export default function switchReducer(state = initialState, action) {
  switch (action.type) {
    case "SWITCHKEY": {
      return {
        ...state,
        key: action.payload.key,
      };
    }

    default: {
      return state;
    }
  }
}
