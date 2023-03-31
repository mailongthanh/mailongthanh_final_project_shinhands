import { combineReducers } from "redux";
import authReducer from "./authReducer";
import modalReducer from "./modalReducer";
import switchReducer from "./switchReducer";
import themeReducer from "./themeReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  switchkey: switchReducer,
  theme: themeReducer,
});

export default rootReducer;
