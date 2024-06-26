import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { IPhone} from "@/types";

export interface PhoneState {
  phone: IPhone;
}

const initialState: PhoneState = {
  phone: {
    phone: "",
    verify: false,
    verificationId:'',
    phoneReg:false
  },
};

export const phoneSlice = createSlice({
  name: "phone",
  initialState,
  reducers: {
    initPhone: (state) => {
      state.phone = {
        phone: "",
        verify: false,
        verificationId:'',
        phoneReg:false
      };
    },
    updatePhone: (state, action) => {
      state.phone.phone = action.payload;
    },
    verificationId: (state, action) => {
      state.phone.verificationId = action.payload;
    },
    verifyPhone: (state, action) => {
      state.phone.verify = action.payload;
    },
    phoneReg: (state, action) => {
      state.phone.phoneReg = action.payload;
    },
    // logIn: (state, action) => {
    //   localStorage.setItem("token", action.payload);
    //   return {
    //     ...state,
    //     isLogin: true,
    //   };
    // },
    // logOut: (state) => {
    //   state.user = {
    //     bio: "",
    //     name: "",
    //     nickname: "",
    //     connected: false,
    //     publicKey: "",
    //     avatar: "",
    //   };
    //   state.isLogin = false;
    //   localStorage.removeItem("token");
    // },
  },
  extraReducers: (builder) => {},
});

export const {
  initPhone,
  updatePhone,
  verifyPhone,
  verificationId,
  phoneReg,
} = phoneSlice.actions;
export const selectPhone = (state: RootState) => state.phone;
export default phoneSlice.reducer;
