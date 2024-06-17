import React, { useRef, useEffect, useState } from "react";
import ScaleButton from "@/components/button/scaleButton.tsx";
import { webSocketAPI } from "@/hooks/webSocketAPI";
// import Slider from "@/components/Slider";
import EmblaCarousel from "@/components/slider/slider";
import { EmblaOptionsType } from "embla-carousel";
import {
  updateConsultation,
  updateConsultationMenu,
  updateSelfCareMenu,
} from "../../store/chat";
import { selectChat } from "@/store/chat";
import { useDispatch, useSelector } from "react-redux";

interface Message {
  // type:
  //   | "ping"
  //   | "chat"
  //   | "suggestion"
  //   | "question"
  //   | "consultation"
  //   | "menu"
  //   | "json";
  type: string;
  message: string;
  value: {
    explainText: string;
    type: string;
  };
  isProgress: boolean;
}
interface Props {
  onScale: () => void;
  label: string;
  scale: string;
  gap1: string;
  gap: string;
}

const OPTIONS: EmblaOptionsType = {};
const SLIDE_COUNT = 9;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const Service: React.FC<Props> = ({ onScale, label, scale, gap1, gap }) => {
  const chatState = useSelector(selectChat);
  const dispatch = useDispatch();
  useEffect(() => {
    if (chatState.chat.menu) {
      setMessages((prevMessages: any) => [
        ...prevMessages,
        { message: message, type: "menu" },
      ]);
      setMessage("");
      dispatch(updateConsultationMenu(false));
    }
    goToBottom();
    goToBottomT();
  }, [chatState.chat.menu]);
  useEffect(() => {
    if (chatState.chat.consultation) {
      setSend(true);
      webSocketAPI.sendMessage("message", "ハラスメントチャットAI相談");
      setMessages((prevMessages: any) => [
        ...prevMessages,
        { message: "ハラスメントチャットAI相談", type: "question" },
      ]);
      dispatch(updateConsultation(false));
    }
    // goToBottom();
  }, [chatState.chat.consultation]);
  useEffect(() => {
    console.log("kkk");
    if (chatState.chat.selfCareMenu) {
      setSend(true);
      webSocketAPI.sendMessage("message", "心のストレッチ");
      setMessages((prevMessages: any) => [
        ...prevMessages,
        { message: "心のストレッチ", type: "question" },
      ]);
      dispatch(updateSelfCareMenu(false));
    }
  }, [chatState.chat.selfCareMenu]);
  const handleConsultation1 = () => {
    setSend(true);
    webSocketAPI.sendMessage("message", "カウンセリングチャットAI相談");
    setMessages((prevMessages: any) => [
      ...prevMessages,
      { message: "カウンセリングチャットAI相談", type: "question" },
    ]);
    dispatch(updateConsultation(false));
  };
  const handleConsultation2 = () => {
    setSend(true);
    webSocketAPI.sendMessage("message", "人間関係についてのカウンセリング");
    setMessages((prevMessages: any) => [
      ...prevMessages,
      { message: "人間関係についてのカウンセリング", type: "question" },
    ]);
    dispatch(updateConsultation(false));
  };
  const handleConsultation3 = () => {
    setSend(true);
    webSocketAPI.sendMessage("message", "コーチングセッション");
    setMessages((prevMessages: any) => [
      ...prevMessages,
      { message: "コーチングセッション", type: "question" },
    ]);
    dispatch(updateConsultation(false));
  };
  const handleConsultation4 = () => {
    setSend(true);
    webSocketAPI.sendMessage("message", "家族関係についてのカウンセリング");
    setMessages((prevMessages: any) => [
      ...prevMessages,
      { message: "家族関係についてのカウンセリング", type: "question" },
    ]);
    dispatch(updateConsultation(false));
  };
  const handleConsultation5 = () => {
    setSend(true);
    webSocketAPI.sendMessage("message", "やりがいを見つけるカウンセリング");
    setMessages((prevMessages: any) => [
      ...prevMessages,
      { message: "やりがいを見つけるカウンセリング", type: "question" },
    ]);
    dispatch(updateConsultation(false));
  };
  const handleConsultation6 = () => {
    setSend(true);
    webSocketAPI.sendMessage(
      "message",
      "ワークライフバランスについてのカウンセリング",
    );
    setMessages((prevMessages: any) => [
      ...prevMessages,
      {
        message: "ワークライフバランスについてのカウンセリング",
        type: "question",
      },
    ]);
    dispatch(updateConsultation(false));
  };
  const handleConsultation7 = () => {
    setSend(true);
    webSocketAPI.sendMessage("message", "人間関係についてのカウンセリング");
    setMessages((prevMessages: any) => [
      ...prevMessages,
      { message: "人間関係についてのカウンセリング", type: "question" },
    ]);
    dispatch(updateConsultation(false));
  };
  const handleConsultation8 = () => {
    setSend(true);
    webSocketAPI.sendMessage(
      "message",
      "技術・スキルの不足についてのカウンセリング",
    );
    setMessages((prevMessages: any) => [
      ...prevMessages,
      {
        message: "技術・スキルの不足についてのカウンセリング",
        type: "question",
      },
    ]);
    dispatch(updateConsultation(false));
  };
  const handleConsultation9 = () => {
    setSend(true);
    webSocketAPI.sendMessage(
      "message",
      "リーダーシップを身につけるカウンセリング",
    );
    setMessages((prevMessages: any) => [
      ...prevMessages,
      { message: "リーダーシップを身につけるカウンセリング", type: "question" },
    ]);
    dispatch(updateConsultation(false));
  };
  const handleConsultation10 = () => {
    setSend(true);
    webSocketAPI.sendMessage("message", "睡眠についてのカウンセリング");
    setMessages((prevMessages: any) => [
      ...prevMessages,
      { message: "睡眠についてのカウンセリング", type: "question" },
    ]);
    dispatch(updateConsultation(false));
  };

  const box = useRef<HTMLDivElement | null>(null);
  const goToBottom = () => {
    if (box.current) {
      box.current.scrollTo({
        top: box.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };
  const goToBottomT = () => {
    window.scrollTo({
      // top: 0,      //Go to top
      top: document.documentElement.scrollHeight, // Go to bottom
      behavior: "smooth",
    });
  };

  const [send, setSend] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  // export default Service: React.FC = () => {
  const [openTab, setOpenTab] = React.useState(1);
  // const [message, setMessage] = React.useState("");
  const [consultation, setConsultation] = React.useState(
    <>
      心のストレッチでは、メンタルヘルス不調の予防や回復を目的に、今日から出来るセルフケア方法をご紹介
      <br />
      コンテンツの詳細は、以下をご覧ください。
      <br />
      <br />
      ①一行日記
      <br />
      学に基づいた感情把握アプリ。日々記録することで、自分がどのようなタイミングで感情が変化しているのかを客観的に把握できます。
      <br />
      <br />
      ②自律訓練
      <br />
      リラックス・ストレス解消のセルフワークです！
      <br />
      初心者の方でもひとりで取り組めるよう動画で配信しています。
      <br />
      心身の状態を自分で調整できるようにプログラムされています。
      <br />
      <br />
      ③マインドフルネス
      <br />
      近年注目されている心理療法の一つ。日常の中のちょっとした工夫でストレスを緩和し、充実感を得られるポイントを1週間に1回のペースでコラムとして配信しています。
      <br />
      <br />
      ④コラム法
      <br />
      私たちの気持ちや行動は、その時に頭に浮かんだ「考え」に影響されます。
      <br />
      つらい出来事があったとき、考えを整理していくことで、気分を改善し、対応策を考えることに役立ちます。
    </>,
  );
  const sendMessage = () => {
    setSend(true);

    if (message.trim().length > 0) {
      // Assuming sendMessage accepts a string as message type and a string as the message itself
      webSocketAPI.sendMessage("message", message);
      // setQuestions((prevMessages: any) => [...prevMessages, message]);
      setMessages((prevMessages: any) => [
        ...prevMessages,
        { message: message, type: "question" },
      ]);

      setMessage("");
    }
  };
  // const sendMessage = () => {
  //   const trimmedMessage = message.trim();
  //   if (trimmedMessage.length > 0) {
  //     setQuestion((prevMessages:any) => [...prevMessages, trimmedMessage]);
  //     setMessage(""); // Optional: Clear the input field after sending
  //   }
  // };

  const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    // setMessages({message:e.target.value, type:'question'});
    // setMessages((prevMessages: any) => [
    //   ...prevMessages,
    //   { message: e.target.value, type: "question" },
    // ]);
  };

  useEffect(() => {
    const handleMessageReceived = (msg: Message) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
      goToBottom();
      goToBottomT();
    };

    // Assign your event handler
    webSocketAPI.handleMessage = handleMessageReceived;
    setSend(false);
  }, [send]);
  useEffect(() => {
    const userId =
      "XwtmjNKXWNdUA_fEEIm64iHIivQYutHeQLq6Tl5aAyiDYsbvDNNlhkyPiqqgJxH3";
    webSocketAPI.connect(userId);

    // const handleMessageReceived = (msg: Message) => {
    //   setMessages((prevMessages) => [...prevMessages, msg]);
    // };

    // // Assign your event handler
    // webSocketAPI.handleMessage = handleMessageReceived;

    // Cleanup on component unmount
    // return () => {
    //   if (webSocketAPI.socket) {
    //     webSocketAPI.socket.close();
    //   }
    // };
  }, []);

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
                    <div className="bg-white rounded-lg">
                      <div
                        ref={box}
                        className="text-sm overflow-y-scroll max-h-[800px] min-h-[300px] px-10 "
                      >
                        <div className="h-10"></div>
                        {messages.map(
                          (msg, index) =>
                            msg.type !== "ping" && (
                              <div
                                style={{ textAlign: "right" }}
                                className="p-1"
                              >
                                {msg.type === "question" && (
                                  <div className="flex justify-end gap-10">
                                    <span
                                      style={{ textAlign: "left" }}
                                      className="bg-gray-300  max-w-[80%] p-4 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl"
                                      key={index}
                                    >
                                      {msg.message}
                                    </span>
                                    <img
                                      src="/assets/images/bear12.svg"
                                      className={scale}
                                    />
                                  </div>
                                )}
                                {msg.type === "menu" && (
                                  <div
                                    className="max-w-[85%]"
                                    style={{ textAlign: "left" }}
                                  >
                                    <div className="flex justify-start gap-10">
                                      <img
                                        src="/assets/images/bear12.svg"
                                        className={scale}
                                      />
                                      <div className={"flex flex-col " + gap1}>
                                        <div className={"flex " + gap1}>
                                          <img
                                            src="/assets/images/chat1.svg"
                                            className={
                                              scale +
                                              " drop-shadow-3xl cursor-pointer hover:drop-shadow-4xl"
                                            }
                                            onClick={handleConsultation1}
                                          />
                                          <img
                                            src="/assets/images/chat2.svg"
                                            className={
                                              scale +
                                              " drop-shadow-3xl cursor-pointer hover:drop-shadow-4xl"
                                            }
                                            onClick={handleConsultation2}
                                          />
                                          <img
                                            src="/assets/images/chat3.svg"
                                            className={
                                              scale +
                                              " drop-shadow-3xl cursor-pointer hover:drop-shadow-4xl"
                                            }
                                            onClick={handleConsultation3}
                                          />
                                          <img
                                            src="/assets/images/chat4.svg"
                                            className={
                                              scale +
                                              " drop-shadow-3xl cursor-pointer hover:drop-shadow-4xl"
                                            }
                                            onClick={handleConsultation4}
                                          />
                                          <img
                                            src="/assets/images/chat5.svg"
                                            className={
                                              scale +
                                              " drop-shadow-3xl cursor-pointer hover:drop-shadow-4xl"
                                            }
                                            onClick={handleConsultation5}
                                          />
                                        </div>
                                        <div className={"flex " + gap1}>
                                          <img
                                            src="/assets/images/chat6.svg"
                                            className={
                                              scale +
                                              " drop-shadow-3xl cursor-pointer hover:drop-shadow-4xl"
                                            }
                                            onClick={handleConsultation6}
                                          />
                                          <img
                                            src="/assets/images/chat7.svg"
                                            className={
                                              scale +
                                              " drop-shadow-3xl cursor-pointer hover:drop-shadow-4xl"
                                            }
                                            onClick={handleConsultation7}
                                          />
                                          <img
                                            src="/assets/images/chat8.svg"
                                            className={
                                              scale +
                                              " drop-shadow-3xl cursor-pointer hover:drop-shadow-4xl"
                                            }
                                            onClick={handleConsultation8}
                                          />
                                          <img
                                            src="/assets/images/chat9.svg"
                                            className={
                                              scale +
                                              " drop-shadow-3xl cursor-pointer hover:drop-shadow-4xl"
                                            }
                                            onClick={handleConsultation9}
                                          />
                                          <img
                                            src="/assets/images/chat10.svg"
                                            className={
                                              scale +
                                              " drop-shadow-3xl cursor-pointer hover:drop-shadow-4xl"
                                            }
                                            onClick={handleConsultation10}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                {msg.type === "json" && (
                                  <div
                                    className="max-w-[85%]"
                                    style={{ textAlign: "left" }}
                                  >
                                    <div className="flex justify-start gap-10">
                                      <img
                                        src="/assets/images/bear12.svg"
                                        className={scale}
                                      />
                                      <p className="bg-gray-300 p-4 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl">
                                        {/* {typeof JSON.parse(msg.value)} */}
                                        {/* {JSON.parse(msg.value).explainText} */}
                                        {/* {JSON.parse(msg.value.split("\\r\\n"))
                                          .explainText
                                          .map((explainText, k) => (
                                            <span key={k}>
                                              {explainText}
                                              <br />
                                            </span>
                                          ))} */}
                                        {/* {JSON.parse(msg.value).explainText} */}
                                        {consultation}
                                      </p>
                                    </div>
                                  </div>
                                )}
                                {msg.type === "chat" && (
                                  <div
                                    className="max-w-[85%]"
                                    style={{ textAlign: "left" }}
                                  >
                                    <div className="flex justify-start gap-10">
                                      <img
                                        src="/assets/images/bear12.svg"
                                        className={scale}
                                      />
                                      <p className="bg-gray-300 p-4 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl">
                                        {msg.message}
                                      </p>
                                    </div>
                                  </div>
                                )}

                                {msg.type === "suggestion" && (
                                  <div
                                    className="gap-1 flex max-w-[85%]"
                                    style={{ textAlign: "left" }}
                                  >
                                    <div className="flex justify-start gap-10">
                                      <img
                                        src="/assets/images/bear12.svg"
                                        className={scale}
                                      />
                                      <div className="flex gap-5 text-base justify-center items-center">
                                        {msg.message
                                          .split("。,")
                                          .map(
                                            (suggestion, suggestionIndex) => (
                                              <span
                                                className="cursor-pointer border-2 border-blue-600 hover:scale-103 hover:border-yellow-500 p-3 max-h-32 rounded-3xl"
                                                key={suggestionIndex}
                                                onClick={() =>
                                                  setMessage(suggestion)
                                                }
                                              >
                                                {suggestion}
                                              </span>
                                            ),
                                          )}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ),
                        )}
                      </div>
                      <div className="border-t-gray-400 border-t w-full"></div>
                      <p className="text-gray-400 py-3 px-7">
                        {/* メッセージを入力してください。 */}
                      </p>
                      <div className="flex items-baseline gap-2 px-7">
                        <input
                          type="text"
                          placeholder="メッセージを入力してください"
                          onChange={handleChangeMessage}
                          value={message}
                          required
                          className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none border-form-strokedark bg-form-input focus:border-primary mb-5"
                        />
                        <img
                          src="/assets/images/msg_send.svg"
                          onClick={sendMessage}
                          className=" rounded-md hover:scale-125 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* <Slider /> */}
                {/* <EmblaCarousel slides={SLIDES} options={OPTIONS} /> */}
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
                        {/* メッセージを入力してください。 */}
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
