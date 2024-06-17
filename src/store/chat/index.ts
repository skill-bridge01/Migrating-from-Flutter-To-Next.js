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
    onlineHealthRoom: false,
    onlineHealthRoomMenu: false,
    onlineHealthRoomReservation: "",
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
        onlineHealthRoom: false,
        onlineHealthRoomMenu: false,
        onlineHealthRoomReservation:"",
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
    updateOnlineHealthRoom: (state, action) => {
      state.chat.onlineHealthRoom = action.payload;
    },
    updateOnlineHealthRoomMenu: (state, action) => {
      state.chat.onlineHealthRoomMenu = action.payload;
    },
    updateOnlineHealthRoomReservation: (state, action) => {
      state.chat.onlineHealthRoomReservation = action.payload;
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
  updateOnlineHealthRoom,
  updateOnlineHealthRoomMenu,
  updateOnlineHealthRoomReservation,
} = chatSlice.actions;
export const selectChat = (state: RootState) => state.chat;
export default chatSlice.reducer;
