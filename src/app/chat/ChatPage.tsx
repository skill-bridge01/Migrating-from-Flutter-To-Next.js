"use client";

import React, { useContext, useState } from "react";
import Header from "@/components/header/header.tsx";
import Menu from "@/components/menu/menu.tsx";
import ChatService from "@/components/service/ChatService.tsx";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import firebase_app from "@/firebase/config";
import { ChatContext } from "./page";

interface IMsgDataTypes {
  roomId: String | number;
  user: String;
  msg: String;
  time: String;
}

const auth = getAuth(firebase_app);

interface User {
  id: number;
  name: string;
}

// const ChatPage = ({ socket, username, roomId }: any) => {
const ChatPage = () => {
  let { socket, username, roomId } = useContext(ChatContext);
  const [reduction, setReduction] = useState<boolean | undefined>();
  const { user } = useAuthContext() as { user: User | null };
  const router = useRouter();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        router.push("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  React.useEffect(() => {
    if (user == null) {
      router.push("/signin");
    }
  }, [user]);

  const [currentMsg, setCurrentMsg] = useState("");
  const [chat, setChat] = useState<IMsgDataTypes[]>([]);

  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentMsg !== "") {
      const msgData: IMsgDataTypes = {
        roomId,
        user: username,
        msg: currentMsg,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_msg", msgData);
      setCurrentMsg("");
    }
  };

  React.useEffect(() => {
    socket.on("receive_msg", (data: IMsgDataTypes) => {
      setChat((pre) => [...pre, data]);
    });
  }, [socket]);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log("uid", uid);
      } else {
        // User is signed out
        // ...
        console.log("user is logged out");
      }
    });
  }, []);

  return (
    <main className="w-full">
      <Header />
      <div>
        {reduction ? (
          <>
            <div className="m-16 grid grid-cols-3 gap-8">
              <div className="col-span-1">
                <Menu />
              </div>
              <div className="col-span-2">
                {socket && username && roomId && (
                  <ChatService
                    onScale={() => setReduction(false)}
                    label="大画面"
                    scale="scale-100 hover:scale-110"
                    gap="gap-12"
                    gap1="gap-2"
                  />
                )}

                {/* <ChatService
                  onScale={() => setReduction(false)}
                  label="大画面"
                  scale="scale-100 hover:scale-110"
                  gap="gap-12"
                  gap1="gap-2"
                /> */}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="m-16">
              {socket && username && roomId && (
                <ChatService
                  onScale={() => setReduction(true)}
                  label="画面を小さくする"
                  scale="scale-150 hover:scale-160"
                  gap="gap-20"
                  gap1="gap-12"
                />
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default ChatPage;
