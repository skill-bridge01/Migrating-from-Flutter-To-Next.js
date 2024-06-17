"use client";
import { createContext, useContext, useState } from "react";
import styles from "./page.module.css";
import { io } from "socket.io-client";
import ChatPage from "./ChatPage";
import { Socket }  from "socket.io-client";
// const SidebarContext = createContext();
interface ChatContextType {
  socket: Socket | any ;
  roomId: string;
  username: string;
}

export const ChatContext = createContext<ChatContextType>({
  socket: io("http://localhost:3001"),
  roomId: "",
  username: "",
});

export default function Chat() {
  const [showChat, setShowChat] = useState(false);
  const [username, setUserName] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [roomId, setroomId] = useState("");

  var socket: Socket;
  socket = io("http://localhost:3001");

  const handleJoin = () => {
    if (username !== "" && roomId !== "") {
      console.log(username, "username", roomId, "roomId");
      socket.emit("join_room", roomId);
      setShowSpinner(true);
      // You can remove this setTimeout and add your own logic
      setTimeout(() => {
        setShowChat(true);
        setShowSpinner(false);
      }, 4000);
    } else {
      alert("ユーザー名とサーバーIDを入力してください");
    }
  };

  return (
    <div>
      <div
        className={styles.main_div}
        style={{ display: showChat ? "none" : "" }}
      >
        <p className="pb-16 text-[#9d43a5] text-4xl font-bold ">
          チャットページへようこそ
        </p>
        <input
          className={`${styles.main_input} border-[1px] rounded-md border-black text-xl`}
          type="text "
          placeholder="ユーザー名"
          onChange={(e) => setUserName(e.target.value)}
          disabled={showSpinner}
        />
        <input
          className={`${styles.main_input} border-[1px] rounded-md border-black text-xl`}
          type="text"
          placeholder="サーバーID"
          onChange={(e) => setroomId(e.target.value)}
          disabled={showSpinner}
        />
        <button
          className={`${styles.main_button} bg-blue-700 mt-10 text-white`}
          onClick={() => handleJoin()}
        >
          {!showSpinner ? (
            <span className="font-medium text-2xl">
              参&nbsp;加&nbsp;す&nbsp;る
            </span>
          ) : (
            <div className={styles.loading_spinner}></div>
          )}
        </button>
      </div>
      <div style={{ display: !showChat ? "none" : "" }}>
        <ChatContext.Provider value={{ socket, roomId, username }}>
          <ChatPage />
        </ChatContext.Provider>
        {/* <ChatPage socket={socket} roomId={roomId} username={userName} /> */}
      </div>
    </div>
  );
}
