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
    email: "",
    twoPhaseAuth: true,
    userId: "",
    planId:"",
    recaptcha: true
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
        email: "",
        twoPhaseAuth: true,
        userId: "",
        planId: "",
        recaptcha:true,
      };
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    updateUserID: (state, action) => {
      state.user.userId = action.payload;
    },
    updateEmail: (state, action) => {
      state.user.email = action.payload;
    },
    updatePlanID: (state, action) => {
      state.user.planId = action.payload;
    },
    updateMenuJson: (state, action) => {
      state.user.menuJson = action.payload;
    },
    updateTwoPhaseAuth: (state, action) => {
      state.user.twoPhaseAuth = action.payload;
    },
    logIn: (state, action) => {
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        isLogin: true,
      };
    },
    isRecaptcha: (state, action) => {
      state.user.recaptcha = action.payload;
    },
    logOut: (state) => {
      state.user = {
        menuImageUrl: "",
        menuJson: "",
        phone: "",
        email: "",
        twoPhaseAuth: true,
        userId: "",
        planId: "",
        recaptcha:true,
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
  updateUserID,
  updateEmail,
  updatePlanID,
  updateMenuJson,
  updateTwoPhaseAuth,
  logIn,
  isRecaptcha,
  logOut,
} = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
