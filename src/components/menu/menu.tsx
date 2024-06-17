import React, { useState } from "react";
import Button from "@/components/button/button.tsx";
import {
  updateConsultation,
  updateConsultationMenu,
  updateSelfCareMenu,
  updateMannedConsultation,
  updateConsultationReservation,
  updateSelfCheck,
  updateOnlineHealthRoomReservation, updateOnlineHealthRoomMenu
} from "../../store/chat";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ja";

// type ValuePiece = Date | null;
// type Value = ValuePiece | [ValuePiece, ValuePiece];
const Menu = () => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(new Date()));
  const [selfCareMenu, setSelfCareMenu] = useState(false);
  const [consultationReservation, setConsultationReservation] = useState("");
  const [consultationReservationMenu, setConsultationReservationMenu] =
    useState("");
  const [mannedConsultation, setMannedConsultation] = useState(false);
  const [mannedConsultationMenu, setMannedConsultationMenu] = useState(false);
  const [selfCheck, setSelfCheck] = useState(false);
  const [onlineHealthRoom, setonlineHealthRoom] = useState(false);
  const [onlineHealthRoomMenu, setonlineHealthRoomMenu] = useState(false);
  const [onlineHealthRoomReservation, setonlineHealthRoomReservation] = useState("");
  const [onlineHealthRoomReservationType, setOnlineHealthRoomReservationType] = useState("");
  const [onlineHealthRoomReservationText, setOnlineHealthRoomReservationText] = useState("");

  const dispatch = useAppDispatch();
  const handleConsultationMenu = () => {
    setSelfCareMenu(false);
    setMannedConsultation(false);
    setMannedConsultationMenu(false);
    dispatch(updateConsultationMenu(true));
    setConsultationReservation("");
    setonlineHealthRoomReservation(""),
    setSelfCheck(false);
    setonlineHealthRoom(false);
    setonlineHealthRoomMenu(false);
  };
  const handleConsultationReservation = () => {
    if (dayjs().isSame(value, 'day') && (value?.diff(dayjs(), 'hour') ?? 0) < 3) {
      setConsultationReservation("現在の時刻から3時間後を選択してください。");
      dispatch(updateConsultationReservation(""));
      return;
    }

    setConsultationReservation(
      `ハラスメント相談の希望日時（${value?.get("year")}年${(value?.get("month") ?? 0) + 1}月${value?.get("date")}日 ${value?.get("hour")}:${value?.get("minute")?.toString().padStart(2, '0')}）が送信されました。ハラスメント相談にはチャット/ビデオ通話(Google Meet)/お電話がご利用可能です。リクエストが無い場合はお電話になりますので、ご希望がありましたら事前にチャットにご希望のコミニケーション手段をお知らせください。`,
    );
    dispatch(
      updateConsultationReservation(
        `ハラスメント相談の希望日時（${value?.get("year")}年${(value?.get("month") ?? 0) + 1}月${value?.get("date")}日 ${value?.get("hour")}:${value?.get("minute")?.toString().padStart(2, '0')}）が送信されました。ハラスメント相談にはチャット/ビデオ通話(Google Meet)/お電話がご利用可能です。リクエストが無い場合はお電話になりますので、ご希望がありましたら事前にチャットにご希望のコミニケーション手段をお知らせください。`,
      ),
    );
  };

  const handleOnlineHealthRoomReservation = () => {
    if (dayjs().isSame(value, 'day') && (value?.diff(dayjs(), 'hour') ?? 0) < 3) {
      setOnlineHealthRoomReservationText("現在の時刻から3時間後を選択してください。");
      dispatch(updateOnlineHealthRoomReservation(""));
      return;
    }

    let reservationText = "";
    switch (onlineHealthRoomReservationType) {
      case "ビデオ通話カウンセリング":
        reservationText = `ビデオ通話(Google Meet)カウンセリングの希望日時（${value?.get("year")}年${(value?.get("month") ?? 0) + 1}月${value?.get("date")}日 ${value?.get("hour")}:${value?.get("minute")?.toString().padStart(2, '0')}）が送信されました。`;
        break;
      case "電話カウンセリング":
        reservationText = `電話カウンセリングの希望日時（${value?.get("year")}年${(value?.get("month") ?? 0) + 1}月${value?.get("date")}日 ${value?.get("hour")}:${value?.get("minute")?.toString().padStart(2, '0')}）が送信されました。`;
        break;
      case "チャットカウンセリング":
        reservationText = `チャットカウンセリングの希望日時（${value?.get("year")}年${(value?.get("month") ?? 0) + 1}月${value?.get("date")}日 ${value?.get("hour")}:${value?.get("minute")?.toString().padStart(2, '0')}）が送信されました。`;
        break;
      default:
        reservationText = "";
    }
    setOnlineHealthRoomReservationText(reservationText);
    dispatch(updateOnlineHealthRoomReservation(reservationText));
  };

  const handleConsultation = () => {
    setMannedConsultation(false);
    setSelfCareMenu(false);
    setMannedConsultationMenu(false);
    dispatch(updateConsultation(true));
    setConsultationReservation("");
    setonlineHealthRoomReservation(""),
    setSelfCheck(false);
    setonlineHealthRoom(false);
    setonlineHealthRoomMenu(false);
  };
  const handleSelfCareMenu = () => {
    setConsultationReservation("");
    setonlineHealthRoomReservation(""),
    setMannedConsultation(false);
    setSelfCareMenu(true);
    setMannedConsultationMenu(false);
    dispatch(updateSelfCareMenu(true));
    setSelfCheck(false);
    setonlineHealthRoom(false);
    setonlineHealthRoomMenu(false);
  };

  const handleMannedConsultationMenu = () => {
    setConsultationReservation("");
    setonlineHealthRoomReservation(""),
    setSelfCareMenu(false);
    setMannedConsultation(false);
    setMannedConsultationMenu(true);
    dispatch(updateMannedConsultation(true));
    setSelfCheck(false);
    setonlineHealthRoom(false);
    setonlineHealthRoomMenu(false);
  };
  const handleMannedConsultation = () => {
    setConsultationReservation("");
    setonlineHealthRoomReservation(""),
    setSelfCareMenu(false);
    setMannedConsultationMenu(false);
    setMannedConsultation(true);
    setSelfCheck(false);
    setonlineHealthRoom(false);
    setonlineHealthRoomMenu(false);
  };

  const handleSelfCheck = () => {
    setConsultationReservation("");
    setonlineHealthRoomReservation(""),
    setMannedConsultation(false);
    setSelfCareMenu(false);
    setSelfCheck(true);
    setMannedConsultationMenu(false);
    dispatch(updateSelfCheck(true));
    setonlineHealthRoom(false);
    setonlineHealthRoomMenu(false);
  };

  const handleonlineHealthRoomMenu = () => {
    setConsultationReservation("");
    setonlineHealthRoomReservation(""),
      setSelfCareMenu(false);
    setMannedConsultationMenu(false);
    setMannedConsultation(false);
    setSelfCheck(false);
    setonlineHealthRoom(false);
    setonlineHealthRoomMenu(true);
    dispatch(updateOnlineHealthRoomMenu(true));
  };

  const handleonlineHealthRoom = (reservationType: string) => {
    setConsultationReservation("");
    setonlineHealthRoomReservation("");
    setSelfCareMenu(false);
    setMannedConsultationMenu(false);
    setMannedConsultation(false);
    setSelfCheck(false);
    setonlineHealthRoom(true);
    setonlineHealthRoomMenu(false);
    setOnlineHealthRoomReservationType(reservationType);
  };


  return (
    <div className="w-full pt-5 pb-3 items-center ">
      <div className="flex gap-3 justify-center">
        <div className="flex flex-col gap-5 mt-4 items-center">
          <h1 className="text-teal xl:text-7xl lg:text-5xl md:text-4xl sm:text-6xl text-5xl tracking-widest">
            MENU
          </h1>
          <p className="text-gray-dark xl:text-lg md:text-base text-lg pt-3 flex flex-col">
            <span>以下のメニューから</span>
            <span>お選びください。</span>
          </p>
        </div>
        <img
          src="/assets/images/bear.png"
          className="lg:w-20 lg:h-32 md:w-16 md:h-24 w-20 h-32"
        />
      </div>
      <div>
        <p className="xl:mt-14 mt-6 border-l-8 border-gray-dark pl-3 xl:text-3xl text-2xl">
          チャットサービスメニュー
        </p>
        <p className="mt-6 border-gray-dark pl-5 xl:text-lg text-base">
          AIとのチャットサービスは24時間ご利用可能。
        </p>
        <p className=" border-gray-dark pl-5 xl:text-lg text-base">
          サイト右のチャット相談からお入りください。
        </p>
        <div className="flex flex-col xl:flex-row xl:gap-5 gap-2 xl:mt-2 mt-2 text-center">
          <button
            onClick={handleConsultationMenu}
            rel="noopener noreferrer"
            className="lg:px-4 px-2 max-w-full xl:h-20 h-16 flex justify-center items-center border rounded-xl bg-teal-dark"
          >
            <h1 className="flex justify-center items-center text-white xl:text-lg text-base leading-4">
              AIお悩み相談 Menu
            </h1>
          </button>
          <button
            onClick={handleConsultation}
            rel="noopener noreferrer"
            className="lg:px-4 px-2 max-w-full xl:h-20 h-16 flex justify-center items-center border rounded-xl bg-teal-dark"
          >
            <h1 className="flex justify-center items-center text-white xl:text-lg text-base leading-4">
              AIハラスメント診断
            </h1>
          </button>
        </div>
      </div>
      <div>
        <p className="xl:mt-14 mt-10 border-l-8 border-gray-dark pl-3 xl:text-3xl text-2xl">
          セルフサービスメニュー
        </p>
        <p className="mt-6 border-gray-dark pl-5 xl:text-lg text-base">
          ご自身のメンタルヘルスをチェックしたり、解消するお手伝いをいたします。
        </p>
        <p className=" border-gray-dark pl-5 xl:text-lg text-base">
          以下のサービスよりお選びください。
        </p>
        <div className="flex flex-col xl:flex-row xl:gap-5 gap-2 xl:mt-2 mt-2 text-center">
          <button
            onClick={handleMannedConsultationMenu}
            rel="noopener noreferrer"
            className="lg:px-4 px-2 max-w-full xl:w-56 xl:h-20 h-16 flex justify-center items-center border rounded-xl bg-teal-dark"
          >
            <h1 className="flex justify-center items-center text-white 2xl:text-lg text-base leading-4">
              有人ハラスメント 相談窓口
            </h1>
          </button>
          <button
            onClick={handleonlineHealthRoomMenu}
            rel="noopener noreferrer"
            className="lg:px-4 px-2 max-w-full xl:w-56 xl:h-20 h-16 flex justify-center items-center border rounded-xl bg-teal-dark"
          >
            <h1 className="flex justify-center items-center text-white xl:text-lg text-base">
              心理士カウンセリング予約
            </h1>
          </button>
        </div>
        <div className="flex flex-col xl:flex-row xl:gap-5 gap-2 xl:mt-2 mt-2 text-center">
          <Button
            link="https://kirihare-web.jp/E73ArfjpADchHAyN9ihb34FTVdD7kcjuC7nHLhkJiCQE3asNMe6s/?m=harassmentview&webLogin=true&l=XwtmjNKXWNdUA_fEEIm64iHIivQYutHeQLq6Tl5aAyiDYsbvDNNlhkyPiqqgJxH3"
            title="ハラスメント Web報告"
          />
          <button
            onClick={handleSelfCheck}
            rel="noopener noreferrer"
            className="lg:px-4 px-2 max-w-full xl:w-56 xl:h-20 h-16 flex justify-center items-center border rounded-xl bg-teal-dark"
          >
            <h1 className="flex justify-center items-center text-white xl:text-lg text-base">
              心のセルフチェック
            </h1>
          </button>
        </div>
        <div className="flex flex-col xl:flex-row xl:gap-5 gap-2 xl:mt-2 mt-2 text-center">
          <Button
            link="https://xs805903.xsrv.jp/kirihare001/harassment-quiz/"
            title="ハラスメントクイズ"
          />
          <Button
            link="https://xs805903.xsrv.jp/kirihare001/shinri-test/"
            title="カジュアルな心理テスト"
          />
        </div>
        <div className="flex flex-col xl:flex-row xl:gap-5 gap-2 xl:mt-2 mt-2 text-center">
        </div>
        <div className="flex flex-col xl:flex-row xl:gap-5 gap-2 xl:mt-2 mt-2 text-center">
          <button
            rel="noopener noreferrer"
            className="hidden lg:px-4 px-2 max-w-full xl:w-56 xl:h-20 h-16 xl:flex justify-center items-center bg-white"
          >
            <h1 className="flex justify-center items-center text-white xl:text-lg text-base"></h1>
          </button>
          <button
            onClick={handleSelfCareMenu}
            rel="noopener noreferrer"
            className="lg:px-4 px-2 max-w-full xl:w-56 xl:h-20 h-16 flex justify-center items-center border rounded-xl bg-teal-dark"
          >
            <h1 className="flex justify-center items-center text-white xl:text-lg text-base">
              セルフケア MENU
            </h1>
          </button>
        </div>
      </div>
      {selfCareMenu && (
        <div className="pt-10 mx-auto flex flex-col items-center w-full">
          <div
            rel="noopener noreferrer"
            className="px-4 xl:w-64 w-full xl:h-16 h-12 flex justify-center items-center border rounded-lg bg-blue-400 xl:mb-3 mb-1"
          >
            <h1 className="flex justify-center items-center text-black xl:text-xl font-bold lg:text-base text-sm">
              セルフケア MENU
            </h1>
          </div>
          <button
            rel="noopener noreferrer"
            className="px-4 xl:w-64 w-full xl:h-16 h-12 flex justify-center items-center border rounded-lg bg-green xl:mb-3 mb-1"
          >
            <a
              className="flex justify-center items-center text-black xl:text-lg lg:text-base text-sm"
              target="_blank"
              href="https://kirihare-web.jp/E73ArfjpADchHAyN9ihb34FTVdD7kcjuC7nHLhkJiCQE3asNMe6s/?m=kokoronikki&webLogin=true&l=XwtmjNKXWNdUA_fEEIm64iHIivQYutHeQLq6Tl5aAyiDYsbvDNNlhkyPiqqgJxH3"
            >
              ① 一行日記
            </a>
          </button>
          <button
            rel="noopener noreferrer"
            className="px-4 xl:w-64 w-full xl:h-16 h-12 flex justify-center items-center border rounded-lg bg-green xl:mb-3 mb-1"
          >
            <a
              className="flex justify-center items-center text-black xl:text-lg lg:text-base text-sm"
              href="https://kirihare.blob.core.windows.net/corporate/jiritukunren/pc/index.html"
              target="_blank"
            >
              ② 自律訓練
            </a>
          </button>
          <button
            rel="noopener noreferrer"
            className="px-4 xl:w-64 w-full xl:h-16 h-12 flex justify-center items-center border rounded-lg bg-green xl:mb-3 mb-1"
          >
            <a
              className="flex justify-center items-center text-black xl:text-lg lg:text-base text-sm leading-2"
              href="https://kirihare.net/healthcare/\"
              target="_blank"
            >
              ③ マインドフルネス
            </a>
          </button>
          <button
            rel="noopener noreferrer"
            className="px-4 xl:w-64 w-full xl:h-16 h-12 flex justify-center items-center border rounded-lg bg-green xl:mb-3 mb-1"
          >
            <a
              className="flex justify-center items-center text-black xl:text-lg lg:text-base text-sm"
              href="https://kirihare-web.jp/E73ArfjpADchHAyN9ihb34FTVdD7kcjuC7nHLhkJiCQE3asNMe6s/?m=columnmethod&webLogin=true&l=choNWp4LTRsf8qwS0rw_-nd4RfA-ufyQk2ofvRRI2iVlNGiv7fhQ6Okxdmcbzie0"
              target="_blank"
            >
              ④ コラム法
            </a>
          </button>
        </div>
      )}
      {mannedConsultationMenu && (
        <div className="pt-2 mx-auto flex flex-col items-center">
          <div
            rel="noopener noreferrer"
            className="mx-auto w-full lg:px-5 px-2 text-center h-16 flex justify-center items-center border rounded-lg bg-blue-400 mt-10 mb-5"
          >
            <h1 className="flex justify-center items-center text-white xl:text-lg text-base leading-4">
              有人ハラスメント 相談窓口
            </h1>
          </div>
          <p className="xl:text-lg text-sm">
            [有人]ハラスメント相談の当日予約を希望される場合は、現時刻より3時間先の時刻から予約可能です。
            ※ご予約希望日が既に埋まっている場合は、別日程をご提案させていただく場合がございます。
            その場合は、土日祝日を除く営業日に担当スタッフが確認し、24時間以内にご返信いたします。
          </p>
          <button
            rel="noopener noreferrer"
            onClick={handleMannedConsultation}
            className="mx-auto w-full h-16 flex justify-center items-center border rounded-lg bg-green  mt-5"
          >
            <h1 className="flex justify-center items-center text-white text-sm">
              有人対応ハラスメント相談(電話/ビデオ通話/チャット)
            </h1>
          </button>
        </div>
      )}
      {mannedConsultation && (
        <div className="pt-2 mx-auto flex flex-col items-center">
          <div
            rel="noopener noreferrer"
            className="px-2 w-full h-16 text-center flex justify-center items-center border rounded-lg bg-blue-400 mt-10 mb-3"
          >
            <h1 className="flex justify-center items-center text-white xl:text-lg text-base">
              有人ハラスメント 相談窓口
            </h1>
          </div>
          <br />
          <p className="pb-4 text-md text-gray-600">
            予約時間を選択してください
          </p>
          <div className="flex items-baseline gap-4">
            <LocalizationProvider adapterLocale="ja" dateAdapter={AdapterDayjs}>
              <DateTimePicker
                value={value}
                onChange={(newValue) => setValue(newValue)}
                minDateTime={dayjs().isSame(value, 'day') ? dayjs().add(3, 'hour') : undefined}
              />
            </LocalizationProvider>
          </div>
          <div className="flex justify-end w-full">
            <button
              onClick={handleConsultationReservation}
              className="bg-blue-500 px-4 py-2 rounded-lg text-md text-white mt-3"
            >
              完 了
            </button>
          </div>
          <div className="pt-5 xl:text-lg text-sm">
            {consultationReservation}
          </div>
        </div>
      )}
      {selfCheck && (
        <div className="pt-10 mx-auto flex flex-col items-center w-full">
          <div
            rel="noopener noreferrer"
            className="px-4 xl:w-64 w-full xl:h-16 h-12 flex justify-center items-center border rounded-lg bg-blue-400 xl:mb-3 mb-1"
          >
            <h1 className="flex justify-center items-center text-black xl:text-xl font-bold lg:text-base text-sm">
              心のセルフチェック
            </h1>
          </div>
          <button
            rel="noopener noreferrer"
            className="px-4 xl:w-64 w-full xl:h-16 h-12 flex justify-center items-center border rounded-lg bg-green xl:mb-3 mb-1"
          >
            <a
              className=" text-black xl:text-lg lg:text-base text-sm"
              target="_blank"
              href="https://kirihare-web.jp/E73ArfjpADchHAyN9ihb34FTVdD7kcjuC7nHLhkJiCQE3asNMe6s/?checklist=pss4&webLogin=true&l=vedSccDg5vIbWmSdQpvPWm8vmoyeqiUGj1U--R5qDzF3jZCS5gRw89RcuydbzFUK"
            >
              <div className="flex flex-col">
                <p>① ストレスチェック</p>
                <p>ショートバージョン</p>
              </div>
            </a>
          </button>
          <button
            rel="noopener noreferrer"
            className="px-4 xl:w-64 w-full xl:h-16 h-12 flex justify-center items-center border rounded-lg bg-green xl:mb-3 mb-1"
          >
            <a
              className="flex justify-center items-center text-black xl:text-lg lg:text-base text-sm"
              href="https://kirihare-web.jp/E73ArfjpADchHAyN9ihb34FTVdD7kcjuC7nHLhkJiCQE3asNMe6s/?checklist=family&webLogin=true&l=vedSccDg5vIbWmSdQpvPWm8vmoyeqiUGj1U--R5qDzF3jZCS5gRw89RcuydbzFUK"
              target="_blank"
            >
              ② 家族関係
            </a>
          </button>
          <button
            rel="noopener noreferrer"
            className="px-4 xl:w-64 w-full xl:h-16 h-12 flex justify-center items-center border rounded-lg bg-green xl:mb-3 mb-1"
          >
            <a
              className="flex flex-col justify-center items-center text-black xl:text-lg lg:text-base text-sm leading-2"
              href="https://kirihare-web.jp/E73ArfjpADchHAyN9ihb34FTVdD7kcjuC7nHLhkJiCQE3asNMe6s/?checklist=stresscheck&webLogin=true&l=vedSccDg5vIbWmSdQpvPWm8vmoyeqiUGj1U--R5qDzF3jZCS5gRw89RcuydbzFUK"
              target="_blank"
            >
              <span>③ ストレスチェック</span>
              <span>ロングバージョン</span>
            </a>
          </button>
          <button
            rel="noopener noreferrer"
            className="px-4 xl:w-64 w-full xl:h-16 h-12 flex justify-center items-center border rounded-lg bg-green xl:mb-3 mb-1"
          >
            <a
              className="flex justify-center items-center text-black xl:text-lg lg:text-base text-sm"
              href="https://kirihare-web.jp/E73ArfjpADchHAyN9ihb34FTVdD7kcjuC7nHLhkJiCQE3asNMe6s/?checklist=qidsj&webLogin=true&l=vedSccDg5vIbWmSdQpvPWm8vmoyeqiUGj1U--R5qDzF3jZCS5gRw89RcuydbzFUK"
              target="_blank"
            >
              ④ うつ度チェック
            </a>
          </button>
        </div>
      )}
      {onlineHealthRoomMenu && (
        <div className="pt-2 mx-auto flex flex-col items-center">
          <div
            rel="noopener noreferrer"
            className="mx-auto w-full lg:px-5 px-2 text-center h-16 flex justify-center items-center border rounded-lg bg-blue-400 mt-10 mb-5"
          >
            <h1 className="flex justify-center items-center text-white xl:text-lg text-base leading-4">
              心理士カウンセリング予約
            </h1>
          </div>
          <button
            rel="noopener noreferrer"
            onClick={() => handleonlineHealthRoom("ビデオ通話カウンセリング")}
            className="mx-auto w-full h-16 flex justify-center items-center border rounded-lg bg-green mt-2"
          >
            <h1 className="flex justify-center items-center text-white text-sm">
              ビデオ通話カウンセリング
            </h1>
          </button>
          <button
            rel="noopener noreferrer"
            onClick={() => handleonlineHealthRoom("電話カウンセリング")}
            className="mx-auto w-full h-16 flex justify-center items-center border rounded-lg bg-green mt-5"
          >
            <h1 className="flex justify-center items-center text-white text-sm">
              電話カウンセリング
            </h1>
          </button>
          <button
            rel="noopener noreferrer"
            onClick={() => handleonlineHealthRoom("チャットカウンセリング")}
            className="mx-auto w-full h-16 flex justify-center items-center border rounded-lg bg-green mt-2"
          >
            <h1 className="flex justify-center items-center text-white text-sm">
              チャットカウンセリング
            </h1>
          </button>
        </div>
      )}
      {onlineHealthRoom && (
        <div className="pt-2 mx-auto flex flex-col items-center">
          <div
            rel="noopener noreferrer"
            className="px-2 w-full h-16 text-center flex justify-center items-center border rounded-lg bg-blue-400 mt-10 mb-3"
          >
            <h1 className="flex justify-center items-center text-white xl:text-lg text-base">
              心理士カウンセリング予約
            </h1>
          </div>
          <br />
          <p className="pb-4 text-md text-gray-600">
            予約時間を選択してください
          </p>
          <div className="flex items-baseline gap-4">
            <LocalizationProvider adapterLocale="ja" dateAdapter={AdapterDayjs}>
              <DateTimePicker
                value={value}
                onChange={(newValue) => setValue(newValue)}
                minDateTime={dayjs().isSame(value, 'day') ? dayjs().add(3, 'hour') : undefined}
              />
            </LocalizationProvider>
          </div>
          <div className="flex justify-end w-full">
            <button
              onClick={handleOnlineHealthRoomReservation}
              className="bg-blue-500 px-4 py-2 rounded-lg text-md text-white mt-3"
            >
              完 了
            </button>
          </div>
          <div className="pt-5 xl:text-lg text-sm">
            {onlineHealthRoomReservationText}
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
