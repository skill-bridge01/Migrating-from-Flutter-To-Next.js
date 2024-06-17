import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { IUser1 } from "@/types";

export interface UserState {
  user: IUser1;
  isLogin: boolean;
}

const initialState: UserState = {
  user: {
    menuImageUrl: "",
    menuJson: "",
    phone: "",
    twoPhaseAuth: false,
    userId: "",
  },
  isLogin:
    typeof localStorage !== "undefined" && localStorage.getItem("token")
      ? true
      : false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initUser: (state) => {
      state.user = {
        menuImageUrl: "",
        menuJson: "",
        phone: "",
        twoPhaseAuth: false,
        userId: "",
      };
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    logIn: (state, action) => {
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        isLogin: true,
      };
    },
    logOut: (state) => {
      state.user = {
        menuImageUrl: "",
        menuJson: "",
        phone: "",
        twoPhaseAuth: false,
        userId: "",
      };
      state.isLogin = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {},
});

export const {
  initUser,
  updateUser,
  logIn,
  logOut,
} = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
