import phoneReducer from "./phone";
import chatReducer from "./chat";
import userReducer from "./user";
import userReducer1 from "./user1";
import buttonReducer from "./button";

const rootReducers = {
  phone: phoneReducer,
  chat: chatReducer,
  user: userReducer,
  user1: userReducer1,
  button: buttonReducer,
};

export default rootReducers;
