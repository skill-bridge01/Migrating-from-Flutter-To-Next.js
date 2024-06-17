//server.tsx
import React, { useRef, useEffect, useState } from "react";
import ScaleButton from "@/components/button/scaleButton.tsx";
import { webSocketAPI } from "@/hooks/webSocketAPI";
import axios from "axios";
import {
  updateConsultation,
  updateConsultationMenu,
  updateSelfCareMenu,
  updateMannedConsultation,
  updateConsultationReservation,
  updateSelfCheck,
} from "../../store/chat";
import { selectChat } from "@/store/chat";
import { selectUser, updateUserID, updateTwoPhaseAuth } from "@/store/user";
import { useDispatch, useSelector } from "react-redux";
import { db } from "@/firebase/firestore/addData";
import MenuItems from "@/components/menuItems";
import { collection, addDoc, getDocs } from "firebase/firestore";

interface UserDataType {
  id: string;
  msg: String;
  type: String;
  userId: String;
  selfCareMenu: Boolean;
  mannedConsultation: Boolean;
}

interface DataType {
  rowIndex: null;
  id: string;
  msg: string | null;
  type: String;
  userId: String;
  selfCareMenu: Boolean;
  mannedConsultation: Boolean;
}

interface FirebaseDataType {
  id: string;
  data: String;
  type: String;
  DataId: String;
  category: Boolean;
  section: Boolean;
}
interface Message {
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
  scale_m: string;
  gap1: string;
  gap: string;
  status: string;
}

async function addDataToFireStore1(
  date: Number,
  message: String,
  type: String,
  userId: String,
  selfCareMenu: Boolean,
  mannedConsultation: Boolean,
) {
  try {
    const docRef = await addDoc(collection(db, "TroubleChat"), {
      id: date,
      msg: message,
      type: type,
      userId: userId,
      selfCareMenu: selfCareMenu,
      mannedConsultation: mannedConsultation,
    });
    return true;
  } catch (error) {
    return false;
  }
}
async function addDataToFireStore2(
  date: Number,
  message: String,
  type: String,
  userId: String,
  selfCareMenu: Boolean,
  mannedConsultation: Boolean,
) {
  try {
    const docRef = await addDoc(collection(db, "HarassmentChat"), {
      id: date,
      msg: message,
      type: type,
      userId: userId,
      selfCareMenu: selfCareMenu,
      mannedConsultation: mannedConsultation,
    });
    return true;
  } catch (error) {
    return false;
  }
}
async function fetchDataFromFirestore1(): Promise<UserDataType[]> {
  const querySnapshot = await getDocs(collection(db, "TroubleChat")); // Make sure the collection name matches
  const data: UserDataType[] = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...(doc.data() as Omit<UserDataType, "id">) });
  });
  return data;
}
async function fetchDataFromFirestore2(): Promise<UserDataType[]> {
  const querySnapshot = await getDocs(collection(db, "HarassmentChat")); // Make sure the collection name matches
  const data: UserDataType[] = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...(doc.data() as Omit<UserDataType, "id">) });
  });
  return data;
}
const Service1: React.FC<Props> = ({
  onScale,
  label,
  scale,
  scale_m,
  gap1,
  gap,
  status,
}) => {
  const [msgg, setMsg] = useState("");
  const [type, setType] = useState("");
  const [msgg2, setMsg2] = useState("");
  const [msgg3, setMsg3] = useState("");
  const [type2, setType2] = useState("");
  const [type3, setType3] = useState("");
  const [userId, setUserId] = useState("");
  const [userData1, setUserData1] = useState<UserDataType[]>([]);
  const [userData2, setUserData2] = useState<UserDataType[]>([]);
  const chatState = useSelector(selectChat);
  const userIdState = useSelector(selectUser);
  const dispatch = useDispatch();
  const [send, setSend] = useState<boolean>(false);
  const [consulmsg, setConsulmsg] = useState("");
  const [send2, setSend2] = useState<boolean>(false);
  const [send3, setSend3] = useState<boolean>(false);
  const [message1, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [message2, setMessage2] = useState<string>("");
  const [message3, setMessage3] = useState<string>("");
  const [messages2, setMessages2] = useState<Message[]>([]);
  const [messages3, setMessages3] = useState<Message[]>([]);
  const [openTab, setOpenTab] = React.useState(1);
  const [selfCareMenu, setSelfCareMenu] = useState<boolean>(false);
  const [mannedConsultation, setMannedConsultation] = useState<boolean>(false);
  const [allData, setAllData] = useState<DataType[]>([]);
  const getparams = {
    webUserId: userIdState.user.userId,
  };

  const historyAPI = async () => {
    const response = await axios.post(
      "https://kirihare-web.jp/BB99AABCSESB73rfjpADc_A53hHAyN9ihb34FTVdD7kcjuC7nHLhkJiCQE3asNMe6s",
      getparams,
    );
    setAllData(response.data.list);
    // console.log(
    //   "ChatHistory",
    //   response.data.list.sort((a: any, b: any) => a.rowIndex - b.rowIndex),
    // );
    // console.log("ChatHistory", response.data.list.sort((a: any, b: any) => a.rowIndex - b.rowIndex).type!=="zoomCounselingDateTime");
  };

  const msg =
    "test\n\n[LINK:https://eap.kirihare.jp/][IMG:https://kirihare.blob.core.windows.net/img/push-message/1194/0515.jpg]";
  const linkPattern = /\[LINK:(.*?)\]/;
  const imgPattern = /\[IMG:(.*?)\]/;

  interface MessageComponents {
    message: string;
    link: string | null;
    img: string | null;
  }

  const divideMessageComponents = (
    message: string | null,
  ): MessageComponents => {
    if (message === null) {
      return {
        message: "",
        link: null,
        img: null,
      };
    }
    const linkMatch = message.match(linkPattern);
    const imgMatch = message.match(imgPattern);

    // Extracted link and image URLs, or null if not found
    const link: string | null = linkMatch ? linkMatch[1] : null;
    const img: string | null = imgMatch ? imgMatch[1] : null;

    // Message without the link and img markers
    const cleanMessage: string = message
      .replace(linkPattern, "")
      .replace(imgPattern, "")
      .trim();

    return {
      message: cleanMessage,
      link,
      img,
    };
  };

  const divideMessage = (message: string): string[] => {
    // Split the message wherever there are two newline characters
    const parts: string[] = message.split("\n");
    // Filter out any empty strings which might occur due to trailing newlines
    return parts.filter((part) => part.trim() !== "");
  };

  //change to <br /> instead of '\n'
  function convertNewlinesToHtmlBr(inputString: string): string {
    return inputString.replace(/\n/g, "<br />");
  }

  const components = divideMessageComponents(msg);
  // console.log(components);

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
  const [selfCheckMsg, setSelfCheckMsg] = React.useState(
    <>
      心のセルフチェックでは、厳選した4種類の心理テストが受検できます
      <br />
      テストの詳細は、以下をご覧ください。
      <br />
      <br />
      ①ストレスチェック ショートver
      <br />
      4項目の質問から瞬時にストレス度を測ります。いつでも手軽にわずかな時間で、
      <br />
      チェック可能です
      <br />
      <br />
      ②ストレスチェックロングver
      <br />
      法対応のストレスチェックで最も使われている質問票（厚生労働省が推奨する57項目）を用いた心理テスト。本格的な内容なので、受検後に詳細な分析結果が表示されます。自分のストレス状態を多角的に把握できます。
      <br />
      <br />
      ③家族関係
      <br />
      家族関係は、時にはメンタルヘルスに大きな影響を及ぼします。
      <br />
      このテストでは、家庭環境と自分の心の変化を見える化し、その時々の状況を客観的に把握していきます。
      <br />
      <br />
      ④うつ度チェック
      <br />
      16項目の尺度から、自身の「うつ状態」を検査するテスト。三大欲求や好奇心の側面に表れる他、身体的な症状を伴うことがある「うつ」の程度を測り、
      <br />
      その原因などを確認することにも適しています。
    </>,
  );

  const [onlineHealthRoom, setOnlineHealthRoom] = React.useState(
    <>
      オンライン保健室では、臨床心理士／公認心理師が50分間ご相談をうかがいます。相談内容は何でもかまいません。
      <br />
      もやもやした気持ち、カウンセラーに相談しませんか？
      <br />
      ご相談内容は、会社に通知されませんので、ご安心ください。
      <br />
      カウンセリングの方法は、チャット／ビデオ通話(Google
      Meet)／お電話のいずれかを選択できます。
      <br />
      ご希望のカウンセリング方法をお選びください。
      <br />
      <br />
      ※当日予約を希望される場合は、現時刻より3時間先の時刻から予約可能です。
      <br />
      ※ご予約希望日が既に埋まっている場合は、別日程をご提案させていただく場合がございます。
      <br />
      その場合は、土日祝日を除く営業日に担当スタッフが確認し、24時間以内にご返信いたします。
    </>,
  );
  useEffect(() => {
    if (chatState.chat.menu) {
      const handleMessageReceived = (msg: Message) => {
        setMsg(msg.message);
        setType(msg.type);
        if (msg.type !== "ping") {
          setMessages((prevMessages) => [...prevMessages, msg]);
        }
        const addData = async () => {
          if (msg) {
            const added = await addDataToFireStore1(
              new Date().getTime(),
              msg.message, //consulmsg,
              msg.type,
              userIdState.user.userId,
              selfCareMenu,
              mannedConsultation,
            );
            if (added) {
            }
          }
        };
        addData();
      };
      webSocketAPI.handleMessage = handleMessageReceived;

      setMessages((prevMessages: any) => [
        ...prevMessages,
        { message: message1, type: "menu" },
      ]);
      const goToBottom1 = () => {
        if (box.current) {
          box.current.scrollTo({
            top: box.current.scrollHeight,
            behavior: "smooth",
          });
        }
      };
      setTimeout(() => {
        goToBottom1();
        goToBottomT();
      }, 500);
      setOpenTab(1);
      setMessage("");
      dispatch(updateConsultationMenu(false));
    }
  }, [chatState.chat.menu]);

  // if (!firebase.apps.length) {
  //   firebase.initializeApp({
  //     // Your Firebase Config Object
  //   });
  // } else {
  //   firebase.app(); // if already initialized, use that one
  // }

  useEffect(() => {
    if (send) {
      const handleMessageReceived = (msg: Message) => {
        setMsg(msg.message);
        setType(msg.type);
        if (msg.type !== "ping") {
          setMessages((prevMessages) => [...prevMessages, msg]);
        }
        const addData = async () => {
          if (msg) {
            const added = await addDataToFireStore1(
              new Date().getTime(),
              msg.message,
              msg.type,
              userIdState.user.userId,
              selfCareMenu,
              mannedConsultation,
            );
            if (added) {
            }
          }
        };
        addData();
      };
      webSocketAPI.handleMessage = handleMessageReceived;
      const goToBottom1 = () => {
        if (box.current) {
          box.current.scrollTo({
            top: box.current.scrollHeight,
            behavior: "smooth",
          });
        }
      };
      const addData = async () => {
        goToBottom1();
        goToBottomT();
        const added = await addDataToFireStore1(
          new Date().getTime(),
          msgg,
          type,
          userIdState.user.userId,
          selfCareMenu,
          mannedConsultation,
        );
        if (added) {
          setSelfCareMenu(false);
          setMannedConsultation(false);
          setMsg("");
          setType("");
          setUserId("");
        }
        setSend(false); // You might want to toggle `send` only if adding data was a success, consider adjusting this logic based on your requirements.
        // }
      };
      addData();
      setSend(false);
    }
  }, [send]);
  useEffect(() => {
    if (true) {
      const goToBottom1 = () => {
        if (box.current) {
          box.current.scrollTo({
            top: box.current.scrollHeight,
            behavior: "smooth",
          });
        }
      };
      goToBottom1();
      goToBottomT();
    }
  }, [messages.length]);
  useEffect(() => {
    if (chatState.chat.consultation) {
      setOpenTab(2);
      webSocketAPI.sendMessage("message", "ハラスメントチャットAI相談");
      setMessages2((prevMessages: any) => [
        ...prevMessages,
        { message: "ハラスメントチャットAI相談", type: "question" },
      ]);
      setMsg2("ハラスメントチャットAI相談");
      setType2("question");

      setSend2(true);
      dispatch(updateConsultation(false));
    }
  }, [chatState.chat.consultation]);

  useEffect(() => {
    if (openTab === 1) {
      if (chatState.chat.selfCareMenu) {
        setSelfCareMenu(true);
        setMsg("心のストレッチ");
        webSocketAPI.sendMessage("message", "心のストレッチ");
        setMessages((prevMessages: any) => [
          ...prevMessages,
          { message: "心のストレッチ", type: "question" },
        ]);
        setSend(true);
        dispatch(updateSelfCareMenu(false));
      }
    }
    if (openTab === 2) {
      if (chatState.chat.selfCareMenu) {
        setSelfCareMenu(true);
        setMsg("心のストレッチ");
        webSocketAPI.sendMessage("message", "心のストレッチ");
        setMessages2((prevMessages: any) => [
          ...prevMessages,
          { message: "心のストレッチ", type: "question" },
        ]);
        setSend2(true);
        dispatch(updateSelfCareMenu(false));
      }
    }
  }, [chatState.chat.selfCareMenu]);
  useEffect(() => {
    if (openTab === 1) {
      if (chatState.chat.mannedConsultation) {
        setMannedConsultation(true);
        setMsg("ハラスメント相談");
        webSocketAPI.sendMessage("message", "ハラスメント相談");
        setMessages((prevMessages: any) => [
          ...prevMessages,
          { message: "ハラスメント相談", type: "question" },
        ]);
        setSend(true);
        dispatch(updateMannedConsultation(false));
      }
    }
    if (openTab === 2) {
      if (chatState.chat.mannedConsultation) {
        setMannedConsultation(true);
        setMsg("ハラスメント相談");
        webSocketAPI.sendMessage("message", "ハラスメント相談");
        setMessages2((prevMessages: any) => [
          ...prevMessages,
          { message: "ハラスメント相談", type: "question" },
        ]);
        setSend2(true);
        dispatch(updateMannedConsultation(false));
      }
    }
  }, [chatState.chat.mannedConsultation]);

  useEffect(() => {
    if (openTab === 1) {
      if (chatState.chat.selfCheck) {
        setMsg("心のセルフチェック");
        webSocketAPI.sendMessage("message", "心のセルフチェック");
        setMessages((prevMessages: any) => [
          ...prevMessages,
          { message: "心のセルフチェック", type: "question" },
        ]);
        // setSend(true);
        dispatch(updateSelfCheck(false));
      }
    }
    if (openTab === 2) {
      if (chatState.chat.selfCheck) {
        setMannedConsultation(true);
        setMsg("心のセルフチェック");
        webSocketAPI.sendMessage("message", "心のセルフチェック");
        setMessages2((prevMessages: any) => [
          ...prevMessages,
          { message: "心のセルフチェック", type: "question" },
        ]);
        // setSend2(true);
        dispatch(updateSelfCheck(false));
      }
    }
  }, [chatState.chat.selfCheck]);

  useEffect(() => {
    if (openTab === 1) {
      if (chatState.chat.consultationReservation) {
        setMsg(chatState.chat.consultationReservation);
        setType("chat");
        setMessages((prevMessages: any) => [
          ...prevMessages,
          { message: chatState.chat.consultationReservation, type: "chat" },
        ]);
        setSend(true);
        dispatch(updateConsultationReservation(""));
      }
    }
    if (openTab === 2) {
      if (chatState.chat.consultationReservation) {
        setMsg(chatState.chat.consultationReservation);
        setType("chat");
        setMessages2((prevMessages: any) => [
          ...prevMessages,
          { message: chatState.chat.consultationReservation, type: "chat" },
        ]);
        setSend2(true);
        dispatch(updateConsultationReservation(""));
      }
    }
  }, [chatState.chat.consultationReservation]);
  const handleConsultations = (consulmsg: any) => {
    setSend(true);
    if (consulmsg.trim().length > 0) {
      webSocketAPI.sendMessage("message", consulmsg);
      setMsg(consulmsg);
      setType("question");
      setMessages((prevMessages: any) => [
        ...prevMessages,
        { message: consulmsg, type: "question" },
      ]);
      setMessage("");
    }
  };

  const handleConsultation1 = () => {
    setSend(true);
    setMsg("カウンセリングチャットAI相談");
    setType("question");
    webSocketAPI.sendMessage("message", "カウンセリングチャットAI相談");
    setMessages((prevMessages: any) => [
      ...prevMessages,
      { message: "カウンセリングチャットAI相談", type: "question" },
    ]);

    dispatch(updateConsultation(false));
  };
  const handleConsultation2 = () => {
    setMsg("人間関係についてのカウンセリング");
    setType("question");
    webSocketAPI.sendMessage("message", "人間関係についてのカウンセリング");
    setMessages((prevMessages: any) => [
      ...prevMessages,
      { message: "人間関係についてのカウンセリング", type: "question" },
    ]);
    setSend(true);
    dispatch(updateConsultation(false));
  };
  const handleConsultation3 = () => {
    setMsg("ワークライフバランスについてのカウンセリング");
    setType("question");
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
    setSend(true);
    dispatch(updateConsultation(false));
  };
  const handleConsultation4 = () => {
    setMsg("技術・スキルの不足についてのカウンセリング");
    setType("question");
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
    setSend(true);
    dispatch(updateConsultation(false));
  };
  const handleConsultation5 = () => {
    setMsg("変化への対応方法についてのカウンセリング");
    setType("question");
    webSocketAPI.sendMessage(
      "message",
      "変化への対応方法についてのカウンセリング",
    );
    setMessages((prevMessages: any) => [
      ...prevMessages,
      { message: "変化への対応方法についてのカウンセリング", type: "question" },
    ]);
    setSend(true);
    dispatch(updateConsultation(false));
  };
  const handleConsultation6 = () => {
    setMsg("リーダーシップを身につけるカウンセリング");
    setType("question");
    webSocketAPI.sendMessage(
      "message",
      "リーダーシップを身につけるカウンセリング",
    );
    setMessages((prevMessages: any) => [
      ...prevMessages,
      {
        message: "リーダーシップを身につけるカウンセリング",
        type: "question",
      },
    ]);
    setSend(true);
    dispatch(updateConsultation(false));
  };
  const handleConsultation7 = () => {
    setMsg("やりがいを見つけるカウンセリング");
    setType("question");
    webSocketAPI.sendMessage("message", "やりがいを見つけるカウンセリング");
    setMessages((prevMessages: any) => [
      ...prevMessages,
      { message: "やりがいを見つけるカウンセリング", type: "question" },
    ]);
    setSend(true);
    dispatch(updateConsultation(false));
  };
  const handleConsultation8 = () => {
    setMsg("家族関係についてのカウンセリング");
    setType("question");
    webSocketAPI.sendMessage("message", "家族関係についてのカウンセリング");
    setMessages((prevMessages: any) => [
      ...prevMessages,
      {
        message: "家族関係についてのカウンセリング",
        type: "question",
      },
    ]);
    setSend(true);
    dispatch(updateConsultation(false));
  };
  const handleConsultation9 = () => {
    setMsg("睡眠についてのカウンセリング");
    setType("question");
    webSocketAPI.sendMessage("message", "睡眠についてのカウンセリング");
    setMessages((prevMessages: any) => [
      ...prevMessages,
      { message: "睡眠についてのカウンセリング", type: "question" },
    ]);
    setSend(true);
    dispatch(updateConsultation(false));
  };
  const handleConsultation10 = () => {
    setMsg("コーチングセッション");
    setType("question");
    webSocketAPI.sendMessage("message", "コーチングセッション");
    setMessages((prevMessages: any) => [
      ...prevMessages,
      { message: "コーチングセッション", type: "question" },
    ]);
    setSend(true);
    dispatch(updateConsultation(false));
  };
  const handleConsultation11 = () => {
    setMsg("認知再構成のカウンセリング");
    setType("question");
    webSocketAPI.sendMessage("message", "認知再構成のカウンセリング");
    setMessages((prevMessages: any) => [
      ...prevMessages,
      { message: "認知再構成のカウンセリング", type: "question" },
    ]);
    setSend(true);
    dispatch(updateConsultation(false));
  };
  const handleConsultation12 = () => {
    setMsg("露出療法のカウンセリング");
    setType("question");
    webSocketAPI.sendMessage("message", "露出療法のカウンセリング");
    setMessages((prevMessages: any) => [
      ...prevMessages,
      { message: "露出療法のカウンセリング", type: "question" },
    ]);
    setSend(true);
    dispatch(updateConsultation(false));
  };
  const handleConsultation13 = () => {
    setMsg("振り返りとホームワークのカウンセリング");
    setType("question");
    webSocketAPI.sendMessage(
      "message",
      "振り返りとホームワークのカウンセリング",
    );
    setMessages((prevMessages: any) => [
      ...prevMessages,
      { message: "振り返りとホームワークのカウンセリング", type: "question" },
    ]);
    setSend(true);
    dispatch(updateConsultation(false));
  };
  const handleConsultation14 = () => {
    setMsg("問題解決技法のカウンセリング");
    setType("question");
    webSocketAPI.sendMessage("message", "問題解決技法のカウンセリング");
    setMessages((prevMessages: any) => [
      ...prevMessages,
      { message: "問題解決技法のカウンセリング", type: "question" },
    ]);
    setSend(true);
    dispatch(updateConsultation(false));
  };
  const handleConsultation15 = () => {
    setMsg("リラクゼーション技法のカウンセリング");
    setType("question");
    webSocketAPI.sendMessage("message", "リラクゼーション技法のカウンセリング");
    setMessages((prevMessages: any) => [
      ...prevMessages,
      { message: "リラクゼーション技法のカウンセリング", type: "question" },
    ]);
    setSend(true);
    dispatch(updateConsultation(false));
  };
  const handleConsultation16 = () => {
    setMsg("自己指示的対話のカウンセリング");
    setType("question");
    webSocketAPI.sendMessage("message", "自己指示的対話のカウンセリング");
    setMessages((prevMessages: any) => [
      ...prevMessages,
      { message: "自己指示的対話のカウンセリング", type: "question" },
    ]);
    setSend(true);
    dispatch(updateConsultation(false));
  };

  const box = useRef<HTMLDivElement | null>(null);
  const box2 = useRef<HTMLDivElement | null>(null);
  const box3 = useRef<HTMLDivElement | null>(null);

  const goToBottomT = () => {
    window.scrollTo({
      // top: 0,      //Go to top
      top: document.documentElement.scrollHeight, // Go to bottom
      behavior: "smooth",
    });
  };

  const sendMessage = () => {
    setSend(true);

    if (message1.trim().length > 0) {
      webSocketAPI.sendMessage("message", message1);
      setMsg(message1);
      setType("question");
      setMessages((prevMessages: any) => [
        ...prevMessages,
        { message: message1, type: "question" },
      ]);
      setMessage("");
    }
  };
  const handleConsultations2 = (consulmsg: any) => {
    setSend2(true);
    if (consulmsg.trim().length > 0) {
      webSocketAPI.sendMessage("message", consulmsg);
      setMsg2(consulmsg);
      setType2("question");
      setMessages2((prevMessages: any) => [
        ...prevMessages,
        { message: consulmsg, type: "question" },
      ]);
      setMessage2("");
    }
  };
  const handleConsultations3 = (consulmsg: any) => {
    setSend3(true);
    if (consulmsg.trim().length > 0) {
      webSocketAPI.sendMessage("message", consulmsg);
      setMsg3(consulmsg);
      setType3("question");
      setMessages3((prevMessages: any) => [
        ...prevMessages,
        { message: consulmsg, type: "question" },
      ]);
      setMessage3("");
    }
  };
  const sendMessage2 = () => {
    setSend2(true);
    if (message2.trim().length > 0) {
      webSocketAPI.sendMessage("message", message2);
      setMsg2(message2);
      setType2("question");
      setMessages2((prevMessages: any) => [
        ...prevMessages,
        { message: message2, type: "question" },
      ]);
      setMessage2("");
    }
  };
  const sendMessage3 = () => {
    setSend3(true);
    if (message3.trim().length > 0) {
      const addparams = {
        webUserId: userIdState.user.userId,
        json: { msg: message3 },
      };
      const addHistoryAPI = async () => {
        const response = await axios.post(
          "https://kirihare-web.jp/BB99AABCSEwwSB73rfjpADc_33A53hHAyN9ihb34FTVdD7kcjuC7nHLhkJiCQE3asNMe6s",
          addparams,
        );
        // setAllData(response.data.list);
        console.log('$$$$$$', response)
      };
      addHistoryAPI();
      webSocketAPI.sendMessage("message", message3);
      setMsg3(message3);
      setType3("question");

      setMessages3((prevMessages: any) => [
        ...prevMessages,
        { message: message3, type: "question" },
      ]);
      setMessage3("");
    }
  };

  const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const handleChangeMessage2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage2(e.target.value);
  };
  const handleChangeMessage3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage3(e.target.value);
  };
  useEffect(() => {
    if (send2) {
      const handleMessageReceived = (msg: Message) => {
        setMsg2(msg.message);
        setType2(msg.type);
        if (msg.type !== "ping") {
          setMessages2((prevMessages) => [...prevMessages, msg]);
        }

        const addData = async () => {
          if (msg) {
            const added = await addDataToFireStore2(
              new Date().getTime(),
              msg.message,
              msg.type,
              userIdState.user.userId,
              selfCareMenu,
              mannedConsultation,
            );
            if (added) {
            }
          }
        };
        addData();
      };
      webSocketAPI.handleMessage = handleMessageReceived;
      const goToBottom2 = () => {
        if (box2.current) {
          box2.current.scrollTo({
            top: box2.current.scrollHeight,
            behavior: "smooth",
          });
        }
      };
      const addData = async () => {
        goToBottom2();
        goToBottomT();
        console.log("types", msgg2, type2);

        const added = await addDataToFireStore2(
          new Date().getTime(),
          msgg2,
          type2,
          userIdState.user.userId,
          selfCareMenu,
          mannedConsultation,
        );
        if (added) {
          setSelfCareMenu(false);
          setMannedConsultation(false);
          setMsg2("");
          setType2("");
          setUserId("");
        }
        setSend2(false); // You might want to toggle `send` only if adding data was a success, consider adjusting this logic based on your requirements.
        // }
      };
      addData();
      setSend2(false);
    }
  }, [send2]);

  useEffect(() => {
    if (send3) {
      const handleMessageReceived = (msg: Message) => {
        setMsg3(msg.message);
        setType3(msg.type);
        if (msg.type !== "ping") {
          setMessages3((prevMessages) => [...prevMessages, msg]);
        }
      };
      webSocketAPI.handleMessage = handleMessageReceived;
      const goToBottom3 = () => {
        if (box3.current) {
          box3.current.scrollTo({
            top: box3.current.scrollHeight,
            behavior: "smooth",
          });
        }
      };
      const addData = async () => {
        goToBottom3();
        goToBottomT();
        setSend3(false); // You might want to toggle `send` only if adding data was a success, consider adjusting this logic based on your requirements.
      };
      addData();
      setSend3(false);
    }
  }, [send3]);

  useEffect(() => {
    if (true) {
      const goToBottom2 = () => {
        if (box2.current) {
          box2.current.scrollTo({
            top: box2.current.scrollHeight,
            behavior: "smooth",
          });
        }
      };
      goToBottom2();
      goToBottomT();
      setSend2(false);
    }
  }, [messages2.length]);

  useEffect(() => {
    if (true) {
      const goToBottom3 = () => {
        if (box3.current) {
          box3.current.scrollTo({
            top: box3.current.scrollHeight,
            behavior: "smooth",
          });
        }
      };
      goToBottom3();
      goToBottomT();
      setSend3(false);
    }
  }, [messages3.length]);

  useEffect(() => {
    const userId = userIdState.user.userId;
    console.log("userID", userId);
    webSocketAPI.connect(userId);
    async function fetchData1() {
      const data: UserDataType[] = await fetchDataFromFirestore1(); // Assumed returned type
      setUserData1(data);
    }
    async function fetchData2() {
      const data: UserDataType[] = await fetchDataFromFirestore2(); // Assumed returned type
      setUserData2(data);
    }
    fetchData1();
    fetchData2();
    historyAPI();

  }, []);

  return (
    <div className="border rounded-2xl bg-teal-light w-full flex flex-col items-center justify-center xl:pt-14 lg:pt-9 pt-5">
      <div className="w-full flex flex-col lg:flex-row justify-center items-baseline  lg:relative ">
        <h1 className="text-brown text-2xl xs:text-3xl xl:text-4xl 3xl:text-5xl items-center mx-auto">
          AIチャットサービス
        </h1>
        <div
          className="lg:absolute 2xl:right-12 right-6 3xl:right-16 mx-auto md:block hidden mt-2"
          onClick={onScale}
        >
          <ScaleButton label={label} />
        </div>
      </div>
      <div className="w-full xl:h-14 h-6"></div>
      <div className="xl:w-[90%] sm:w-[95%] w-[98%]">
        <div>
          <ul className="flex " role="tablist">
            <li
              className={
                "flex-auto text-center  text-black border-[5px] bg-yellow-light" +
                (openTab === 1
                  ? " border-b-0 border-green rounded-t-2xl border-b-white"
                  : " border-yellow-dark border-b-green rounded-t-2xl border-r-0") +
                (openTab === 3 ? "border-r-0" : "")
              }
            >
              <a
                className="xl:text-2xl xs:text-xl text-base uppercase px-5 xl:py-4 py-3 block leading-5 text-black"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
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
                  : " border-yellow-dark border-b-green rounded-t-2xl border-l-0 border-r-0")
              }
            >
              <a
                className="xl:text-2xl xs:text-xl text-base uppercase px-5 xl:py-4 py-3 block leading-5 text-black"
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
            <li
              className={
                "flex-auto text-center  text-black border-[5px] bg-yellow-light" +
                (openTab === 3
                  ? " border-b-0 border-green  rounded-t-2xl border-b-white"
                  : " border-yellow-dark border-b-green rounded-t-2xl border-l-0") +
                (openTab === 1 ? "border-l-0" : "")
              }
            >
              <a
                className="xl:text-2xl xs:text-xl text-base uppercase px-5 xl:py-4 py-3 block leading-5 text-black"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                  console.log("tab", openTab);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                通知
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-yellow-light w-full border-[5px]  border-t-0 border-green">
            <div className="xl:px-16 sm:px-6 px-2 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <div>
                    <button
                      type="button"
                      className="xl:px-28 sm:px-12 xs:px-7 px-3 py-4 my-3 bg-green rounded-xl xl:text-xl xs:text-base text-sm"
                    >
                      AIがさまざまな問題をサポートいたします。
                    </button>
                    <div className="bg-white rounded-lg">
                      <div
                        ref={box}
                        className="text-sm overflow-y-scroll max-h-[850px] min-h-[500px] 2xl:px-6 lg:px-2"
                      >
                        <div className="h-5"></div>
                        <div>
                          {userData1
                            .sort((a: any, b: any) => a.id - b.id)
                            .map(
                              (user) =>
                                user.userId === userIdState.user.userId && (
                                  <div
                                    style={{ textAlign: "right" }}
                                    className="p-1"
                                    key={user.id}
                                  >
                                    {user.type === "question" && (
                                      <div className="flex justify-end gap-10">
                                        <span
                                          style={{ textAlign: "left" }}
                                          className="bg-gray-300  max-w-[80%] p-4 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl"
                                        >
                                          {user.msg}
                                        </span>
                                      </div>
                                    )}

                                    {user.selfCareMenu && (
                                      <>
                                        <div className="flex justify-end gap-10 pb-1">
                                          <span
                                            style={{ textAlign: "left" }}
                                            className="bg-gray-300  max-w-[80%] p-4 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl"
                                            // key={index}
                                          >
                                            心のストレッチ
                                          </span>
                                        </div>
                                        <div
                                          className="max-w-[92%]"
                                          style={{ textAlign: "left" }}
                                        >
                                          <div className="flex justify-start 2xl:gap-6 sm:gap-3 gap-1">
                                            <img
                                              src="/assets/images/bear12.svg"
                                              className={scale}
                                            />
                                            <p className="bg-gray-300 p-4 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl">
                                              {consultation}
                                            </p>
                                          </div>
                                        </div>
                                      </>
                                    )}
                                    {user.mannedConsultation && (
                                      <div className="flex justify-end gap-10 py-1">
                                        <span
                                          style={{ textAlign: "left" }}
                                          className="bg-gray-300  max-w-[80%] p-4 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl"
                                        >
                                          ハラスメント相談
                                        </span>
                                      </div>
                                    )}
                                    {user.type === "chat" && (
                                      <div
                                        className="max-w-[92%]"
                                        style={{ textAlign: "left" }}
                                      >
                                        <div className="flex justify-start 2xl:gap-6 sm:gap-3 gap-1">
                                          <img
                                            src="/assets/images/bear12.svg"
                                            className={scale}
                                          />
                                          <p className="bg-gray-300 p-4 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl">
                                            {user.msg}
                                          </p>
                                        </div>
                                      </div>
                                    )}

                                    {user.type === "suggestion" && (
                                      <div
                                        className="gap-1 flex sm:max-w-[92%] w-full"
                                        style={{ textAlign: "left" }}
                                      >
                                        <div className="flex justify-start 2xl:gap-6 sm:gap-3 gap-1">
                                          <img
                                            src="/assets/images/bear12.svg"
                                            className={
                                              scale + " sm:block hidden"
                                            }
                                            // className={`xl:${scale}`}
                                          />
                                          <div className="flex xl:gap-2 gap-1 xl:text-sm text-xs justify-center leading-4 items-center">
                                            {user.msg
                                              // .split("。,")
                                              .split(",")
                                              .map(
                                                (
                                                  suggestion,
                                                  suggestionIndex,
                                                ) => (
                                                  <span
                                                    className="cursor-pointer border-2 border-blue-600 hover:scale-103 hover:border-yellow-500 xl:p-3 lg:p-2 p-1 max-h-96 rounded-3xl"
                                                    key={suggestionIndex}
                                                    onClick={() =>
                                                      handleConsultations(
                                                        suggestion,
                                                      )
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
                        {messages.map(
                          (msg, index) =>
                            msg.type !== "ping" && (
                              <div
                                style={{ textAlign: "right" }}
                                className="p-1"
                                key={index}
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
                                  </div>
                                )}
                                {msg.type === "menu" && (
                                  <div
                                    className="max-w-[92%]"
                                    style={{ textAlign: "left" }}
                                  >
                                    <div className="flex justify-start gap-10 pt-5 pb-5">
                                      <img
                                        src="/assets/images/bear12.svg"
                                        className={scale}
                                      />
                                      <MenuItems
                                        handleConsultation1={
                                          handleConsultation1
                                        }
                                        handleConsultation2={
                                          handleConsultation2
                                        }
                                        handleConsultation3={
                                          handleConsultation3
                                        }
                                        handleConsultation4={
                                          handleConsultation4
                                        }
                                        handleConsultation5={
                                          handleConsultation5
                                        }
                                        handleConsultation6={
                                          handleConsultation6
                                        }
                                        handleConsultation7={
                                          handleConsultation7
                                        }
                                        handleConsultation8={
                                          handleConsultation8
                                        }
                                        handleConsultation9={
                                          handleConsultation9
                                        }
                                        handleConsultation10={
                                          handleConsultation10
                                        }
                                        handleConsultation11={
                                          handleConsultation11
                                        }
                                        handleConsultation12={
                                          handleConsultation12
                                        }
                                        handleConsultation13={
                                          handleConsultation13
                                        }
                                        handleConsultation14={
                                          handleConsultation14
                                        }
                                        handleConsultation15={
                                          handleConsultation15
                                        }
                                        handleConsultation16={
                                          handleConsultation16
                                        }
                                      />
                                      {/* <div
                                        className={
                                          "2xxl:hidden flex flex-col " + gap1
                                        }
                                      >s</div> */}
                                    </div>
                                  </div>
                                )}
                                {msg.message === "心のストレッチ" && (
                                  <div
                                    className="max-w-[92%] mt-1"
                                    style={{ textAlign: "left" }}
                                  >
                                    <div className="flex justify-start 2xl:gap-6 sm:gap-3 gap-1">
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
                                {msg.message === "心のセルフチェック" && (
                                  <div
                                    className="max-w-[92%] mt-1"
                                    style={{ textAlign: "left" }}
                                  >
                                    <div className="flex justify-start 2xl:gap-6 sm:gap-3 gap-1">
                                      <img
                                        src="/assets/images/bear12.svg"
                                        className={scale}
                                      />
                                      <p className="bg-gray-300 p-4 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl">
                                        {selfCheckMsg}
                                      </p>
                                    </div>
                                  </div>
                                )}
                                {msg.message === "オンライン保健室" && (
                                  <div
                                    className="max-w-[92%] mt-1"
                                    style={{ textAlign: "left" }}
                                  >
                                    <div className="flex justify-start 2xl:gap-6 sm:gap-3 gap-1">
                                      <img
                                        src="/assets/images/bear12.svg"
                                        className={scale}
                                      />
                                      <p className="bg-gray-300 p-4 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl">
                                        {onlineHealthRoom}
                                      </p>
                                    </div>
                                  </div>
                                )}
                                {msg.type === "chat" && (
                                  <div
                                    className="max-w-[92%]"
                                    style={{ textAlign: "left" }}
                                  >
                                    <div className="flex justify-start 2xl:gap-6 sm:gap-3 gap-1">
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
                                    className="gap-1 flex sm:max-w-[92%] w-full"
                                    style={{ textAlign: "left" }}
                                  >
                                    <div className="flex justify-start 2xl:gap-6 sm:gap-3 gap-1">
                                      <img
                                        src="/assets/images/bear12.svg"
                                        // className={`xl:${scale} md:${scale_m}`}
                                        className={scale + " sm:block hidden"}
                                      />
                                      <div className="flex xl:gap-2 gap-1 xl:text-sm text-xs leading-4 justify-center items-center">
                                        {msg.message
                                          // .split("。,")
                                          .split(",")
                                          .map(
                                            (suggestion, suggestionIndex) => (
                                              <span
                                                className="cursor-pointer border-2 border-blue-600 hover:scale-103 hover:border-yellow-500 p-3 max-h-96  rounded-3xl"
                                                key={suggestionIndex}
                                                onClick={() =>
                                                  handleConsultations(
                                                    suggestion,
                                                  )
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
                          value={message1}
                          required
                          // disabled
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
                      className="xl:px-28 sm:px-12 xs:px-7 px-3 py-4 my-3 bg-green rounded-xl xl:text-xl xs:text-base text-sm"
                    >
                      AIがさまざまな問題をサポートいたします。
                    </button>
                    <div className="bg-white rounded-lg">
                      <div
                        ref={box2}
                        className="text-sm overflow-y-scroll max-h-[850px] min-h-[500px] 2xl:px-6 lg:px-2"
                      >
                        <div className="h-5"></div>
                        <div>
                          {userData2
                            .sort((a: any, b: any) => a.id - b.id)
                            .map(
                              (user) =>
                                user.userId === userIdState.user.userId && (
                                  <div
                                    style={{ textAlign: "right" }}
                                    className="p-1"
                                    key={user.id}
                                  >
                                    {user.type === "question" && (
                                      <div className="flex justify-end gap-10">
                                        <span
                                          style={{ textAlign: "left" }}
                                          className="bg-gray-300  max-w-[80%] p-4 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl"
                                        >
                                          {user.msg}
                                        </span>
                                      </div>
                                    )}

                                    {user.selfCareMenu && (
                                      <>
                                        <div className="flex justify-end gap-10 pb-1">
                                          <span
                                            style={{ textAlign: "left" }}
                                            className="bg-gray-300  max-w-[80%] p-4 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl"
                                            // key={index}
                                          >
                                            心のストレッチ
                                          </span>
                                        </div>
                                        <div
                                          className="max-w-[92%]"
                                          style={{ textAlign: "left" }}
                                        >
                                          <div className="flex justify-start 2xl:gap-6 sm:gap-3 gap-1">
                                            <img
                                              src="/assets/images/bear12.svg"
                                              className={scale}
                                            />
                                            <p className="bg-gray-300 p-4 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl">
                                              {consultation}
                                            </p>
                                          </div>
                                        </div>
                                      </>
                                    )}
                                    {user.mannedConsultation && (
                                      <div className="flex justify-end gap-10 py-1">
                                        <span
                                          style={{ textAlign: "left" }}
                                          className="bg-gray-300  max-w-[80%] p-4 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl"
                                          // key={index}
                                        >
                                          ハラスメント相談
                                        </span>
                                      </div>
                                    )}
                                    {user.type === "chat" && (
                                      <div
                                        className="max-w-[92%]"
                                        style={{ textAlign: "left" }}
                                      >
                                        <div className="flex justify-start 2xl:gap-6 sm:gap-3 gap-1">
                                          <img
                                            src="/assets/images/bear12.svg"
                                            className={scale}
                                          />
                                          <p className="bg-gray-300 p-4 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl">
                                            {user.msg}
                                          </p>
                                        </div>
                                      </div>
                                    )}

                                    {user.type === "suggestion" && (
                                      <div
                                        className="gap-1 flex sm:max-w-[92%] w-full"
                                        style={{ textAlign: "left" }}
                                      >
                                        <div className="flex justify-start 2xl:gap-6 sm:gap-3 gap-1">
                                          <img
                                            src="/assets/images/bear12.svg"
                                            className={
                                              scale + " sm:block hidden"
                                            }
                                            // className={`xl:${scale}`}
                                          />
                                          <div className="flex xl:gap-2 gap-1 xl:text-sm text-xs justify-center leading-4 items-center">
                                            {user.msg
                                              // .split("。,")
                                              .split(",")
                                              .map(
                                                (
                                                  suggestion,
                                                  suggestionIndex,
                                                ) => (
                                                  <span
                                                    className="cursor-pointer border-2 border-blue-600 hover:scale-103 hover:border-yellow-500 xl:p-3 lg:p-2 p-1 max-h-96 rounded-3xl"
                                                    key={suggestionIndex}
                                                    onClick={() =>
                                                      handleConsultations2(
                                                        suggestion,
                                                      )
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
                        {messages2.map(
                          (msg, index) =>
                            msg.type !== "ping" && (
                              <div
                                style={{ textAlign: "right" }}
                                className="p-1"
                                key={index}
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
                                  </div>
                                )}
                                {msg.message === "心のストレッチ" && (
                                  <div
                                    className="max-w-[92%]"
                                    style={{ textAlign: "left" }}
                                  >
                                    <div className="flex justify-start 2xl:gap-6 sm:gap-3 gap-1">
                                      <img
                                        src="/assets/images/bear12.svg"
                                        className={scale}
                                      />
                                      <p className="bg-gray-300 p-4 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl">
                                        {consultation}
                                      </p>
                                    </div>
                                  </div>
                                )}
                                {msg.message === "オンライン保健室" && (
                                  <div
                                    className="max-w-[92%] mt-1"
                                    style={{ textAlign: "left" }}
                                  >
                                    <div className="flex justify-start 2xl:gap-6 sm:gap-3 gap-1">
                                      <img
                                        src="/assets/images/bear12.svg"
                                        className={scale}
                                      />
                                      <p className="bg-gray-300 p-4 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl">
                                        {onlineHealthRoom}
                                      </p>
                                    </div>
                                  </div>
                                )}
                                {msg.type === "chat" && (
                                  <div
                                    className="max-w-[92%]"
                                    style={{ textAlign: "left" }}
                                  >
                                    <div className="flex justify-start 2xl:gap-6 sm:gap-3 gap-1">
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
                                    className="gap-1 flex sm:max-w-[92%] w-full"
                                    style={{ textAlign: "left" }}
                                  >
                                    <div className="flex justify-start 2xl:gap-6 sm:gap-3 gap-1">
                                      <img
                                        src="/assets/images/bear12.svg"
                                        className={scale + " sm:block hidden"}
                                      />
                                      <div className="flex xl:gap-2 gap-1 xl:text-sm text-xs leading-4 justify-center items-center">
                                        {msg.message
                                          // .split("。,")
                                          .split(",")
                                          .map(
                                            (suggestion, suggestionIndex) => (
                                              <span
                                                className="cursor-pointer border-2 border-blue-600 hover:scale-103 hover:border-yellow-500 p-3 max-h-96  rounded-3xl"
                                                key={suggestionIndex}
                                                onClick={() =>
                                                  handleConsultations2(
                                                    suggestion,
                                                  )
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
                      <p className="text-gray-400 py-3 px-7"></p>
                      <div className="flex items-baseline gap-2 px-7">
                        <input
                          type="text"
                          placeholder="メッセージを入力してください"
                          onChange={handleChangeMessage2}
                          value={message2}
                          required
                          className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none border-form-strokedark bg-form-input focus:border-primary mb-5"
                        />
                        <img
                          src="/assets/images/msg_send.svg"
                          onClick={sendMessage2}
                          className=" rounded-md hover:scale-125 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                  <div>
                    <button
                      type="button"
                      className="xl:px-28 sm:px-12 xs:px-7 px-3 py-4 my-3 bg-green rounded-xl xl:text-xl xs:text-base text-sm"
                    >
                      AIがさまざまな問題をサポートいたします。
                    </button>
                    <div className="bg-white rounded-lg">
                      <div
                        ref={box3}
                        className="text-sm overflow-y-scroll max-h-[850px] min-h-[500px] 2xl:px-6 lg:px-2"
                      >
                        <div className="h-5"></div>
                        <div>
                          {allData
                            .sort((a: any, b: any) => a.rowIndex - b.rowIndex)
                            .map(
                              (user) =>
                                user.type !== "zoomCounselingDateTime" &&
                                user.type !== "chatCarouse" && (
                                  <div
                                    style={{ textAlign: "right" }}
                                    className="p-1"
                                    key={user.rowIndex}
                                  >
                                    {user.type === "sender" && (
                                      <div className="flex justify-end gap-10">
                                        <span
                                          style={{ textAlign: "left" }}
                                          className="bg-gray-300  max-w-[80%] p-4 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl"
                                        >
                                          {user.msg}
                                        </span>
                                      </div>
                                    )}
                                    {user.type === "receiver" && (
                                      <>
                                        <div
                                          className="max-w-[92%]"
                                          style={{ textAlign: "left" }}
                                        >
                                          <div className="flex justify-start 2xl:gap-6 sm:gap-3 gap-1">
                                            <img
                                              src="/assets/images/bear12.svg"
                                              className={scale}
                                            />
                                            <div className="bg-gray-300 p-4 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl">
                                              <div
                                                dangerouslySetInnerHTML={{
                                                  __html:
                                                    convertNewlinesToHtmlBr(
                                                      divideMessageComponents(
                                                        user.msg,
                                                      ).message,
                                                    ),
                                                }}
                                              />
                                              <a
                                                href={
                                                  divideMessageComponents(
                                                    user.msg,
                                                  ).link || undefined
                                                }
                                                target="_blank"
                                              >
                                                <img
                                                  src={
                                                    divideMessageComponents(
                                                      user.msg,
                                                    ).img || ""
                                                  }
                                                />
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    )}
                                    {user.type === "suggestion" && (
                                      <div
                                        className="gap-1 flex sm:max-w-[92%] w-full"
                                        style={{ textAlign: "left" }}
                                      >
                                        <div className="flex justify-start 2xl:gap-6 sm:gap-3 gap-1">
                                          <img
                                            src="/assets/images/bear12.svg"
                                            className={
                                              scale + " sm:block hidden"
                                            }
                                            // className={`xl:${scale}`}
                                          />
                                          <div className="flex xl:gap-2 gap-1 xl:text-sm text-xs justify-center leading-4 items-center">
                                            {(user.msg ?? "") // Use an empty string as a fallback if user.msg is null
                                              // .split("。,")
                                              .split(",")
                                              .map(
                                                (
                                                  suggestion,
                                                  suggestionIndex,
                                                ) => (
                                                  <span
                                                    className="cursor-pointer border-2 border-blue-600 hover:scale-103 hover:border-yellow-500 xl:p-3 lg:p-2 p-1 max-h-96 rounded-3xl"
                                                    key={suggestionIndex}
                                                    onClick={() =>
                                                      handleConsultations3(
                                                        suggestion,
                                                      )
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
                        {messages3.map(
                          (msg, index) =>
                            msg.type !== "ping" && (
                              <div
                                style={{ textAlign: "right" }}
                                className="p-1"
                                key={index}
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
                                  </div>
                                )}
                                {msg.message === "心のストレッチ" && (
                                  <div
                                    className="max-w-[92%]"
                                    style={{ textAlign: "left" }}
                                  >
                                    <div className="flex justify-start 2xl:gap-6 sm:gap-3 gap-1">
                                      <img
                                        src="/assets/images/bear12.svg"
                                        className={scale}
                                      />
                                      <p className="bg-gray-300 p-4 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl">
                                        {consultation}
                                      </p>
                                    </div>
                                  </div>
                                )}
                                {msg.message === "オンライン保健室" && (
                                  <div
                                    className="max-w-[92%] mt-1"
                                    style={{ textAlign: "left" }}
                                  >
                                    <div className="flex justify-start 2xl:gap-6 sm:gap-3 gap-1">
                                      <img
                                        src="/assets/images/bear12.svg"
                                        className={scale}
                                      />
                                      <p className="bg-gray-300 p-4 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl">
                                        {onlineHealthRoom}
                                      </p>
                                    </div>
                                  </div>
                                )}
                                {msg.type === "chat" && (
                                  <div
                                    className="max-w-[92%]"
                                    style={{ textAlign: "left" }}
                                  >
                                    <div className="flex justify-start 2xl:gap-6 sm:gap-3 gap-1">
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
                                    className="gap-1 flex sm:max-w-[92%] w-full"
                                    style={{ textAlign: "left" }}
                                  >
                                    <div className="flex justify-start 2xl:gap-6 sm:gap-3 gap-1">
                                      <img
                                        src="/assets/images/bear12.svg"
                                        className={scale + " sm:block hidden"}
                                      />
                                      <div className="flex xl:gap-2 gap-1 xl:text-sm text-xs leading-4 justify-center items-center">
                                        {msg.message
                                          // .split("。,")
                                          .split(",")
                                          .map(
                                            (suggestion, suggestionIndex) => (
                                              <span
                                                className="cursor-pointer border-2 border-blue-600 hover:scale-103 hover:border-yellow-500 p-3 max-h-96  rounded-3xl"
                                                key={suggestionIndex}
                                                onClick={() =>
                                                  handleConsultations3(
                                                    suggestion,
                                                  )
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
                      <p className="text-gray-400 py-3 px-7"></p>
                      <div className="flex items-baseline gap-2 px-7">
                        <input
                          type="text"
                          placeholder="メッセージを入力してください"
                          onChange={handleChangeMessage3}
                          value={message3}
                          required
                          className="w-full rounded-lg border bg-transparent py-4 pl-6 pr-10 outline-none border-form-strokedark bg-form-input focus:border-primary mb-5"
                        />
                        <img
                          src="/assets/images/msg_send.svg"
                          onClick={sendMessage3}
                          className=" rounded-md hover:scale-125 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="relative flex flex-col min-w-0 break-words bg-yellow-light w-full border-[5px]  border-t-0 border-green">
                  <div className="xl:px-16 sm:px-6 px-2 py-5 flex-auto">
                    <div className="tab-content tab-space">
                      <div
                        className={openTab === 3 ? "block" : "hidden"}
                        id="link3"
                      >
                        <div>
                          <button
                            type="button"
                            className="xl:px-28 sm:px-12 xs:px-7 px-3 py-4 my-3 bg-green rounded-xl xl:text-xl xs:text-base text-sm"
                          >
                            AIがさまざまな問題をサポートいたします。
                          </button>
                          <div className="bg-white rounded-lg">
                            <div
                              ref={box}
                              className="text-sm overflow-y-scroll max-h-[850px] min-h-[500px] 2xl:px-6 lg:px-2"
                            >efefef</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {status == "min" && (
        // <div className="w-full xl:h-24 h-12 px-24 py-6 flex justify-between"></div>
        <div className="w-full xl:h-24 xl:px-24 sm:px-10 px-3 py-6 flex justify-between gap-2">
          <a
            href="https://kirihare-web.jp/E73ArfjpADchHAyN9ihb34FTVdD7kcjuC7nHLhkJiCQE3asNMe6s/?m=harassmentview&webLogin=true&l=XwtmjNKXWNdUA_fEEIm64iHIivQYutHeQLq6Tl5aAyiDYsbvDNNlhkyPiqqgJxH3"
            target="_blank"
            className="bg-green py-1 rounded-full flex justify-center"
          >
            <button className="bg-green px-5 py-1 rounded-full sm:text-base text-sm">
              ハラスメントWEB報告
            </button>
          </a>
          <button
            className="bg-green px-5 py-1 rounded-full sm:text-base text-sm"
            onClick={onScale}
          >
            全画面に戻る
          </button>
        </div>
      )}

      {status == "max" && (
        <div className="w-full xl:h-24 xl:px-24 sm:px-10 px-3 py-6 flex justify-between gap-2">
          <a
            href="https://kirihare-web.jp/E73ArfjpADchHAyN9ihb34FTVdD7kcjuC7nHLhkJiCQE3asNMe6s/?m=harassmentview&webLogin=true&l=XwtmjNKXWNdUA_fEEIm64iHIivQYutHeQLq6Tl5aAyiDYsbvDNNlhkyPiqqgJxH3"
            target="_blank"
            className="bg-green py-1 rounded-full flex justify-center"
          >
            <button className="bg-green px-5 py-1 rounded-full sm:text-base text-sm">
              ハラスメントWEB報告
            </button>
          </a>
          <button
            className="bg-green px-5 py-1 rounded-full sm:text-base text-sm"
            onClick={onScale}
          >
            メインメニューへ戻る
          </button>
        </div>
      )}
    </div>
  );
};
export default Service1;
