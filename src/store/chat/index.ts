import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { IChat } from "@/types";

export interface ChatState {
  chat: IChat;
}

const initialState: ChatState = {
  chat: { consultation: false, menu: false, selfCareMenu: false },
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
  },
  extraReducers: (builder) => {},
});

export const {
  initChat,
  updateConsultation,
  updateConsultationMenu,
  updateSelfCareMenu,
} = chatSlice.actions;
export const selectChat = (state: RootState) => state.chat;
export default chatSlice.reducer;
