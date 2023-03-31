const initialState = {
  isOpen: false,
  data: {},
  isUpdated: false,
  err: false,
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case "OPEN_MODAL": {
      return {
        ...state,
        isOpen: true,
        data: action.payload.data,
        isUpdated: false,
      };
    }

    case "CLOSE_MODAL": {
      return {
        ...state,
        isOpen: false,
        isUpdated: action.payload.isUpdated,
      };
    }

    default:
      return state;
  }
}
