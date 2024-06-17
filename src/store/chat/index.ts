import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { IChat } from "@/types";
import { faL } from "@fortawesome/free-solid-svg-icons";

export interface ChatState {
  chat: IChat;
}

const initialState: ChatState = {
  chat: {
    consultation: false,
    menu: false,
    selfCareMenu: false,
    mannedConsultation: false,
    selfCheck: false,
    consultationReservation: "",
  },
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    initChat: (state) => {
      state.chat = {
        consultation: false,
        menu: false,
        selfCareMenu: false,
        mannedConsultation: false,
        consultationReservation: "",
        selfCheck: false,
      };
    },
    updateConsultation: (state, action) => {
      state.chat.consultation = action.payload;
    },
    updateConsultationMenu: (state, action) => {
      state.chat.menu = action.payload;
    },
    updateSelfCareMenu: (state, action) => {
      state.chat.selfCareMenu = action.payload;
    },
    updateMannedConsultation: (state, action) => {
      state.chat.mannedConsultation = action.payload;
    },
    updateConsultationReservation: (state, action) => {
      state.chat.consultationReservation = action.payload;
    },
    updateSelfCheck: (state, action) => {
      state.chat.selfCheck = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  initChat,
  updateConsultation,
  updateConsultationMenu,
  updateSelfCareMenu,
  updateMannedConsultation,
  updateConsultationReservation,
  updateSelfCheck,
} = chatSlice.actions;
export const selectChat = (state: RootState) => state.chat;
export default chatSlice.reducer;
