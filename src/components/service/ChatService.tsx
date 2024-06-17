import React, { useContext, useState } from "react";
import ScaleButton from "@/components/button/scaleButton.tsx";
import { ChatContext } from "../../app/chat/page";
import style from "./chat.module.css";

interface Props {
  onScale: () => void;
  label: string;
  scale: string;
  gap1: string;
  gap: string;
}
interface IMsgDataTypes {
  roomId: String | number;
  user: String;
  msg: String;
  time: String;
}
// export default Service=({  onLogin }: Props) =>{
// const Service: React.FC<Props> = ({ onScale, label, scale, gap1, gap,socket, username, roomId }) => {
const Service: React.FC<Props> = ({ onScale, label, scale, gap1, gap }) => {
  let { socket, username, roomId } = useContext(ChatContext);
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
  // export default Service: React.FC = () => {
  const [openTab, setOpenTab] = React.useState(1);
  const [message, setMessage] = React.useState("");
  const [consultation, setConsultation] = React.useState(
    <>
      相談内容を選択すると、メッセージが表示されるので、
      <br />
      ご相談内容をメッセージでお送りください。
      <br />
      AIの返信は一度の応答に1分程度掛かりますので、
      <br />
      ご送信後、少々おまちください。
    </>,
  );

  return (
    <div className="border rounded-2xl bg-teal-light w-full flex flex-col items-center justify-center pt-14">
      <div className="w-full flex justify-center items-baseline  relative">
        <h1 className="text-brown text-5xl">AIチャットサービス</h1>
        <div className="absolute right-20" onClick={onScale}>
          <ScaleButton label={label} />
        </div>
      </div>
      <div className="w-full h-14"></div>
      <div className=" w-[90%]">
        <div>
          <ul className="flex " role="tablist">
            <li
              className={
                "flex-auto text-center  text-black border-[5px] bg-yellow-light" +
                (openTab === 1
                  ? " border-b-0 border-green rounded-t-2xl border-b-white"
                  : " border-yellow-dark border-b-green rounded-t-2xl border-r-0")
              }
            >
              <a
                className="text-2xl uppercase px-5 py-4 block leading-normal text-black"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                  console.log("tab", openTab);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                AIお悩み相談
              </a>
            </li>
            <li
              className={
                "flex-auto text-center  text-black border-[5px] bg-yellow-light" +
                (openTab === 2
                  ? " border-b-0 border-green  rounded-t-2xl border-b-white"
                  : " border-yellow-dark border-b-green rounded-t-2xl border-l-0")
              }
            >
              <a
                className="text-2xl uppercase px-5 py-4 block leading-normal text-black"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                  console.log("tab", openTab);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                AIハラスメント相談
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-yellow-light w-full border-[5px]  border-t-0 border-green">
            <div className="px-16 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <div>
                    <button
                      type="button"
                      className="px-28 py-4 my-3 bg-green rounded-xl text-xl"
                    >
                      AIがさまざまな問題をサポートいたします。
                    </button>
                    <div className="bg-white rounded-lg px-10">
                      <div className={"flex items-center py-16 " + gap}>
                        <img
                          src="/assets/images/bear12.svg"
                          className={scale}
                        />
                        <div className={"flex flex-col " + gap1}>
                          <div className={"flex " + gap1}>
                            <div className="talk-bubble tri-right round border3 left-top">
                              <div className="talktext">
                                <p>{consultation}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* socket */}
                      <div className="px-20">
                        <div style={{ marginBottom: "1rem" }}>
                          <p>
                            <span className="font-bold text-lg">
                              ユーザー名 :{" "}
                            </span>{" "}
                            <b>{username}</b>
                          </p>
                          <p>
                            <span className="font-bold text-lg">
                              サーバーID :
                            </span>{" "}
                            <b>{roomId}</b>
                          </p>
                        </div>
                        <div>
                          {chat.map(({ roomId, user, msg, time }, key) => (
                            <div
                              key={key}
                              className={
                                user == username
                                  ? style.chatProfileRight
                                  : style.chatProfileLeft
                              }
                            >
                              <span
                                className={style.chatProfileSpan}
                                style={{
                                  textAlign:
                                    user == username ? "right" : "left",
                                }}
                              >
                                {user.charAt(0)}
                              </span>
                              <h3
                                style={{
                                  textAlign:
                                    user == username ? "right" : "left",
                                }}
                              >
                                {msg}
                              </h3>
                            </div>
                          ))}
                        </div>
                        {/* <div>
                          <form onSubmit={(e) => sendData(e)}>
                            <input
                              className={style.chat_input}
                              type="text"
                              value={currentMsg}
                              placeholder="メッセージを書く.."
                              onChange={(e) => setCurrentMsg(e.target.value)}
                            />
                            <button className={style.chat_button}>送信</button>
                          </form>
                        </div> */}
                      </div>
                      {/* endsocket */}
                      <div className="border-t-gray-400 border-t w-full"></div>
                      <p className="text-gray-400 py-3">
                        メッセージを入力してください。
                      </p>
                      <form
                        className="flex items-baseline gap-2"
                        onSubmit={(e) => sendData(e)}
                      >
                        <input
                          type="text"
                          placeholder="メッセージを入力してください"
                          onChange={(e) => setCurrentMsg(e.target.value)}
                          value={currentMsg}
                          required
                          className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none border-form-strokedark bg-form-input focus:border-primary mb-5"
                        />
                        <img
                          src="/assets/images/msg_send.svg"
                          className=" rounded-md hover:scale-125 cursor-pointer"
                        />
                      </form>
                    </div>
                  </div>
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <div>
                    <button
                      type="button"
                      className="px-28 py-4 my-3 bg-green rounded-xl text-xl"
                    >
                      AIがさまざまな問題をサポートいたします。
                    </button>
                    <div className="bg-white rounded-lg px-10">
                      <div className="h-40"></div>
                      <div className="border-t-gray-400 border-t w-full"></div>
                      <p className="text-gray-400 py-3">
                        メッセージを入力してください。
                      </p>
                      <div className="flex items-baseline gap-2">
                        <input
                          type="text"
                          placeholder="メッセージを入力してください"
                          onChange={(e) => setMessage(e.target.value)}
                          value={message}
                          required
                          className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none border-form-strokedark bg-form-input focus:border-primary mb-5"
                        />
                        <img src="/assets/images/msg_send.svg" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-24 px-24 py-6 flex justify-between">
        <button className="bg-green px-5 py-1 rounded-full">
          ハラスメントWEB報告
        </button>
        <button className="bg-green px-5 py-1 rounded-full">
          メインメニューへ戻る
        </button>
      </div>
    </div>
  );
};
export default Service;
