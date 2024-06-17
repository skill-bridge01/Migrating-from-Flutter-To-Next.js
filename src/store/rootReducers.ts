import phoneReducer from "./phone";
import userReducer from "./user";
import buttonReducer from "./button";

const rootReducers = {
  phone: phoneReducer,
  user: userReducer,
  button: buttonReducer,
};

export default rootReducers;
